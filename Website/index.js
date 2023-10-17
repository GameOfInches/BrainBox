const fs = require('fs');
const express = require('express');

const app = express();

const hasCertificates = fs.existsSync('/app/certificates/key.pem') && fs.existsSync('/app/certificates/cert.pem');

if (hasCertificates) {
  const https = require('https');
  const httpsPort = 443;

  const options = {
    key: fs.readFileSync('/app/certificates/key.pem', 'utf8'),
    cert: fs.readFileSync('/app/certificates/cert.pem', 'utf8')
  }

  const httpsServer = https.createServer(options, app);

  app.get('/', (req, res) => {
    res.write("<h1>Hello World / HTTPS!</h1>");
    res.end();
  });

  httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS server is running on port ${httpsPort}`);
  });
} else {
  const http = require("http");
  const httpPort = 8081;

  const httpServer = http.createServer((req, res) => {
    res.write("<h1>Hello World / HTTP!</h1>");
    res.end();
  });

  httpServer.listen(httpPort, () => {
    console.log(`HTTP server is running on port ${httpPort}`);
  });
}
