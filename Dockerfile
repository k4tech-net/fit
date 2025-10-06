FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Install a simple HTTP server
RUN npm install -g serve

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 react

# Copy built files from builder stage
COPY --from=builder --chown=react:nodejs /app/dist /app/dist

# Create data directory and copy activities.json
RUN mkdir -p /app/data
COPY --from=builder --chown=react:nodejs /app/dist/data/activities.json /app/data/activities.json

USER react

EXPOSE 3000

# Serve the built files
CMD ["serve", "-s", "dist", "-l", "3000"]
