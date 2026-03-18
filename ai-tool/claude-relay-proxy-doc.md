# Claude Relay Proxy Documentation

## Overview

`claude-relay-proxy.js` is a Node.js HTTP proxy server that forwards Claude API requests to a relay server. It provides detailed logging of all requests and responses, supports both streaming (SSE) and non-streaming responses, and handles various compression formats.

## Features

- **Request Forwarding**: Proxies HTTP requests to a target Claude relay server
- **Detailed Logging**: Logs all incoming requests, forwarded requests, and responses with timestamps
- **Streaming Support**: Handles Server-Sent Events (SSE) for streaming responses
- **Compression Handling**: Automatically decompresses Brotli, Gzip, and Deflate encoded responses
- **Error Handling**: Comprehensive error handling for network and stream errors

## Configuration

Edit the following constants at the top of the file:

```javascript
const PORT = 29888;                        // Local proxy port
const TARGET_HOST = 'claude-relay.xxx.com'; // Target relay server hostname
const TARGET_PATH = '/api';                 // Base path on target server
```

### Configuration Parameters

- **PORT**: The local port where the proxy server listens (default: `29888`)
- **TARGET_HOST**: The hostname of the Claude relay server you want to forward requests to
- **TARGET_PATH**: The base path that will be prepended to all incoming requests

## Installation

1. Ensure you have Node.js installed (version 12 or higher)
2. No additional npm packages are required - uses only Node.js built-in modules

## Usage

### Starting the Proxy

```bash
node claude-relay-proxy.js
```

You should see:
```
Claude Relay Proxy running on http://localhost:29888/v1
Forwarding all requests to https://claude-relay.xxx.com/api/v1
```

### OpenCode Config

```yaml
// use proxy could view opencode request and claude relay server response details
// you can see log detail like claude-relay-proxy.log
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "npm": "@ai-sdk/anthropic",
      "name": "Claude Relay Service",
      "options": {
        "baseURL": "http://localhost:29888/v1",
        "apiKey": "your-api-key"
      }
    }
  }
}

// not use proxy
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "anthropic": {
      "npm": "@ai-sdk/anthropic",
      "name": "Claude Relay Service",
      "options": {
        "baseURL": "https://claude-relay.xxx.com/api/v1",
        "apiKey": "your-api-key"
      }
    }
  }
}
```

<img width="1075" height="645" alt="image" src="https://github.com/user-attachments/assets/ec0225af-e2f2-436f-b6c9-77547c89697d" />
<img width="567" height="261" alt="image" src="https://github.com/user-attachments/assets/2ea07a2d-2fb6-4917-89c3-faa1cd64e3ee" />


### Making Requests Through the Proxy

Point your Claude API client to `http://localhost:29888` instead of the direct API endpoint.

**Example with curl:**

```bash
curl -X POST http://localhost:29888/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-api-key" \
  -d '{
    "model": "claude-3-5-sonnet-20241022",
    "max_tokens": 1024,
    "messages": [
      {"role": "user", "content": "Hello, Claude!"}
    ]
  }'
```

This request will be forwarded to: `https://claude-relay.xxx.com/api/v1/messages`

**Example with Node.js:**

```javascript
const response = await fetch('http://localhost:29888/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'your-api-key'
  },
  body: JSON.stringify({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: 'Hello, Claude!' }
    ]
  })
});
```

## How It Works

### Request Flow

1. **Incoming Request**: Client sends request to `http://localhost:29888/v1/messages`
2. **Path Mapping**: Proxy appends the request path to `TARGET_PATH`
   - Example: `/v1/messages` → `/api/v1/messages`
3. **Header Processing**: 
   - Removes problematic headers (`host`, `connection`, `accept-encoding`)
   - Sets appropriate headers for the target server
   - Preserves authentication headers (like `x-api-key`)
4. **Forwarding**: Sends HTTPS request to `https://claude-relay.xxx.com/api/v1/messages`
5. **Response Handling**:
   - Detects streaming vs non-streaming responses
   - Decompresses response if needed
   - Forwards response back to client

### Logging Output

The proxy logs detailed information for debugging:

```
=== Incoming Request ===
Time: 2026-02-13T10:30:45.123Z
Method: POST
URL: /v1/messages
Headers: { ... }

=== Request Body ===
{ "model": "claude-3-5-sonnet-20241022", ... }

=== Forwarding To ===
Target: https://claude-relay.xxx.com/api/v1/messages
Forwarded Headers: { ... }

=== Response Received ===
Status: 200
Response Headers: { ... }

=== Response Body ===
{ "id": "msg_123", "content": [...] }
```

## Streaming Support

The proxy automatically detects streaming responses by checking the `Content-Type` header for:
- `text/event-stream`
- `application/stream+json`

When streaming is detected, the proxy:
- Disables response buffering
- Pipes the response directly to the client
- Maintains real-time data flow for SSE events

## Compression Handling

The proxy automatically handles compressed responses:
- **Brotli** (`br`)
- **Gzip** (`gzip`)
- **Deflate** (`deflate`)

Decompression is transparent to the client - responses are always returned uncompressed.

## Error Handling

### Proxy Errors (502 Bad Gateway)
- Network connection failures
- DNS resolution errors
- Target server unreachable

### Stream Errors (500 Internal Server Error)
- Decompression failures
- Stream interruptions
- Invalid response data

All errors are logged to the console with detailed error messages and stack traces.

## Use Cases

1. **Debugging**: Monitor all API requests and responses in real-time
2. **Development**: Test API integrations locally without modifying application code
3. **Relay Access**: Access Claude API through a relay server for network routing
4. **Request Inspection**: Analyze request/response payloads for troubleshooting

## Limitations

- Only supports HTTP/HTTPS protocols
- No authentication on the proxy itself (relies on forwarded API keys)
- No request caching
- No rate limiting
- Logs may contain sensitive data (API keys, request content)

## Security Considerations

⚠️ **Important Security Notes:**

- The proxy logs all request and response data, including API keys
- Runs on `localhost` only - not exposed to external networks
- No built-in authentication - anyone with local access can use it
- Suitable for development/debugging only, not production use

## Troubleshooting

### Proxy won't start
- Check if port 29888 is already in use: `lsof -i :29888`
- Change the `PORT` constant to a different port

### Connection refused
- Verify `TARGET_HOST` is correct and accessible
- Check your network connection
- Ensure the relay server is running

### Streaming not working
- Check console logs for "Detected streaming response"
- Verify the response `Content-Type` header
- Ensure client supports SSE/streaming

### Decompression errors
- Check console logs for compression type
- Verify the response is properly encoded
- May indicate corrupted response data

## Advanced Configuration

### Custom Headers

To add custom headers to all forwarded requests, modify the `options.headers` object:

```javascript
headers: {
  ...forwardHeaders,
  'host': TARGET_HOST,
  'connection': 'close',
  'content-length': Buffer.byteLength(requestBody),
  'X-Custom-Header': 'your-value'  // Add custom headers here
}
```

### Timeout Configuration

Add timeout handling to prevent hanging connections:

```javascript
const proxyReq = https.request(options, (proxyRes) => {
  // ... existing code
});

proxyReq.setTimeout(30000, () => {  // 30 second timeout
  proxyReq.destroy();
  res.writeHead(504, { 'Content-Type': 'text/plain' });
  res.end('Gateway Timeout');
});
```

## License

This is a utility script for development and debugging purposes.



