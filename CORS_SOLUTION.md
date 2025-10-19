# CORS Solution Documentation

## Problem

The SportMonks API does not include CORS headers, which prevents direct browser requests from web applications. When attempting to call the API directly from the frontend, you'll encounter errors like:

```
Access to XMLHttpRequest at 'https://api.sportmonks.com/...' from origin 'http://localhost:5173'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## Solution Overview

We've implemented a **proxy architecture** that works in both development and production:

- **Local Development**: Vite's built-in proxy forwards API requests
- **Production**: Vercel serverless functions act as API proxies

This solution:
- ✅ Eliminates CORS errors
- ✅ Keeps API tokens secure (never exposed to client)
- ✅ Works seamlessly in both environments
- ✅ Maintains simple API usage in frontend code

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     LOCAL DEVELOPMENT                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Browser → /api/leagues → Vite Proxy → SportMonks API      │
│                           (localhost)                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       PRODUCTION                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Browser → /api/leagues → Vercel Function → SportMonks API │
│                           (Edge Network)                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Implementation Details

### 1. Vite Proxy (Development)

**File**: `vite.config.js`

```javascript
server: {
  proxy: {
    '/api/leagues': {
      target: 'https://api.sportmonks.com/v3/football',
      changeOrigin: true,
      rewrite: (path) => `/leagues?api_token=${API_TOKEN}&include=upcoming;country`,
    },
    '/api/fixtures': {
      target: 'https://api.sportmonks.com/v3/football',
      changeOrigin: true,
      rewrite: (path) => {
        const url = new URL(path, 'http://localhost');
        const id = url.searchParams.get('id');
        return `/fixtures/${id}?api_token=${API_TOKEN}&include=...`;
      },
    }
  }
}
```

**How it works:**
1. Frontend makes request to `/api/leagues`
2. Vite intercepts and forwards to SportMonks API
3. Response is returned to frontend
4. Browser never sees CORS headers because request appears same-origin

### 2. Vercel Serverless Functions (Production)

**Files**: `api/leagues.js`, `api/fixtures.js`

```javascript
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Forward request to SportMonks
  const response = await fetch(`https://api.sportmonks.com/...`);
  const data = await response.json();

  // Return data
  return res.json(data);
}
```

**How it works:**
1. Frontend makes request to `/api/leagues`
2. Vercel routes to serverless function
3. Function fetches from SportMonks API (server-side, no CORS)
4. Function returns data with proper CORS headers
5. Browser receives response successfully

### 3. Frontend API Service

**File**: `src/services/sportsmonksApi.js`

```javascript
const apiClient = axios.create({
  baseURL: '/api',
});

export const getLeaguesWithUpcoming = async () => {
  const response = await apiClient.get('/leagues');
  return response.data;
};
```

**Simplicity**: Frontend code is identical for both environments!

## API Endpoints

### `/api/leagues`

**Purpose**: Fetch all leagues with upcoming fixtures

**Request**:
```http
GET /api/leagues
```

**Proxies to**:
```
https://api.sportmonks.com/v3/football/leagues?api_token=XXX&include=upcoming;country
```

**Response**: SportMonks leagues data

### `/api/fixtures`

**Purpose**: Fetch detailed fixture information

**Request**:
```http
GET /api/fixtures?id=19427541
```

**Proxies to**:
```
https://api.sportmonks.com/v3/football/fixtures/19427541?api_token=XXX&include=participants;league;venue;state;scores;events;predictions.type
```

**Response**: SportMonks fixture data

## Environment Variables

The API token is required in both environments:

```env
# .env file (local) or Vercel Environment Variables (production)
VITE_SPORTMONKS_API_TOKEN=your_api_token_here
```

**Local Development**: Loaded by Vite and used in proxy configuration

**Production**: Set in Vercel dashboard and accessed by serverless functions via `process.env`

## Security Benefits

### ✅ Token Protection

The API token is:
- **Local Dev**: Only in `.env` file (not committed to Git)
- **Production**: Only in Vercel environment variables (encrypted)
- **Never exposed to browser**: Token is used server-side only

### ✅ No Client-Side Token

Before (insecure):
```javascript
// Token visible in browser DevTools, network tab, source code
const url = `https://api.sportmonks.com/leagues?api_token=${TOKEN}`;
fetch(url);
```

After (secure):
```javascript
// Token never leaves the server
fetch('/api/leagues');
```

### ✅ Rate Limiting

Proxies can implement rate limiting to prevent abuse.

## Troubleshooting

### Local Development Issues

**Problem**: "ECONNREFUSED" or proxy errors

**Solutions**:
1. Ensure `.env` file exists with `VITE_SPORTMONKS_API_TOKEN`
2. Restart dev server after changing `.env`
3. Check Vite config syntax is correct

**Test**:
```bash
npm run dev
# Open http://localhost:5173
# Check browser DevTools → Network tab
# Should see requests to /api/leagues
```

### Production Issues

**Problem**: 500 error from `/api/leagues`

**Solutions**:
1. Check environment variables in Vercel dashboard
2. Ensure `VITE_SPORTMONKS_API_TOKEN` is set
3. Check Vercel function logs for errors

**Verify in Vercel**:
1. Go to Project → Settings → Environment Variables
2. Confirm `VITE_SPORTMONKS_API_TOKEN` is present
3. Check Project → Deployments → [Latest] → Function Logs

### API Token Issues

**Problem**: 401 Unauthorized or 403 Forbidden

**Solutions**:
1. Verify API token is correct and active
2. Check SportMonks dashboard for token status
3. Ensure token has necessary permissions
4. Try regenerating token if expired

## Testing

### Test Local Development

```bash
# Start dev server
npm run dev

