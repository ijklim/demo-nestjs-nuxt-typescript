# Retro Console API Explorer

A full-stack application showcasing a list of retro video game consoles, built with **NestJS** (Backend) and **Nuxt 4** (Frontend). The project demonstrates a robust backend secured with **OAuth 2.0** (GitHub) and a modern, responsive frontend.

## Features

- **Public API**: `GET /api/consoles` to list retro consoles.
- **Protected API**: `GET /api/user/profile` and `POST /api/consoles` secured with JWT.
- **OAuth 2.0**: GitHub Login flow.
- **Modern UI**: Built with Nuxt 4 and TailwindCSS, featuring a glassmorphism design.
- **Containerized**: Docker support for easy deployment.

## Prerequisites

- Node.js (v18+)
- Docker & Docker Compose
- GitHub OAuth App Credentials

## Setup Instructions

### 1. Configure Environment

Create a `.env` file in the `backend` directory (or set these variables in your environment/Docker):

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/callback
```

> **Note**: For the GitHub OAuth App, set the **Authorization callback URL** to `http://localhost:3001/api/auth/callback`.

### 2. Run with Docker Compose

The easiest way to run the entire stack is using Docker Compose:

```bash
docker-compose up --build
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### 3. Run Locally (Manual)

**Backend**:
```bash
cd backend
pnpm install
# Set env vars or create .env
pnpm run start:dev
```

**Frontend**:
```bash
cd frontend
pnpm install
pnpm run dev
```

## Deployment (Render.com)

This project is configured for deployment on Render.com using the `render.yaml` file.

1. Connect your repository to Render.
2. Select "Blueprints" and choose this repository.
3. Render will automatically detect the `render.yaml` and create the services.
4. **Important**: You must manually add the `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` environment variables in the Render dashboard for the backend service.
