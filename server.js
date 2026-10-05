const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { DatabaseSync } = require('node:sqlite');
const os = require('node:os');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';
const DATA_DIR = path.join(__dirname, 'data');
const DB_PATH = path.join(DATA_DIR, 'notes.db');
const PUBLIC_DIR = path.join(__dirname, 'public');

if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize SQLite database
const db = new DatabaseSync(DB_PATH);

db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS nodes (
        id TEXT PRIMARY KEY,
        parent_id TEXT,
        title TEXT NOT NULL,
        content TEXT DEFAULT '',
        icon TEXT DEFAULT 'file-text',
        tags TEXT DEFAULT '',
        color TEXT DEFAULT '',
        position INTEGER DEFAULT 0,
        is_expanded INTEGER DEFAULT 1,
        created_at INTEGER NOT NULL,
        updated_at INTEGER NOT NULL,
        deleted INTEGER DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_nodes_parent ON nodes(parent_id, position);
    CREATE INDEX IF NOT EXISTS idx_nodes_updated ON nodes(updated_at);
`);

try {
    db.exec("ALTER TABLE nodes ADD COLUMN color TEXT DEFAULT ''");
} catch (e) {
    // Column already exists
}

// Seed welcome note if empty
const countStmt = db.prepare('SELECT COUNT(*) as cnt FROM nodes WHERE deleted = 0');
const countRow = countStmt.get();
if (countRow.cnt === 0) {
    const now = Date.now();
    const insertStmt = db.prepare(`
        INSERT INTO nodes (id, parent_id, title, content, icon, tags, position, is_expanded, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertStmt.run(
        'root-welcome',
        null,
        'Welcome to TreeKeep 🌲',
        `# Welcome to TreeKeep 🌲\n\n**TreeKeep** is a lightning-fast, hierarchical tree notes app designed for developers, researchers, and cybersecurity enthusiasts.\n\n### 🚀 Why TreeKeep?\n- **Hierarchical Organization:** Infinite sub-nodes, tree nesting, and structured knowledge.\n- **Google Keep-Speed Delta Sync:** Only newly typed changes are transmitted over the wire (less than 1 KB per save!).\n- **Syntax Highlighted Code Boxes:** Seamless code blocks with copy buttons.\n- **Interactive Checklists:** Check and uncheck to-do items live.\n- **CherryTree Compatible:** One-click import from CherryTree \`.ctb\` and \`.ctd\` files.\n\n\`\`\`bash\n# Example bash command\necho "Hello from TreeKeep!"\ncurl -s http://localhost:3000/api/nodes\n\`\`\`\n\nEnjoy organizing your knowledge!`,
        'book',
        'guide,intro',
        0,
        1,
        now,
        now
    );

    insertStmt.run(
        'sub-features',
        'root-welcome',
        'Key Features',
        `## TreeKeep Highlights\n\n- [x] Hierarchical Tree Navigation\n- [x] Micro Delta-Sync (~300 bytes per edit)\n- [x] Dark Mode & Light Mode\n- [x] Code Syntax Highlighting\n- [x] Full-Text Instant Search\n- [ ] Mobile PWA Installable on Android & iOS`,
        'check-square',
        'features',
        0,
        1,
        now,
        now
    );
}

// SSE (Server-Sent Events) clients
const sseClients = new Set();

function broadcastEvent(event, data) {
    const payload = `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
    for (const client of sseClients) {
        try {
            client.write(payload);
        } catch {
            sseClients.delete(client);
        }
    }
}

// MIME types
const MIME_TYPES = {
    '.html': 'text/html; charset=UTF-8',
    '.css': 'text/css; charset=UTF-8',
    '.js': 'application/javascript; charset=UTF-8',
    '.json': 'application/json; charset=UTF-8',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

function sendJson(res, statusCode, data) {
    const json = JSON.stringify(data);
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end(json);
}

function parseJsonBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
            if (body.length > 50 * 1024 * 1024) {
                req.destroy();
                reject(new Error('Payload too large'));
            }
        });
        req.on('end', () => {
            if (!body) return resolve({});
            try {
                resolve(JSON.parse(body));
            } catch (err) {
                reject(err);
            }
        });
        req.on('error', reject);
    });
}

const server = http.createServer(async (req, res) => {
    // CORS Preflight
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        });
        return res.end();
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;

    // --- Real-time Server-Sent Events (SSE) ---
    if (pathname === '/api/events') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Access-Control-Allow-Origin': '*'
        });
        res.write('event: connected\ndata: {"status":"connected"}\n\n');
        sseClients.add(res);

        req.on('close', () => {
            sseClients.delete(res);
        });
        return;
    }

    // --- REST API Endpoints ---
    if (pathname === '/api/nodes') {
        if (req.method === 'GET') {
            // Retrieve entire tree index (with or without content based on ?full=1)
            const full = parsedUrl.searchParams.get('full') === '1';
            const sql = full
                ? 'SELECT * FROM nodes WHERE deleted = 0 ORDER BY position ASC, created_at ASC'
                : 'SELECT id, parent_id, title, icon, tags, color, position, is_expanded, updated_at FROM nodes WHERE deleted = 0 ORDER BY position ASC, created_at ASC';
            const rows = db.prepare(sql).all();
            return sendJson(res, 200, { nodes: rows });
        }

        if (req.method === 'POST') {
            try {
                const body = await parseJsonBody(req);
                const now = Date.now();
                const id = body.id || 'node-' + Math.random().toString(36).substring(2, 10) + '-' + now;
                const parent_id = body.parent_id || null;
                const title = body.title || 'New Note';
                const content = body.content || '';
                const icon = body.icon || 'file-text';
                const tags = body.tags || '';
                const color = body.color || '';

                // Get max position for siblings
                const posRow = db.prepare('SELECT COALESCE(MAX(position), -1) + 1 AS next_pos FROM nodes WHERE parent_id IS ? AND deleted = 0').get(parent_id);
                const position = body.position !== undefined ? body.position : posRow.next_pos;

                const stmt = db.prepare(`
                    INSERT INTO nodes (id, parent_id, title, content, icon, tags, color, position, is_expanded, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
                `);
                stmt.run(id, parent_id, title, content, icon, tags, color, position, now, now);

                const created = db.prepare('SELECT * FROM nodes WHERE id = ?').get(id);
                broadcastEvent('node_create', created);
                return sendJson(res, 201, created);
            } catch (err) {
                return sendJson(res, 400, { error: err.message });
            }
        }
    }

    // Single Node operations: GET /api/nodes/:id, PATCH /api/nodes/:id, DELETE /api/nodes/:id
    const nodeMatch = pathname.match(/^\/api\/nodes\/([a-zA-Z0-9_\-]+)$/);
    if (nodeMatch) {
        const id = nodeMatch[1];

        if (req.method === 'GET') {
            const row = db.prepare('SELECT * FROM nodes WHERE id = ? AND deleted = 0').get(id);
            if (!row) return sendJson(res, 404, { error: 'Node not found' });
            return sendJson(res, 200, row);
        }

        if (req.method === 'PATCH') {
            try {
                const body = await parseJsonBody(req);
                const now = Date.now();
                const updates = [];
                const values = [];

                if (body.title !== undefined) { updates.push('title = ?'); values.push(body.title); }
                if (body.content !== undefined) { updates.push('content = ?'); values.push(body.content); }
                if (body.parent_id !== undefined) { updates.push('parent_id = ?'); values.push(body.parent_id); }
                if (body.icon !== undefined) { updates.push('icon = ?'); values.push(body.icon); }
                if (body.tags !== undefined) { updates.push('tags = ?'); values.push(body.tags); }
                if (body.color !== undefined) { updates.push('color = ?'); values.push(body.color); }
                if (body.position !== undefined) { updates.push('position = ?'); values.push(body.position); }
                if (body.is_expanded !== undefined) { updates.push('is_expanded = ?'); values.push(body.is_expanded ? 1 : 0); }

                if (updates.length === 0) {
                    return sendJson(res, 200, { status: 'no changes' });
                }

                updates.push('updated_at = ?');
                values.push(now);
                values.push(id);

                const sql = `UPDATE nodes SET ${updates.join(', ')} WHERE id = ? AND deleted = 0`;
                db.prepare(sql).run(...values);

                const updated = db.prepare('SELECT * FROM nodes WHERE id = ?').get(id);
                // Broadcast delta change
                broadcastEvent('node_patch', updated);
                return sendJson(res, 200, updated);
            } catch (err) {
                return sendJson(res, 400, { error: err.message });
            }
        }

        if (req.method === 'DELETE') {
            const now = Date.now();
            // Recursive soft delete
            function deleteBranch(nodeId) {
                db.prepare('UPDATE nodes SET deleted = 1, updated_at = ? WHERE id = ?').run(now, nodeId);
                const children = db.prepare('SELECT id FROM nodes WHERE parent_id = ? AND deleted = 0').all(nodeId);
                for (const child of children) {
                    deleteBranch(child.id);
                }
            }
            deleteBranch(id);
            broadcastEvent('node_delete', { id });
            return sendJson(res, 200, { success: true, id });
        }
    }

    // Search API: GET /api/search?q=...
    if (pathname === '/api/search' && req.method === 'GET') {
        const query = parsedUrl.searchParams.get('q') || '';
        if (!query.trim()) return sendJson(res, 200, { results: [] });
        const term = `%${query.trim()}%`;
        const sql = `
            SELECT id, parent_id, title, icon, tags,
                   substr(content, 1, 150) as snippet,
                   updated_at
            FROM nodes
            WHERE deleted = 0 AND (title LIKE ? OR content LIKE ? OR tags LIKE ?)
            ORDER BY updated_at DESC LIMIT 25
        `;
        const results = db.prepare(sql).all(term, term, term);
        return sendJson(res, 200, { results });
    }

    // Import CherryTree endpoint
    if (pathname === '/api/import/cherrytree' && req.method === 'POST') {
        try {
            const body = await parseJsonBody(req);
            const filePath = body.path;
            if (!filePath || !fs.existsSync(filePath)) {
                return sendJson(res, 400, { error: 'File path does not exist on server' });
            }

            const { execSync } = require('node:child_process');
            const scriptPath = path.join(__dirname, 'importers', 'cherrytree_importer.py');
            const output = execSync(`python3 "${scriptPath}" "${filePath}" "${DB_PATH}"`, { encoding: 'utf-8' });

            const allNodes = db.prepare('SELECT * FROM nodes WHERE deleted = 0 ORDER BY position ASC').all();
            broadcastEvent('tree_reload', {});
            return sendJson(res, 200, { success: true, message: output, count: allNodes.length });
        } catch (err) {
            return sendJson(res, 500, { error: err.message });
        }
    }

    // System info API
    if (pathname === '/api/info') {
        return sendJson(res, 200, {
            name: 'TreeKeep',
            version: '1.0.0',
            sqlite: true,
            storage_path: DB_PATH,
            active_clients: sseClients.size
        });
    }

    // --- Static File Serving ---
    let filePath = path.join(PUBLIC_DIR, pathname === '/' ? 'index.html' : pathname);
    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(PUBLIC_DIR, 'index.html');
    }

    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`🌲 TreeKeep Server running at http://${HOST}:${PORT}`);
    console.log(`📁 Database: ${DB_PATH}`);
});
