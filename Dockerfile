FROM node:18-slim
WORKDIR /app
COPY out /app/out
COPY server.js /app/server.js
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]