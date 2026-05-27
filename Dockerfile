FROM node:18-slim
WORKDIR /app
RUN npm install -g serve
COPY out /app/out
ENV HOST=0.0.0.0
EXPOSE 3000
CMD ["sh", "-c", "serve -s /app/out -l ${PORT:-3000}"]