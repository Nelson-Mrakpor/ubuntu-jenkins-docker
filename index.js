// index.js
const http = require('http');
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => res.end('Hello from Docker!'));
server.listen(PORT, () => console.log('Listening on', PORT));

