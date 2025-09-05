// Backend server: CDN proxy (dev), admin APIs, and health
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import dotenv from 'dotenv';
import { createRemoteJWKSet, jwtVerify } from 'jose';
import cookieParser from 'cookie-parser';
import { CognitoIdentityProviderClient, AdminInitiateAuthCommand, AdminRespondToAuthChallengeCommand, AdminListGroupsForUserCommand } from '@aws-sdk/client-cognito-identity-provider';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { DynamoDBClient, PutItemCommand, GetItemCommand, QueryCommand, ScanCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env for local/dev: prefer .env.local if present, else .env
try {
  const envLocalPath = path.join(path.dirname(fileURLToPath(import.meta.url)), '.env.local');
  if (fs.existsSync(envLocalPath)) {
    dotenv.config({ path: envLocalPath });
  } else {
    dotenv.config();
  }
} catch {}

const app = express();

// Prerender middleware for bot-friendly, dynamic SEO rendering
// Uses a local prerender service in development unless overridden
import prerender from 'prerender-node';
const PRERENDER_SERVICE_URL = process.env.PRERENDER_SERVICE_URL || 'http://127.0.0.1:3030';
app.use(
  prerender
    .set('prerenderServiceUrl', PRERENDER_SERVICE_URL)
    .whitelisted([
      '^/$',
      '^/about$',
      '^/services$',
      '^/portfolio$',
      '^/contact$',
      '^/terms$',
      '^/blog$',
      '^/blog/.*'
    ])
);

const port = process.env.PORT || 8080;
const allowOriginEnv = process.env.ALLOW_ORIGIN || 'http://localhost:5173,http://localhost:3000';
const allowedOrigins = allowOriginEnv.split(',').map(o => o.trim()).filter(Boolean);

app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    return cb(new Error('CORS not allowed'), false);
  },
  credentials: true
}));
app.use(express.json({ limit: '2mb' }));
app.use(cookieParser());

// AWS clients (configure via env/IAM role)
const awsRegion = process.env.AWS_REGION || 'us-east-1';
const s3Bucket = process.env.S3_BLOG_BUCKET;
const blogCdnUrl = (process.env.BLOG_CDN_URL || '').replace(/\/$/, '');
const distributionId = process.env.CLOUDFRONT_DISTRIBUTION_ID;

const s3 = new S3Client({ region: awsRegion });
const cf = new CloudFrontClient({ region: awsRegion });
const cognito = new CognitoIdentityProviderClient({ region: awsRegion });
const dynamoDb = new DynamoDBClient({ region: awsRegion });

// Contact inquiries table
const contactTableName = process.env.DYNAMODB_TABLE_NAME || 'hh6-inquiries';

