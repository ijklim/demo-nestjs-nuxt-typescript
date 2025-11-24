# Render.com Deployment - Environment Variables Guide

## Backend Service (`retro-backend`)

After deploying to Render, set these environment variables in the Render dashboard:

### Required Environment Variables

| Variable | Example Value | Description |
|----------|--------------|-------------|
| `BACKEND_URL` | `https://retro-backend.onrender.com` | Your backend service URL (get this from Render after deployment) |
| `FRONTEND_URL` | `https://retro-frontend.onrender.com` | Your frontend service URL (used for CORS and OAuth redirects) |
| `GITHUB_CLIENT_ID` | `Ov23liWHFQm5h49RP3Hi` | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | `your_secret_here` | GitHub OAuth App Client Secret |
| `JWT_SECRET` | `your_random_secret_here` | Secret key for JWT token signing (generate a secure random string) |

### Auto-set Variables
- `NODE_ENV=production` - Already set in render.yaml

---

## Frontend Service (`retro-frontend`)

| Variable | Example Value | Description |
|----------|--------------|-------------|
| `NUXT_PUBLIC_API_BASE` | `https://retro-backend.onrender.com/api` | Backend API base URL |

### Auto-set Variables
- `NODE_ENV=production` - Already set in render.yaml

---

## GitHub OAuth App Configuration

Update your GitHub OAuth App settings at https://github.com/settings/developers:

- **Homepage URL**: `https://your-frontend.onrender.com`
- **Authorization callback URL**: `https://retro-backend.onrender.com/api/auth/callback`

**Note**: The callback URL is automatically constructed as `{BACKEND_URL}/api/auth/callback`. The `/api/auth/callback` path is hardcoded and cannot be changed.

---

## How to Generate JWT_SECRET

Run this command to generate a secure random secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Deployment Checklist

1. ✅ Push code to GitHub
2. ✅ Deploy to Render (it will read render.yaml automatically)
3. ⚠️ Set environment variables in Render dashboard for both services
4. ⚠️ Update GitHub OAuth App with production URLs
5. ✅ Test the deployment

---

## Notes

- `GITHUB_CALLBACK_URL` is **no longer used** - it's automatically constructed from `BACKEND_URL`
- Make sure `BACKEND_URL` does **not** have a trailing slash
- The backend will construct the callback URL as: `${BACKEND_URL}/api/auth/callback`
