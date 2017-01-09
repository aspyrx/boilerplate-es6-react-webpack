'use strict';

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, 'dist');
const index = path.join(rootDir, 'index.html');

http.createServer(function requestListener(req, res) {
    let { pathname } = url.parse(req.url);
    console.log(`${req.method} ${pathname}`);
    if (req.method !== 'GET') {
        res.statusCode = 501;
        return res.end();
    }

    if (pathname === '/') {
        pathname = index;
    }

    const filepath = path.join(rootDir, pathname);
    fs.createReadStream(filepath)
        .on('error', err => {
            if (err.code === 'ENOENT') {
                // File not found, use index instead (SPA router)
                return fs.createReadStream(index)
                    .on('error', indexErr => {
                        res.statusCode = 404;
                        res.end(indexErr.message);
                    })
                    .pipe(res);
            }

            res.statusCode = 503;
            res.end(err.message, 'utf8');
        })
        .pipe(res);
}).listen(process.argv[2] || '8080');

