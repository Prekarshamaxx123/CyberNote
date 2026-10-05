// ==========================================================================
// TreeKeep - Reactive Client Application with Real-Time Delta Sync
// Full CherryTree Feature Set + GitHub Pages Hosting & Cloud Sync
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
    'check-square': '✅'
};

// Global App State
const state = {
    nodes: new Map(),
    activeNodeId: null,
    searchQuery: '',
    viewMode: 'split', // 'split', 'write', 'preview'
    theme: localStorage.getItem('treekeep_theme') || 'dark',
    expandedNodes: new Set(JSON.parse(localStorage.getItem('treekeep_expanded') || '[]')),
    saveTimer: null,
    isSyncing: false,
    isReadOnly: false,
    isServerMode: true,
    undoStack: [],
    redoStack: [],
    maxHistory: 50,
    findMatches: [],
    findCurrentIndex: -1
};

// --- DOM References ---
const treeContainer = document.getElementById('tree-container');
const noteView = document.getElementById('note-view');
const noNoteSelected = document.getElementById('no-note-selected');
const noteTitleInput = document.getElementById('note-title');
const noteTagsInput = document.getElementById('note-tags');
const noteTextarea = document.getElementById('note-content');
const notePreview = document.getElementById('note-preview');
const breadcrumbs = document.getElementById('breadcrumbs');
const iconPickerBtn = document.getElementById('btn-icon-picker');
const syncStatusBadge = document.getElementById('sync-status');
const footerSyncDetail = document.getElementById('footer-sync-detail');
const footerTime = document.getElementById('footer-time');
const footerStats = document.getElementById('footer-stats');
const footerPath = document.getElementById('footer-path');

// Undo/Redo Buttons
const btnUndo = document.getElementById('btn-undo');
const btnRedo = document.getElementById('btn-redo');

// Find & Replace
const findReplaceBar = document.getElementById('find-replace-bar');
const findInput = document.getElementById('find-input');
const replaceInput = document.getElementById('replace-input');
const findCount = document.getElementById('find-count');
const btnFindNext = document.getElementById('btn-find-next');
const btnFindReplace = document.getElementById('btn-find-replace');
const btnFindReplaceAll = document.getElementById('btn-find-replace-all');
const btnFindClose = document.getElementById('btn-find-close');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.theme);
    setupEventListeners();
    initApp();
});

async function initApp() {
    // Check if backend API is reachable
    try {
        const testRes = await fetch(`${API_BASE}/api/nodes?full=1`, { method: 'GET' });
        if (testRes.ok) {
            state.isServerMode = true;
            setupSSE();
            await loadTree();
            return;
        }
    } catch (e) {
        console.log('Local Node server not found, running in Static / GitHub Pages mode.');
    }

    // Static / GitHub Pages fallback
    state.isServerMode = false;
    setSyncStatus('live', 'GitHub Cloud Mode (Local Storage + GitHub Sync)');
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

// --- Real-time Delta Sync (SSE) for Server Mode ---
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
                    noteTextarea.value = updated.content || '';
                    renderMarkdown(updated.content || '');
                    updateBreadcrumbs(updated.id);
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
            if (state.activeNodeId === id) {
                selectNode(null);
            }
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
        // Save backup to localStorage for offline
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

    // If still empty, seed welcome notes
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
        content: '# Welcome to TreeKeep 🌲\n\n**TreeKeep** is your all-in-one hierarchical cloud notebook, fully compatible with CherryTree features and deployable to GitHub Pages!\n\n### 🚀 Features Included:\n- **Hierarchical Node Tree:** Infinite nesting, sub-notes, ordering & duplication.\n- **Undo & Redo:** Full history tracking (`Ctrl+Z`, `Ctrl+Y`).\n- **CherryTree Rich Inserters:** CodeBox, Tables, Images, Timestamps, and Internal Node Links.\n- **Direct Screenshot Pasting:** Press `Ctrl+V` to paste screenshots directly into notes.\n- **Find & Replace:** Press `Ctrl+F` for fast in-note search and replace.\n- **GitHub Cloud Sync & Pages:** Host on GitHub Pages and sync notes directly with your private GitHub repository!\n\n```bash\n# Test code snippet\necho "Organize all your notes with TreeKeep!"\n```',
        icon: 'book',
        tags: 'intro,welcome',
        position: 0,
        is_expanded: 1,
        created_at: now,
        updated_at: now
    };
    state.nodes.set(welcome.id, welcome);
    saveLocalNodesBackup();
}

