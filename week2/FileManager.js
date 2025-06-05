const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

// Define base directory for file operations
const baseDir = path.join(__dirname, 'files');

// Ensure the base directory exists
if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir);
}

// Create HTTP server
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;
    const filename = path.join(baseDir, query.name || '');

    res.setHeader('Content-Type', 'text/plain');

    if (pathname === '/create' && req.method === 'GET') {
        const content = query.content || '';
        fs.writeFile(filename, content, (err) => {
            if (err) {
                res.statusCode = 500;
                return res.end('Error creating file');
            }
            res.end(`File "${query.name}" created successfully.`);
        });

    } else if (pathname === '/read' && req.method === 'GET') {
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 404;
                return res.end('File not found');
            }
            res.end(data);
        });

    } else if (pathname === '/delete' && req.method === 'GET') {
        fs.unlink(filename, (err) => {
            if (err) {
                res.statusCode = 404;
                return res.end('File not found or cannot delete');
            }
            res.end(`File "${query.name}" deleted successfully.`);
        });

    } else {
        res.statusCode = 400;
        res.end('Invalid route. Use /create, /read, or /delete with ?name=filename');
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});