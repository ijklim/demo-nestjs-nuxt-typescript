#!/bin/bash

#############################################
# Docker Compose Startup Script
#############################################
# Purpose: Interactive script to start Docker Compose with dev or prod mode
#
# Usage: ./start-docker.sh
#
# Features:
#   - Choose between development (hot-reload) or production (optimized) mode
#   - Option to rebuild containers (only needed when dependencies change)
#   - Automatically exports FRONTEND_TARGET environment variable
#   - No .env file needed - uses export for cleaner approach
#
# Modes:
#   Development (stage-dev):  Runs Nuxt dev server with volume mounts for hot-reloading
#   Production (stage-prod):  Serves optimized production build
#
# Rebuild:
#   Only needed when package.json changes (new/updated dependencies)
#   Skip rebuild for faster startup when only code changes
#############################################

# Colors for better UX
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Docker Compose Startup Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Ask user for mode
echo -e "${YELLOW}Select frontend mode:${NC}"
echo "  1) Development (hot-reloading)"
echo "  2) Production (optimized build, faster runtime)"
echo ""
read -p "Enter your choice [1/2] (default: 2): " choice

# Set default if empty
choice=${choice:-2}

# Determine target based on choice
if [ "$choice" = "1" ]; then
    TARGET="stage-dev"
    MODE="Development"
elif [ "$choice" = "2" ]; then
    TARGET="stage-prod"
    MODE="Production"
else
    echo -e "${YELLOW}Invalid choice. Defaulting to Production mode.${NC}"
    TARGET="stage-prod"
    MODE="Production"
fi

echo ""
echo -e "${GREEN}✓ Selected mode: ${MODE}${NC}"
echo -e "${GREEN}✓ Frontend target: ${TARGET}${NC}"
echo ""

# Ask if rebuild is needed
echo -e "${YELLOW}Rebuild containers?${NC}"
echo "  Only needed if you changed dependencies (package.json)"
echo ""
read -p "Rebuild? [y/N]: " rebuild
rebuild=${rebuild:-N}

if [[ "$rebuild" =~ ^[Yy]$ ]]; then
    BUILD_FLAG="--build"
    echo -e "${GREEN}✓ Will rebuild containers${NC}"
else
    BUILD_FLAG=""
    echo -e "${GREEN}✓ Will skip rebuild (faster startup)${NC}"
fi
echo ""

# Ask if user wants to start now
read -p "Start Docker Compose now? [Y/n]: " start_now
start_now=${start_now:-Y}

if [[ "$start_now" =~ ^[Yy]$ ]]; then
    echo ""
    echo -e "${BLUE}Starting Docker Compose...${NC}"

    # Export the variable and run docker compose
    export FRONTEND_TARGET="${TARGET}"
    docker compose up -d ${BUILD_FLAG}

    if [ $? -eq 0 ]; then
        echo ""
        echo -e "${GREEN}========================================${NC}"
        echo -e "${GREEN}  Docker Compose started successfully!${NC}"
        echo -e "${GREEN}========================================${NC}"
        echo ""
        echo -e "Frontend: ${BLUE}http://localhost:3000${NC}"
        echo -e "Backend:  ${BLUE}http://localhost:3001${NC}"
        echo ""
        if [ "$TARGET" = "stage-dev" ]; then
            echo -e "${YELLOW}Note: Running in dev mode - changes will hot-reload${NC}"
        fi
    else
        echo ""
        echo -e "${YELLOW}Docker Compose failed to start. Check the logs above.${NC}"
    fi
else
    echo ""
    echo -e "${BLUE}Skipped startup.${NC}"
    echo -e "${BLUE}To start manually, run:${NC}"
    if [[ "$rebuild" =~ ^[Yy]$ ]]; then
        echo -e "  ${GREEN}FRONTEND_TARGET=${TARGET} docker compose up -d --build${NC}"
    else
        echo -e "  ${GREEN}FRONTEND_TARGET=${TARGET} docker compose up -d${NC}"
    fi
fi