// --- Tree Rendering ---
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
                              (node.tags && node.tags.toLowerCase().includes(state.searchQuery.toLowerCase()));
                if (!match && !hasMatchingDescendant(node.id)) continue;
            }

            const hasKids = (childrenMap.get(node.id) || []).length > 0;
            const isExpanded = state.expandedNodes.has(node.id) || !!state.searchQuery;

            const wrapper = document.createElement('div');
            wrapper.className = 'tree-node-wrapper';

            const item = document.createElement('div');
            item.className = `tree-node ${state.activeNodeId === node.id ? 'active' : ''}`;
            item.dataset.id = node.id;

            const arrow = document.createElement('span');
            arrow.className = `tree-arrow ${hasKids ? (isExpanded ? 'expanded' : '') : 'empty'}`;
            arrow.textContent = '▶';
            arrow.onclick = (e) => {
                e.stopPropagation();
                if (hasKids) toggleNodeExpand(node.id);
            };

            const icon = document.createElement('span');
            icon.className = 'tree-icon';
            icon.textContent = ICON_MAP[node.icon] || '📁';

            const label = document.createElement('span');
            label.className = 'tree-label';
            label.textContent = node.title || 'Untitled Note';

            const actions = document.createElement('div');
            actions.className = 'tree-actions';
            actions.innerHTML = `
                <button class="tree-btn" title="Add Sub-Note" onclick="event.stopPropagation(); createSubNode('${node.id}')">+</button>
                <button class="tree-btn" title="Delete" onclick="event.stopPropagation(); deleteNode('${node.id}')">✕</button>
            `;

            item.appendChild(arrow);
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

