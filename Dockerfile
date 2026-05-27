FROM node:18-slim

RUN groupadd --system --gid 1001 nodejs && useradd --system --uid 1001 --gid nodejs --shell /bin/bash nextjs

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

USER nextjs
ENV NODE_ENV=production PORT=3000

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]