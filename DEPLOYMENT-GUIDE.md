# Simple Railway Deployment Guide

## Overview

This is a simple Next.js avatar solution that can be deployed directly to Railway from the main branch.

## Quick Railway Deployment

### 1. Prerequisites
- A Railway account ([railway.app](https://railway.app))
- Your environment variables (see below)

### 2. Deploy to Railway

1. **Connect Repository**:
   - Go to [Railway](https://railway.app)
   - Click "New Project"
   - Connect your GitHub repository
   - Select the `main` branch

2. **Environment Variables**:
   Set these in your Railway project settings:
   ```
   HEYGEN_API_KEY=your_heygen_api_key_here
   OPENAI_API_KEY=your_openai_api_key_here (optional)
   NEXT_PUBLIC_BASE_API_URL=https://api.heygen.com
   ```

3. **Deploy**:
   - Railway will automatically detect this as a Next.js project
   - Build command: `npm run build`
   - Start command: `npm start`
   - Auto-deploy is enabled by default

### 3. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Your app will be available at `http://localhost:3000` (or the next available port).

## Environment Variables

Create a `.env.local` file in your project root:

```env
HEYGEN_API_KEY=your_heygen_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_BASE_API_URL=https://api.heygen.com
```

## Features

This avatar solution includes:

- **6 Available Avatars**: Graham, Ann, Shawn, Bryan, Dexter, and Elenora
- **Voice Chat**: Real-time voice interaction with avatars
- **Text Chat**: Text-based conversation
- **OpenAI Integration**: Enhanced conversation capabilities (optional)
- **Responsive Design**: Works on desktop and mobile

## Troubleshooting

### Build Issues
If you encounter build issues on Railway:
1. Check that all environment variables are set
2. Ensure your `package.json` has the correct scripts
3. Check the Railway build logs for specific errors

### API Issues
- Verify your HeyGen API key is valid
- Check that `NEXT_PUBLIC_BASE_API_URL` is set correctly
- OpenAI integration is optional - the app works without it

### Local Development Issues
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Restart development server
npm run dev
```

## Support

For issues with:
- **HeyGen API**: Check your API key and usage limits
- **Railway Deployment**: Check Railway documentation
- **This App**: Check the logs in Railway dashboard

That's it! Your avatar solution should now be running on Railway. 🚀 