# In another terminal, test API
curl http://localhost:5173/api/leagues

# Should return SportMonks data (not CORS error)
```

### Test Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Note: Vercel functions won't work locally unless using Vercel CLI
```

### Test on Vercel

```bash
# Deploy to preview
vercel

# Test the preview URL
curl https://your-preview-url.vercel.app/api/leagues
```

## Performance

### Vite Proxy (Development)

- **Latency**: Minimal (localhost → SportMonks)
- **Caching**: None (fresh data every request)
- **Best for**: Development and testing

### Vercel Functions (Production)

- **Latency**: ~50-200ms (includes edge function cold start)
- **Edge Network**: Deployed globally for low latency
- **Caching**: Can add with Vercel Edge Caching
- **Scalability**: Auto-scales to millions of requests

## Future Enhancements

### 1. Response Caching

Add caching to reduce API calls:

```javascript
// api/leagues.js
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export default async function handler(req, res) {
  const cacheKey = 'leagues';
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return res.json(cached.data);
  }

  const data = await fetchFromSportMonks();
  cache.set(cacheKey, { data, timestamp: Date.now() });

  return res.json(data);
}
```

### 2. Rate Limiting

Protect your API token:

```javascript
// api/_middleware.js
const rateLimit = new Map();

export default function middleware(req) {
  const ip = req.headers['x-forwarded-for'];
  const requests = rateLimit.get(ip) || [];

  // Allow 60 requests per minute
  const recentRequests = requests.filter(
    time => Date.now() - time < 60000
  );

  if (recentRequests.length >= 60) {
    return new Response('Too many requests', { status: 429 });
  }

  rateLimit.set(ip, [...recentRequests, Date.now()]);
}
```

### 3. Error Handling

Better error responses:

```javascript
try {
  const response = await fetch(sportMonksUrl);

  if (!response.ok) {
    return res.status(response.status).json({
      error: 'SportMonks API error',
      status: response.status,
      message: await response.text()
    });
  }

  return res.json(await response.json());
} catch (error) {
  console.error('Proxy error:', error);
  return res.status(500).json({
    error: 'Proxy error',
    message: error.message
  });
}
```

## Comparison: Direct vs Proxy

| Aspect | Direct API Call | Proxy Solution |
|--------|----------------|----------------|
| CORS Issues | ❌ Yes | ✅ No |
| Token Security | ❌ Exposed | ✅ Protected |
| Browser Compatibility | ❌ Limited | ✅ All browsers |
| Setup Complexity | ✅ Simple | ⚠️ Moderate |
| Performance | ✅ Direct | ⚠️ Extra hop |
| Production Ready | ❌ No | ✅ Yes |

## Summary

The proxy solution:
- ✅ **Solves CORS** completely
- ✅ **Secures API tokens** (never exposed to browser)
- ✅ **Works everywhere** (local dev + production)
- ✅ **Simple to use** (transparent to frontend code)
- ✅ **Production ready** (scalable, reliable)

This is the **industry-standard approach** for handling third-party APIs that don't support CORS.

## Resources

- [MDN: CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [Vite Proxy Configuration](https://vitejs.dev/config/server-options.html#server-proxy)
- [Vercel Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [SportMonks API Documentation](https://docs.sportmonks.com/)
