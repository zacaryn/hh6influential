import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  
  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' });
  }

  try {
    // Construct full URL - use correct port for development
    const isDevelopment = process.env.NODE_ENV === 'development';
    const baseUrl = isDevelopment ? 'http://localhost:5173' : (process.env.NEXT_PUBLIC_SITE_URL || 'https://hh6influential.com');
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
    
    // Fetch the page content
    const response = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
      }
    });

    if (!response.ok) {
      return NextResponse.json({ 
        error: `Failed to fetch: ${response.status} ${response.statusText}`,
        status: response.status
      });
    }

    const html = await response.text();
    
    // Extract basic SEO information
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const descriptionMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const keywordsMatch = html.match(/<meta[^>]*name=["']keywords["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    
    // Extract structured data
    const schemaMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/gis);
    const structuredData = schemaMatches ? schemaMatches.map(match => {
      try {
        const jsonMatch = match.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is);
        return JSON.parse(jsonMatch[1]);
      } catch {
        return null;
      }
    }).filter(Boolean) : [];

    // Extract Open Graph data
    const ogTitleMatch = html.match(/<meta[^>]*property=["']og:title["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const ogDescriptionMatch = html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']*)["'][^>]*>/i);

    // Extract FAQ data if present
    const faqMatches = html.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>.*?"@type":\s*"FAQPage".*?<\/script>/gis);
    const faqData = faqMatches ? faqMatches.map(match => {
      try {
        const jsonMatch = match.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>(.*?)<\/script>/is);
        const parsed = JSON.parse(jsonMatch[1]);
        return parsed['@type'] === 'FAQPage' ? parsed : null;
      } catch {
        return null;
      }
    }).filter(Boolean) : [];

    // Extract headings
    const h1Matches = html.match(/<h1[^>]*>(.*?)<\/h1>/gis);
    const h2Matches = html.match(/<h2[^>]*>(.*?)<\/h2>/gis);
    const h3Matches = html.match(/<h3[^>]*>(.*?)<\/h3>/gis);

    return NextResponse.json({
      url: fullUrl,
      status: response.status,
      headers: Object.fromEntries(response.headers.entries()),
      seo: {
        title: titleMatch ? titleMatch[1] : null,
        description: descriptionMatch ? descriptionMatch[1] : null,
        keywords: keywordsMatch ? keywordsMatch[1] : null,
        openGraph: {
          title: ogTitleMatch ? ogTitleMatch[1] : null,
          description: ogDescriptionMatch ? ogDescriptionMatch[1] : null,
          image: ogImageMatch ? ogImageMatch[1] : null,
        }
      },
      structuredData: {
        count: structuredData.length,
        schemas: structuredData.map(data => data['@type'] || 'Unknown'),
        data: structuredData
      },
      faqData: {
        count: faqData.length,
        questions: faqData.length > 0 ? faqData[0].mainEntity?.map(item => item.name) : []
      },
      headings: {
        h1: h1Matches ? h1Matches.map(h => h.replace(/<[^>]*>/g, '').trim()) : [],
        h2: h2Matches ? h2Matches.map(h => h.replace(/<[^>]*>/g, '').trim()) : [],
        h3: h3Matches ? h3Matches.map(h => h.replace(/<[^>]*>/g, '').trim()) : []
      },
      contentLength: html.length,
      hasCanonical: html.includes('rel="canonical"'),
      hasRobots: html.includes('name="robots"'),
      hasSitemap: html.includes('sitemap.xml'),
    });

  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to analyze page',
      details: error.message 
    });
  }
}
