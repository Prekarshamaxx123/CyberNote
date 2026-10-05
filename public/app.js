// ==========================================================================
// TreeKeep - Ultimate Hierarchical Knowledge & Cloud Notes System
// Direct In-Place WYSIWYG Document Editor (No Split Screen, No Preview Tab)
// Windows Paint Studio, Handwritten Signatures, Tables, CodeBoxes & Cloud Sync
// ==========================================================================

const API_BASE = '';
const ICON_MAP = {
    'folder': '📁',
    'terminal': '💻',
    'code': '⚡',
    'key': '🔑',
    'book': '📖',
    'shield': '🛡️',
    'lock': '🔒',
    'bug': '🐛',
    'database': '🗄️',
    'server': '🖥️',
    'file-text': '📝',
    'check-square': '✅',
    'star': '⭐',
    'rocket': '🚀',
    'fire': '🔥',
    'bulb': '💡'
};

// Global State
const state = {
    nodes: new Map(),
    activeNodeId: null,
    searchQuery: '',
    theme: localStorage.getItem('treekeep_theme') || 'dark',
    expandedNodes: new Set(JSON.parse(localStorage.getItem('treekeep_expanded') || '[]')),
    saveTimer: null,
    isSyncing: false,
    isReadOnly: false,
    isServerMode: true,
    activeTableElement: null,
    activeTableCell: null,
    activeImageElement: null,
    savedSelectionRange: null,
    // Paint Studio State
    paintTool: 'signature', // 'signature', 'brush', 'eraser'
    paintColor: '#111111',
    paintWidth: 3,
    isPainting: false,
    paintPoints: []
};

// --- DOM References ---
const treeContainer = document.getElementById('tree-container');
const noteView = document.getElementById('note-view');
const noNoteSelected = document.getElementById('no-note-selected');
const noteTitleInput = document.getElementById('note-title');
const noteTagsInput = document.getElementById('note-tags');
const noteEditor = document.getElementById('note-editor');
const breadcrumbs = document.getElementById('breadcrumbs');
const iconPickerBtn = document.getElementById('btn-icon-picker');
const titleColorDot = document.getElementById('title-color-dot');
const syncStatusBadge = document.getElementById('sync-status');
const footerSyncDetail = document.getElementById('footer-sync-detail');
const footerTime = document.getElementById('footer-time');
const footerStats = document.getElementById('footer-stats');
const footerPath = document.getElementById('footer-path');

// Floating Toolbars
const tableToolbar = document.getElementById('table-toolbar');
const imageToolbar = document.getElementById('image-toolbar');
const findReplaceBar = document.getElementById('find-replace-bar');
const findInput = document.getElementById('find-input');
const replaceInput = document.getElementById('replace-input');
const findCount = document.getElementById('find-count');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.theme);
    setupEventListeners();
    setupPaintStudio();
    initApp();
});

async function initApp() {
    try {
        const testRes = await fetch(`${API_BASE}/api/nodes?full=1`, { method: 'GET' });
        if (testRes.ok) {
            state.isServerMode = true;
            setupSSE();
            await loadTree();
            return;
        }
    } catch (e) {
        console.log('Local Node server not found, operating in Static / GitHub Pages mode.');
    }

    state.isServerMode = false;
    setSyncStatus('live', 'GitHub Cloud Mode (Local Storage + Cloud Sync)');
    loadLocalNodes();
}

// --- Theme Management ---
function applyTheme(theme) {
    state.theme = theme;
    document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';
    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) themeBtn.textContent = theme === 'light' ? '☀️' : '🌙';
    localStorage.setItem('treekeep_theme', theme);
}

function toggleTheme() {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
}

// --- Server-Sent Events (SSE) ---
function setupSSE() {
    if (!state.isServerMode) return;
    try {
        const evtSource = new EventSource(`${API_BASE}/api/events`);

        evtSource.addEventListener('connected', () => {
            setSyncStatus('live', 'Live Delta-Sync Ready');
        });

        evtSource.addEventListener('node_patch', (e) => {
            const updated = JSON.parse(e.data);
            if (state.nodes.has(updated.id)) {
                const existing = state.nodes.get(updated.id);
                Object.assign(existing, updated);
                state.nodes.set(updated.id, existing);

                if (state.activeNodeId === updated.id && !state.isSyncing) {
                    noteTitleInput.value = updated.title || '';
                    noteTagsInput.value = updated.tags || '';
                    if (document.activeElement !== noteEditor) {
                        setEditorContent(updated.content || '');
                    }
                    updateBreadcrumbs(updated.id);
                    updateNodeColorDot(updated.color);
                }
                renderTree();
            }
        });

        evtSource.addEventListener('node_create', (e) => {
            const created = JSON.parse(e.data);
            state.nodes.set(created.id, created);
            renderTree();
        });

        evtSource.addEventListener('node_delete', (e) => {
            const { id } = JSON.parse(e.data);
            state.nodes.delete(id);
            if (state.activeNodeId === id) selectNode(null);
            renderTree();
        });

        evtSource.addEventListener('tree_reload', () => {
            loadTree();
        });

        evtSource.onerror = () => {
            setSyncStatus('offline', 'Offline (changes stored locally)');
        };
    } catch (err) {
        console.warn('SSE could not be initialized:', err);
    }
}

function setSyncStatus(status, text) {
    if (!syncStatusBadge) return;
    const dot = syncStatusBadge.querySelector('.sync-dot');
    const label = syncStatusBadge.querySelector('.sync-text');
    if (dot) dot.className = `sync-dot ${status}`;
    if (label) label.textContent = text;
}

// --- Data Fetching & Local Persistence ---
async function loadTree() {
    try {
        const res = await fetch(`${API_BASE}/api/nodes?full=1`);
        const data = await res.json();
        state.nodes.clear();
        for (const n of data.nodes) {
            state.nodes.set(n.id, n);
        }
        saveLocalNodesBackup();
        renderTree();

        const lastActive = localStorage.getItem('treekeep_active');
        if (lastActive && state.nodes.has(lastActive)) {
            selectNode(lastActive);
        } else if (data.nodes.length > 0) {
            selectNode(data.nodes[0].id);
        } else {
            selectNode(null);
        }
    } catch (err) {
        console.error('Failed to load nodes from server:', err);
        loadLocalNodes();
    }
}

function saveLocalNodesBackup() {
    const list = Array.from(state.nodes.values());
    localStorage.setItem('treekeep_local_db', JSON.stringify(list));
}

function loadLocalNodes() {
    const raw = localStorage.getItem('treekeep_local_db');
    state.nodes.clear();
    if (raw) {
        try {
            const list = JSON.parse(raw);
            for (const n of list) state.nodes.set(n.id, n);
        } catch (e) {
            console.error('Failed to parse local nodes:', e);
        }
    }

    if (state.nodes.size === 0) {
        seedDefaultLocalNotes();
    }

    renderTree();
    const lastActive = localStorage.getItem('treekeep_active');
    if (lastActive && state.nodes.has(lastActive)) {
        selectNode(lastActive);
    } else if (state.nodes.size > 0) {
        selectNode(state.nodes.keys().next().value);
    } else {
        selectNode(null);
    }
}

