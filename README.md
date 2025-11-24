# Retro Console Explorer

A full-stack application for exploring and managing retro video game consoles, built with **NestJS** (Backend) and **Nuxt 4** (Frontend). Features **GitHub OAuth authentication**, a beautiful glassmorphism UI, and **Docker** containerization with hot-reloading support.

## ✨ Features

### Frontend
- 🎮 **Browse Consoles** - View retro gaming consoles with their top games
- 🔐 **GitHub OAuth Login** - Secure authentication via GitHub
- ➕ **Suggest Consoles** - Authenticated users can add new consoles
- 🗑️ **Delete with Animation** - Remove your consoles with animation effects
- 🎨 **Modern UI** - Glassmorphism design with Tailwind CSS
- 📱 **Responsive** - Works on all device sizes
- ⚡ **Hot Reloading** - Development mode with instant updates (Docker + Windows compatible)

### Backend
- 🛡️ **JWT Authentication** - Secure API endpoints
- 🔑 **OAuth 2.0** - GitHub login integration with Passport.js
- 🎯 **RESTful API** - Clean, organized endpoints
- 👤 **User Ownership** - Track who created each console
- 🔒 **Authorization** - Users can only delete their own consoles
- 🐳 **Dockerized** - Multi-stage builds for dev and production

## 🛠️ Tech Stack

### Backend
- **Framework**: NestJS 10
- **Language**: TypeScript
- **Authentication**: Passport.js (GitHub Strategy)
- **JWT**: @nestjs/jwt
- **Runtime**: Node.js 22
- **Package Manager**: pnpm
- **Containerization**: Docker (multi-stage builds)

### Frontend
- **Framework**: Nuxt 4
- **Language**: TypeScript
- **UI Library**: Vue 3 (Composition API)
- **Styling**: Tailwind CSS 3
- **State Management**: Vue composables (useState)
- **HTTP Client**: Nuxt $fetch
- **Containerization**: Docker with hot-reloading support

### DevOps
- **Container Orchestration**: Docker Compose
- **Development**: Hot-reloading with file watching (polling for Windows)
- **Production**: Optimized multi-stage Docker builds
- **Startup Script**: Interactive bash script for dev/prod mode selection

## 📋 Prerequisites

- **Node.js** v22+ (or use Docker)
- **Docker** & **Docker Compose**
- **GitHub OAuth App** credentials
- **pnpm** (if running locally without Docker)

## 🚀 Quick Start

### 1. Configure Environment

Create a `.env` file in the **backend directory**:

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3001/api/auth/callback
```

> **Note**: Create a GitHub OAuth App at [GitHub Developer Settings](https://github.com/settings/developers) with the **Authorization callback URL** set to `http://localhost:3001/api/auth/callback`.

### 2. Run with Docker (Recommended)

#### Using the Interactive Startup Script

```bash
bash start-docker.sh
```

The script will prompt you to:
1. Choose **development** (with hot-reloading) or **production** mode
2. Decide whether to rebuild containers
3. Optionally start the containers

#### Manual Docker Commands

**Development Mode** (with hot-reloading):
```bash
export FRONTEND_TARGET=stage-dev
docker compose up -d
```

**Production Mode**:
```bash
export FRONTEND_TARGET=stage-prod
docker compose up -d --build
```

**Access the Application**:
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend API**: [http://localhost:3001](http://localhost:3001)

### 3. Run Locally (Without Docker)

**Backend**:
```bash
cd backend
pnpm install
pnpm run start:dev
```

**Frontend**:
```bash
cd frontend
pnpm install
pnpm run dev
```

## 📁 Project Structure

```
.
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # OAuth & JWT authentication
│   │   ├── console/        # Console CRUD operations
│   │   ├── user.controller.ts
│   │   └── main.ts
│   ├── Dockerfile          # Multi-stage Docker build
│   └── package.json
├── frontend/               # Nuxt 4 frontend
│   ├── app/
│   │   ├── pages/          # Route pages (index, dashboard, suggest)
│   │   ├── composables/    # useAuth composable
│   │   ├── middleware/     # Auth middleware
│   │   └── assets/         # CSS and styles
│   ├── Dockerfile          # Multi-stage Docker build (dev/prod)
│   ├── nuxt.config.ts      # Nuxt configuration
│   └── package.json
├── docker-compose.yml      # Container orchestration
├── start-docker.sh         # Interactive startup script
└── README.md
```

## 🔑 API Endpoints

### Public Endpoints
- `GET /api/consoles` - List all consoles

### Protected Endpoints (Require JWT)
- `GET /api/user/profile` - Get authenticated user profile
- `POST /api/consoles` - Create a new console (auto-assigns createdBy)
- `DELETE /api/consoles/:id` - Delete a console (only if you created it)

### Authentication
- `GET /api/auth/github` - Initiate GitHub OAuth flow
- `GET /api/auth/callback` - GitHub OAuth callback (redirects to frontend with JWT)

## 🎨 Features in Detail

### Authentication Flow
1. User clicks "Log In with GitHub" on homepage
2. Redirected to GitHub OAuth authorization
3. After approval, redirected to backend callback
4. Backend generates JWT and redirects to frontend dashboard with token
5. Frontend stores token in cookie and fetches user profile
6. User can now suggest and delete consoles

### Console Management
- **View**: All users can see all consoles
- **Create**: Authenticated users can suggest new consoles
- **Delete**: Users can only delete consoles they created
- **Validation**: Duplicate ID and name checks before creation
- **Animation**: Explosion effect when deleting

### Docker Development
- **Hot Reloading**: File changes instantly reflected (uses polling for Windows compatibility)
- **Volume Mounts**: Source code mounted for live updates
- **Multi-Stage Builds**: Separate stages for base, dev, build, and production
- **Optimized Images**: Production images exclude dev dependencies

## 🐳 Docker Configuration

### Frontend Stages
- `stage-base`: Common dependencies and setup
- `stage-dev`: Development with hot-reloading
- `stage-build`: Build production assets
- `stage-prod`: Serve production build

### Environment Variables
- `FRONTEND_TARGET`: Controls which Docker stage to use (`stage-dev` or `stage-prod`)
- `NUXT_PUBLIC_API_BASE`: API base URL (default: `http://localhost:3001/api`)

## 🔧 Development Notes

### Hot Reloading on Windows
The frontend uses Vite with polling enabled to support hot-reloading in Docker on Windows:

```typescript
// nuxt.config.ts
vite: {
  server: {
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
}
```

### CORS Configuration
The backend enables CORS for the frontend origin:

```typescript
app.enableCors({
  origin: 'http://localhost:3000',
  credentials: true,
});
```

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- Built with NestJS and Nuxt 4
- Styled with Tailwind CSS
- Authenticated with Passport.js
- Containerized with Docker
