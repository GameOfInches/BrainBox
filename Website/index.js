const http = require("http");
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

const httpPort = 8080;
const httpsPort = 443;

const options = {
    key: fs.readFileSync('/app/certificates/key.pem'),
    cert: fs.readFileSync('/app/certificates/cert.pem')
  };
  
  const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
    res.end();
  });
  
  const httpsServer = https.createServer(options, app);
  
  app.get('/', (req, res) => {
    res.write("<h1>Hello World!</h1>");

    res.end();
  });
  
  httpServer.listen(httpPort, () => {
    console.log(`HTTP server is running on port ${httpPort}`);
  });
  
  httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS server is running on port ${httpsPort}`);
  });