function seedDefaultLocalNotes() {
    const now = Date.now();
    const welcome = {
        id: 'welcome-root',
        parent_id: null,
        title: 'Welcome to TreeKeep 🌲',
        content: `<h1>Welcome to TreeKeep 🌲</h1>
<p><b>TreeKeep</b> is your ultimate hierarchical cloud notebook featuring <b>direct in-place WYSIWYG editing</b>, Paint & handwritten signatures, tables, and micro-sync!</p>
<div class="callout-box callout-tip">
    <span class="callout-icon">💡</span>
    <div class="callout-content" contenteditable="true"><b>No preview tab!</b> You type and format directly right here on this page, exactly like Microsoft Word or Notion.</div>
</div>
<h3>🚀 Highlights:</h3>
<div class="todo-item" contenteditable="false"><input type="checkbox" checked onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text todo-done">Direct In-Place WYSIWYG editing (No markdown preview)</span></div>
<div class="todo-item" contenteditable="false"><input type="checkbox" checked onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text todo-done">Windows Paint Studio & Smooth Handwritten Signatures</span></div>
<div class="todo-item" contenteditable="false"><input type="checkbox" onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text">Draw & edit Tables with cell toolbar</span></div>
<div class="todo-item" contenteditable="false"><input type="checkbox" onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text">Paste screenshots directly with Ctrl+V</span></div>
<div class="todo-item" contenteditable="false"><input type="checkbox" onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text">Host on GitHub Pages for free worldwide access</span></div>
<div class="code-box" contenteditable="false">
    <div class="code-box-header"><span>BASH</span><button class="btn-copy-code" onclick="copySnippet(this)">📋 Copy Code</button></div>
    <pre contenteditable="true"><code>echo "Organize all your cybersecurity, code, and personal notes!"</code></pre>
</div>`,
        icon: 'book',
        tags: 'intro,welcome',
        color: '#89b4fa',
        position: 0,
        is_expanded: 1,
        created_at: now,
        updated_at: now
    };
    state.nodes.set(welcome.id, welcome);
    saveLocalNodesBackup();
}

// --- Tree Hierarchy Rendering ---
function renderTree() {
    treeContainer.innerHTML = '';

    const childrenMap = new Map();
    for (const node of state.nodes.values()) {
        const pId = node.parent_id || '__root__';
        if (!childrenMap.has(pId)) childrenMap.set(pId, []);
        childrenMap.get(pId).push(node);
    }

    for (const list of childrenMap.values()) {
        list.sort((a, b) => a.position - b.position);
    }

    function buildBranch(parentId, container) {
        const children = childrenMap.get(parentId || '__root__') || [];
        for (const node of children) {
            if (state.searchQuery) {
                const match = node.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                              (node.tags && node.tags.toLowerCase().includes(state.searchQuery.toLowerCase())) ||
                              (node.content && node.content.toLowerCase().includes(state.searchQuery.toLowerCase()));
                if (!match && !hasMatchingDescendant(node.id)) continue;
            }

            const hasKids = (childrenMap.get(node.id) || []).length > 0;
            const isExpanded = state.expandedNodes.has(node.id) || !!state.searchQuery;

            const wrapper = document.createElement('div');
            wrapper.className = 'tree-node-wrapper';

            const item = document.createElement('div');
            item.className = `tree-node ${state.activeNodeId === node.id ? 'active' : ''}`;
            item.dataset.id = node.id;

            // Expand arrow
            const arrow = document.createElement('span');
            arrow.className = `tree-arrow ${hasKids ? (isExpanded ? 'expanded' : '') : 'empty'}`;
            arrow.textContent = '▶';
            arrow.onclick = (e) => {
                e.stopPropagation();
                if (hasKids) toggleNodeExpand(node.id);
            };

            // Node Color Indicator Dot
            const colorDot = document.createElement('span');
            colorDot.className = 'tree-node-color-dot';
            if (node.color) {
                colorDot.style.backgroundColor = node.color;
            } else {
                colorDot.style.display = 'none';
            }

            // Icon
            const icon = document.createElement('span');
            icon.className = 'tree-icon';
            icon.textContent = ICON_MAP[node.icon] || '📁';

            // Title Label
            const label = document.createElement('span');
            label.className = 'tree-label';
            label.textContent = node.title || 'Untitled Note';
            if (node.color) label.style.color = node.color;

            // Quick Actions
            const actions = document.createElement('div');
            actions.className = 'tree-actions';
            actions.innerHTML = `
                <button class="tree-btn" title="Add Sub-Note" onclick="event.stopPropagation(); createSubNode('${node.id}')">+</button>
                <button class="tree-btn" title="Delete" onclick="event.stopPropagation(); deleteNode('${node.id}')">✕</button>
            `;

            item.appendChild(arrow);
            item.appendChild(colorDot);
            item.appendChild(icon);
            item.appendChild(label);
            item.appendChild(actions);

            item.onclick = () => selectNode(node.id);
            wrapper.appendChild(item);

            if (hasKids) {
                const childrenContainer = document.createElement('div');
                childrenContainer.className = `tree-children ${isExpanded ? '' : 'collapsed'}`;
                buildBranch(node.id, childrenContainer);
                wrapper.appendChild(childrenContainer);
            }

            container.appendChild(wrapper);
        }
    }

    function hasMatchingDescendant(id) {
        const kids = childrenMap.get(id) || [];
        for (const k of kids) {
            if (k.title.toLowerCase().includes(state.searchQuery.toLowerCase())) return true;
            if (hasMatchingDescendant(k.id)) return true;
        }
        return false;
    }

    buildBranch(null, treeContainer);
}

function toggleNodeExpand(id) {
    if (state.expandedNodes.has(id)) {
        state.expandedNodes.delete(id);
    } else {
        state.expandedNodes.add(id);
    }
    localStorage.setItem('treekeep_expanded', JSON.stringify(Array.from(state.expandedNodes)));
    renderTree();
}

function expandAll() {
    for (const id of state.nodes.keys()) state.expandedNodes.add(id);
    localStorage.setItem('treekeep_expanded', JSON.stringify(Array.from(state.expandedNodes)));
    renderTree();
}

function collapseAll() {
    state.expandedNodes.clear();
    localStorage.setItem('treekeep_expanded', JSON.stringify([]));
    renderTree();
}

// --- Node Selection & In-Place Loading ---
function selectNode(id) {
    hideFloatingToolbars();

    if (!id || !state.nodes.has(id)) {
        state.activeNodeId = null;
        noNoteSelected.style.display = 'flex';
        noteView.style.display = 'none';
        footerPath.textContent = 'Node: None';
        return;
    }

    state.activeNodeId = id;
    localStorage.setItem('treekeep_active', id);
    noNoteSelected.style.display = 'none';
    noteView.style.display = 'flex';

    const node = state.nodes.get(id);
    noteTitleInput.value = node.title || '';
    noteTagsInput.value = node.tags || '';
    iconPickerBtn.textContent = ICON_MAP[node.icon] || '📁';
    updateNodeColorDot(node.color);

    // Set content in WYSIWYG editor
    setEditorContent(node.content || '');

    // Read-only state
    applyReadOnlyState(!!node.is_readonly);

    updateBreadcrumbs(id);
    updateWordStats();
    renderTree();

    footerPath.textContent = `Node: ${node.title}`;
    footerTime.textContent = `Last edited ${new Date(node.updated_at || Date.now()).toLocaleTimeString()}`;
}

