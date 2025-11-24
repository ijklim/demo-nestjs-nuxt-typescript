# Base stage - shared dependencies
FROM node:22-slim AS stage-base

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and install dependencies
COPY package.json ./
RUN pnpm install

# Dev stage - for hot-reloading with volume mounts
FROM stage-base AS stage-dev

ENV NODE_ENV=development

EXPOSE 3000

# Run dev server (expects source code to be mounted as volume)
CMD ["pnpm", "run", "start:dev"]

# Build stage - builds the production bundle
FROM stage-base AS stage-build

COPY . .
RUN pnpm run build

# Prod stage - serves the built application (default)
FROM node:22-slim AS stage-prod

WORKDIR /app

# Copy built application and production dependencies
# node_modules are required because NestJS build output is not bundled
COPY --from=stage-build /app/node_modules ./node_modules
COPY --from=stage-build /app/dist ./dist
COPY --from=stage-build /app/package.json ./package.json

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "dist/main"]
