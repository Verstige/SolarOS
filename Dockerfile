FROM node:18-slim
WORKDIR /app
RUN npm install -g serve
COPY out /app/out
ENV PORT=3000
ENV HOST=0.0.0.0
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 CMD wget --no-verbose --spider http://localhost:3000/ || exit 1
CMD ["sh", "-c", "serve -s /app/out -l 3000"]