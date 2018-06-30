const http = require('http');
const fs = require('fs');
const path = require('path');

let validUrl = ("/index.html", "/bio.html", "portfolio.html", "contacto.html");



http.createServer(function (request, response) {
    console.log('request ', request.url);

    let filePath = '.' + request.url;
    if (filePath == './') {
        filePath = './index.html';
    }

    let extname = String(path.extname(filePath));
    let mimeTypes = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
    };

    let contentType = mimeTypes[extname] || 'website';

    fs.readFile(filePath, function(error, content) {
        if (error) {
            response.statusCode = 404;
            return response.end();
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

}).listen(3000, "0.0.0.0");
console.log('Servidor corriendo en el puerto 3000');