#!/usr/bin/env node

import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting HH6 Production Setup...\n');

// Set production environment
process.env.NODE_ENV = 'production';

// Start Next.js frontend
console.log('📦 Starting Next.js frontend on port 3000...');
const nextProcess = spawn('npm', ['run', 'start'], {
  cwd: __dirname,
  stdio: 'pipe',
  shell: true,
  env: { ...process.env, NODE_ENV: 'production' }
});

nextProcess.stdout.on('data', (data) => {
  console.log(`[Next.js] ${data.toString().trim()}`);
});

nextProcess.stderr.on('data', (data) => {
  console.error(`[Next.js Error] ${data.toString().trim()}`);
});

// Wait a moment for Next.js to start, then start the API server
setTimeout(() => {
  console.log('\n🔧 Starting API server on port 8080...');
  const serverProcess = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'server'),
    stdio: 'pipe',
    shell: true,
    env: { ...process.env, NODE_ENV: 'production' }
  });

  serverProcess.stdout.on('data', (data) => {
    console.log(`[API Server] ${data.toString().trim()}`);
  });

  serverProcess.stderr.on('data', (data) => {
    console.error(`[API Server Error] ${data.toString().trim()}`);
  });

  // Handle cleanup
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down services...');
    nextProcess.kill();
    serverProcess.kill();
    process.exit(0);
  });

}, 3000);

console.log('\n✅ Production setup started!');
console.log('🌐 Frontend: http://localhost:3000 (proxied through Express)');
console.log('🔧 API Server: http://localhost:8080');
console.log('🌍 Production URLs will be used when .env.production is present');
console.log('📝 Press Ctrl+C to stop all services\n');
