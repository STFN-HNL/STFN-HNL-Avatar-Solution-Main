# Multi-App Deployment Guide

## Overview

This project now supports a multi-app workflow with separate environments for:
- **Development** (`main` branch): Full feature set for development
- **Client Production** (`client-production` branch): Production environment for client
- **Demo Telecom** (`demo-telecom` branch): Telecom-focused demo
- **Demo 2** (`demo-2` branch): Business-focused demo (voice-only)

## Initial Setup

### 1. Setup Branches
```bash
# Make scripts executable
chmod +x scripts/*.sh

# Create all deployment branches
npm run setup:branches
```

### 2. Configure Railway Deployments

Create 3 separate Railway projects (or use existing ones) and connect each to a specific branch:

- **Project 1** → `client-production` branch
- **Project 2** → `demo-telecom` branch  
- **Project 3** → `demo-2` branch

### 3. Environment Variables Per Deployment

**Client Production Environment:**
```
DEPLOYMENT_ENV=client-production
NODE_ENV=production
HEYGEN_API_KEY=<your_production_key>
OPENAI_API_KEY=<your_openai_key>
NEXT_PUBLIC_BASE_API_URL=https://api.heygen.com
```

**Demo Telecom Environment:**
```
DEPLOYMENT_ENV=demo-telecom
NODE_ENV=production
HEYGEN_API_KEY=<your_demo_key>
NEXT_PUBLIC_BASE_API_URL=https://api.heygen.com
```

**Demo 2 Environment:**
```
DEPLOYMENT_ENV=demo-2
NODE_ENV=production
HEYGEN_API_KEY=<your_demo_key>
NEXT_PUBLIC_BASE_API_URL=https://api.heygen.com
```

## Daily Workflow

### Development
```bash
# Work on main branch for new features
git checkout main
git pull origin main

# Make changes...
git add .
git commit -m "Add new feature"
git push origin main
```

### Deployment
```bash
# Deploy to specific environment
npm run deploy:client
npm run deploy:demo-telecom
npm run deploy:demo-2

# Or deploy to all environments at once
npm run deploy:all
```

### Environment Validation
```bash
# Check if all environment variables are set correctly
npm run env:check
```

## Environment Differences

| Feature | Development | Client Production | Demo Telecom | Demo 2 |
|---------|-------------|-------------------|--------------|--------|
| **Avatars** | All 5 public avatars | Dr. Dexter + Ann (Professional) | Elena + Bryan (Tech) | Ann + Shawn (Business) |
| **OpenAI Integration** | ✅ Enabled | ✅ Enabled | ❌ Disabled | ❌ Disabled |
| **Analytics** | ❌ Disabled | ✅ Enabled | ❌ Disabled | ❌ Disabled |
| **Text Chat** | ✅ Enabled | ✅ Enabled | ✅ Enabled | ❌ **Disabled** |
| **Voice Chat** | ✅ Enabled | ✅ Enabled | ✅ Enabled | ✅ Enabled |
| **Session Limit** | None | 30 minutes | 15 minutes | 10 minutes |
| **Message Limit** | None | 50 messages | 25 messages | 20 messages |
| **Navigation** | Full dev menu | Limited production | Limited demo | Limited demo |
| **Branding** | Dev indicators | Professional theme | Telecom theme | Business theme |

## File Structure

```
avatar-solution-main/
├── app/lib/
│   ├── environments.ts          # Environment configurations
│   ├── environment-utils.ts     # Environment utility functions
│   └── constants.ts            # Environment-aware constants
├── scripts/
│   ├── deploy.sh               # Deployment script
│   ├── setup-branches.sh       # Branch setup script
│   └── check-env.js            # Environment validation
├── .railway/
│   ├── client-production.toml   # Railway config for client
│   ├── demo-telecom.toml       # Railway config for telecom demo
│   └── demo-2.toml             # Railway config for demo 2
└── DEPLOYMENT-GUIDE.md         # This guide
```

## Troubleshooting

### 1. Branch Merge Conflicts
```bash
git checkout <problematic-branch>
git merge main
# Resolve conflicts manually in your editor
git add .
git commit
git push
```

### 2. Rollback Deployment
```bash
git checkout <branch>
git reset --hard <last-working-commit>
git push --force-with-lease
```

### 3. Environment Issues
```bash
# Check environment configuration
npm run env:check

# Test locally with specific environment
DEPLOYMENT_ENV=demo-telecom npm run dev
```

### 4. Script Permissions
```bash
# If scripts aren't executable
chmod +x scripts/*.sh
```

## Advanced Usage

### Cherry-pick Specific Features
```bash
# Deploy only specific commits to a branch
git checkout demo-telecom
git cherry-pick <commit-hash>
git push
```

### Branch-specific Customizations
```bash
# Make branch-specific changes
git checkout client-production
# Edit files specifically for this environment
git add .
git commit -m "Client-specific customization"
git push
```

### Testing Different Environments Locally
```bash
# Test each environment locally
DEPLOYMENT_ENV=development npm run dev
DEPLOYMENT_ENV=client-production npm run dev
DEPLOYMENT_ENV=demo-telecom npm run dev
DEPLOYMENT_ENV=demo-2 npm run dev
```

## Railway Configuration

Each Railway deployment should be configured with:

1. **Source**: Connect to the specific branch
2. **Build**: Uses nixpacks (automatic detection)
3. **Start Command**: `npm start`
4. **Environment Variables**: As specified above
5. **Auto-deploy**: Enable for automatic deployments on branch updates

## Monitoring

- Each environment shows its status in the navbar (DEV/DEMO badges)
- Environment-specific titles and branding help identify which version you're using
- Session and message limits are enforced per environment
- Feature availability varies by environment

## Security Notes

- Production environments have limited navigation
- Demo environments disable certain features (OpenAI, analytics)
- Each environment can have separate API keys
- Environment detection happens both server-side and client-side

For questions or issues, check the environment configuration in `app/lib/environments.ts` or run `npm run env:check` to validate your setup. 