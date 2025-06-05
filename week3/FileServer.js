const http = require('http');
const url = require('url');
const fs = require('fs').promises;
const path = require('path');

const baseDir = path.join(__dirname, 'files');

// Ensure the "files" directory exists
async function ensureDirExists() {
    try {
        await fs.mkdir(baseDir, { recursive: true });
    } catch (err) {
        console.error('Error creating directory:', err.message);
    }
}

// Create a file
async function createFile(fileName, content) {
    const filePath = path.join(baseDir, fileName);
    await fs.writeFile(filePath, content, 'utf8');
}

// Read a file
async function readFile(fileName) {
    const filePath = path.join(baseDir, fileName);
    return await fs.readFile(filePath, 'utf8');
}

// Delete a file
async function deleteFile(fileName) {
    const filePath = path.join(baseDir, fileName);
    await fs.unlink(filePath);
}

// HTTP Server
const server = http.createServer(async (req, res) => {
    await ensureDirExists(); // Make sure the directory exists

    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const query = parsedUrl.query;

    const fileName = query.name;
    const content = query.content || '';

    res.setHeader('Content-Type', 'text/plain');

    try {
        if (pathname === '/create' && req.method === 'GET') {
            if (!fileName) throw new Error('Missing file name');
            await createFile(fileName, content);
            res.end(`File "${fileName}" created successfully.`);

        } else if (pathname === '/read' && req.method === 'GET') {
            if (!fileName) throw new Error('Missing file name');
            const data = await readFile(fileName);
            res.end(`Content of "${fileName}":\n${data}`);

        } else if (pathname === '/delete' && req.method === 'GET') {
            if (!fileName) throw new Error('Missing file name');
            await deleteFile(fileName);
            res.end(`File "${fileName}" deleted successfully.`);

        } else {
            res.statusCode = 404;
            res.end('Invalid route. Use /create, /read, or /delete with ?name=');
        }
    } catch (err) {
        res.statusCode = 500;
        res.end(`Error: ${err.message}`);
    }
});

// Start Server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