// --- Node Selection & Viewing ---
function selectNode(id) {
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
    noteTextarea.value = node.content || '';
    iconPickerBtn.textContent = ICON_MAP[node.icon] || '📁';

    // Reset history stack for new note
    state.undoStack = [];
    state.redoStack = [];
    updateUndoRedoButtons();

    // Check read-only state
    applyReadOnlyState(!!node.is_readonly);

    updateBreadcrumbs(id);
    renderMarkdown(node.content || '');
    updateWordStats(node.content || '');
    renderTree();

    footerPath.textContent = `Node: ${node.title}`;
    footerTime.textContent = `Last edited ${new Date(node.updated_at || Date.now()).toLocaleTimeString()}`;
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

// --- Undo / Redo System ---
function recordHistory(content, start, end) {
    if (state.undoStack.length >= state.maxHistory) {
        state.undoStack.shift();
    }
    state.undoStack.push({
        content: content !== undefined ? content : noteTextarea.value,
        start: start !== undefined ? start : noteTextarea.selectionStart,
        end: end !== undefined ? end : noteTextarea.selectionEnd
    });
    state.redoStack = [];
    updateUndoRedoButtons();
}

function performUndo() {
    if (state.undoStack.length === 0) return;
    const current = {
        content: noteTextarea.value,
        start: noteTextarea.selectionStart,
        end: noteTextarea.selectionEnd
    };
    state.redoStack.push(current);

    const prev = state.undoStack.pop();
    noteTextarea.value = prev.content;
    noteTextarea.setSelectionRange(prev.start, prev.end);
    renderMarkdown(prev.content);
    updateWordStats(prev.content);
    scheduleSave('content', prev.content);
    updateUndoRedoButtons();
}

function performRedo() {
    if (state.redoStack.length === 0) return;
    const current = {
        content: noteTextarea.value,
        start: noteTextarea.selectionStart,
        end: noteTextarea.selectionEnd
    };
    state.undoStack.push(current);

    const next = state.redoStack.pop();
    noteTextarea.value = next.content;
    noteTextarea.setSelectionRange(next.start, next.end);
    renderMarkdown(next.content);
    updateWordStats(next.content);
    scheduleSave('content', next.content);
    updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
    if (btnUndo) btnUndo.disabled = state.undoStack.length === 0;
    if (btnRedo) btnRedo.disabled = state.redoStack.length === 0;
}

// --- Delta Sync Logic (Micro-Payloads) ---
async function sendDeltaPatch(nodeId, partialUpdate) {
    if (!nodeId) return;

    state.isSyncing = true;
    setSyncStatus('syncing', 'Saving delta...');

    // Update local cache immediately
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
            footerSyncDetail.textContent = `Delta transmitted: ~${byteSize} bytes`;
            footerTime.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
        } catch (err) {
            state.isSyncing = false;
            setSyncStatus('offline', 'Offline (changes stored locally)');
            console.error('Delta sync error:', err);
        }
    } else {
        // Static GitHub mode
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

    // Micro-delay save debounce (350ms)
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
    if (!confirm('Are you sure you want to delete this note and its sub-nodes?')) return;

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
        // Recursive delete from map
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

// --- Node Position Reordering (Move Up / Move Down) ---
function moveActiveNode(direction) {
    if (!state.activeNodeId || !state.nodes.has(state.activeNodeId)) return;
    const current = state.nodes.get(state.activeNodeId);

    // Get siblings
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

// --- Read-Only Mode Toggle ---
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
    noteTextarea.readOnly = isReadOnly;
    noteTitleInput.readOnly = isReadOnly;
    noteTagsInput.readOnly = isReadOnly;
}

// --- Markdown Rendering & Rich Content ---
function renderMarkdown(md) {
    if (!md) {
        notePreview.innerHTML = '<p style="color:var(--text-muted);font-style:italic;">Empty note. Start typing to add notes...</p>';
        return;
    }

    let html = escapeHtml(md);

    // Code Blocks: ```lang ... ```
    html = html.replace(/```([a-zA-Z0-9_\-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'code';
        const cleanCode = code.trim();
        return `
            <div class="code-box">
                <div class="code-box-header">
                    <span>${language.toUpperCase()}</span>
                    <button class="btn-copy-code" onclick="copyCodeSnippet(this)">Copy</button>
                </div>
                <pre><code>${cleanCode}</code></pre>
            </div>
        `;
    });

    // Inline code: `code`
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headings
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold / Italic / Strike / Underline / Sub / Sup
    html = html.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
    html = html.replace(/\*([^*]+)\*/g, '<i>$1</i>');
    html = html.replace(/~~([^~]+)~~/g, '<s>$1</s>');
    html = html.replace(/&lt;u&gt;(.*?)&lt;\/u&gt;/gi, '<u>$1</u>');
    html = html.replace(/&lt;sub&gt;(.*?)&lt;\/sub&gt;/gi, '<sub>$1</sub>');
    html = html.replace(/&lt;sup&gt;(.*?)&lt;\/sup&gt;/gi, '<sup>$1</sup>');

    // Style spans & marks (color / background)
    html = html.replace(/&lt;span style=&quot;(.*?)&quot;&gt;(.*?)&lt;\/span&gt;/gi, '<span style="$1">$2</span>');
    html = html.replace(/&lt;mark style=&quot;(.*?)&quot;&gt;(.*?)&lt;\/mark&gt;/gi, '<mark style="$1">$2</mark>');

    // Images: ![alt](url)
    html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1">');

    // Internal Node Anchor Links: [Title](#node-ID)
    html = html.replace(/\[(.*?)\]\(#node-([a-zA-Z0-9_\-]+)\)/g, '<a href="javascript:void(0)" class="node-anchor-link" onclick="selectNode(\'$2\')">📌 $1</a>');

    // External Links: [title](url)
    html = html.replace(/\[(.*?)\]\((https?:\/\/[^\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

    // Interactive Checkboxes
    html = html.replace(/^- \[x\] (.*$)/gim, '<div class="todo-item"><input type="checkbox" checked onchange="toggleTodo(this)"> <s>$1</s></div>');
    html = html.replace(/^- \[ \] (.*$)/gim, '<div class="todo-item"><input type="checkbox" onchange="toggleTodo(this)"> $1</div>');

    // Blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');

    // Horizontal Rule
    html = html.replace(/^---$/gim, '<hr style="border:none;border-top:1px solid var(--border-color);margin:16px 0;">');

    // Tables: | col1 | col2 |
    html = renderMarkdownTables(html);

    // Bullet lists
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');

    // Paragraph breaks
    html = html.replace(/\n\n/g, '<p></p>');
    html = html.replace(/\n/g, '<br>');

    notePreview.innerHTML = html;
}

function renderMarkdownTables(text) {
    const tableRegex = /((?:\|.+?\|\r?\n)+)/g;
    return text.replace(tableRegex, (match) => {
        const lines = match.trim().split('\n');
        if (lines.length < 2) return match;

        let tableHtml = '<table><thead>';
        const headers = lines[0].split('|').filter(c => c.trim().length > 0);
        tableHtml += '<tr>' + headers.map(h => `<th>${h.trim()}</th>`).join('') + '</tr></thead><tbody>';

        // Check if row 1 is divider
        const startRow = lines[1].includes('---') ? 2 : 1;
        for (let i = startRow; i < lines.length; i++) {
            const cols = lines[i].split('|').filter(c => c.trim().length > 0);
            if (cols.length > 0) {
                tableHtml += '<tr>' + cols.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
            }
        }
        tableHtml += '</tbody></table>';
        return tableHtml;
    });
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function copyCodeSnippet(btn) {
    const pre = btn.closest('.code-box').querySelector('pre code');
    if (!pre) return;
    navigator.clipboard.writeText(pre.innerText).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
    });
}

function toggleTodo(checkbox) {
    if (state.isReadOnly) {
        checkbox.checked = !checkbox.checked;
        return;
    }
    const parent = checkbox.closest('.todo-item');
    const label = parent.textContent.trim();
    const isChecked = checkbox.checked;

    recordHistory();
    let content = noteTextarea.value;
    if (isChecked) {
        content = content.replace(`- [ ] ${label}`, `- [x] ${label}`);
    } else {
        content = content.replace(`- [x] ${label}`, `- [ ] ${label}`);
    }
    noteTextarea.value = content;
    renderMarkdown(content);
    scheduleSave('content', content);
}

function updateWordStats(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    footerStats.textContent = `${words} words, ${chars} characters`;
}

// --- Format Button Inserters ---
function applyFormat(type) {
    if (state.isReadOnly) return;
    const ta = noteTextarea;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = ta.value.substring(start, end);
    let before = ta.value.substring(0, start);
    let after = ta.value.substring(end);
    let inserted = '';

    recordHistory();

    switch (type) {
        case 'h1': inserted = `# ${sel || 'Heading 1'}\n`; break;
        case 'h2': inserted = `## ${sel || 'Heading 2'}\n`; break;
        case 'h3': inserted = `### ${sel || 'Heading 3'}\n`; break;
        case 'bold': inserted = `**${sel || 'bold text'}**`; break;
        case 'italic': inserted = `*${sel || 'italic text'}*`; break;
        case 'underline': inserted = `<u>${sel || 'underlined text'}</u>`; break;
        case 'strike': inserted = `~~${sel || 'struck text'}~~`; break;
        case 'sub': inserted = `<sub>${sel || 'sub'}</sub>`; break;
        case 'sup': inserted = `<sup>${sel || 'sup'}</sup>`; break;
        case 'code': inserted = `\`${sel || 'code'}\``; break;
        case 'quote': inserted = `> ${sel || 'Quote'}\n`; break;
        case 'hr': inserted = `\n---\n`; break;
        case 'todo': inserted = `- [ ] ${sel || 'To-do item'}\n`; break;
        case 'bullet': inserted = `- ${sel || 'List item'}\n`; break;
        case 'numbered': inserted = `1. ${sel || 'Numbered item'}\n`; break;
        case 'link': inserted = `[${sel || 'link title'}](https://example.com)`; break;
    }

    ta.value = before + inserted + after;
    ta.focus();
    renderMarkdown(ta.value);
    scheduleSave('content', ta.value);
}

// --- Heading Selector Handler ---
function handleHeadingSelect(val) {
    if (state.isReadOnly) return;
    const ta = noteTextarea;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const text = ta.value;

    // Find start of current line
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    let lineEnd = text.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = text.length;

    let line = text.substring(lineStart, lineEnd);
    // Strip existing headings
    line = line.replace(/^#{1,6}\s*/, '');

    recordHistory();
    if (val === 'h1') line = '# ' + line;
    else if (val === 'h2') line = '## ' + line;
    else if (val === 'h3') line = '### ' + line;

    ta.value = text.substring(0, lineStart) + line + text.substring(lineEnd);
    ta.focus();
    renderMarkdown(ta.value);
    scheduleSave('content', ta.value);
}

// --- Color Pickers ---
function applyTextColor(color) {
    if (state.isReadOnly) return;
    const ta = noteTextarea;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = ta.value.substring(start, end) || 'colored text';

    recordHistory();
    const tag = `<span style="color:${color}">${sel}</span>`;
    ta.value = ta.value.substring(0, start) + tag + ta.value.substring(end);
    renderMarkdown(ta.value);
    scheduleSave('content', ta.value);
}

function applyHighlightColor(color) {
    if (state.isReadOnly) return;
    const ta = noteTextarea;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const sel = ta.value.substring(start, end) || 'highlighted text';

    recordHistory();
    const tag = `<mark style="background-color:${color};color:#000;">${sel}</mark>`;
    ta.value = ta.value.substring(0, start) + tag + ta.value.substring(end);
    renderMarkdown(ta.value);
    scheduleSave('content', ta.value);
}

// --- Timestamp Inserter ---
function insertTimestamp() {
    if (state.isReadOnly) return;
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const stamp = `[${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}]`;

    const ta = noteTextarea;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    recordHistory();
    ta.value = ta.value.substring(0, start) + stamp + ta.value.substring(end);
    renderMarkdown(ta.value);
    scheduleSave('content', ta.value);
}

// --- Table Inserter ---
function insertTable() {
    if (state.isReadOnly) return;
    const tableTemplate = `\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Item 1   | Item 2   | Item 3   |\n| Item 4   | Item 5   | Item 6   |\n\n`;
    const ta = noteTextarea;
    const start = ta.selectionStart;
    recordHistory();
    ta.value = ta.value.substring(0, start) + tableTemplate + ta.value.substring(start);
    renderMarkdown(ta.value);
    scheduleSave('content', ta.value);
}

// --- CodeBox Modal & Insertion ---
function openCodeBoxModal() {
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
    const formatted = `\n\`\`\`${lang}\n${code}\n\`\`\`\n`;

    const ta = noteTextarea;
    const start = ta.selectionStart;
    recordHistory();
    ta.value = ta.value.substring(0, start) + formatted + ta.value.substring(start);
    renderMarkdown(ta.value);
    scheduleSave('content', ta.value);

    document.getElementById('codebox-text').value = '';
    closeCodeBoxModal();
}

// --- Image Insertion & Screenshot Clipboard Paste ---
function triggerImageUpload() {
    if (state.isReadOnly) return;
    document.getElementById('image-file-input').click();
}

function handleImageFileSelected(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const dataUrl = event.target.result;
        insertImageDataUrl(dataUrl, file.name);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
}

function handleClipboardPaste(e) {
    if (state.isReadOnly) return;
    const items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (const item of items) {
        if (item.type.indexOf('image') === 0) {
            e.preventDefault();
            const blob = item.getAsFile();
            const reader = new FileReader();
            reader.onload = (event) => {
                insertImageDataUrl(event.target.result, 'Pasted Screenshot');
            };
            reader.readAsDataURL(blob);
            break;
        }
    }
}

function insertImageDataUrl(dataUrl, alt) {
    const ta = noteTextarea;
    const start = ta.selectionStart;
    const tag = `\n![${alt || 'Image'}](${dataUrl})\n`;
    recordHistory();
    ta.value = ta.value.substring(0, start) + tag + ta.value.substring(start);
    renderMarkdown(ta.value);
    scheduleSave('content', ta.value);
}

// --- Internal Node Link Inserter ---
function openNodeLinkModal() {
    if (state.isReadOnly) return;
    const modal = document.getElementById('nodelink-modal');
    const list = document.getElementById('nodelink-list');
    modal.style.display = 'flex';
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
        div.style.padding = '8px 12px';
        div.style.cursor = 'pointer';
        div.style.borderBottom = '1px solid var(--border-color)';
        div.innerHTML = `${ICON_MAP[node.icon] || '📝'} <b>${node.title}</b>`;
        div.onclick = () => {
            insertNodeLink(node.id, node.title);
            closeNodeLinkModal();
        };
        list.appendChild(div);
    }
}

function insertNodeLink(targetId, targetTitle) {
    const ta = noteTextarea;
    const start = ta.selectionStart;
    const tag = `[${targetTitle}](#node-${targetId})`;
    recordHistory();
    ta.value = ta.value.substring(0, start) + tag + ta.value.substring(start);
    renderMarkdown(ta.value);
    scheduleSave('content', ta.value);
}

// --- Find & Replace Bar ---
function toggleFindBar() {
    const isVisible = findReplaceBar.style.display === 'flex';
    if (isVisible) {
        closeFindBar();
    } else {
        findReplaceBar.style.display = 'flex';
        findInput.focus();
        findInput.select();
        performFind();
    }
}

function closeFindBar() {
    findReplaceBar.style.display = 'none';
    state.findMatches = [];
    state.findCurrentIndex = -1;
    findCount.textContent = '';
}

function performFind() {
    const query = findInput.value;
    if (!query) {
        state.findMatches = [];
        state.findCurrentIndex = -1;
        findCount.textContent = '';
        return;
    }

    const text = noteTextarea.value.toLowerCase();
    const q = query.toLowerCase();
    const matches = [];
    let pos = 0;
    while ((pos = text.indexOf(q, pos)) !== -1) {
        matches.push(pos);
        pos += q.length;
    }

    state.findMatches = matches;
    if (matches.length > 0) {
        state.findCurrentIndex = 0;
        highlightFindMatch(state.findCurrentIndex);
        findCount.textContent = `1 of ${matches.length}`;
    } else {
        state.findCurrentIndex = -1;
        findCount.textContent = '0 matches';
    }
}

function findNextMatch() {
    if (state.findMatches.length === 0) return;
    state.findCurrentIndex = (state.findCurrentIndex + 1) % state.findMatches.length;
    highlightFindMatch(state.findCurrentIndex);
    findCount.textContent = `${state.findCurrentIndex + 1} of ${state.findMatches.length}`;
}

function highlightFindMatch(idx) {
    const pos = state.findMatches[idx];
    const len = findInput.value.length;
    noteTextarea.focus();
    noteTextarea.setSelectionRange(pos, pos + len);
}

function replaceCurrentMatch() {
    if (state.findMatches.length === 0 || state.findCurrentIndex === -1) return;
    const pos = state.findMatches[state.findCurrentIndex];
    const len = findInput.value.length;
    const rep = replaceInput.value;

    recordHistory();
    noteTextarea.value = noteTextarea.value.substring(0, pos) + rep + noteTextarea.value.substring(pos + len);
    renderMarkdown(noteTextarea.value);
    scheduleSave('content', noteTextarea.value);
    performFind();
}

function replaceAllMatches() {
    const query = findInput.value;
    if (!query) return;
    const rep = replaceInput.value;

    recordHistory();
    const regex = new RegExp(query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    noteTextarea.value = noteTextarea.value.replace(regex, rep);
    renderMarkdown(noteTextarea.value);
    scheduleSave('content', noteTextarea.value);
    performFind();
}

// --- Tree Info Modal ---
function openTreeInfoModal() {
    const modal = document.getElementById('tree-info-modal');
    const container = document.getElementById('tree-info-content');

    let totalWords = 0;
    let totalChars = 0;
    for (const n of state.nodes.values()) {
        const text = n.content || '';
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
            <tr><td style="padding:6px; font-weight:600;">Selected Node:</td><td>${activeNode ? activeNode.title : 'None'}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Node Depth Level:</td><td>${depth}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Direct Sub-Nodes:</td><td>${subnodesCount}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Node ID:</td><td><code>${activeNode ? activeNode.id : '-'}</code></td></tr>
            <tr><td style="padding:6px; font-weight:600;">Created:</td><td>${activeNode ? new Date(activeNode.created_at).toLocaleString() : '-'}</td></tr>
            <tr><td style="padding:6px; font-weight:600;">Last Modified:</td><td>${activeNode ? new Date(activeNode.updated_at).toLocaleString() : '-'}</td></tr>
        </table>
    `;
    modal.style.display = 'flex';
}

function closeTreeInfoModal() {
    document.getElementById('tree-info-modal').style.display = 'none';
}

// --- GitHub Pages & Cloud Sync Modal ---
function openGitHubModal() {
    const modal = document.getElementById('github-modal');
    modal.style.display = 'flex';

    // Populate existing config
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
        // Test repository access
        const testRes = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!testRes.ok) {
            throw new Error(`GitHub responded with status ${testRes.status} (${testRes.statusText})`);
        }

        // Push current notes to repo: data/notes.json
        statusDiv.innerHTML = 'Pushing notes backup to GitHub repository...';
        const allNodes = Array.from(state.nodes.values());
        const jsonContent = JSON.stringify(allNodes, null, 2);
        const encodedContent = btoa(unescape(encodeURIComponent(jsonContent)));

        // Check if data/notes.json already exists to get its SHA
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
        } catch (e) {
            // Not found, will create new
        }

        const putRes = await fetch(`https://api.github.com/repos/${username}/${repo}/contents/data/notes.json`, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: `Update notes backup from TreeKeep [${new Date().toISOString()}]`,
                content: encodedContent,
                sha: sha || undefined
            })
        });

        if (putRes.ok) {
            statusDiv.innerHTML = `
                <div style="color:var(--success); font-weight:600;">✓ Successfully connected & synced to GitHub!</div>
                <div style="font-size:0.8rem; margin-top:4px;">Repository: <b>${username}/${repo}</b></div>
                <div style="font-size:0.8rem;">Live on GitHub Pages: <code>https://${username}.github.io/${repo}/</code></div>
            `;
            setSyncStatus('live', `Synced to GitHub (${username}/${repo})`);
        } else {
            const errData = await putRes.json();
            throw new Error(errData.message || 'Failed to commit notes to GitHub');
        }
    } catch (err) {
        statusDiv.innerHTML = `<span style="color:var(--danger);">Error: ${err.message}</span>`;
    }
}

