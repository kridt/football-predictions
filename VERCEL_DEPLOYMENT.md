# Vercel Deployment Guide

This guide will walk you through deploying your SportMonks Prediction app to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier works great)
- Your SportMonks API token
- Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Methods

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository**
   ```bash
   cd C:\Users\chrni\Desktop\projects\evbetting\sportsmonk-prediction
   git init
   git add .
   git commit -m "Initial commit: SportMonks Prediction App"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git provider (GitHub/GitLab/Bitbucket)
   - Import your repository

3. **Configure Environment Variables**
   - In the "Configure Project" step, click "Environment Variables"
   - Add the following variable:

     | Name | Value |
     |------|-------|
     | `VITE_SPORTMONKS_API_TOKEN` | `gtKK5Y96ZI5usuGb1PRSgvPGmds3kLQe3HJyLePZYUCWcKrppBAiTqgoqWGm` |

   **Important**: This token is used by Vercel serverless functions to proxy API requests (solving CORS issues)

4. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 1-2 minutes)
   - Your app will be live at `https://your-app-name.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   cd C:\Users\chrni\Desktop\projects\evbetting\sportsmonk-prediction
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - What's your project's name? `sportsmonk-prediction`
   - In which directory is your code located? `./`
   - Want to override the settings? **N**

5. **Add Environment Variables**
   ```bash
   vercel env add VITE_SPORTMONKS_API_TOKEN
   # Paste: gtKK5Y96ZI5usuGb1PRSgvPGmds3kLQe3HJyLePZYUCWcKrppBAiTqgoqWGm
   ```

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment

### Verify Deployment

1. Visit your deployed URL
2. Check that the landing page loads
3. Verify that fixtures are displayed
4. Click on a fixture to test the match details page
5. Confirm predictions and odds are showing correctly

### Custom Domain (Optional)

1. Go to your project in the Vercel dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow the DNS configuration instructions

### Environment Variables Management

To update environment variables after deployment:

1. **Via Dashboard:**
   - Go to your project on Vercel
   - Click "Settings" → "Environment Variables"
   - Edit or add new variables
   - Redeploy for changes to take effect

2. **Via CLI:**
   ```bash
   vercel env add VARIABLE_NAME
   vercel env rm VARIABLE_NAME
   vercel env ls
   ```

## Automatic Deployments

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches
- **Preview**: Every pull request

## Troubleshooting

### Build Fails

**Error: "VITE_SPORTMONKS_API_TOKEN is not defined"**
- Solution: Add the environment variable in Vercel dashboard
- Navigate to: Project Settings → Environment Variables

**Error: "Build exceeded time limit"**
- Solution: This is rare for Vite projects. Contact Vercel support if persistent

### Runtime Errors

**Error: "Failed to fetch leagues"**
- Check that environment variables are set correctly
- Verify your SportMonks API token is valid
- Check API token has correct permissions

**404 Errors on Routes**
- The `vercel.json` is configured to handle SPA routing
- If issues persist, verify `vercel.json` is in the root directory

### Performance Optimization

1. **Enable Edge Caching**
   - Already configured via `vercel.json`

2. **Analytics** (Optional)
   ```bash
   npm install @vercel/analytics
   ```

   Then add to `src/main.jsx`:
   ```javascript
   import { inject } from '@vercel/analytics';
   inject();
   ```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SPORTMONKS_API_TOKEN` | Your SportMonks API token (used by proxy functions) | Yes |

**Note**: The app uses a proxy architecture to solve CORS issues. The API token is only used server-side by Vite proxy (development) and Vercel functions (production). See [CORS_SOLUTION.md](./CORS_SOLUTION.md) for details.

## Build Configuration

The project uses the following build configuration (in `vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Monitoring

### View Logs

1. **Via Dashboard:**
   - Go to your project
   - Click "Deployments"
   - Select a deployment
   - View "Build Logs" and "Function Logs"

2. **Via CLI:**
   ```bash
   vercel logs <deployment-url>
   ```

### View Analytics

- Go to your project on Vercel
- Click "Analytics" tab
- View page views, performance metrics, etc.

## Rollback

To rollback to a previous deployment:

1. Go to "Deployments" in Vercel dashboard
2. Find the deployment you want to rollback to
3. Click the three dots menu
4. Select "Promote to Production"

## Cost

This app fits comfortably in Vercel's **free tier**:
- Unlimited deployments
- Automatic HTTPS
- Automatic CI/CD
- Global CDN
- Edge Network

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [SportMonks API Documentation](https://docs.sportmonks.com/)

## Support

If you encounter issues:
1. Check [Vercel Status](https://www.vercel-status.com/)
2. Visit [Vercel Discussions](https://github.com/vercel/vercel/discussions)
3. Contact [Vercel Support](https://vercel.com/support)

---

Your app is now deployed and ready for the world! 🚀
