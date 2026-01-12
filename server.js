const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;
const DB_FILE = path.join(PUBLIC_DIR, 'events.json');
const UPLOAD_DIR = path.join(PUBLIC_DIR, 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR);
}

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Normalize URL (remove query string for routing)
  const urlPath = req.url.split('?')[0];

  // API: Get Events
  if (req.method === 'GET' && urlPath === '/api/events') {
      fs.readFile(DB_FILE, 'utf8', (err, data) => {
          if (err) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: 'Failed to read database' }));
          } else {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(data);
          }
      });
      return;
  }

  // API: Upload Image
  if (req.method === 'POST' && urlPath === '/api/upload') {
      let body = [];
      req.on('data', chunk => { 
          body.push(chunk);
          // Increase limit to 50MB to handle large raw images
          if (body.reduce((acc, chunk) => acc + chunk.length, 0) > 50 * 1024 * 1024) {
              req.destroy();
          }
      });
      req.on('end', () => {
          try {
              const buffer = Buffer.concat(body);
              const jsonStr = buffer.toString();
              const { filename, content } = JSON.parse(jsonStr);
              
              const base64Data = content.replace(/^data:image\/\w+;base64,/, "");
              const imgBuffer = Buffer.from(base64Data, 'base64');
              
              // Use original filename (sanitized) to avoid creating duplicates with timestamps
              // If the file exists, it will be overwritten (which seems to be the desired behavior to avoid "copying")
              const safeName = path.basename(filename).replace(/[^a-zA-Z0-9.-]/g, '');
              const targetPath = path.join(UPLOAD_DIR, safeName);
              
              fs.writeFile(targetPath, imgBuffer, (err) => {
                  if (err) {
                      res.writeHead(500, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ success: false, message: 'Write failed' }));
                  } else {
                      res.writeHead(200, { 'Content-Type': 'application/json' });
                      res.end(JSON.stringify({ success: true, url: 'uploads/' + safeName }));
                  }
              });
          } catch (e) {
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Invalid upload data' }));
          }
      });
      return;
  }

  // API: Delete File
  if (req.method === 'POST' && urlPath === '/api/delete-file') {
      let body = [];
      req.on('data', chunk => body.push(chunk));
      req.on('end', () => {
          try {
              const buffer = Buffer.concat(body);
              const { filepath } = JSON.parse(buffer.toString());
              
              // Security check: only allow deleting files in uploads/
              // Prevent directory traversal attacks
              const safePath = path.normalize(filepath).replace(/^(\.\.[\/\\])+/, '');
              
              if (!safePath.startsWith('uploads/') && !safePath.startsWith('uploads\\')) {
                  res.writeHead(403, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: false, message: 'Forbidden: Can only delete files in uploads directory' }));
                  return;
              }
              
              const fullPath = path.join(PUBLIC_DIR, safePath);
              
              if (fs.existsSync(fullPath)) {
                  fs.unlink(fullPath, (err) => {
                      if (err) {
                          console.error('Delete error:', err);
                          res.writeHead(500, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ success: false, message: 'Delete failed' }));
                      } else {
                          res.writeHead(200, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ success: true }));
                      }
                  });
              } else {
                  // File not found is considered success (it's already gone)
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ success: true, message: 'File not found, but okay' }));
              }
          } catch (e) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: e.message }));
          }
      });
      return;
  }

  // API: Save Events
  if (req.method === 'POST' && urlPath === '/api/save-events') {
      let body = [];
      req.on('data', chunk => { 
          body.push(chunk);
      });
      req.on('end', () => {
          try {
              const buffer = Buffer.concat(body);
              const jsonStr = buffer.toString();
              const newData = JSON.parse(jsonStr);
              
              const backupFile = path.join(PUBLIC_DIR, `events.json.bak`);
              fs.copyFile(DB_FILE, backupFile, (err) => {
                  if (err) console.error('Backup failed:', err);
                  
                  fs.writeFile(DB_FILE, JSON.stringify(newData, null, 4), 'utf8', (err) => {
                      if (err) {
                          res.writeHead(500, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ success: false, message: 'Failed to write file' }));
                      } else {
                          res.writeHead(200, { 'Content-Type': 'application/json' });
                          res.end(JSON.stringify({ success: true, message: 'Saved successfully' }));
                      }
                  });
              });

          } catch (e) {
              console.error('Save error:', e);
              res.writeHead(400, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: false, message: 'Invalid JSON: ' + e.message }));
          }
      });
      return;
  }

  // Static File Serving
  let decodedPath = urlPath;
  try { decodedPath = decodeURIComponent(urlPath); } catch (e) {}
  
  let filePath = path.join(PUBLIC_DIR, decodedPath);
  
  if (!filePath.startsWith(PUBLIC_DIR)) {
      res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404); res.end('Not Found'); return;
    }
    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    
    const extname = path.extname(filePath);
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500); res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
  });
});

server.listen(PORT, () => {
  console.log(`CMS Server running at http://localhost:${PORT}/`);
  console.log(`Database: ${DB_FILE}`);
  console.log(`Uploads: ${UPLOAD_DIR}`);
});
