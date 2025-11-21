# Base stage - shared dependencies
FROM node:22-slim AS stage-base

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files and install dependencies
COPY package.json ./
RUN pnpm install

# Dev stage - for hot-reloading with volume mounts
FROM stage-base AS stage-dev

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

# Run dev server (expects source code to be mounted as volume)
CMD ["pnpm", "run", "dev"]

# Build stage - builds the production bundle
FROM stage-base AS stage-build

COPY . .
RUN pnpm run build

# Prod stage - serves the built application (default)
FROM node:22-slim AS stage-prod

WORKDIR /app

COPY --from=stage-build /app/.output ./.output

EXPOSE 3000

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

CMD ["node", ".output/server/index.mjs"]
