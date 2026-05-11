const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const candidates = [
  path.join(__dirname, 'index.html'),
  path.join(process.cwd(), 'index.html'),
  '/app/index.html',
  '/app/reverb-app/index.html',
];

const filePath = candidates.find(p => fs.existsSync(p));
console.log('__dirname:', __dirname);
console.log('cwd:', process.cwd());
console.log('Dir contents:', fs.readdirSync(__dirname));
console.log('Found index.html at:', filePath || 'NOT FOUND');

const server = http.createServer((req, res) => {
  if (!filePath) {
    res.writeHead(500);
    res.end('index.html not found. Searched: ' + candidates.join(', '));
    return;
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Read error: ' + err.message);
      return;
    }
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