function setEditorContent(content) {
    if (!content) {
        noteEditor.innerHTML = '';
        return;
    }

    // If content looks like raw markdown from earlier ctb/ctd import, convert to clean HTML
    if (content.includes('```') || content.includes('# ') || content.includes('- [ ]') || content.includes('| --- |')) {
        noteEditor.innerHTML = convertMarkdownToHtml(content);
    } else {
        noteEditor.innerHTML = content;
    }
}

function updateNodeColorDot(color) {
    if (color) {
        titleColorDot.style.display = 'inline-block';
        titleColorDot.style.backgroundColor = color;
    } else {
        titleColorDot.style.display = 'none';
    }
}

function updateBreadcrumbs(id) {
    const crumbs = [];
    let cur = state.nodes.get(id);
    while (cur) {
        crumbs.unshift(cur);
        cur = cur.parent_id ? state.nodes.get(cur.parent_id) : null;
    }

    breadcrumbs.innerHTML = '';
    crumbs.forEach((c, idx) => {
        const span = document.createElement('span');
        span.textContent = c.title;
        if (idx === crumbs.length - 1) {
            span.className = 'crumb-active';
        } else {
            span.style.cursor = 'pointer';
            span.onclick = () => selectNode(c.id);
        }
        breadcrumbs.appendChild(span);

        if (idx < crumbs.length - 1) {
            const sep = document.createElement('span');
            sep.textContent = ' / ';
            sep.style.color = 'var(--text-muted)';
            breadcrumbs.appendChild(sep);
        }
    });
}

// --- Delta Sync Logic ---
async function sendDeltaPatch(nodeId, partialUpdate) {
    if (!nodeId) return;

    state.isSyncing = true;
    setSyncStatus('syncing', 'Saving delta...');

    if (state.nodes.has(nodeId)) {
        const existing = state.nodes.get(nodeId);
        Object.assign(existing, partialUpdate, { updated_at: Date.now() });
        state.nodes.set(nodeId, existing);
    }
    saveLocalNodesBackup();

    if (state.isServerMode) {
        const payload = JSON.stringify(partialUpdate);
        const byteSize = new Blob([payload]).size;
        try {
            const res = await fetch(`${API_BASE}/api/nodes/${nodeId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: payload
            });
            const updated = await res.json();
            if (state.nodes.has(nodeId)) {
                Object.assign(state.nodes.get(nodeId), updated);
            }
            state.isSyncing = false;
            setSyncStatus('live', 'Live Delta-Sync Ready');
            footerSyncDetail.textContent = `Delta saved: ~${byteSize} B`;
            footerTime.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
        } catch (err) {
            state.isSyncing = false;
            setSyncStatus('offline', 'Offline (changes stored locally)');
            console.error('Delta sync error:', err);
        }
    } else {
        state.isSyncing = false;
        setSyncStatus('live', 'Saved locally');
        footerSyncDetail.textContent = `Local Storage (~${new Blob([JSON.stringify(partialUpdate)]).size} B)`;
        footerTime.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
    }
}

function scheduleSave(field, value) {
    if (!state.activeNodeId) return;
    clearTimeout(state.saveTimer);

    const node = state.nodes.get(state.activeNodeId);
    if (node) node[field] = value;

    state.saveTimer = setTimeout(() => {
        sendDeltaPatch(state.activeNodeId, { [field]: value });
    }, 350);
}

// --- CRUD Node Operations ---
async function createNewRootNode() {
    const now = Date.now();
    const newId = 'node-' + Math.random().toString(36).substring(2, 10) + '-' + now;
    const newNode = {
        id: newId,
        parent_id: null,
        title: 'New Note',
        content: '',
        icon: 'file-text',
        tags: '',
        color: '',
        position: state.nodes.size,
        is_expanded: 1,
        created_at: now,
        updated_at: now
    };

    if (state.isServerMode) {
        try {
            const res = await fetch(`${API_BASE}/api/nodes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newNode)
            });
            const created = await res.json();
            state.nodes.set(created.id, created);
            renderTree();
            selectNode(created.id);
        } catch (err) {
            console.error('Failed to create root node:', err);
        }
    } else {
        state.nodes.set(newId, newNode);
        saveLocalNodesBackup();
        renderTree();
        selectNode(newId);
    }

    noteTitleInput.focus();
    noteTitleInput.select();
}

