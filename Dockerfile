FROM node:18-slim

RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs --shell /bin/bash nextjs

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

USER nextjs
ENV NODE_ENV=production PORT=3000 HOST=0.0.0.0

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 CMD curl -f http://localhost:3000/ || exit 1

CMD ["npm", "start"]