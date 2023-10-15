const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

const httpsPort = 443;

const hasCertificates = fs.existsSync('/app/certificates/key.pem') && fs.existsSync('/app/certificates/cert.pem');

if(hasCertificates){
const options =
  {
      key: fs.readFileSync('/app/certificates/key.pem', 'utf8'),
      cert: fs.readFileSync('/app/certificates/cert.pem', 'utf8')
    }
  
  const httpsServer = https.createServer(options, app);
  
  app.get('/', (req, res) => {
    res.write("<h1>Hello World!</h1>");

    res.end();
  });

  httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS server is running on port ${httpsPort}`);
  });
} else {
    const http = require("http");
    const httpPort = 8080;
  
    const httpServer = http.createServer((req, res) => {
      res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
      res.end();
    });
  
    httpServer.listen(httpPort, () => {
      console.log(`HTTP server is running on port ${httpPort}`);
    });
  }