// --- View Modes ---
function setViewMode(mode) {
    state.viewMode = mode;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`btn-mode-${mode}`).classList.add('active');

    const editorCont = document.getElementById('editor-container');
    const prevCont = document.getElementById('preview-container');

    if (mode === 'split') {
        editorCont.style.display = 'block';
        prevCont.style.display = 'block';
    } else if (mode === 'write') {
        editorCont.style.display = 'block';
        prevCont.style.display = 'none';
    } else if (mode === 'preview') {
        editorCont.style.display = 'none';
        prevCont.style.display = 'block';
    }
}

// --- Modals ---
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
        statusDiv.innerHTML = '<span style="color:var(--warning);">Local server required to import .ctb files directly from disk. Running in static mode.</span>';
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

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Theme toggle
    document.getElementById('btn-theme').onclick = toggleTheme;

    // View mode switch
    document.getElementById('btn-mode-split').onclick = () => setViewMode('split');
    document.getElementById('btn-mode-write').onclick = () => setViewMode('write');
    document.getElementById('btn-mode-preview').onclick = () => setViewMode('preview');

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

    // Content editing with history tracking
    noteTextarea.addEventListener('beforeinput', (e) => {
        if (!state.isReadOnly && (e.inputType === 'insertParagraph' || e.inputType === 'deleteContentBackward')) {
            recordHistory();
        }
    });

    noteTextarea.addEventListener('input', (e) => {
        if (state.isReadOnly) return;
        renderMarkdown(e.target.value);
        updateWordStats(e.target.value);
        scheduleSave('content', e.target.value);
    });

    // Screenshot Clipboard Paste
    noteTextarea.addEventListener('paste', handleClipboardPaste);

    // Tab key in textarea
    noteTextarea.addEventListener('keydown', (e) => {
        if (state.isReadOnly) return;
        if (e.key === 'Tab') {
            e.preventDefault();
            recordHistory();
            const start = noteTextarea.selectionStart;
            const end = noteTextarea.selectionEnd;
            noteTextarea.value = noteTextarea.value.substring(0, start) + '    ' + noteTextarea.value.substring(end);
            noteTextarea.selectionStart = noteTextarea.selectionEnd = start + 4;
            renderMarkdown(noteTextarea.value);
            scheduleSave('content', noteTextarea.value);
        }
    });

    // Format buttons (Row 1 & Row 2)
    document.querySelectorAll('.tb-btn[data-format]').forEach(btn => {
        btn.onclick = () => applyFormat(btn.dataset.format);
    });

    // Heading select
    const headingSelect = document.getElementById('select-heading');
    if (headingSelect) {
        headingSelect.onchange = (e) => {
            handleHeadingSelect(e.target.value);
            e.target.value = 'p';
        };
    }

    // Color pickers
    const textColorPicker = document.getElementById('text-color-picker');
    if (textColorPicker) {
        textColorPicker.onchange = (e) => applyTextColor(e.target.value);
    }
    const bgColorPicker = document.getElementById('bg-color-picker');
    if (bgColorPicker) {
        bgColorPicker.onchange = (e) => applyHighlightColor(e.target.value);
    }

    // Undo / Redo buttons
    if (btnUndo) btnUndo.onclick = performUndo;
    if (btnRedo) btnRedo.onclick = performRedo;

    // CodeBox
    document.getElementById('btn-insert-codebox').onclick = openCodeBoxModal;
    document.getElementById('btn-insert-codebox-confirm').onclick = confirmInsertCodeBox;

    // Image Upload
    document.getElementById('btn-insert-image').onclick = triggerImageUpload;
    document.getElementById('image-file-input').onchange = handleImageFileSelected;

    // Table & Timestamp & NodeLink
    document.getElementById('btn-insert-table').onclick = insertTable;
    document.getElementById('btn-insert-timestamp').onclick = insertTimestamp;
    document.getElementById('btn-insert-nodelink').onclick = openNodeLinkModal;
    document.getElementById('nodelink-search').oninput = (e) => renderNodeLinkList(e.target.value);

    // Find & Replace
    document.getElementById('btn-toggle-find').onclick = toggleFindBar;
    btnFindClose.onclick = closeFindBar;
    findInput.oninput = performFind;
    btnFindNext.onclick = findNextMatch;
    btnFindReplace.onclick = replaceCurrentMatch;
    btnFindReplaceAll.onclick = replaceAllMatches;

    // Tree Info
    document.getElementById('btn-tree-info').onclick = openTreeInfoModal;

    // GitHub Sync
    document.getElementById('btn-github-sync').onclick = openGitHubModal;
    document.getElementById('btn-gh-save').onclick = connectAndSyncGitHub;

    // Node Action buttons
    document.getElementById('btn-new-root').onclick = createNewRootNode;
    document.getElementById('btn-add-subnode').onclick = () => {
        if (state.activeNodeId) createSubNode(state.activeNodeId);
    };
    document.getElementById('btn-duplicate-node').onclick = duplicateCurrentNode;
    document.getElementById('btn-toggle-readonly').onclick = toggleReadOnlyMode;
    document.getElementById('btn-delete-node').onclick = () => {
        if (state.activeNodeId) deleteNode(state.activeNodeId);
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

    // Import / Export
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

        // Undo: Ctrl+Z
        if (isCtrl && !e.shiftKey && e.key.toLowerCase() === 'z') {
            if (document.activeElement === noteTextarea) {
                e.preventDefault();
                performUndo();
            }
        }
        // Redo: Ctrl+Y or Ctrl+Shift+Z
        if ((isCtrl && e.key.toLowerCase() === 'y') || (isCtrl && e.shiftKey && e.key.toLowerCase() === 'z')) {
            if (document.activeElement === noteTextarea) {
                e.preventDefault();
                performRedo();
            }
        }
        // Find: Ctrl+F
        if (isCtrl && e.key.toLowerCase() === 'f') {
            e.preventDefault();
            toggleFindBar();
        }
        // Global Search: Ctrl+K
        if (isCtrl && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        // Reordering: Alt+Up / Alt+Down
        if (e.altKey && e.key === 'ArrowUp') {
            e.preventDefault();
            moveActiveNode('up');
        }
        if (e.altKey && e.key === 'ArrowDown') {
            e.preventDefault();
            moveActiveNode('down');
        }
    });

    // Mobile sidebar toggle
    const toggleSidebarBtn = document.getElementById('btn-toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    if (toggleSidebarBtn && sidebar) {
        toggleSidebarBtn.onclick = () => {
            sidebar.classList.toggle('open');
        };
    }
}
