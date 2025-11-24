# Environment Variables Quick Reference

This document provides a quick overview of all environment variables used in the project.

## Backend Environment Variables

**File:** `backend/.env`
**Example:** `backend/.env.example`

| Variable | Required | Example (Dev) | Example (Prod) | Description |
|----------|----------|---------------|----------------|-------------|
| `BACKEND_URL` | ✅ Yes | `http://localhost:3001` | `https://your-backend.onrender.com` | Backend service URL (for OAuth callback) |
| `FRONTEND_URL` | ✅ Yes | `http://localhost:3000` | `https://your-frontend.onrender.com` | Frontend service URL (for CORS and redirects) |
| `GITHUB_CLIENT_ID` | ✅ Yes | `Ov23li...` | `Ov23li...` | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | ✅ Yes | `92c66a...` | `92c66a...` | GitHub OAuth App Client Secret |
| `JWT_SECRET` | ✅ Yes | `dev-secret-key...` | `e44204b3f2d1...` | Secret for signing JWT tokens (use random string) |
| `PORT` | ⚠️ Optional | `3001` | `3000` | Port the backend listens on (defaults to 3000) |
| `NODE_ENV` | ⚠️ Optional | `development` | `production` | Node environment (usually set by Docker/scripts) |

---

## Frontend Environment Variables

**File:** `frontend/.env`
**Example:** `frontend/.env.example`

| Variable | Required | Example (Dev) | Example (Prod) | Description |
|----------|----------|---------------|----------------|-------------|
| `NUXT_PUBLIC_API_BASE` | ✅ Yes | `http://localhost:3001/api` | `https://your-backend.onrender.com/api` | Backend API base URL (must have `NUXT_PUBLIC_` prefix) |
| `NODE_ENV` | ⚠️ Optional | `development` | `production` | Node environment (usually set by Docker/scripts) |

**Important:**
- The `NUXT_PUBLIC_` prefix is **required** for the variable to be available in the browser
- This variable is **baked into the build** at build time - you must rebuild after changing it

---

## Docker Compose Environment Variables

**File:** `docker-compose.yml`

### Backend Service
```yaml
env_file:
  - ./backend/.env  # Loads all backend env vars
```

### Frontend Service
```yaml
env_file:
  - ./frontend/.env  # Loads frontend env vars
```

---

## Render.com Environment Variables

Set these in the Render dashboard for each service:

### Backend Service (`retro-backend`)
- `BACKEND_URL` = `https://demo-nestjs-nuxt-typescript-backend.onrender.com`
- `FRONTEND_URL` = `https://demo-nestjs-nuxt-typescript-frontend.onrender.com`
- `GITHUB_CLIENT_ID` = (your GitHub OAuth App Client ID)
- `GITHUB_CLIENT_SECRET` = (your GitHub OAuth App Client Secret)
- `JWT_SECRET` = (generate with: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)

### Frontend Service (`retro-frontend`)
- `NUXT_PUBLIC_API_BASE` = `https://demo-nestjs-nuxt-typescript-backend.onrender.com/api`

---

## GitHub OAuth App Configuration

**Settings:** https://github.com/settings/developers

### Development
- **Homepage URL:** `http://localhost:3000`
- **Authorization callback URL:** `http://localhost:3001/api/auth/callback`

### Production
- **Homepage URL:** `https://your-frontend.onrender.com`
- **Authorization callback URL:** `https://your-backend.onrender.com/api/auth/callback`

**Tip:** You can add multiple callback URLs (one per line) to support both dev and prod with the same OAuth App!

---

## Common Issues

### Issue: "redirect_uri is not associated with this application"
**Cause:** GitHub OAuth App doesn't have the callback URL whitelisted
**Fix:** Add the callback URL to your GitHub OAuth App settings

### Issue: Frontend shows "localhost:3001" in production
**Cause:** `NUXT_PUBLIC_API_BASE` not set or frontend not rebuilt
**Fix:** Set the environment variable in Render and redeploy the frontend

### Issue: Backend shows "Cannot find module '../package.json'"
**Cause:** `package.json` not copied to production Docker image
**Fix:** Already fixed in `backend/Dockerfile` (line 37)

### Issue: CORS errors in production
**Cause:** `FRONTEND_URL` not set correctly in backend
**Fix:** Set `FRONTEND_URL` in Render backend environment variables