async function createSubNode(parentId) {
    const now = Date.now();
    const newId = 'node-' + Math.random().toString(36).substring(2, 10) + '-' + now;
    const subNode = {
        id: newId,
        parent_id: parentId,
        title: 'New Sub-Note',
        content: '',
        icon: 'file-text',
        tags: '',
        color: '',
        position: 0,
        is_expanded: 1,
        created_at: now,
        updated_at: now
    };

    if (state.isServerMode) {
        try {
            const res = await fetch(`${API_BASE}/api/nodes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(subNode)
            });
            const created = await res.json();
            state.nodes.set(created.id, created);
            state.expandedNodes.add(parentId);
            renderTree();
            selectNode(created.id);
        } catch (err) {
            console.error('Failed to create subnode:', err);
        }
    } else {
        state.nodes.set(newId, subNode);
        state.expandedNodes.add(parentId);
        saveLocalNodesBackup();
        renderTree();
        selectNode(newId);
    }

    noteTitleInput.focus();
    noteTitleInput.select();
}

async function duplicateCurrentNode() {
    if (!state.activeNodeId || !state.nodes.has(state.activeNodeId)) return;
    const orig = state.nodes.get(state.activeNodeId);
    const now = Date.now();
    const dupId = 'node-' + Math.random().toString(36).substring(2, 10) + '-' + now;

    const dupNode = {
        id: dupId,
        parent_id: orig.parent_id,
        title: orig.title + ' (Copy)',
        content: orig.content,
        icon: orig.icon,
        tags: orig.tags,
        color: orig.color || '',
        position: orig.position + 1,
        is_expanded: 1,
        created_at: now,
        updated_at: now
    };

    if (state.isServerMode) {
        try {
            const res = await fetch(`${API_BASE}/api/nodes`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dupNode)
            });
            const created = await res.json();
            state.nodes.set(created.id, created);
            renderTree();
            selectNode(created.id);
        } catch (err) {
            console.error('Failed to duplicate node:', err);
        }
    } else {
        state.nodes.set(dupId, dupNode);
        saveLocalNodesBackup();
        renderTree();
        selectNode(dupId);
    }
}

async function deleteNode(id) {
    if (!confirm('Are you sure you want to delete this note and its sub-notes?')) return;

    if (state.isServerMode) {
        try {
            await fetch(`${API_BASE}/api/nodes/${id}`, { method: 'DELETE' });
            state.nodes.delete(id);
            if (state.activeNodeId === id) selectNode(null);
            renderTree();
        } catch (err) {
            console.error('Failed to delete node:', err);
        }
    } else {
        function removeBranch(nodeId) {
            state.nodes.delete(nodeId);
            for (const [k, n] of state.nodes.entries()) {
                if (n.parent_id === nodeId) removeBranch(k);
            }
        }
        removeBranch(id);
        saveLocalNodesBackup();
        if (state.activeNodeId === id) selectNode(null);
        renderTree();
    }
}

// --- Node Position Reordering ---
function moveActiveNode(direction) {
    if (!state.activeNodeId || !state.nodes.has(state.activeNodeId)) return;
    const current = state.nodes.get(state.activeNodeId);

    const siblings = Array.from(state.nodes.values())
        .filter(n => n.parent_id === current.parent_id)
        .sort((a, b) => a.position - b.position);

    const idx = siblings.findIndex(n => n.id === current.id);
    if (idx === -1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= siblings.length) return;

    const target = siblings[targetIdx];
    const tempPos = current.position;
    current.position = target.position;
    target.position = tempPos;

    sendDeltaPatch(current.id, { position: current.position });
    sendDeltaPatch(target.id, { position: target.position });
    renderTree();
}

// --- Read-Only Mode ---
function toggleReadOnlyMode() {
    if (!state.activeNodeId || !state.nodes.has(state.activeNodeId)) return;
    const node = state.nodes.get(state.activeNodeId);
    const newStatus = !node.is_readonly;
    node.is_readonly = newStatus ? 1 : 0;
    applyReadOnlyState(newStatus);
    sendDeltaPatch(state.activeNodeId, { is_readonly: node.is_readonly });
}

function applyReadOnlyState(isReadOnly) {
    state.isReadOnly = isReadOnly;
    const btn = document.getElementById('btn-toggle-readonly');
    if (btn) {
        btn.textContent = isReadOnly ? '🔒 Read Only' : '🔓 Read/Write';
        btn.className = `btn btn-sm ${isReadOnly ? 'btn-danger' : 'btn-secondary'}`;
    }
    noteEditor.contentEditable = !isReadOnly;
    noteTitleInput.readOnly = isReadOnly;
    noteTagsInput.readOnly = isReadOnly;
}

// --- WYSIWYG Formatting Actions (ExecCommand + In-place DOM) ---
function execFormat(command, value = null) {
    if (state.isReadOnly) return;
    noteEditor.focus();
    document.execCommand(command, false, value);
    handleEditorInput();
}

function handleFontFamilyChange(font) {
    if (state.isReadOnly) return;
    if (font === 'inherit') {
        document.execCommand('fontName', false, '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif');
    } else {
        document.execCommand('fontName', false, font);
    }
    handleEditorInput();
}

function handleFontSizeChange(size) {
    if (state.isReadOnly) return;
    noteEditor.focus();
    const sel = window.getSelection();
    if (!sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontSize = size;
    try {
        range.surroundContents(span);
    } catch (e) {
        document.execCommand('fontSize', false, '3');
    }
    handleEditorInput();
}

function handleHeadingChange(val) {
    if (state.isReadOnly) return;
    noteEditor.focus();
    if (val === 'p') {
        document.execCommand('formatBlock', false, '<p>');
    } else {
        document.execCommand('formatBlock', false, `<${val}>`);
    }
    handleEditorInput();
}

function handleCalloutInsert(type) {
    if (state.isReadOnly || !type) return;
    const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️', danger: '🚨' };
    const html = `
        <div class="callout-box callout-${type}" contenteditable="false">
            <span class="callout-icon">${icons[type] || '💡'}</span>
            <div class="callout-content" contenteditable="true">Callout note text here...</div>
        </div><p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertTodoItem() {
    if (state.isReadOnly) return;
    const html = `
        <div class="todo-item" contenteditable="false">
            <input type="checkbox" onchange="this.nextElementSibling.classList.toggle('todo-done')">
            <span contenteditable="true" class="todo-text">Checklist task</span>
        </div><p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertTimestamp() {
    if (state.isReadOnly) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = ` [${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}] `;
    insertHtmlAtCursor(`<b>${stamp}</b>`);
}

function insertDivider() {
    if (state.isReadOnly) return;
    execFormat('insertHorizontalRule');
}

function insertHyperlink() {
    if (state.isReadOnly) return;
    const url = prompt('Enter Web Link URL (e.g. https://github.com):');
    if (url) {
        execFormat('createLink', url);
    }
}

// --- Cursor-Safe HTML Insertion ---
function insertHtmlAtCursor(html) {
    noteEditor.focus();
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) {
        noteEditor.innerHTML += html;
        handleEditorInput();
        return;
    }

    const range = sel.getRangeAt(0);
    range.deleteContents();

    const el = document.createElement('div');
    el.innerHTML = html;
    const frag = document.createDocumentFragment();
    let node, lastNode;
    while ((node = el.firstChild)) {
        lastNode = frag.appendChild(node);
    }
    range.insertNode(frag);

    if (lastNode) {
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    handleEditorInput();
}

function saveSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
        state.savedSelectionRange = sel.getRangeAt(0).cloneRange();
    }
}

function restoreSelection() {
    if (state.savedSelectionRange) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(state.savedSelectionRange);
    }
}

// --- CodeBox Modal & Insertion ---
function openCodeBoxModal() {
    saveSelection();
    document.getElementById('codebox-modal').style.display = 'flex';
    document.getElementById('codebox-text').focus();
}

function closeCodeBoxModal() {
    document.getElementById('codebox-modal').style.display = 'none';
}

function confirmInsertCodeBox() {
    if (state.isReadOnly) return;
    const lang = document.getElementById('codebox-lang').value || 'bash';
    const code = document.getElementById('codebox-text').value;
    const cleanCode = escapeHtml(code);

    restoreSelection();
    const html = `
        <div class="code-box" contenteditable="false">
            <div class="code-box-header">
                <span>${lang.toUpperCase()}</span>
                <button class="btn-copy-code" onclick="copySnippet(this)">📋 Copy Code</button>
            </div>
            <pre contenteditable="true"><code>${cleanCode || 'code snippet here...'}</code></pre>
        </div><p><br></p>
    `;
    insertHtmlAtCursor(html);
    document.getElementById('codebox-text').value = '';
    closeCodeBoxModal();
}

function copySnippet(btn) {
    const pre = btn.closest('.code-box').querySelector('pre code');
    if (!pre) return;
    navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.textContent = '✓ Copied!';
        setTimeout(() => { btn.textContent = '📋 Copy Code'; }, 2000);
    });
}

// --- Photos, Screenshots & Clipboard Paste ---
function triggerImageUpload() {
    if (state.isReadOnly) return;
    saveSelection();
    document.getElementById('image-file-input').click();
}

function handleImageFileSelected(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        restoreSelection();
        insertImageElement(event.target.result, file.name);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
}

function handleClipboardPaste(e) {
    if (state.isReadOnly) return;
    const items = (e.clipboardData || e.originalEvent?.clipboardData)?.items;
    if (!items) return;

    for (const item of items) {
        if (item.type.indexOf('image') === 0) {
            e.preventDefault();
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = (event) => {
                insertImageElement(event.target.result, 'Pasted Screenshot');
            };
            reader.readAsDataURL(blob);
            return;
        }
    }
}

function insertImageElement(src, alt) {
    const html = `<p><img src="${src}" alt="${alt || 'Image'}" style="max-width:100%;"><br></p>`;
    insertHtmlAtCursor(html);
}

// Floating Image Controls
function setupImageInteractions() {
    noteEditor.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            selectImageElement(e.target);
        } else {
            hideImageToolbar();
        }
    });
}

function selectImageElement(img) {
    state.activeImageElement = img;
    document.querySelectorAll('.wysiwyg-canvas img').forEach(i => i.classList.remove('selected-img'));
    img.classList.add('selected-img');
    imageToolbar.style.display = 'flex';
}

function hideImageToolbar() {
    if (state.activeImageElement) {
        state.activeImageElement.classList.remove('selected-img');
        state.activeImageElement = null;
    }
    imageToolbar.style.display = 'none';
}

function setImageSize(pct) {
    if (!state.activeImageElement) return;
    state.activeImageElement.style.width = pct;
    handleEditorInput();
}

function setImageAlign(alignment) {
    if (!state.activeImageElement) return;
    const img = state.activeImageElement;
    if (alignment === 'left') {
        img.style.display = 'inline-block';
        img.style.float = 'left';
        img.style.margin = '0 16px 16px 0';
    } else if (alignment === 'center') {
        img.style.display = 'block';
        img.style.float = 'none';
        img.style.margin = '16px auto';
    } else if (alignment === 'right') {
        img.style.display = 'inline-block';
        img.style.float = 'right';
        img.style.margin = '0 0 16px 16px';
    }
    handleEditorInput();
}

function deleteActiveImage() {
    if (!state.activeImageElement) return;
    state.activeImageElement.remove();
    hideImageToolbar();
    handleEditorInput();
}

// --- Draw / Insert Table Studio ---
function openTableModal() {
    saveSelection();
    document.getElementById('table-modal').style.display = 'flex';
}

function closeTableModal() {
    document.getElementById('table-modal').style.display = 'none';
}

function confirmInsertTable() {
    if (state.isReadOnly) return;
    const rows = parseInt(document.getElementById('tbl-input-rows').value, 10) || 3;
    const cols = parseInt(document.getElementById('tbl-input-cols').value, 10) || 3;

    let html = '<table><thead><tr>';
    for (let c = 0; c < cols; c++) {
        html += `<th contenteditable="true">Header ${c + 1}</th>`;
    }
    html += '</tr></thead><tbody>';

    for (let r = 0; r < rows - 1; r++) {
        html += '<tr>';
        for (let c = 0; c < cols; c++) {
            html += `<td contenteditable="true">Item</td>`;
        }
        html += '</tr>';
    }
    html += '</tbody></table><p><br></p>';

    restoreSelection();
    insertHtmlAtCursor(html);
    closeTableModal();
}

// Floating Table Actions
function setupTableInteractions() {
    noteEditor.addEventListener('focusin', (e) => {
        const cell = e.target.closest('td, th');
        if (cell) {
            state.activeTableCell = cell;
            state.activeTableElement = cell.closest('table');
            tableToolbar.style.display = 'flex';
        } else if (!e.target.closest('#table-toolbar')) {
            tableToolbar.style.display = 'none';
        }
    });
}

function addTableRow(above = false) {
    if (!state.activeTableCell || !state.activeTableElement) return;
    const tr = state.activeTableCell.closest('tr');
    const colsCount = tr.children.length;
    const newTr = document.createElement('tr');
    for (let i = 0; i < colsCount; i++) {
        const td = document.createElement('td');
        td.contentEditable = true;
        td.textContent = 'Item';
        newTr.appendChild(td);
    }
    if (above) {
        tr.parentNode.insertBefore(newTr, tr);
    } else {
        tr.parentNode.insertBefore(newTr, tr.nextSibling);
    }
    handleEditorInput();
}

function addTableColumn(left = false) {
    if (!state.activeTableCell || !state.activeTableElement) return;
    const cellIdx = state.activeTableCell.cellIndex;
    const table = state.activeTableElement;

    for (const row of table.rows) {
        const isHeader = row.parentNode.tagName === 'THEAD';
        const cell = document.createElement(isHeader ? 'th' : 'td');
        cell.contentEditable = true;
        cell.textContent = isHeader ? 'Header' : 'Item';
        if (left) {
            row.insertBefore(cell, row.children[cellIdx]);
        } else {
            row.insertBefore(cell, row.children[cellIdx + 1] || null);
        }
    }
    handleEditorInput();
}

function deleteTableRow() {
    if (!state.activeTableCell || !state.activeTableElement) return;
    const tr = state.activeTableCell.closest('tr');
    tr.remove();
    tableToolbar.style.display = 'none';
    handleEditorInput();
}

function deleteTableColumn() {
    if (!state.activeTableCell || !state.activeTableElement) return;
    const cellIdx = state.activeTableCell.cellIndex;
    const table = state.activeTableElement;
    for (const row of table.rows) {
        if (row.children[cellIdx]) row.children[cellIdx].remove();
    }
    tableToolbar.style.display = 'none';
    handleEditorInput();
}

function deleteEntireTable() {
    if (!state.activeTableElement) return;
    state.activeTableElement.remove();
    tableToolbar.style.display = 'none';
    handleEditorInput();
}

function hideFloatingToolbars() {
    if (tableToolbar) tableToolbar.style.display = 'none';
    if (imageToolbar) imageToolbar.style.display = 'none';
}

// --- Windows Paint & Signature Studio ---
function setupPaintStudio() {
    const canvas = document.getElementById('paint-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Fill canvas initial background with clean white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Tools
    document.getElementById('btn-paint-tool-signature').onclick = () => setPaintTool('signature');
    document.getElementById('btn-paint-tool-brush').onclick = () => setPaintTool('brush');
    document.getElementById('btn-paint-tool-eraser').onclick = () => setPaintTool('eraser');

    // Width slider
    const widthSlider = document.getElementById('paint-width-slider');
    const widthVal = document.getElementById('paint-width-val');
    widthSlider.oninput = (e) => {
        state.paintWidth = parseInt(e.target.value, 10);
        widthVal.textContent = state.paintWidth + 'px';
    };

    // Color palette
    document.querySelectorAll('.paint-color-opt').forEach(opt => {
        opt.onclick = () => {
            document.querySelectorAll('.paint-color-opt').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            state.paintColor = opt.dataset.color;
            if (state.paintTool === 'eraser') setPaintTool('brush');
        };
    });

    const customColor = document.getElementById('paint-custom-color');
    if (customColor) {
        customColor.oninput = (e) => {
            state.paintColor = e.target.value;
            if (state.paintTool === 'eraser') setPaintTool('brush');
        };
    }

    // Clear canvas
    document.getElementById('btn-paint-clear').onclick = () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    // Drawing Events
    function getCanvasCoords(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    canvas.addEventListener('mousedown', (e) => {
        state.isPainting = true;
        const pt = getCanvasCoords(e);
        state.paintPoints = [pt];
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!state.isPainting) return;
        const pt = getCanvasCoords(e);
        state.paintPoints.push(pt);

        ctx.lineWidth = state.paintWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (state.paintTool === 'eraser') {
            ctx.strokeStyle = '#ffffff';
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
        } else if (state.paintTool === 'signature') {
            // Smooth Bezier Curve interpolation for signature
            ctx.strokeStyle = state.paintColor;
            if (state.paintPoints.length >= 3) {
                const p0 = state.paintPoints[state.paintPoints.length - 2];
                const p1 = state.paintPoints[state.paintPoints.length - 1];
                const midX = (p0.x + p1.x) / 2;
                const midY = (p0.y + p1.y) / 2;
                ctx.quadraticCurveTo(p0.x, p0.y, midX, midY);
                ctx.stroke();
            } else {
                ctx.lineTo(pt.x, pt.y);
                ctx.stroke();
            }
        } else {
            // Regular paint brush
            ctx.strokeStyle = state.paintColor;
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
        }
    });

    window.addEventListener('mouseup', () => {
        if (state.isPainting) {
            state.isPainting = false;
            state.paintPoints = [];
        }
    });

    // Touch support for mobile/tablets
    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            state.isPainting = true;
            const pt = getCanvasCoords(e.touches[0]);
            state.paintPoints = [pt];
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!state.isPainting || e.touches.length !== 1) return;
        e.preventDefault();
        const pt = getCanvasCoords(e.touches[0]);
        state.paintPoints.push(pt);

        ctx.lineWidth = state.paintWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = state.paintTool === 'eraser' ? '#ffffff' : state.paintColor;
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
    });

    canvas.addEventListener('touchend', () => {
        state.isPainting = false;
        state.paintPoints = [];
    });

    // Insert into note
    document.getElementById('btn-paint-insert').onclick = () => {
        const dataUrl = canvas.toDataURL('image/png');
        closePaintModal();
        restoreSelection();
        insertImageElement(dataUrl, state.paintTool === 'signature' ? 'Handwritten Signature' : 'Paint Drawing');
    };
}

function setPaintTool(tool) {
    state.paintTool = tool;
    document.getElementById('btn-paint-tool-signature').classList.toggle('active', tool === 'signature');
    document.getElementById('btn-paint-tool-brush').classList.toggle('active', tool === 'brush');
    document.getElementById('btn-paint-tool-eraser').classList.toggle('active', tool === 'eraser');
}

function openPaintModal() {
    saveSelection();
    document.getElementById('paint-modal').style.display = 'flex';
}

function closePaintModal() {
    document.getElementById('paint-modal').style.display = 'none';
}

// --- Node Color Picker Modal ---
function openNodeColorModal() {
    if (state.isReadOnly || !state.activeNodeId) return;
    document.getElementById('node-color-modal').style.display = 'flex';
}

function closeNodeColorModal() {
    document.getElementById('node-color-modal').style.display = 'none';
}

function applyNodeColor(color) {
    if (!state.activeNodeId) return;
    const node = state.nodes.get(state.activeNodeId);
    if (!node) return;

    node.color = color;
    updateNodeColorDot(color);
    sendDeltaPatch(state.activeNodeId, { color });
    renderTree();
    closeNodeColorModal();
}

// --- Node Anchor Links ---
function openNodeLinkModal() {
    if (state.isReadOnly) return;
    saveSelection();
    document.getElementById('nodelink-modal').style.display = 'flex';
    renderNodeLinkList('');
}

function closeNodeLinkModal() {
    document.getElementById('nodelink-modal').style.display = 'none';
}

function renderNodeLinkList(search) {
    const list = document.getElementById('nodelink-list');
    list.innerHTML = '';
    const q = search.toLowerCase();

    for (const node of state.nodes.values()) {
        if (node.id === state.activeNodeId) continue;
        if (q && !node.title.toLowerCase().includes(q)) continue;

        const div = document.createElement('div');
        div.className = 'nodelink-item';
        div.innerHTML = `${ICON_MAP[node.icon] || '📁'} <b>${node.title}</b>`;
        div.onclick = () => {
            restoreSelection();
            insertNodeLink(node.id, node.title);
            closeNodeLinkModal();
        };
        list.appendChild(div);
    }
}

function insertNodeLink(targetId, targetTitle) {
    const html = `<a href="javascript:void(0)" class="node-anchor-link" data-node-id="${targetId}" onclick="selectNode('${targetId}')">📌 ${targetTitle}</a> `;
    insertHtmlAtCursor(html);
}

// --- Find & Replace ---
function toggleFindBar() {
    const isVisible = findReplaceBar.style.display === 'flex';
    if (isVisible) {
        closeFindBar();
    } else {
        findReplaceBar.style.display = 'flex';
        findInput.focus();
        findInput.select();
    }
}

function closeFindBar() {
    findReplaceBar.style.display = 'none';
    findCount.textContent = '';
}

function performFind() {
    const query = findInput.value.trim();
    if (!query) {
        findCount.textContent = '';
        return;
    }

    if (window.find) {
        const found = window.find(query, false, false, true, false, false, false);
        findCount.textContent = found ? 'Found match' : '0 matches';
    }
}

function performReplace() {
    const query = findInput.value;
    const replacement = replaceInput.value;
    if (!query) return;

    const sel = window.getSelection();
    if (sel && sel.toString().toLowerCase() === query.toLowerCase()) {
        document.execCommand('insertText', false, replacement);
        handleEditorInput();
        performFind();
    } else {
        performFind();
    }
}

function performReplaceAll() {
    const query = findInput.value;
    const replacement = replaceInput.value;
    if (!query) return;

    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    noteEditor.innerHTML = noteEditor.innerHTML.replace(regex, replacement);
    handleEditorInput();
    findCount.textContent = 'All replaced';
}

// --- Tree Info Modal ---
function openTreeInfoModal() {
    const modal = document.getElementById('tree-info-modal');
    const container = document.getElementById('tree-info-content');

    let totalWords = 0;
    let totalChars = 0;
    for (const n of state.nodes.values()) {
        const text = (n.content || '').replace(/<[^>]*>/g, ' ');
        totalWords += text.trim() ? text.trim().split(/\s+/).length : 0;
        totalChars += text.length;
    }

    const activeNode = state.activeNodeId ? state.nodes.get(state.activeNodeId) : null;
    let depth = 0;
    let cur = activeNode;
    while (cur && cur.parent_id) {
        depth++;
        cur = state.nodes.get(cur.parent_id);
    }

    const subnodesCount = activeNode ? Array.from(state.nodes.values()).filter(n => n.parent_id === activeNode.id).length : 0;

    container.innerHTML = `
        <table style="width:100%; border-collapse:collapse; font-size:0.9rem;">
            <tr><td style="padding:6px; font-weight:600;">Total Notes in Tree:</td><td>${state.nodes.size}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Total Notebook Words:</td><td>${totalWords.toLocaleString()}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Total Notebook Characters:</td><td>${totalChars.toLocaleString()}</td></tr>
            <tr><td colspan="2"><hr style="border:none; border-top:1px solid var(--border-color); margin:8px 0;"></td></tr>
            <tr><td style="padding:6px; font-weight:600;">Selected Note:</td><td>${activeNode ? activeNode.title : 'None'}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Node Depth:</td><td>Level ${depth}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Sub-Notes Count:</td><td>${subnodesCount}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Node ID:</td><td><code>${activeNode ? activeNode.id : '-'}</code></td></tr>
            <tr><td style="padding:6px; font-weight:600;">Node Color:</td><td><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${activeNode?.color || 'transparent'};border:1px solid var(--border-color);"></span> ${activeNode?.color || 'Default'}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Created:</td><td>${activeNode ? new Date(activeNode.created_at).toLocaleString() : '-'}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Last Modified:</td><td>${activeNode ? new Date(activeNode.updated_at).toLocaleString() : '-'}</td></tr>
        </table>
    `;
    modal.style.display = 'flex';
}

function closeTreeInfoModal() {
    document.getElementById('tree-info-modal').style.display = 'none';
}

// --- GitHub Sync Modal ---
function openGitHubModal() {
    const modal = document.getElementById('github-modal');
    modal.style.display = 'flex';
    const conf = JSON.parse(localStorage.getItem('treekeep_gh_config') || '{}');
    if (conf.username) document.getElementById('gh-username').value = conf.username;
    if (conf.repo) document.getElementById('gh-repo').value = conf.repo;
    if (conf.token) document.getElementById('gh-token').value = conf.token;
}

function closeGitHubModal() {
    document.getElementById('github-modal').style.display = 'none';
}

async function connectAndSyncGitHub() {
    const username = document.getElementById('gh-username').value.trim();
    const repo = document.getElementById('gh-repo').value.trim();
    const token = document.getElementById('gh-token').value.trim();
    const statusDiv = document.getElementById('gh-sync-status');

    if (!username || !repo || !token) {
        statusDiv.innerHTML = '<span style="color:var(--danger);">Please enter username, repo name, and Personal Access Token.</span>';
        return;
    }

    localStorage.setItem('treekeep_gh_config', JSON.stringify({ username, repo, token }));
    statusDiv.innerHTML = 'Connecting to GitHub API...';

    try {
        const testRes = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!testRes.ok) {
            throw new Error(`GitHub returned status ${testRes.status}`);
        }

        statusDiv.innerHTML = 'Backing up notes to repository...';
        const allNodes = Array.from(state.nodes.values());
        const jsonContent = JSON.stringify(allNodes, null, 2);
        const encodedContent = btoa(unescape(encodeURIComponent(jsonContent)));

        let sha = null;
        try {
            const checkFile = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/data/notes.json`, {
                headers: {
                    'Authorization': `token ${token}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (checkFile.ok) {
                const fileData = await checkFile.json();
                sha = fileData.sha;
            }
        } catch (e) {}

        const putRes = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/data/notes.json`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update notes backup [${new Date().toISOString()}]`,
                content: encodedContent,
                sha: sha || undefined
            })
        });

        if (putRes.ok) {
            statusDiv.innerHTML = `
                <div style="color:var(--success); font-weight:600;">✓ Successfully connected & synced to GitHub!</div>
                <div style="font-size:0.8rem; margin-top:4px;">Repo: <b>${username}/${repo}</b></div>
                <div style="font-size:0.8rem;">Live URL: <code>https://${username}.github.io/${repo}/</code></div>
            `;
            setSyncStatus('live', `Synced to GitHub (${username}/${repo})`);
        } else {
            const errData = await putRes.json();
            throw new Error(errData.message || 'Failed to sync');
        }
    } catch (err) {
        statusDiv.innerHTML = `<span style="color:var(--danger);">Error: ${err.message}</span>`;
    }
}

// --- Import / Export ---
function openImportModal() {
    document.getElementById('import-modal').style.display = 'flex';
}

function closeImportModal() {
    document.getElementById('import-modal').style.display = 'none';
}

async function doImportCherryTree() {
    const pathInput = document.getElementById('import-file-path').value.trim();
    const statusDiv = document.getElementById('import-status');
    statusDiv.textContent = 'Importing notes... please wait.';

    if (!state.isServerMode) {
        statusDiv.innerHTML = '<span style="color:var(--warning);">Local server required to import .ctb files directly from disk.</span>';
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/api/import/cherrytree`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: pathInput })
        });
        const data = await res.json();
        if (data.success) {
            statusDiv.innerHTML = `<span style="color:var(--success);">✓ Successfully imported ${data.count} notes!</span>`;
            setTimeout(() => {
                closeImportModal();
                loadTree();
            }, 1200);
        } else {
            statusDiv.innerHTML = `<span style="color:var(--danger);">Error: ${data.error}</span>`;
        }
    } catch (err) {
        statusDiv.innerHTML = `<span style="color:var(--danger);">Import failed: ${err.message}</span>`;
    }
}

function exportNotes() {
    const all = Array.from(state.nodes.values());
    const blob = new Blob([JSON.stringify(all, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `treekeep-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// --- Icon Picker ---
function openIconModal() {
    if (state.isReadOnly) return;
    document.getElementById('icon-modal').style.display = 'flex';
}

function closeIconModal() {
    document.getElementById('icon-modal').style.display = 'none';
}

function selectIcon(iconName) {
    if (!state.activeNodeId || state.isReadOnly) return;
    iconPickerBtn.textContent = ICON_MAP[iconName] || '📁';
    closeIconModal();
    sendDeltaPatch(state.activeNodeId, { icon: iconName });
    renderTree();
}

// --- Word Stats & Editor Input ---
function handleEditorInput() {
    if (state.isReadOnly) return;
    updateWordStats();
    scheduleSave('content', noteEditor.innerHTML);
}

function updateWordStats() {
    const text = noteEditor.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    footerStats.textContent = `${words} words, ${chars} characters`;
}

// --- Markdown to HTML Converter for Legacy / Imported Notes ---
function convertMarkdownToHtml(md) {
    let html = escapeHtml(md);

    // Code Blocks
    html = html.replace(/```([a-zA-Z0-9_\-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'code';
        return `
            <div class="code-box" contenteditable="false">
                <div class="code-box-header"><span>${language.toUpperCase()}</span><button class="btn-copy-code" onclick="copySnippet(this)">📋 Copy Code</button></div>
                <pre contenteditable="true"><code>${code.trim()}</code></pre>
            </div><p><br></p>
        `;
    });

    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    html = html.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    html = html.replace(/~~([^~]+)~~/g, '<s>$1</s>');
    html = html.replace(/^- \[x\] (.*$)/gim, '<div class="todo-item" contenteditable="false"><input type="checkbox" checked onchange="this.nextElementSibling.classList.toggle(\'todo-done\')"><span contenteditable="true" class="todo-text todo-done">$1</span></div>');
    html = html.replace(/^- \[ \] (.*$)/gim, '<div class="todo-item" contenteditable="false"><input type="checkbox" onchange="this.nextElementSibling.classList.toggle(\'todo-done\')"><span contenteditable="true" class="todo-text">$1</span></div>');
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/\n\n/g, '<p></p>');
    html = html.replace(/\n/g, '<br>');
    return html;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// --- Setup All Event Listeners ---
function setupEventListeners() {
    // Theme toggle
    document.getElementById('btn-theme').onclick = toggleTheme;

    // Title editing
    noteTitleInput.addEventListener('input', (e) => {
        if (state.isReadOnly) return;
        scheduleSave('title', e.target.value);
        if (state.activeNodeId && state.nodes.has(state.activeNodeId)) {
            state.nodes.get(state.activeNodeId).title = e.target.value;
            const itemLabel = document.querySelector(`.tree-node[data-id="${state.activeNodeId}"] .tree-label`);
            if (itemLabel) itemLabel.textContent = e.target.value || 'Untitled Note';
        }
    });

    // Tags editing
    noteTagsInput.addEventListener('input', (e) => {
        if (state.isReadOnly) return;
        scheduleSave('tags', e.target.value);
    });

    // Editor content editing
    noteEditor.addEventListener('input', handleEditorInput);
    noteEditor.addEventListener('paste', handleClipboardPaste);

    // Tab key indent in editor
    noteEditor.addEventListener('keydown', (e) => {
        if (state.isReadOnly) return;
        if (e.key === 'Tab') {
            e.preventDefault();
            document.execCommand('insertHTML', false, '&nbsp;&nbsp;&nbsp;&nbsp;');
            handleEditorInput();
        }
    });

    // Undo / Redo
    document.getElementById('btn-undo').onclick = () => execFormat('undo');
    document.getElementById('btn-redo').onclick = () => execFormat('redo');

    // Font Family & Size
    document.getElementById('select-font-family').onchange = (e) => handleFontFamilyChange(e.target.value);
    document.getElementById('select-font-size').onchange = (e) => handleFontSizeChange(e.target.value);
    document.getElementById('select-heading').onchange = (e) => {
        handleHeadingChange(e.target.value);
        e.target.value = 'p';
    };

    // Text Styles
    document.getElementById('btn-bold').onclick = () => execFormat('bold');
    document.getElementById('btn-italic').onclick = () => execFormat('italic');
    document.getElementById('btn-underline').onclick = () => execFormat('underline');
    document.getElementById('btn-strike').onclick = () => execFormat('strikeThrough');
    document.getElementById('btn-subscript').onclick = () => execFormat('subscript');
    document.getElementById('btn-superscript').onclick = () => execFormat('superscript');

    // Colors
    document.getElementById('text-color-picker').onchange = (e) => execFormat('foreColor', e.target.value);
    document.getElementById('bg-color-picker').onchange = (e) => execFormat('hiliteColor', e.target.value);

    // Alignments
    document.getElementById('btn-align-left').onclick = () => execFormat('justifyLeft');
    document.getElementById('btn-align-center').onclick = () => execFormat('justifyCenter');
    document.getElementById('btn-align-right').onclick = () => execFormat('justifyRight');
    document.getElementById('btn-align-justify').onclick = () => execFormat('justifyFull');
    document.getElementById('btn-clear-format').onclick = () => execFormat('removeFormat');

    // Insertions (Row 2)
    document.getElementById('btn-open-paint').onclick = openPaintModal;
    document.getElementById('btn-insert-image').onclick = triggerImageUpload;
    document.getElementById('image-file-input').onchange = handleImageFileSelected;
    document.getElementById('btn-open-table-modal').onclick = openTableModal;
    document.getElementById('btn-insert-table-confirm').onclick = confirmInsertTable;
    document.getElementById('btn-insert-codebox').onclick = openCodeBoxModal;
    document.getElementById('btn-insert-codebox-confirm').onclick = confirmInsertCodeBox;
    document.getElementById('btn-insert-todo').onclick = insertTodoItem;
    document.getElementById('select-callout').onchange = (e) => {
        handleCalloutInsert(e.target.value);
        e.target.value = '';
    };
    document.getElementById('btn-bullet-list').onclick = () => execFormat('insertUnorderedList');
    document.getElementById('btn-numbered-list').onclick = () => execFormat('insertOrderedList');
    document.getElementById('btn-quote').onclick = () => execFormat('formatBlock', '<blockquote>');
    document.getElementById('btn-hr').onclick = insertDivider;
    document.getElementById('btn-insert-timestamp').onclick = insertTimestamp;
    document.getElementById('btn-insert-link').onclick = insertHyperlink;
    document.getElementById('btn-insert-nodelink').onclick = openNodeLinkModal;
    document.getElementById('nodelink-search').oninput = (e) => renderNodeLinkList(e.target.value);

    // Floating Image Toolbar Actions
    document.getElementById('btn-img-size-25').onclick = () => setImageSize('25%');
    document.getElementById('btn-img-size-50').onclick = () => setImageSize('50%');
    document.getElementById('btn-img-size-100').onclick = () => setImageSize('100%');
    document.getElementById('btn-img-align-left').onclick = () => setImageAlign('left');
    document.getElementById('btn-img-align-center').onclick = () => setImageAlign('center');
    document.getElementById('btn-img-align-right').onclick = () => setImageAlign('right');
    document.getElementById('btn-img-delete').onclick = deleteActiveImage;

    // Floating Table Toolbar Actions
    document.getElementById('btn-tbl-add-row-above').onclick = () => addTableRow(true);
    document.getElementById('btn-tbl-add-row-below').onclick = () => addTableRow(false);
    document.getElementById('btn-tbl-add-col-left').onclick = () => addTableColumn(true);
    document.getElementById('btn-tbl-add-col-right').onclick = () => addTableColumn(false);
    document.getElementById('btn-tbl-del-row').onclick = deleteTableRow;
    document.getElementById('btn-tbl-del-col').onclick = deleteTableColumn;
    document.getElementById('btn-tbl-del-table').onclick = deleteEntireTable;

    // Node Actions
    document.getElementById('btn-new-root').onclick = createNewRootNode;
    document.getElementById('btn-add-subnode').onclick = () => {
        if (state.activeNodeId) createSubNode(state.activeNodeId);
    };
    document.getElementById('btn-duplicate-node').onclick = duplicateCurrentNode;
    document.getElementById('btn-toggle-readonly').onclick = toggleReadOnlyMode;
    document.getElementById('btn-delete-node').onclick = () => {
        if (state.activeNodeId) deleteNode(state.activeNodeId);
    };

    // Node Color
    document.getElementById('btn-node-color').onclick = openNodeColorModal;
    document.querySelectorAll('.node-color-choice').forEach(btn => {
        btn.onclick = () => applyNodeColor(btn.dataset.color);
    });
    document.getElementById('btn-apply-custom-node-color').onclick = () => {
        const hex = document.getElementById('node-custom-color-input').value;
        applyNodeColor(hex);
    };

    // Node Move Up / Down
    document.getElementById('btn-move-up').onclick = () => moveActiveNode('up');
    document.getElementById('btn-move-down').onclick = () => moveActiveNode('down');

    // Expand / Collapse all
    document.getElementById('btn-expand-all').onclick = expandAll;
    document.getElementById('btn-collapse-all').onclick = collapseAll;

    // Icon Picker
    iconPickerBtn.onclick = openIconModal;
    document.querySelectorAll('.icon-opt').forEach(opt => {
        opt.onclick = () => selectIcon(opt.dataset.icon);
    });

    // Find & Replace
    document.getElementById('btn-toggle-find').onclick = toggleFindBar;
    document.getElementById('btn-find-close').onclick = closeFindBar;
    document.getElementById('btn-find-next').onclick = performFind;
    document.getElementById('btn-find-replace').onclick = performReplace;
    document.getElementById('btn-find-replace-all').onclick = performReplaceAll;

    // Tree Info & Modals
    document.getElementById('btn-tree-info').onclick = openTreeInfoModal;
    document.getElementById('btn-github-sync').onclick = openGitHubModal;
    document.getElementById('btn-gh-save').onclick = connectAndSyncGitHub;
    document.getElementById('btn-import-ct').onclick = openImportModal;
    document.getElementById('btn-do-import').onclick = doImportCherryTree;
    document.getElementById('btn-export').onclick = exportNotes;

    // Search
    const searchInput = document.getElementById('global-search');
    searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderTree();
    });

    // Global keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        const isCtrl = e.ctrlKey || e.metaKey;

        if (isCtrl && e.key.toLowerCase() === 'f') {
            e.preventDefault();
            toggleFindBar();
        }
        if (isCtrl && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.altKey && e.key === 'ArrowUp') {
            e.preventDefault();
            moveActiveNode('up');
        }
        if (e.altKey && e.key === 'ArrowDown') {
            e.preventDefault();
            moveActiveNode('down');
        }
    });

    // Setup interactive image and table listeners
    setupImageInteractions();
    setupTableInteractions();

    // Mobile sidebar toggle
    const toggleSidebarBtn = document.getElementById('btn-toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.onclick = () => sidebar.classList.toggle('open');
    }
}
