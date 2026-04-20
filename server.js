const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join('f:', 'aiUI');

const server = http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? 'color-extraction-demo.html' : req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('Not found');
    } else {
      const ext = path.extname(filePath);
      const mime = ext === '.html' ? 'text/html' : ext === '.js' ? 'text/javascript' : 'text/plain';
      res.writeHead(200, { 'Content-Type': mime });
      res.end(data);
    }
  });
});

server.listen(3456, () => {
  console.log('Server running at http://localhost:3456');
});
