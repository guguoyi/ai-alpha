const http = require('http');
const https = require('https');
const zlib = require('zlib');

const PORT = 29888;
const TARGET_HOST = 'claude-relay.xxx.com';
const TARGET_PATH = '/api';

const server = http.createServer((req, res) => {
  console.log('\n=== Incoming Request ===');
  console.log(`Time: ${new Date().toISOString()}`);
  console.log(`Method: ${req.method}`);
  console.log(`URL: ${req.url}`);
  console.log(`Headers:`, JSON.stringify(req.headers, null, 2));

  // Collect request body for logging
  let requestBody = '';
  req.on('data', (chunk) => {
    requestBody += chunk.toString();
  });

  req.on('end', () => {
    console.log('\n=== Request Body ===');
    try {
      const bodyJson = JSON.parse(requestBody);
      console.log(JSON.stringify(bodyJson, null, 2));
    } catch (e) {
      console.log(requestBody); // Log raw if not JSON
    }

    // Append incoming path to target: /v1/messages -> /api/v1/messages
    const targetPath = TARGET_PATH + req.url;

    // Prepare headers - remove problematic headers
    const forwardHeaders = { ...req.headers };
    delete forwardHeaders['host'];
    delete forwardHeaders['connection'];
    delete forwardHeaders['accept-encoding']; // Remove to avoid compression issues

    // Ensure Content-Type is set
    if (!forwardHeaders['content-type']) {
      forwardHeaders['content-type'] = 'application/json';
    }

    const options = {
      hostname: TARGET_HOST,
      path: targetPath,
      method: req.method,
      headers: {
        ...forwardHeaders,
        'host': TARGET_HOST,
        'connection': 'close',
        'content-length': Buffer.byteLength(requestBody)
      }
    };

    console.log('\n=== Forwarding To ===');
    console.log(`Target: https://${TARGET_HOST}${targetPath}`);
    console.log(`Forwarded Headers:`, JSON.stringify(options.headers, null, 2));

    const proxyReq = https.request(options, (proxyRes) => {
    console.log('\n=== Response Received ===');
    console.log(`Status: ${proxyRes.statusCode}`);
    console.log(`Response Headers:`, JSON.stringify(proxyRes.headers, null, 2));

    // Prepare response headers - remove problematic headers
    const responseHeaders = { ...proxyRes.headers };
    delete responseHeaders['content-encoding']; // Remove compression header
    delete responseHeaders['connection'];

    // Keep transfer-encoding for streaming responses
    // delete responseHeaders['transfer-encoding'];

    // Check if this is a streaming response
    const isStream = proxyRes.headers['content-type']?.includes('text/event-stream') ||
                     proxyRes.headers['content-type']?.includes('application/stream+json');

    if (isStream) {
      console.log('Detected streaming response (SSE)');
      console.log('\n=== Streaming Response Content ===');
      
      // For SSE, we need to disable buffering
      res.writeHead(proxyRes.statusCode, responseHeaders);

      // Handle decompression if needed
      let responseStream = proxyRes;
      const encoding = proxyRes.headers['content-encoding'];

      if (encoding === 'br') {
        console.log('Decompressing Brotli stream...');
        responseStream = proxyRes.pipe(zlib.createBrotliDecompress());
      } else if (encoding === 'gzip') {
        console.log('Decompressing Gzip stream...');
        responseStream = proxyRes.pipe(zlib.createGunzip());
      } else if (encoding === 'deflate') {
        console.log('Decompressing Deflate stream...');
        responseStream = proxyRes.pipe(zlib.createInflate());
      }

      // Log and forward each chunk
      responseStream.on('data', (chunk) => {
        const chunkStr = chunk.toString('utf8');
        console.log(chunkStr);
        res.write(chunk);
      });

      responseStream.on('end', () => {
        console.log('\n=== Stream Ended ===');
        res.end();
      });

      responseStream.on('error', (err) => {
        console.error('\n=== Response Stream Error ===');
        console.error(`Error: ${err.message}`);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
        }
        res.end();
      });
    } else {
      // Non-streaming response - collect body for logging
      const responseChunks = [];

      res.writeHead(proxyRes.statusCode, responseHeaders);

      let responseStream = proxyRes;
      const encoding = proxyRes.headers['content-encoding'];

      if (encoding === 'br') {
        console.log('Decompressing Brotli response...');
        responseStream = proxyRes.pipe(zlib.createBrotliDecompress());
      } else if (encoding === 'gzip') {
        console.log('Decompressing Gzip response...');
        responseStream = proxyRes.pipe(zlib.createGunzip());
      } else if (encoding === 'deflate') {
        console.log('Decompressing Deflate response...');
        responseStream = proxyRes.pipe(zlib.createInflate());
      }

      // Collect response body for logging using Buffer
      responseStream.on('data', (chunk) => {
        responseChunks.push(chunk);
        res.write(chunk);
      });

      responseStream.on('end', () => {
        console.log('\n=== Response Body ===');
        const responseBody = Buffer.concat(responseChunks).toString('utf8');
        try {
          const bodyJson = JSON.parse(responseBody);
          console.log(JSON.stringify(bodyJson, null, 2));
        } catch (e) {
          console.log(responseBody.substring(0, 2000)); // Log first 2000 chars if not JSON
        }
        res.end();
      });

      responseStream.on('error', (err) => {
        console.error('\n=== Response Stream Error ===');
        console.error(`Error: ${err.message}`);
        if (!res.headersSent) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
        }
        res.end();
      });
    }
  });

  proxyReq.on('error', (err) => {
    console.error('\n=== Proxy Error ===');
    console.error(`Error: ${err.message}`);
    console.error(`Stack:`, err.stack);
    if (!res.headersSent) {
      res.writeHead(502, { 'Content-Type': 'text/plain' });
    }
    res.end('Bad Gateway');
  });

  // Write the request body
  if (requestBody) {
    proxyReq.write(requestBody);
  }
  proxyReq.end();
});

req.on('error', (err) => {
  console.error('\n=== Request Error ===');
  console.error(`Error: ${err.message}`);
  if (!res.headersSent) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
  }
  res.end('Internal Server Error');
});
});

server.listen(PORT, 'localhost', () => {
  console.log(`Claude Relay Proxy running on http://localhost:${PORT}`);
  console.log(`Forwarding all requests to https://${TARGET_HOST}${TARGET_PATH}`);
});
