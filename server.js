const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const OUT_DIR = path.join(__dirname, 'out');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function serveFile(res, filePath, status = 200) {
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'text/plain';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }
    res.writeHead(status, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];
  
  // Landing page
  if (url === '/' || url === '/index') {
    return serveFile(res, path.join(OUT_DIR, 'index.html'));
  }
  
  // Dashboard sub-routes
  if (url.startsWith('/dashboard')) {
    const dashRoute = url === '/dashboard' ? '/dashboard.html' : url + '.html';
    const filePath = path.join(OUT_DIR, dashRoute);
    if (fs.existsSync(filePath)) {
      return serveFile(res, filePath);
    }
    // Try /dashboard/index.html
    const idxPath = path.join(OUT_DIR, 'dashboard', 'index.html');
    if (fs.existsSync(idxPath)) {
      return serveFile(res, idxPath);
    }
    // Try flat /dashboard.html
    return serveFile(res, path.join(OUT_DIR, 'dashboard.html'));
  }
  
  // Strip trailing slash
  if (url.endsWith('/') && url.length > 1) {
    url = url.slice(0, -1);
    res.writeHead(301, { Location: url });
    res.end();
    return;
  }
  
  let filePath = path.join(OUT_DIR, url);
  
  // Check if it's a file with extension
  if (path.extname(url)) {
    if (fs.existsSync(filePath)) {
      return serveFile(res, filePath);
    }
    res.writeHead(404);
    res.end('Not Found');
    return;
  }
  
  // Try URL.html
  const htmlPath = filePath + '.html';
  if (fs.existsSync(htmlPath)) {
    return serveFile(res, htmlPath);
  }
  
  // Try URL/index.html
  const indexPath = path.join(filePath, 'index.html');
  if (fs.existsSync(indexPath)) {
    return serveFile(res, indexPath);
  }
  
  // Serve 404
  const notFound = path.join(OUT_DIR, '404.html');
  if (fs.existsSync(notFound)) {
    return serveFile(res, notFound, 404);
  }
  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`SolarOS running on port ${PORT}`);
});