# Stage 1: Build
FROM node:18 AS builder
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./
RUN npm ci

# Copy source
COPY . .
RUN npm run build

# Stage 2: Production
FROM node:18-slim
WORKDIR /app

# Create non-root user
RUN groupadd --gid 1001 nodejs && useradd --uid 1001 --gid nodejs --shell /bin/bash --create-home nextjs

# Copy built assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public 2>/dev/null || true
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static 2>/dev/null || true

USER nextjs
ENV NODE_ENV=production PORT=3002
EXPOSE 3002

CMD ["node", "server.js"]