// Serve CDN: proxy to BLOG_CDN_URL if set; else try S3 direct, then fallback to local mock files
const mockCdnRoot = path.join(__dirname, 'mock_cdn');
app.get(/^\/cdn\/(.*)/, async (req, res) => {
  // Avoid proxying to ourselves (e.g., BLOG_CDN_URL=http://localhost:8080/cdn)
  let shouldProxy = Boolean(blogCdnUrl);
  try {
    if (blogCdnUrl) {
      const u = new URL(blogCdnUrl);
      const reqHost = (req.headers.host || '').toLowerCase();
      const sameHost = reqHost === `${u.hostname}${u.port ? `:${u.port}` : ''}`.toLowerCase();
      const pointsToCdnPath = (u.pathname || '/').replace(/\/$/, '') === '/cdn';
      if (sameHost && pointsToCdnPath) {
        shouldProxy = false; // prevent infinite loop
      }
    }
  } catch {
    shouldProxy = false;
  }

  if (shouldProxy) {
    const forwardPath = req.path.replace(/^\/cdn/, '');
    const targetUrl = `${blogCdnUrl}${forwardPath}`;
    try {
      const upstream = await fetch(targetUrl);
      if (!upstream.ok) {
        return res.status(upstream.status).send(await upstream.text());
      }
      // Pass-through headers/content-type
      upstream.headers.forEach((v, k) => {
        if (k.toLowerCase() === 'content-length') return;
        res.setHeader(k, v);
      });
      const buffer = Buffer.from(await upstream.arrayBuffer());
      return res.status(200).send(buffer);
    } catch (e) {
      return res.status(502).json({ error: 'Upstream error', detail: String(e) });
    }
  }
  // Attempt direct S3 read
  try {
    const key = req.path.replace(/^\/cdn\//, '');
    const out = await s3.send(new GetObjectCommand({ Bucket: s3Bucket, Key: key }));
    // naive content-type by extension if not provided
    const ext = key.split('.').pop()?.toLowerCase();
    const typeMap = { json: 'application/json', md: 'text/markdown; charset=utf-8', html: 'text/html; charset=utf-8', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', svg: 'image/svg+xml' };
    const ct = out.ContentType || typeMap[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', ct);
    const buf = Buffer.from(await out.Body.transformToByteArray());
    return res.status(200).send(buf);
  } catch (e) {
    // Fall back to local mock
    const filePath = path.join(mockCdnRoot, req.path.replace(/^\/cdn\//, ''));
    return res.sendFile(filePath, (err) => {
      if (err) return res.status(404).json({ error: 'Not found' });
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

// Quick env debug (no secrets) to verify .env.local is loaded
app.get('/api/debug/env', (_req, res) => {
  res.json({
    bucket: s3Bucket || null,
    region: awsRegion || null,
    blogCdnUrl: blogCdnUrl || null
  });
});

// Inspect current auth token (from Authorization or cookie) without enforcing admin group
app.get('/api/debug/me', async (req, res) => {
  try {
    const header = req.headers.authorization;
    const cookieToken = req.cookies?.hh6_id_token ? `Bearer ${req.cookies.hh6_id_token}` : null;
    const source = header || cookieToken;
    if (!source) return res.status(401).json({ error: 'no_token' });
    const token = source.replace(/^Bearer\s+/i, '').trim();
    const { payload } = await jwtVerify(token, jwks, { issuer: cognitoIssuer, audience: cognitoAudience });
    res.json({ ok: true, sub: payload.sub, email: payload.email, groups: payload['cognito:groups'] || [] });
  } catch (e) {
    res.status(401).json({ error: 'invalid_token', detail: String(e) });
  }
});

// ---------- Auth helpers ----------
const cognitoIssuer = process.env.COGNITO_ISSUER;
const cognitoAudience = process.env.COGNITO_AUDIENCE;
const adminGroup = process.env.COGNITO_ADMIN_GROUP || 'admin';
let jwks;
if (cognitoIssuer) {
  jwks = createRemoteJWKSet(new URL(`${cognitoIssuer}/.well-known/jwks.json`));
}

async function verifyAccessToken(authHeader) {
  if (!authHeader) throw new Error('Missing Authorization');
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!jwks) throw new Error('JWKS not configured');
  const { payload } = await jwtVerify(token, jwks, {
    issuer: cognitoIssuer,
    audience: cognitoAudience
  });
  return payload;
}

function requireAdmin(req, res, next) {
  if (process.env.BYPASS_AUTH === 'true' || !cognitoIssuer || !cognitoAudience) {
    return next();
  }
  const header = req.headers.authorization;
  const cookieToken = req.cookies?.hh6_id_token ? `Bearer ${req.cookies.hh6_id_token}` : null;
  const source = header || cookieToken;
  verifyAccessToken(source)
    .then(async (payload) => {
      const groups = payload['cognito:groups'] || [];
      if (Array.isArray(groups) && groups.includes(adminGroup)) return next();
      // Fallback: query Cognito for groups if not present in token
      try {
        const username = payload['cognito:username'];
        const userPoolId = process.env.COGNITO_USER_POOL_ID;
        if (!username || !userPoolId) throw new Error('username_or_pool_missing');
        const out = await cognito.send(new AdminListGroupsForUserCommand({ UserPoolId: userPoolId, Username: username }));
        const names = (out.Groups || []).map(g => g.GroupName);
        if (names.includes(adminGroup)) return next();
        return res.status(401).json({ error: 'Unauthorized', detail: 'missing_admin_group' });
      } catch (e) {
        return res.status(401).json({ error: 'Unauthorized', detail: `group_check_failed: ${String(e)}` });
      }
    })
    .catch((e) => res.status(401).json({ error: 'Unauthorized', detail: e.message }));
}

// ---------- S3 helpers ----------
function getPostKeys(meta, bodyFormat, existingPath) {
  // existingPath like /posts/yyyy/mm/slug/
  if (existingPath) {
    const base = existingPath.replace(/^\//, '').replace(/\/?$/, '/');
    return {
      base,
      metaKey: `${base}post.json`,
      bodyKey: `${base}${bodyFormat === 'html' ? 'post.html' : 'body.md'}`
    };
  }
  const date = meta.publishedAt ? new Date(meta.publishedAt) : new Date();
  const yyyy = String(date.getUTCFullYear());
  const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
  const base = `posts/${yyyy}/${mm}/${meta.slug}/`;
  return {
    base,
    metaKey: `${base}post.json`,
    bodyKey: `${base}${bodyFormat === 'html' ? 'post.html' : 'body.md'}`
  };
}

async function readJsonFromS3(key) {
  try {
    const out = await s3.send(new GetObjectCommand({ Bucket: s3Bucket, Key: key }));
    const text = await out.Body.transformToString();
    return JSON.parse(text);
  } catch (e) {
    if (e?.$metadata?.httpStatusCode === 404) return null;
    throw e;
  }
}

async function writeJsonToS3(key, data, cacheControl = 'no-cache') {
  const body = Buffer.from(JSON.stringify(data, null, 2));
  await s3.send(new PutObjectCommand({
    Bucket: s3Bucket,
    Key: key,
    Body: body,
    ContentType: 'application/json',
    CacheControl: cacheControl
  }));
}

async function writeTextToS3(key, text, contentType, cacheControl = 'no-cache') {
  await s3.send(new PutObjectCommand({
    Bucket: s3Bucket,
    Key: key,
    Body: Buffer.from(text),
    ContentType: contentType,
    CacheControl: cacheControl
  }));
}

async function deletePrefix(prefix) {
  try {
    // Delete the main post files
    await Promise.all([
      s3.send(new DeleteObjectCommand({ Bucket: s3Bucket, Key: `${prefix.replace(/\/?$/, '/')}post.json` })),
      s3.send(new DeleteObjectCommand({ Bucket: s3Bucket, Key: `${prefix.replace(/\/?$/, '/')}body.md` })).catch(() => {}),
      s3.send(new DeleteObjectCommand({ Bucket: s3Bucket, Key: `${prefix.replace(/\/?$/, '/')}post.html` })).catch(() => {})
    ]);
    
    // List and delete any media files in the post directory
    try {
      const listResult = await s3.send(new ListObjectsV2Command({ 
        Bucket: s3Bucket, 
        Prefix: prefix.replace(/\/?$/, '/'),
        MaxKeys: 100
      }));
      
      if (listResult.Contents && listResult.Contents.length > 0) {
        const deletePromises = listResult.Contents
          .filter(obj => !obj.Key.endsWith('post.json') && !obj.Key.endsWith('body.md') && !obj.Key.endsWith('post.html'))
          .map(obj => s3.send(new DeleteObjectCommand({ Bucket: s3Bucket, Key: obj.Key })));
        
        if (deletePromises.length > 0) {
          await Promise.all(deletePromises);
        }
      }
    } catch (e) {
      console.log('Error listing/deleting media files:', e.message);
    }
  } catch (e) {
    console.log('Error in deletePrefix:', e.message);
    throw e;
  }
}

async function invalidatePaths(paths) {
  if (!distributionId) return;
  const callerReference = `inv-${Date.now()}`;
  await cf.send(new CreateInvalidationCommand({
    DistributionId: distributionId,
    InvalidationBatch: {
      CallerReference: callerReference,
      Paths: { Quantity: paths.length, Items: paths }
    }
  }));
}

// ---------- Admin endpoints ----------
app.post('/api/admin/media/presign', requireAdmin, async (req, res) => {
  try {
    const { key, contentType } = req.body || {};
    if (!key || !contentType) return res.status(400).json({ error: 'key and contentType required' });
    const putCmd = new PutObjectCommand({ 
      Bucket: s3Bucket, 
      Key: key, 
      ContentType: contentType,
      CacheControl: 'public,max-age=31536000,immutable'
    });
    const url = await getSignedUrl(s3, putCmd, { expiresIn: 900 });
    res.json({ url, key });
  } catch (e) {
    res.status(500).json({ error: 'presign_failed', detail: String(e) });
  }
});

// Alternative: proxy upload through backend to avoid S3 CORS issues
app.post('/api/admin/media/upload', requireAdmin, async (req, res) => {
  try {
    const { key, contentType, data } = req.body || {};
    if (!key || !contentType || !data) return res.status(400).json({ error: 'key, contentType, and data required' });
    
    // Decode base64 data
    const buffer = Buffer.from(data, 'base64');
    
    await s3.send(new PutObjectCommand({
      Bucket: s3Bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      CacheControl: 'public,max-age=31536000,immutable'
    }));
    
    const imageUrl = `/${key}`;
    res.json({ ok: true, key, url: imageUrl });
  } catch (e) {
    res.status(500).json({ error: 'upload_failed', detail: String(e) });
  }
});

app.post('/api/admin/posts', requireAdmin, async (req, res) => {
  try {
    const { postMeta, body, format = 'md' } = req.body || {};
    if (!postMeta || !postMeta.slug) return res.status(400).json({ error: 'postMeta.slug required' });
    const keys = getPostKeys(postMeta, format === 'html' ? 'html' : 'md');
    const cover = postMeta.coverImage && !/^https?:/i.test(postMeta.coverImage)
      ? `${blogCdnUrl || ''}${postMeta.coverImage}`
      : postMeta.coverImage;
    const metaToSave = { ...postMeta, coverImage: postMeta.coverImage || undefined, canonicalUrl: postMeta.canonicalUrl || undefined };

    // Write body and meta
    if (typeof body === 'string') {
      await writeTextToS3(keys.bodyKey, body, format === 'html' ? 'text/html; charset=utf-8' : 'text/markdown; charset=utf-8');
    }
    await writeJsonToS3(keys.metaKey, metaToSave);

    // Update index.json
    const index = (await readJsonFromS3('index.json')) || [];
    const summary = {
      title: metaToSave.title,
      slug: metaToSave.slug,
      description: metaToSave.description,
      publishedAt: metaToSave.publishedAt || new Date().toISOString(),
      tags: metaToSave.tags || [],
      coverImage: metaToSave.coverImage || null,
      path: `/cdn/${keys.base}`
    };
    const without = index.filter((i) => i.slug !== metaToSave.slug);
    without.push(summary);
    without.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
    await writeJsonToS3('index.json', without, 'no-cache');

    // Invalidate CDN
    await invalidatePaths(['/_/index.json'.replace('/_/', '/index.json'), `/${keys.base}post.json`, `/${keys.base}${format === 'html' ? 'post.html' : 'body.md'}`]);

    res.json({ ok: true, keys, summary });
  } catch (e) {
    res.status(500).json({ error: 'create_post_failed', detail: String(e) });
  }
});

app.put('/api/admin/posts/:slug', requireAdmin, async (req, res) => {
  try {
    const { slug } = req.params;
    const { postMeta, body, format = 'md' } = req.body || {};
    const index = (await readJsonFromS3('index.json')) || [];
    const found = index.find((p) => p.slug === slug);
    const existingPath = found?.path?.replace(/^\/cdn\//, '/') || undefined;
    const meta = postMeta || { slug };
    const keys = getPostKeys(meta, format === 'html' ? 'html' : 'md', existingPath);
    if (typeof body === 'string') {
      await writeTextToS3(keys.bodyKey, body, format === 'html' ? 'text/html; charset=utf-8' : 'text/markdown; charset=utf-8');
    }
    if (postMeta) {
      await writeJsonToS3(keys.metaKey, postMeta);
    }
    if (found) {
      found.title = postMeta?.title ?? found.title;
      found.description = postMeta?.description ?? found.description;
      found.publishedAt = postMeta?.publishedAt ?? found.publishedAt;
      found.tags = postMeta?.tags ?? found.tags;
      await writeJsonToS3('index.json', index, 'no-cache');
    }
    await invalidatePaths([`/${keys.base}post.json`, `/${keys.base}${format === 'html' ? 'post.html' : 'body.md'}`, '/index.json']);
    res.json({ ok: true, keys });
  } catch (e) {
    res.status(500).json({ error: 'update_post_failed', detail: String(e) });
  }
});

app.delete('/api/admin/posts/:slug', requireAdmin, async (req, res) => {
  try {
    const { slug } = req.params;
    console.log(`Deleting post with slug: ${slug}`);
    
    const index = (await readJsonFromS3('index.json')) || [];
    const found = index.find((p) => p.slug === slug);
    if (!found) {
      console.log(`Post not found in index: ${slug}`);
      return res.status(404).json({ error: 'not_found' });
    }
    
    console.log(`Found post in index:`, found);
    const existingPath = found.path.replace(/^\/cdn\//, '/');
    console.log(`Deleting from path: ${existingPath}`);
    
    await deletePrefix(existingPath);
    console.log(`Successfully deleted files from S3`);
    
    const nextIndex = index.filter((p) => p.slug !== slug);
    await writeJsonToS3('index.json', nextIndex, 'no-cache');
    console.log(`Updated index.json, removed post from index`);
    
    await invalidatePaths([`/${existingPath}post.json`, `/${existingPath}body.md`, `/${existingPath}post.html`, '/index.json']);
    console.log(`Invalidated CDN paths`);
    
    res.json({ ok: true });
  } catch (e) {
    console.error('Delete post error:', e);
    res.status(500).json({ error: 'delete_post_failed', detail: String(e) });
  }
});

app.post('/api/admin/reindex', requireAdmin, async (_req, res) => {
  try {
    // Minimal reindex: just return current index
    const index = (await readJsonFromS3('index.json')) || [];
    await writeJsonToS3('index.json', index, 'no-cache');
    await invalidatePaths(['/index.json']);
    res.json({ ok: true, count: index.length });
  } catch (e) {
    res.status(500).json({ error: 'reindex_failed', detail: String(e) });
  }
});

// List posts for admin (summaries from index.json)
app.get('/api/admin/posts', requireAdmin, async (_req, res) => {
  try {
    const index = (await readJsonFromS3('index.json')) || [];
    res.json(index);
  } catch (e) {
    res.status(500).json({ error: 'list_failed', detail: String(e) });
  }
});

// Fetch a single post by slug (meta + body)
app.get('/api/admin/posts/:slug', requireAdmin, async (req, res) => {
  try {
    const { slug } = req.params;
    const index = (await readJsonFromS3('index.json')) || [];
    const entry = index.find(p => p.slug === slug);
    if (!entry) return res.status(404).json({ error: 'not_found' });
    const base = (entry.path || '').replace(/^\/cdn\//, '').replace(/\/?$/, '/');
    const meta = await readJsonFromS3(`${base}post.json`);
    if (!meta) return res.status(404).json({ error: 'meta_not_found' });
    // Prefer markdown body; fallback to html
    let bodyText = '';
    try {
      const out = await s3.send(new GetObjectCommand({ Bucket: s3Bucket, Key: `${base}body.md` }));
      bodyText = await out.Body.transformToString();
    } catch {
      try {
        const out2 = await s3.send(new GetObjectCommand({ Bucket: s3Bucket, Key: `${base}post.html` }));
        bodyText = await out2.Body.transformToString();
      } catch {}
    }
    res.json({ meta, body: bodyText, path: base });
  } catch (e) {
    res.status(500).json({ error: 'fetch_failed', detail: String(e) });
  }
});

// Dev debug: list bucket prefix
app.get('/api/debug/s3', async (req, res) => {
  try {
    if (!s3Bucket) {
      return res.status(400).json({ error: 'config_missing', detail: 'S3_BLOG_BUCKET not configured' });
    }
    const prefix = (req.query.prefix || '').toString();
    const out = await s3.send(new ListObjectsV2Command({ Bucket: s3Bucket, Prefix: prefix, MaxKeys: 50 }));
    res.json({ ok: true, keys: out.Contents?.map(o => o.Key) || [] });
  } catch (e) {
    res.status(500).json({ error: 's3_list_failed', detail: String(e) });
  }
});

// ---------- Auth endpoints (username/password via Cognito) ----------
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'username and password required' });
    const clientId = process.env.COGNITO_AUDIENCE; // app client id
    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    const cmd = new AdminInitiateAuthCommand({
      UserPoolId: userPoolId,
      ClientId: clientId,
      AuthFlow: 'ADMIN_USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password
      }
    });
    const out = await cognito.send(cmd);
    if (out.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
      return res.status(200).json({ challenge: 'NEW_PASSWORD_REQUIRED', session: out.Session, username });
    }
    const idToken = out.AuthenticationResult?.IdToken;
    if (!idToken) return res.status(401).json({ error: 'login_failed' });
    const secure = Boolean(process.env.NODE_ENV === 'production');
    res.cookie('hh6_id_token', idToken, { httpOnly: true, sameSite: 'lax', secure, maxAge: 1000 * 60 * 60 });
    res.json({ ok: true });
  } catch (e) {
    res.status(401).json({ error: 'login_failed', detail: String(e) });
  }
});

app.post('/api/auth/complete-new-password', async (req, res) => {
  try {
    const { username, newPassword, session } = req.body || {};
    if (!username || !newPassword || !session) return res.status(400).json({ error: 'username, newPassword and session required' });
    const clientId = process.env.COGNITO_AUDIENCE;
    const userPoolId = process.env.COGNITO_USER_POOL_ID;
    const cmd = new AdminRespondToAuthChallengeCommand({
      UserPoolId: userPoolId,
      ClientId: clientId,
      ChallengeName: 'NEW_PASSWORD_REQUIRED',
      Session: session,
      ChallengeResponses: {
        USERNAME: username,
        NEW_PASSWORD: newPassword
      }
    });
    const out = await cognito.send(cmd);
    const idToken = out.AuthenticationResult?.IdToken;
    if (!idToken) return res.status(401).json({ error: 'complete_failed' });
    const secure = Boolean(process.env.NODE_ENV === 'production');
    res.cookie('hh6_id_token', idToken, { httpOnly: true, sameSite: 'lax', secure, maxAge: 1000 * 60 * 60 });
    res.json({ ok: true });
  } catch (e) {
    res.status(401).json({ error: 'complete_failed', detail: String(e) });
  }
});

app.post('/api/auth/logout', (_req, res) => {
  const secure = Boolean(process.env.NODE_ENV === 'production');
  res.clearCookie('hh6_id_token', { httpOnly: true, sameSite: 'lax', secure });
  res.json({ ok: true });
});

// ---------- Contact Form Endpoints ----------
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, message, source = 'contact-page' } = req.body;
    
    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    
    // Create inquiry record
    const timestamp = Date.now();
    const inquiry = {
      id: `inquiry_${timestamp}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(timestamp).toISOString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : '',
      message: message.trim(),
      source: source,
      status: 'new',
      ipAddress: req.ip || req.connection.remoteAddress || '',
      userAgent: req.headers['user-agent'] || ''
    };
    
    // Save to DynamoDB
    await dynamoDb.send(new PutItemCommand({
      TableName: contactTableName,
      Item: marshall(inquiry)
    }));
    
    res.json({ 
      success: true, 
      message: 'Thank you for your message! We\'ll get back to you soon.',
      inquiryId: inquiry.id 
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to submit inquiry. Please try again.' });
  }
});

// ---------- Admin Contact Endpoints ----------
app.get('/api/admin/inquiries', requireAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum;
    
    // Build scan parameters
    let scanParams = {
      TableName: contactTableName,
      Limit: limitNum
    };
    
    // Add status filter if provided
    if (status && status !== 'all') {
      scanParams.FilterExpression = '#status = :status';
      scanParams.ExpressionAttributeNames = { '#status': 'status' };
      scanParams.ExpressionAttributeValues = marshall({ ':status': status });
    }
    
    // Add search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      scanParams.FilterExpression = scanParams.FilterExpression 
        ? `${scanParams.FilterExpression} AND (contains(#name, :search) OR contains(#email, :search) OR contains(#message, :search))`
        : '(contains(#name, :search) OR contains(#email, :search) OR contains(#message, :search))';
      scanParams.ExpressionAttributeNames = {
        ...scanParams.ExpressionAttributeNames,
        '#name': 'name',
        '#email': 'email',
        '#message': 'message'
      };
      scanParams.ExpressionAttributeValues = {
        ...scanParams.ExpressionAttributeValues,
        ...marshall({ ':search': searchLower })
      };
    }
    
    // Get total count first
    const countParams = { ...scanParams };
    delete countParams.Limit;
    const countResult = await dynamoDb.send(new ScanCommand(countParams));
    const totalCount = countResult.Count || 0;
    
    // Get paginated results
    const result = await dynamoDb.send(new ScanCommand(scanParams));
    const inquiries = (result.Items || []).map(item => unmarshall(item));
    
    // Sort by creation date (newest first)
    inquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    res.json({
      inquiries,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalCount,
        pages: Math.ceil(totalCount / limitNum)
      }
    });
    
  } catch (error) {
    console.error('Get inquiries error:', error);
    res.status(500).json({ error: 'Failed to fetch inquiries' });
  }
});

app.get('/api/admin/inquiries/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Extract timestamp from ID for the sort key
    const timestamp = id.split('_')[1];
    const createdAt = timestamp ? new Date(parseInt(timestamp)).toISOString() : new Date().toISOString();
    
    const result = await dynamoDb.send(new GetItemCommand({
      TableName: contactTableName,
      Key: marshall({ id, createdAt })
    }));
    
    if (!result.Item) {
      return res.status(404).json({ error: 'Inquiry not found' });
    }
    
    res.json(unmarshall(result.Item));
    
  } catch (error) {
    console.error('Get inquiry error:', error);
    res.status(500).json({ error: 'Failed to fetch inquiry' });
  }
});

app.put('/api/admin/inquiries/:id/status', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['new', 'read', 'replied', 'archived'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    
    // Extract timestamp from ID for the sort key
    const timestamp = id.split('_')[1];
    const createdAt = timestamp ? new Date(parseInt(timestamp)).toISOString() : new Date().toISOString();
    
    await dynamoDb.send(new UpdateItemCommand({
      TableName: contactTableName,
      Key: marshall({ id, createdAt }),
      UpdateExpression: 'SET #status = :status, #updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status',
        '#updatedAt': 'updatedAt'
      },
      ExpressionAttributeValues: marshall({
        ':status': status,
        ':updatedAt': new Date().toISOString()
      })
    }));
    
    res.json({ success: true, status });
    
  } catch (error) {
    console.error('Update inquiry status error:', error);
    res.status(500).json({ error: 'Failed to update inquiry status' });
  }
});

app.delete('/api/admin/inquiries/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Extract timestamp from ID for the sort key
    const timestamp = id.split('_')[1];
    const createdAt = timestamp ? new Date(parseInt(timestamp)).toISOString() : new Date().toISOString();
    
    await dynamoDb.send(new DeleteItemCommand({
      TableName: contactTableName,
      Key: marshall({ id, createdAt })
    }));
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Delete inquiry error:', error);
    res.status(500).json({ error: 'Failed to delete inquiry' });
  }
});

// --- Serve SPA build for non-API routes (so prerender can fetch HTML) ---
try {
  const distDir = path.join(__dirname, 'dist');
  if (fs.existsSync(distDir)) {
    app.use(express.static(distDir, { index: false }));
    app.get(/^(?!\/api\/).*/, (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }
} catch {}

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not found', path: req.path });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend server listening on http://localhost:${port}`);
});


