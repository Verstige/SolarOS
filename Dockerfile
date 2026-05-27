FROM node:18-slim
WORKDIR /app
RUN npm install -g serve && npm cache clean --force
COPY out /app/out
ENV PORT=3000
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1
CMD ["sh", "-c", "serve -s /app/out -l 3000"]