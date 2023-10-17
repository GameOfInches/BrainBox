const fs = require('fs');
const express = require('express');

const app = express();

app.use("/pictures", express.static(__dirname + "/pictures"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/lobby.html", express.static(__dirname + "/lobby.html"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

const hasCertificates = fs.existsSync('/app/certificates/key.pem') && fs.existsSync('/app/certificates/cert.pem');

if (hasCertificates) {
    const https = require('https');
    const httpsPort = 443;

    const options = {
        key: fs.readFileSync('/app/certificates/key.pem', 'utf8'),
        cert: fs.readFileSync('/app/certificates/cert.pem', 'utf8')
    }

    const httpsServer = https.createServer(options, app)

    app.listen(httpsPort, () => {
        console.log(`HTTPS server is running on port ${httpPort}`);
    });


} else {
  const http = require("http");
  const httpPort = 8081;

    app.listen(httpPort, () => {
        console.log(`HTTP server is running on port ${httpPort}`);
    });
}