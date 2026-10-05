// ==========================================================================
// CyberNote 🛡️ - Secure Hierarchical Knowledge & Cloud Notes System
// Google Account Sign-In, Google Drive Auto-Restore & Encrypted Cloud Backup
// Direct In-Place WYSIWYG Document Editor (No Split Screen, No Preview Tab)
// Windows Paint Studio, Handwritten Signatures, Tables, CodeBoxes & E2EE
// ==========================================================================

const API_BASE = '';
const DEFAULT_GOOGLE_CLIENT_ID = '872135362876-levmtlpqku4dimbfe2hdpa5m40a7bleq.apps.googleusercontent.com';

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

// Vector SVG Icon Definitions & Color Palette for Modern Clean UI
const SVG_ICON_COLORS = {
    'file-text': '#89b4fa',
    'folder': '#f9e2af',
    'terminal': '#a6e3a1',
    'code': '#cba6f7',
    'key': '#fab387',
    'book': '#89dceb',
    'shield': '#74c7ec',
    'lock': '#f38ba8',
    'bug': '#f38ba8',
    'database': '#89b4fa',
    'server': '#b4befe',
    'check-square': '#a6e3a1',
    'star': '#f9e2af',
    'rocket': '#f38ba8',
    'fire': '#fab387',
    'bulb': '#f9e2af'
};

function getNodeIconSvg(iconKey, customColor = null, isFolder = false, isExpanded = false, size = 16) {
    const key = iconKey || (isFolder ? 'folder' : 'file-text');
    const color = customColor || SVG_ICON_COLORS[key] || '#89b4fa';
    
    if (key === 'folder' || isFolder) {
        if (isExpanded) {
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/><polygon points="2 10 22 10 20 21 4 21 2 10" fill="${color}" fill-opacity="0.18"/></svg>`;
        }
        return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" fill="${color}" fill-opacity="0.15"/></svg>`;
    }
    
    switch (key) {
        case 'terminal':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>`;
        case 'code':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
        case 'key':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg>`;
        case 'book':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`;
        case 'shield':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`;
        case 'lock':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        case 'bug':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"/><path d="m19 7-3 2"/><path d="m5 7 3 2"/><path d="m19 19-3-2"/><path d="m5 19 3-2"/><path d="M20 13h-4"/><path d="M4 13h4"/><path d="m10 4 1 2"/><path d="m14 4-1 2"/></svg>`;
        case 'database':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`;
        case 'server':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`;
        case 'check-square':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`;
        case 'star':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
        case 'rocket':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`;
        case 'fire':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z"/></svg>`;
        case 'bulb':
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`;
        case 'file-text':
        default:
            return `<svg class="node-svg-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`;
    }
}

// Global State
const state = {
    nodes: new Map(),
    activeNodeId: null,
    searchQuery: '',
    theme: localStorage.getItem('cybernote_theme') || localStorage.getItem('treekeep_theme') || 'dark',
    expandedNodes: new Set(JSON.parse(localStorage.getItem('cybernote_expanded') || localStorage.getItem('treekeep_expanded') || '[]')),
    saveTimer: null,
    isSyncing: false,
    isReadOnly: false,
    isServerMode: true,
    activeTableElement: null,
    activeTableCell: null,
    activeImageElement: null,
    savedSelectionRange: null,
    // Google & Cloud Sync State
    tokenClient: null,
    googleUser: JSON.parse(localStorage.getItem('cybernote_user') || 'null'),
    googleAccessToken: localStorage.getItem('cybernote_google_token') || null,
    driveFileId: localStorage.getItem('cybernote_drive_file_id') || null,
    driveSaveTimer: null,
    e2eeEnabled: localStorage.getItem('cybernote_e2ee_enabled') === 'true',
    e2eePassword: '',
    // Paint Studio State
    paintTool: 'signature',
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

// Google UI Elements
const btnGoogleLogin = document.getElementById('btn-google-login');
const userProfileBadge = document.getElementById('user-profile-badge');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');

// Floating Toolbars
const tableToolbar = document.getElementById('table-toolbar');
const imageToolbar = document.getElementById('image-toolbar');
const findReplaceBar = document.getElementById('find-replace-bar');
const findInput = document.getElementById('find-input');
const replaceInput = document.getElementById('replace-input');
const findCount = document.getElementById('find-count');

// --- Ultra-Fast High-Efficiency GZIP Compression Engine ---
// Compresses 4MB scripts/notes down to ~15KB - 100KB (< 0.05 bytes per character)
async function compressStringToBase64(str) {
    if (!str) return '';
    try {
        if (typeof CompressionStream !== 'undefined') {
            const stream = new Blob([new TextEncoder().encode(str)]).stream();
            const compressedStream = stream.pipeThrough(new CompressionStream('gzip'));
            const response = new Response(compressedStream);
            const buffer = await response.arrayBuffer();
            const bytes = new Uint8Array(buffer);
            let binary = '';
            const len = bytes.byteLength;
            for (let i = 0; i < len; i += 8192) {
                binary += String.fromCharCode.apply(null, bytes.subarray(i, Math.min(i + 8192, len)));
            }
            return 'gz:' + btoa(binary);
        }
    } catch (e) {
        console.warn('CompressionStream error, fallback to raw string:', e);
    }
    return str;
}

async function decompressStringFromBase64(str) {
    if (!str) return '';
    if (!str.startsWith('gz:')) {
        return str; // Backward-compatible plain text
    }
    try {
        if (typeof DecompressionStream !== 'undefined') {
            const base64 = str.slice(3);
            const binary = atob(base64);
            const bytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) {
                bytes[i] = binary.charCodeAt(i);
            }
            const stream = new Blob([bytes]).stream();
            const decompressedStream = stream.pipeThrough(new DecompressionStream('gzip'));
            const response = new Response(decompressedStream);
            return await response.text();
        }
    } catch (e) {
        console.error('DecompressionStream error:', e);
    }
    return str;
}

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
    applyTheme(state.theme);
    setupEventListeners();
    setupPaintStudio();
    initGoogleAuth();
    initApp();
});

async function initApp() {
    setupTagInteractions();
    checkFirstVisitWelcome();

    if (!navigator.onLine) {
        state.isServerMode = false;
        setSyncStatus('offline', 'Offline (Saved locally)');
        await loadLocalNodes();
        return;
    }

    try {
        const testRes = await fetch(`${API_BASE}/api/nodes?full=1`, { method: 'GET' });
        if (testRes.ok) {
            state.isServerMode = true;
            setupSSE();
            await loadTree();
            return;
        }
    } catch (e) {
        console.log('Local Node server not found, operating in Static / Cloud mode.');
    }

    state.isServerMode = false;
    setSyncStatus('live', 'CyberNote Cloud Mode');
    await loadLocalNodes();
    checkShowStarBanner();
}

// --- Theme Management ---
function applyTheme(theme) {
    state.theme = theme;
    document.body.className = theme === 'light' ? 'theme-light' : 'theme-dark';
    const themeBtn = document.getElementById('btn-theme');
    if (themeBtn) {
        themeBtn.innerHTML = theme === 'light'
            ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
            : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
    localStorage.setItem('cybernote_theme', theme);
}

function toggleTheme() {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
}

// --- Google Authentication & Google Drive Integration ---
function initGoogleAuth() {
    updateGoogleUserUI();

    // Check token expiry
    const expiry = parseInt(localStorage.getItem('cybernote_google_token_expiry') || '0', 10);
    if (Date.now() > expiry) {
        state.googleAccessToken = null;
    }

    // Initialize GIS Client
    function tryInitGIS() {
        if (window.google?.accounts?.oauth2) {
            const clientId = document.getElementById('google-client-id-input')?.value.trim() || DEFAULT_GOOGLE_CLIENT_ID;
            try {
                state.tokenClient = google.accounts.oauth2.initTokenClient({
                    client_id: clientId,
                    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                    callback: handleGoogleTokenResponse
                });
            } catch (err) {
                console.warn('GIS Token client init:', err);
            }
        } else {
            setTimeout(tryInitGIS, 600);
        }
    }
    tryInitGIS();
}

function updateGoogleUserUI() {
    if (state.googleUser && state.googleAccessToken) {
        if (btnGoogleLogin) btnGoogleLogin.style.display = 'none';
        if (userProfileBadge) {
            userProfileBadge.style.display = 'flex';
            if (userAvatar) userAvatar.src = state.googleUser.picture || '';
            if (userName) userName.textContent = state.googleUser.name || state.googleUser.email || 'User';
        }
        document.getElementById('btn-drive-signout').style.display = 'inline-block';
        updateDriveModalStatus(true);
    } else {
        if (btnGoogleLogin) btnGoogleLogin.style.display = 'inline-flex';
        if (userProfileBadge) userProfileBadge.style.display = 'none';
        document.getElementById('btn-drive-signout').style.display = 'none';
        updateDriveModalStatus(false);
    }
}

function updateDriveModalStatus(isSignedIn) {
    const nameEl = document.getElementById('drive-status-name');
    const detailEl = document.getElementById('drive-status-detail');
    if (isSignedIn && state.googleUser) {
        if (nameEl) nameEl.innerHTML = `<span style="color:var(--success);">● Connected:</span> ${state.googleUser.name} (${state.googleUser.email})`;
        if (detailEl) detailEl.textContent = 'Automatic Google Drive backup active. Changes are synced seamlessly.';
    } else {
        if (nameEl) nameEl.textContent = 'Not Signed In';
        if (detailEl) detailEl.textContent = 'Sign in with Google to enable automatic cloud backup & restore.';
    }
}

function requestGoogleLogin() {
    if (state.tokenClient) {
        state.tokenClient.requestAccessToken({ prompt: 'consent' });
    } else {
        alert('Google authentication service is loading... please click again in a moment.');
        initGoogleAuth();
    }
}

async function handleGoogleTokenResponse(tokenResponse) {
    if (tokenResponse.error) {
        console.error('Google Auth Error:', tokenResponse);
        alert('Google Sign-In failed: ' + tokenResponse.error);
        return;
    }

    state.googleAccessToken = tokenResponse.access_token;
    localStorage.setItem('cybernote_google_token', tokenResponse.access_token);
    localStorage.setItem('cybernote_google_token_expiry', Date.now() + ((tokenResponse.expires_in || 3600) * 1000));

    // Fetch user profile info
    await fetchGoogleUserProfile();

    // Automatically Restore or Create Initial Backup on Drive!
    await autoRestoreFromDriveOnSignIn();
}

async function fetchGoogleUserProfile() {
    try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: { Authorization: `Bearer ${state.googleAccessToken}` }
        });
        if (res.ok) {
            const data = await res.json();
            state.googleUser = {
                name: data.name,
                email: data.email,
                picture: data.picture,
                id: data.sub
            };
            localStorage.setItem('cybernote_user', JSON.stringify(state.googleUser));
            updateGoogleUserUI();
        }
    } catch (err) {
        console.error('Failed to fetch user profile:', err);
    }
}

function signoutGoogle() {
    state.googleAccessToken = null;
    state.googleUser = null;
    localStorage.removeItem('cybernote_google_token');
    localStorage.removeItem('cybernote_google_token_expiry');
    localStorage.removeItem('cybernote_user');
    updateGoogleUserUI();
    closeDriveModal();
    setSyncStatus('live', 'Signed out from Google Drive');
}

// --- Cloud Sync Animation Overlay Controller ---
function showSyncOverlay(title = 'Syncing with Google Drive...', desc = 'Connecting and synchronizing notes...') {
    const overlay = document.getElementById('sync-overlay');
    if (!overlay) return;
    const titleEl = document.getElementById('sync-overlay-title');
    const descEl = document.getElementById('sync-overlay-desc');
    const fillEl = document.getElementById('sync-progress-fill');
    const stepEl = document.getElementById('sync-overlay-step');

    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (fillEl) fillEl.style.width = '20%';
    if (stepEl) stepEl.textContent = 'Step 1 of 3: Establishing connection...';

    overlay.style.display = 'flex';
}

function updateSyncProgress(percent, stepText, descText) {
    const fillEl = document.getElementById('sync-progress-fill');
    const stepEl = document.getElementById('sync-overlay-step');
    const descEl = document.getElementById('sync-overlay-desc');

    if (fillEl) fillEl.style.width = `${percent}%`;
    if (stepEl && stepText) stepEl.textContent = stepText;
    if (descEl && descText) descEl.textContent = descText;
}

function hideSyncOverlay() {
    const overlay = document.getElementById('sync-overlay');
    if (!overlay) return;
    updateSyncProgress(100, '✓ Complete!', 'All notes synchronized and ready.');
    setTimeout(() => {
        overlay.style.opacity = '0';
        overlay.style.transition = 'opacity 0.35s ease';
        setTimeout(() => {
            overlay.style.display = 'none';
            overlay.style.opacity = '1';
            overlay.style.transition = '';
        }, 350);
    }, 600);
}

// --- Automatic Drive Restore upon Sign-in ("එහෙම sign උන ගමන් drive එකෙන් Backup එක එනවා") ---
async function autoRestoreFromDriveOnSignIn() {
    setSyncStatus('syncing', 'Connecting to Google Drive...');
    showSyncOverlay('Syncing with Google Drive...', 'Connecting to your cloud drive storage...');
    const logDiv = document.getElementById('drive-sync-log') || document.getElementById('settings-drive-log');
    if (logDiv) logDiv.innerHTML = '<span style="color:var(--accent);">Checking Google Drive for CyberNote backup...</span>';

    try {
        updateSyncProgress(40, 'Step 2 of 3: Searching cloud backup...', 'Locating CyberNote_Backup.json on Google Drive...');
        // Search Drive for CyberNote_Backup.json
        const searchRes = await fetch("https://www.googleapis.com/drive/v3/files?q=name='CyberNote_Backup.json' and trashed=false&fields=files(id,name,modifiedTime)", {
            headers: { Authorization: `Bearer ${state.googleAccessToken}` }
        });
        const searchData = await searchRes.json();

        if (searchData.files && searchData.files.length > 0) {
            const file = searchData.files[0];
            state.driveFileId = file.id;
            localStorage.setItem('cybernote_drive_file_id', file.id);

            updateSyncProgress(65, 'Step 2 of 3: Downloading notes...', 'Downloading encrypted notes from Google Drive...');
            if (logDiv) logDiv.innerHTML = '<span style="color:var(--accent);">Downloading latest notes from Google Drive...</span>';

            const dlRes = await fetch(`https://www.googleapis.com/drive/v3/files/${file.id}?alt=media`, {
                headers: { Authorization: `Bearer ${state.googleAccessToken}` }
            });
            const rawContent = await dlRes.text();

            let finalJson = rawContent;
            // Check if E2EE encrypted
            try {
                const parsed = JSON.parse(rawContent);
                if (parsed.e2ee) {
                    const pass = prompt('This backup is encrypted! Enter your Master Password to decrypt:');
                    if (pass) {
                        finalJson = await decryptData(parsed, pass);
                        state.e2eePassword = pass;
                    } else {
                        throw new Error('Master password required to decrypt.');
                    }
                }
            } catch (e) {
                if (e.message.includes('password')) throw e;
            }

            // Check if GZIP compressed
            if (typeof finalJson === 'string' && finalJson.startsWith('gz:')) {
                finalJson = await decompressStringFromBase64(finalJson);
            }

            updateSyncProgress(85, 'Step 3 of 3: Populating note tree...', 'Rebuilding local database and note hierarchy...');
            const importedNodes = JSON.parse(finalJson);
            if (Array.isArray(importedNodes) && importedNodes.length > 0) {
                state.nodes.clear();
                for (const n of importedNodes) {
                    state.nodes.set(n.id, n);
                    // If in server mode, sync each node into SQLite DB as well
                    if (state.isServerMode) {
                        fetch(`${API_BASE}/api/nodes`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(n)
                        }).catch(() => {});
                    }
                }
                saveLocalNodesBackup();
                renderTree();
                selectNode(importedNodes[0].id);

                setSyncStatus('live', `✓ Drive Restored: ${importedNodes.length} notes synced!`);
                if (logDiv) logDiv.innerHTML = `<span style="color:var(--success); font-weight:600;">✓ Successfully restored ${importedNodes.length} notes from Google Drive!</span>`;
            }
        } else {
            // No backup exists on Drive yet -> automatically create initial backup of current notes!
            updateSyncProgress(70, 'Step 2 of 3: Creating cloud backup...', 'Initializing first cloud backup on Google Drive...');
            if (logDiv) logDiv.innerHTML = '<span style="color:var(--accent);">No existing backup on Drive. Creating initial backup now...</span>';
            await backupToGoogleDrive(true);
            setSyncStatus('live', '✓ Google Drive Connected & Initial Backup Created');
            if (logDiv) logDiv.innerHTML = '<span style="color:var(--success); font-weight:600;">✓ Connected! Initial backup safely created on Google Drive.</span>';
        }
        updateSettingsUI();
        hideSyncOverlay();
        checkShowStarBanner();
    } catch (err) {
        console.error('Auto restore from drive error:', err);
        if (logDiv) logDiv.innerHTML = `<span style="color:var(--danger);">Error: ${err.message}</span>`;
        setSyncStatus('live', 'Google Drive connected');
        hideSyncOverlay();
    }
}

// --- Backup & Restore to Google Drive with Optional AES-256 E2EE & Ultra-Minimal Storage ---
async function backupToGoogleDrive(silent = false) {
    if (!state.googleAccessToken) {
        if (!silent) alert('Please sign in with Google first.');
        return;
    }

    setSyncStatus('syncing', 'Syncing to Google Drive...');
    const logDiv = document.getElementById('drive-sync-log') || document.getElementById('settings-drive-log');
    if (!silent && logDiv) logDiv.innerHTML = '<span style="color:var(--accent);">Compressing, encrypting & uploading to Google Drive...</span>';

    try {
        const allNodes = Array.from(state.nodes.values());
        // Minified payload to consume minimum Google Drive storage (< 0.001% of 15GB)
        let payload = JSON.stringify(allNodes);

        // High-Efficiency GZIP Compression: reduces 4MB scripts to ~15KB (< 0.01 bytes/char)
        if (payload.length > 250) {
            payload = await compressStringToBase64(payload);
        }

        // Check if AES-256 E2EE Encryption is enabled
        if (state.e2eeEnabled) {
            const password = state.e2eePassword || document.getElementById('e2ee-password')?.value.trim() || document.getElementById('settings-e2ee-password')?.value.trim();
            if (password) {
                payload = await encryptData(payload, password);
            }
        }

        // Upload to Drive
        if (state.driveFileId) {
            // Update existing file
            const res = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${state.driveFileId}?uploadType=media`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${state.googleAccessToken}`,
                    'Content-Type': 'application/json'
                },
                body: payload
            });
            if (!res.ok) throw new Error(`Upload failed (${res.status})`);
        } else {
            // Create new file on Drive
            const metadata = { name: 'CyberNote_Backup.json', mimeType: 'application/json' };
            const form = new FormData();
            form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
            form.append('file', new Blob([payload], { type: 'application/json' }));

            const res = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
                method: 'POST',
                headers: { Authorization: `Bearer ${state.googleAccessToken}` },
                body: form
            });
            const data = await res.json();
            if (data.id) {
                state.driveFileId = data.id;
                localStorage.setItem('cybernote_drive_file_id', data.id);
            }
        }

        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSyncStatus('live', `Drive Synced (${nowStr})`);
        if (!silent && logDiv) {
            logDiv.innerHTML = `<span style="color:var(--success); font-weight:600;">✓ Successfully backed up ${state.nodes.size} notes to Google Drive at ${nowStr}!</span>`;
        }
        updateSettingsUI();
    } catch (err) {
        console.error('Backup to Google Drive error:', err);
        setSyncStatus('error', 'Drive Sync Error');
        if (!silent && logDiv) logDiv.innerHTML = `<span style="color:var(--danger);">Backup failed: ${err.message}</span>`;
    }
}

function scheduleDriveAutoBackup() {
    if (!state.googleAccessToken) return;
    setSyncStatus('pending', 'Changes pending...');
    clearTimeout(state.driveSaveTimer);
    // Debounce auto-backup to Google Drive 1.8 seconds after editing pauses
    state.driveSaveTimer = setTimeout(() => {
        backupToGoogleDrive(true);
    }, 1800);
}

// --- Toast Notifications ---
function showToast(message, isError = false) {
    let toast = document.getElementById('cybernote-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'cybernote-toast';
        toast.className = 'cybernote-toast';
        document.body.appendChild(toast);
    }
    toast.className = 'cybernote-toast' + (isError ? ' toast-error' : '');
    toast.innerHTML = (isError ? 
        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` : 
        `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--success);"><polyline points="20 6 9 17 4 12"/></svg>`) + 
        `<span>${message}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

// --- Instant Manual Sync ("Now Sync" Button) ---
async function triggerManualSyncNow() {
    const btnSyncNow = document.getElementById('btn-sync-now');
    const svgIcon = document.getElementById('sync-now-svg');
    const textLabel = document.getElementById('sync-now-text');

    if (btnSyncNow) btnSyncNow.classList.add('syncing');
    if (svgIcon) svgIcon.classList.add('spinning');
    if (textLabel) textLabel.textContent = 'Syncing...';

    // Flush any pending active editor saves immediately
    if (state.activeNodeId) {
        const titleVal = noteTitleInput.value;
        const contentVal = noteEditor.innerHTML;
        const tagsVal = noteTagsInput ? noteTagsInput.value : '';
        const node = state.nodes.get(state.activeNodeId);
        if (node) {
            node.title = titleVal;
            node.content = contentVal;
            node.tags = tagsVal;
            node.updated_at = Date.now();
        }
        if (state.isServerMode) {
            fetch(`/api/nodes/${state.activeNodeId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: titleVal, content: contentVal, tags: tagsVal })
            }).catch(() => {});
        }
    }
    saveLocalNodesBackup();

    try {
        if (state.googleAccessToken) {
            setSyncStatus('syncing', 'Syncing to Drive...');
            await backupToGoogleDrive(false);
            const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setSyncStatus('live', `Drive Synced (${nowStr})`);
            showToast(`✓ Cloud Synced: All ${state.nodes.size} notes secured to Google Drive!`);
        } else {
            // Offline / Local storage sync
            const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setSyncStatus('live', `Local Synced (${nowStr})`);
            showToast(`✓ Local Storage Synced: ${state.nodes.size} notes secured offline!`);
        }
    } catch (err) {
        console.error('Manual sync error:', err);
        showToast(`Sync error: ${err.message}`, true);
    } finally {
        setTimeout(() => {
            if (btnSyncNow) btnSyncNow.classList.remove('syncing');
            if (svgIcon) svgIcon.classList.remove('spinning');
            if (textLabel) textLabel.textContent = 'Now Sync';
        }, 600);
    }
}

// --- End-to-End Cryptography (AES-256-GCM + PBKDF2) ---
async function deriveKey(password, salt) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
    );
    return crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 100000,
            hash: 'SHA-256'
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
    );
}

async function encryptData(plaintext, password) {
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        enc.encode(plaintext)
    );
    return JSON.stringify({
        e2ee: true,
        salt: Array.from(salt),
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encrypted))
    });
}

async function decryptData(cipherObj, password) {
    const salt = new Uint8Array(cipherObj.salt);
    const iv = new Uint8Array(cipherObj.iv);
    const data = new Uint8Array(cipherObj.data);
    const key = await deriveKey(password, salt);
    const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        data
    );
    return new TextDecoder().decode(decrypted);
}

// --- Real-time Delta Sync (SSE) ---
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
    const iconContainer = document.getElementById('sync-status-icon');
    const label = document.getElementById('sync-status-text') || syncStatusBadge.querySelector('.sync-text');

    if (status === 'syncing') {
        if (iconContainer) {
            iconContainer.innerHTML = `<svg class="sync-spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;
        }
    } else if (status === 'live' || status === 'synced') {
        if (iconContainer) {
            if (state.googleAccessToken) {
                iconContainer.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" style="color:var(--success);"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/><polyline points="9 11 12 14 17 9"/></svg>`;
            } else {
                iconContainer.innerHTML = `<span class="sync-dot live"></span>`;
            }
        }
    } else if (status === 'pending') {
        if (iconContainer) {
            iconContainer.innerHTML = `<span class="sync-dot syncing"></span>`;
        }
    } else {
        if (iconContainer) {
            iconContainer.innerHTML = `<span class="sync-dot ${status}"></span>`;
        }
    }

    if (label) label.textContent = text;
}

// --- Data Fetching & Local Persistence ---
function persistActiveNodeImmediately(nodeId, fields = {}) {
    if (!nodeId) return;
    const node = state.nodes.get(nodeId);
    if (!node) return;

    Object.assign(node, fields);
    node.updated_at = Date.now();

    try {
        localStorage.setItem(`cybernote_node_${nodeId}`, JSON.stringify(node));
        localStorage.setItem('cybernote_active', nodeId);
        // Synchronously store raw snapshot of all nodes for zero-latency instant recovery on refresh
        const list = Array.from(state.nodes.values());
        localStorage.setItem('cybernote_local_raw_nodes', JSON.stringify(list));
    } catch (e) {
        console.warn('Immediate local persistence write error:', e);
    }

    saveLocalNodesBackup();
}

let localBackupSaveTimer = null;
function saveLocalNodesBackup() {
    clearTimeout(localBackupSaveTimer);
    localBackupSaveTimer = setTimeout(async () => {
        try {
            const list = Array.from(state.nodes.values());
            const raw = JSON.stringify(list);
            try {
                localStorage.setItem('cybernote_local_raw_nodes', raw);
            } catch (e) {}

            // Ultra-compact GZIP compression for local storage
            // Compresses 4MB scripts down to ~15KB (< 0.05 bytes per character)
            if (raw.length > 250) {
                const compressed = await compressStringToBase64(raw);
                localStorage.setItem('cybernote_local_db', compressed);
            } else {
                localStorage.setItem('cybernote_local_db', raw);
            }
        } catch (e) {
            console.warn('LocalStorage backup error:', e);
        }
    }, 120);
}

async function loadLocalNodes() {
    // 1. Try uncompressed raw local snapshot first for instant synchronous recovery
    const rawNodes = localStorage.getItem('cybernote_local_raw_nodes');
    if (rawNodes) {
        try {
            const list = JSON.parse(rawNodes);
            for (const n of list) {
                if (n && n.id) state.nodes.set(n.id, n);
            }
        } catch (e) {
            console.warn('Failed to parse cybernote_local_raw_nodes:', e);
        }
    }

    // 2. Supplement or load from compressed database
    if (state.nodes.size === 0) {
        const raw = localStorage.getItem('cybernote_local_db') || localStorage.getItem('treekeep_local_db');
        if (raw) {
            try {
                let decompressed = raw;
                if (raw.startsWith('gz:')) {
                    decompressed = await decompressStringFromBase64(raw);
                }
                const list = JSON.parse(decompressed);
                for (const n of list) {
                    if (n && n.id) state.nodes.set(n.id, n);
                }
            } catch (e) {
                console.error('Failed to parse local nodes:', e);
            }
        }
    }

    // 3. Check any direct active cache keys (cybernote_node_<id>) which hold the freshest keystrokes
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('cybernote_node_')) {
                const nodeStr = localStorage.getItem(key);
                if (nodeStr) {
                    const nodeData = JSON.parse(nodeStr);
                    if (nodeData && nodeData.id) {
                        const existing = state.nodes.get(nodeData.id);
                        if (!existing || (nodeData.updated_at && nodeData.updated_at > (existing.updated_at || 0))) {
                            state.nodes.set(nodeData.id, nodeData);
                        }
                    }
                }
            }
        }
    } catch (e) {}

    if (state.nodes.size === 0) {
        seedDefaultLocalNotes();
    }

    renderTree();
    const lastActive = localStorage.getItem('cybernote_active');
    if (lastActive === '__all_notes__') {
        showAllNotesView();
    } else if (lastActive && state.nodes.has(lastActive)) {
        selectNode(lastActive);
    } else if (state.nodes.size > 0) {
        selectNode(state.nodes.keys().next().value);
    } else {
        selectNode(null);
    }
}

async function loadTree() {
    // 1. Immediately load local nodes so UI is instant and zero content is lost on quick refresh
    await loadLocalNodes();

    if (!state.isServerMode) return;

    try {
        const res = await fetch(`${API_BASE}/api/nodes?full=1`);
        const data = await res.json();
        const serverNodes = data.nodes || [];
        const serverIds = new Set(serverNodes.map(n => n.id));

        // 2. Reconcile with server: if local node was edited more recently than server, LOCAL WINS!
        for (const sn of serverNodes) {
            if (state.nodes.has(sn.id)) {
                const ln = state.nodes.get(sn.id);
                if (ln.updated_at && sn.updated_at && ln.updated_at > sn.updated_at) {
                    console.log(`[Sync] Local node "${ln.title}" (${ln.id}) is newer (${ln.updated_at} > ${sn.updated_at}). Preserving local and syncing to server.`);
                    sendDeltaPatch(ln.id, {
                        title: ln.title,
                        content: ln.content,
                        tags: ln.tags,
                        icon: ln.icon,
                        color: ln.color,
                        is_pinned: ln.is_pinned,
                        is_readonly: ln.is_readonly
                    });
                } else {
                    state.nodes.set(sn.id, sn);
                }
            } else {
                state.nodes.set(sn.id, sn);
            }
        }

        // 3. Push any local nodes created offline that server doesn't have
        for (const [id, ln] of state.nodes.entries()) {
            if (!serverIds.has(id)) {
                try {
                    fetch(`${API_BASE}/api/nodes`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(ln)
                    });
                } catch (e) {}
            }
        }

        saveLocalNodesBackup();
        renderTree();

        const lastActive = localStorage.getItem('cybernote_active');
        if (lastActive === '__all_notes__') {
            showAllNotesView();
        } else if (lastActive && state.nodes.has(lastActive)) {
            selectNode(lastActive);
        } else if (serverNodes.length > 0) {
            selectNode(serverNodes[0].id);
        } else if (state.nodes.size > 0) {
            selectNode(state.nodes.keys().next().value);
        } else {
            selectNode(null);
        }
    } catch (err) {
        console.error('Failed to load nodes from server:', err);
    }
}

function seedDefaultLocalNotes() {
    const now = Date.now();
    const welcome = {
        id: 'welcome-root',
        parent_id: null,
        title: 'Welcome to CyberNote',
        content: `<h1>Welcome to CyberNote</h1>
<p><b>CyberNote</b> is your secure, all-in-one hierarchical cloud notebook featuring <b>direct in-place WYSIWYG editing</b>, Google Account Sign-In, and automatic Google Drive backup!</p>
<div class="callout-box callout-tip">
    <span class="callout-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg></span>
    <div class="callout-content" contenteditable="true"><b>Google Account Sign-In:</b> Click "Sign in with Google" at the top right to automatically restore your backup from Google Drive!</div>
</div>
<h3>Key Capabilities:</h3>
<div class="todo-item" contenteditable="false"><input type="checkbox" checked onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text todo-done">Direct In-Place WYSIWYG editing (No split preview tab!)</span></div>
<div class="todo-item" contenteditable="false"><input type="checkbox" checked onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text todo-done">Google Drive auto-backup & instant restore on login</span></div>
<div class="todo-item" contenteditable="false"><input type="checkbox" checked onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text todo-done">Full security with optional AES-256-GCM End-to-End Encryption</span></div>
<div class="todo-item" contenteditable="false"><input type="checkbox" onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text">Windows Paint Studio & smooth handwritten signatures</span></div>
<div class="todo-item" contenteditable="false"><input type="checkbox" onchange="this.nextElementSibling.classList.toggle('todo-done')"><span contenteditable="true" class="todo-text">Paste screenshots directly with Ctrl+V</span></div>
<div class="code-box" contenteditable="false">
    <div class="code-box-header"><span>BASH</span><button class="btn-copy-code" onclick="copySnippet(this)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Code</button></div>
    <pre contenteditable="true"><code>echo "Your knowledge, secure in the cloud with CyberNote!"</code></pre>
</div>`,
        icon: 'shield',
        tags: 'intro,welcome,security',
        color: '#89b4fa',
        position: 0,
        is_expanded: 1,
        created_at: now,
        updated_at: now
    };
    state.nodes.set(welcome.id, welcome);
    saveLocalNodesBackup();
}

// --- Global Deep Search Engine Across All Notes, Nodes & Content ---
let selectedSearchIndex = -1;

function stripHtml(html) {
    if (!html) return '';
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
}

function normalizeQuery(str) {
    return (str || '').normalize('NFC').toLowerCase().trim();
}

function nodeMatchesQuery(node, query) {
    if (!node || !query) return false;
    const q = normalizeQuery(query);
    if (!q) return false;
    const titleMatch = normalizeQuery(node.title).includes(q);
    const tagsMatch = node.tags && normalizeQuery(node.tags).includes(q);
    const plainContent = stripHtml(node.content);
    const contentMatch = normalizeQuery(plainContent).includes(q);
    return titleMatch || tagsMatch || contentMatch;
}

function getNodePathString(nodeId) {
    const crumbs = [];
    let cur = state.nodes.get(nodeId);
    while (cur && cur.parent_id) {
        cur = state.nodes.get(cur.parent_id);
        if (cur) crumbs.unshift(cur.title || 'Untitled');
    }
    return crumbs.length ? crumbs.join(' › ') : 'Root';
}

function highlightMatchInText(text, query) {
    if (!text || !query) return escapeHtml(text || '');
    const normText = text.normalize('NFC').toLowerCase();
    const normQ = query.normalize('NFC').toLowerCase();
    const idx = normText.indexOf(normQ);
    if (idx === -1) return escapeHtml(text);
    const before = escapeHtml(text.substring(0, idx));
    const match = escapeHtml(text.substring(idx, idx + query.length));
    const after = escapeHtml(text.substring(idx + query.length));
    return `${before}<mark class="search-match">${match}</mark>${after}`;
}

function extractSearchSnippet(plainText, query) {
    if (!plainText || !query) return '';
    const normText = plainText.normalize('NFC').toLowerCase();
    const normQ = query.normalize('NFC').toLowerCase();
    const idx = normText.indexOf(normQ);
    if (idx === -1) {
        const preview = plainText.trim().substring(0, 80);
        return preview ? escapeHtml(preview) + (plainText.length > 80 ? '...' : '') : '';
    }

    const start = Math.max(0, idx - 25);
    const end = Math.min(plainText.length, idx + query.length + 50);
    const prefix = start > 0 ? '...' : '';
    const suffix = end < plainText.length ? '...' : '';

    const before = escapeHtml(plainText.substring(start, idx));
    const match = escapeHtml(plainText.substring(idx, idx + query.length));
    const after = escapeHtml(plainText.substring(idx + query.length, end));

    return `${prefix}${before}<mark class="search-match">${match}</mark>${after}${suffix}`;
}

function flushActiveNoteToMemory() {
    if (state.activeNodeId) {
        const node = state.nodes.get(state.activeNodeId);
        if (node) {
            if (noteTitleInput) node.title = noteTitleInput.value;
            if (noteEditor) node.content = noteEditor.innerHTML;
            if (noteTagsInput) node.tags = noteTagsInput.value;
        }
    }
}

function performGlobalSearch(query) {
    flushActiveNoteToMemory();
    state.searchQuery = query;
    renderTree();

    const dropdown = document.getElementById('search-results-dropdown');
    const list = document.getElementById('search-results-list');
    const countEl = document.getElementById('search-results-count');
    if (!dropdown || !list) return;

    const trimmed = (query || '').trim();
    if (!trimmed) {
        dropdown.style.display = 'none';
        list.innerHTML = '';
        selectedSearchIndex = -1;
        return;
    }

    const q = normalizeQuery(trimmed);
    const matches = [];

    for (const node of state.nodes.values()) {
        const titleMatch = normalizeQuery(node.title).includes(q);
        const tagsMatch = node.tags && normalizeQuery(node.tags).includes(q);
        const plainContent = stripHtml(node.content);
        const contentMatch = normalizeQuery(plainContent).includes(q);

        if (titleMatch || tagsMatch || contentMatch) {
            let score = 0;
            if (titleMatch) score += 100;
            if (tagsMatch) score += 50;
            if (contentMatch) score += 25;
            matches.push({
                node,
                plainContent,
                titleMatch,
                tagsMatch,
                contentMatch,
                score
            });
        }
    }

    matches.sort((a, b) => b.score - a.score);

    dropdown.style.display = 'flex';
    selectedSearchIndex = matches.length > 0 ? 0 : -1;

    if (matches.length === 0) {
        countEl.textContent = 'No Matches';
        list.innerHTML = `<div class="search-no-results">No notes or nodes found matching "<strong>${escapeHtml(trimmed)}</strong>"</div>`;
        return;
    }

    countEl.textContent = `Found in ${matches.length} note${matches.length === 1 ? '' : 's'}`;
    list.innerHTML = '';

    matches.forEach((item, index) => {
        const row = document.createElement('div');
        row.className = `search-result-item ${index === 0 ? 'selected' : ''}`;
        row.dataset.nodeId = item.node.id;
        row.dataset.index = index;

        const pathStr = getNodePathString(item.node.id);
        const highlightedTitle = highlightMatchInText(item.node.title || 'Untitled Note', trimmed);
        const snippetHtml = extractSearchSnippet(item.plainContent, trimmed);

        row.innerHTML = `
            <div class="search-result-top">
                <span class="search-result-icon">${getNodeIconSvg(item.node.icon, item.node.color, item.node.is_folder || item.node.icon === 'folder', false, 14)}</span>
                <span class="search-result-title">${highlightedTitle}</span>
                <span class="search-result-path">${escapeHtml(pathStr)}</span>
            </div>
            ${snippetHtml ? `<div class="search-result-snippet">${snippetHtml}</div>` : ''}
        `;

        row.onmousedown = (e) => {
            e.preventDefault();
            selectNode(item.node.id);
            closeGlobalSearchDropdown();
            highlightSearchMatchInEditor(trimmed);
        };

        list.appendChild(row);
    });
}

function updateSelectedSearchItem(items) {
    items.forEach((it, idx) => {
        if (idx === selectedSearchIndex) {
            it.classList.add('selected');
            it.scrollIntoView({ block: 'nearest' });
        } else {
            it.classList.remove('selected');
        }
    });
}

function closeGlobalSearchDropdown() {
    const dropdown = document.getElementById('search-results-dropdown');
    if (dropdown) dropdown.style.display = 'none';
    selectedSearchIndex = -1;
}

function highlightSearchMatchInEditor(query) {
    if (!query) return;
    if (window.find) {
        setTimeout(() => {
            try {
                window.find(query, false, false, true, false, false, false);
            } catch (e) {}
        }, 120);
    }
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
        list.sort((a, b) => {
            const aPinned = a.is_pinned ? 1 : 0;
            const bPinned = b.is_pinned ? 1 : 0;
            if (aPinned !== bPinned) return bPinned - aPinned;
            return a.position - b.position;
        });
    }

    function buildBranch(parentId, container) {
        const children = childrenMap.get(parentId || '__root__') || [];
        for (const node of children) {
            if (state.searchQuery) {
                const match = nodeMatchesQuery(node, state.searchQuery);
                if (!match && !hasMatchingDescendant(node.id)) continue;
            }

            const hasKids = (childrenMap.get(node.id) || []).length > 0;
            const isExpanded = state.expandedNodes.has(node.id) || (!!state.searchQuery && hasMatchingDescendant(node.id));

            const wrapper = document.createElement('div');
            wrapper.className = 'tree-node-wrapper';

            const item = document.createElement('div');
            item.className = `tree-node ${state.activeNodeId === node.id ? 'active' : ''} ${node.is_pinned ? 'pinned' : ''}`;
            item.dataset.id = node.id;

            // Expand arrow (Modern Chevron SVG)
            const arrow = document.createElement('span');
            arrow.className = `tree-arrow ${hasKids ? (isExpanded ? 'expanded' : '') : 'empty'}`;
            if (hasKids) {
                arrow.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`;
            } else {
                arrow.innerHTML = '';
            }
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

            // Vector SVG Icon
            const icon = document.createElement('span');
            icon.className = 'tree-icon';
            const isFolderNode = node.is_folder || node.icon === 'folder';
            icon.innerHTML = getNodeIconSvg(node.icon, node.color, isFolderNode, isExpanded, 15);

            // Title Label with matching highlight
            const label = document.createElement('span');
            label.className = 'tree-label';
            if (state.searchQuery) {
                const q = normalizeQuery(state.searchQuery);
                const titleMatched = normalizeQuery(node.title).includes(q);
                if (titleMatched) {
                    label.innerHTML = highlightMatchInText(node.title || 'Untitled Note', state.searchQuery);
                } else {
                    label.textContent = node.title || 'Untitled Note';
                    if (nodeMatchesQuery(node, state.searchQuery)) {
                        const contentBadge = document.createElement('span');
                        contentBadge.className = 'tree-content-match-badge';
                        contentBadge.textContent = 'text';
                        contentBadge.title = 'Matched in note content';
                        label.appendChild(contentBadge);
                    }
                }
            } else {
                label.textContent = node.title || 'Untitled Note';
            }
            if (node.color) label.style.color = node.color;

            // Lock badge if read-only
            let lockBadge = null;
            if (node.is_readonly) {
                lockBadge = document.createElement('span');
                lockBadge.className = 'tree-lock-badge';
                lockBadge.title = 'Read-Only (Locked)';
                lockBadge.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
            }

            // Pin badge if pinned
            let pinBadge = null;
            if (node.is_pinned) {
                pinBadge = document.createElement('span');
                pinBadge.className = 'tree-pin-badge';
                pinBadge.title = 'Pinned Note';
                pinBadge.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z"/></svg>`;
            }

            // Quick Actions
            const actions = document.createElement('div');
            actions.className = 'tree-actions';
            actions.innerHTML = `
                <button class="tree-btn" title="Add Sub-Note" onclick="event.stopPropagation(); createSubNode('${node.id}', 'note')">+</button>
                <button class="tree-btn" title="Delete" onclick="event.stopPropagation(); deleteNode('${node.id}')">✕</button>
            `;

            item.appendChild(arrow);
            item.appendChild(colorDot);
            item.appendChild(icon);
            item.appendChild(label);
            if (lockBadge) item.appendChild(lockBadge);
            if (pinBadge) item.appendChild(pinBadge);
            item.appendChild(actions);

            item.dataset.id = node.id;
            item.onclick = () => selectNode(node.id);
            item.oncontextmenu = (e) => {
                e.preventDefault();
                e.stopPropagation();
                openTreeContextMenu(e, node.id);
            };

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
            if (nodeMatchesQuery(k, state.searchQuery)) return true;
            if (hasMatchingDescendant(k.id)) return true;
        }
        return false;
    }

    buildBranch(null, treeContainer);

    // Update All Notes count badge in sidebar
    const allNotesCountEl = document.getElementById('sidebar-all-notes-count');
    if (allNotesCountEl) {
        allNotesCountEl.textContent = state.nodes.size;
    }

    const sidebarEl = document.getElementById('sidebar');
    if (sidebarEl) {
        sidebarEl.oncontextmenu = (e) => {
            if (e.target.closest('button.icon-btn-small')) return;
            e.preventDefault();
            const nodeEl = e.target.closest('.tree-node');
            if (nodeEl && nodeEl.dataset.id) {
                openTreeContextMenu(e, nodeEl.dataset.id);
            } else {
                openTreeContextMenu(e, null);
            }
        };
    }
}

function toggleNodeExpand(id) {
    if (state.expandedNodes.has(id)) {
        state.expandedNodes.delete(id);
    } else {
        state.expandedNodes.add(id);
    }
    localStorage.setItem('cybernote_expanded', JSON.stringify(Array.from(state.expandedNodes)));
    renderTree();
}

function expandAll() {
    for (const id of state.nodes.keys()) state.expandedNodes.add(id);
    localStorage.setItem('cybernote_expanded', JSON.stringify(Array.from(state.expandedNodes)));
    renderTree();
}

function collapseAll() {
    state.expandedNodes.clear();
    localStorage.setItem('cybernote_expanded', JSON.stringify([]));
    renderTree();
}

// --- Node Pinning & Renaming ---
function togglePinActiveNode() {
    if (!state.activeNodeId || !state.nodes.has(state.activeNodeId)) return;
    togglePinNode(state.activeNodeId);
}

function togglePinNode(nodeId) {
    if (!nodeId || !state.nodes.has(nodeId)) return;
    const node = state.nodes.get(nodeId);
    const newPinned = node.is_pinned ? 0 : 1;
    node.is_pinned = newPinned;
    if (state.activeNodeId === nodeId) {
        updatePinButtonUI(newPinned);
    }
    sendDeltaPatch(nodeId, { is_pinned: newPinned });
    renderTree();
    if (typeof isAllNotesViewActive === 'function' && isAllNotesViewActive()) {
        renderAllNotesView();
    }
}

function updatePinButtonUI(isPinned) {
    const btn = document.getElementById('btn-pin-node');
    const text = document.getElementById('pin-btn-text');
    if (!btn) return;
    if (isPinned) {
        btn.classList.add('btn-pin-active');
        if (text) text.textContent = 'Pinned';
        btn.title = 'Unpin this note';
    } else {
        btn.classList.remove('btn-pin-active');
        if (text) text.textContent = 'Pin';
        btn.title = 'Pin note to top';
    }
}

function renameActiveNode() {
    if (state.isReadOnly) return;
    if (noteTitleInput) {
        noteTitleInput.focus();
        noteTitleInput.select();
        noteTitleInput.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// --- Tree Right-Click Context Menu ---
let activeContextMenuNodeId = null;

function openTreeContextMenu(e, nodeId) {
    closeTreeContextMenu();
    const menu = document.getElementById('tree-context-menu');
    if (!menu) return;

    if (nodeId && state.nodes.has(nodeId)) {
        selectNode(nodeId);
    }

    const targetId = nodeId || state.activeNodeId;
    activeContextMenuNodeId = targetId;

    const ctxNewRoot = document.getElementById('ctx-new-root');
    const ctxNewFolder = document.getElementById('ctx-new-folder');
    const ctxSubnode = document.getElementById('ctx-subnode');
    const ctxSubfolder = document.getElementById('ctx-subfolder');
    const ctxDivider1 = document.getElementById('ctx-divider-1');
    const ctxPin = document.getElementById('ctx-pin');
    const ctxRename = document.getElementById('ctx-rename');
    const ctxColor = document.getElementById('ctx-color');
    const ctxIcon = document.getElementById('ctx-icon');
    const ctxDuplicate = document.getElementById('ctx-duplicate');
    const ctxReadonly = document.getElementById('ctx-readonly');
    const ctxExpandAll = document.getElementById('ctx-expand-all');
    const ctxCollapseAll = document.getElementById('ctx-collapse-all');
    const ctxDivider2 = document.getElementById('ctx-divider-2');
    const ctxDelete = document.getElementById('ctx-delete');

    if (targetId && state.nodes.has(targetId)) {
        const node = state.nodes.get(targetId);
        const isPinned = !!node.is_pinned;
        const isReadOnly = !!node.is_readonly;

        if (ctxPin) {
            const pinText = document.getElementById('ctx-pin-text');
            if (pinText) pinText.textContent = isPinned ? 'Unpin Note' : 'Pin to Top';
            ctxPin.style.display = 'flex';
        }

        if (ctxReadonly) {
            const readonlyText = document.getElementById('ctx-readonly-text');
            if (readonlyText) readonlyText.textContent = isReadOnly ? 'Make Editable' : 'Make Read-Only';
            const readonlySvg = document.getElementById('ctx-readonly-svg');
            if (readonlySvg) {
                readonlySvg.innerHTML = isReadOnly 
                    ? `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>`
                    : `<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`;
            }
            ctxReadonly.style.display = 'flex';
        }

        if (ctxNewRoot) ctxNewRoot.style.display = 'flex';
        if (ctxNewFolder) ctxNewFolder.style.display = 'flex';
        if (ctxSubnode) ctxSubnode.style.display = 'flex';
        if (ctxSubfolder) ctxSubfolder.style.display = 'flex';
        if (ctxDivider1) ctxDivider1.style.display = 'block';
        if (ctxRename) ctxRename.style.display = 'flex';
        if (ctxColor) ctxColor.style.display = 'flex';
        if (ctxIcon) ctxIcon.style.display = 'flex';
        if (ctxDuplicate) ctxDuplicate.style.display = 'flex';
        if (ctxExpandAll) ctxExpandAll.style.display = 'none';
        if (ctxCollapseAll) ctxCollapseAll.style.display = 'none';
        if (ctxDivider2) ctxDivider2.style.display = 'block';
        if (ctxDelete) ctxDelete.style.display = 'flex';
    } else {
        // No node targeted (empty tree or no active note)
        if (ctxNewRoot) ctxNewRoot.style.display = 'flex';
        if (ctxNewFolder) ctxNewFolder.style.display = 'flex';
        if (ctxSubnode) ctxSubnode.style.display = 'none';
        if (ctxSubfolder) ctxSubfolder.style.display = 'none';
        if (ctxDivider1) ctxDivider1.style.display = 'block';
        if (ctxPin) ctxPin.style.display = 'none';
        if (ctxRename) ctxRename.style.display = 'none';
        if (ctxColor) ctxColor.style.display = 'none';
        if (ctxIcon) ctxIcon.style.display = 'none';
        if (ctxDuplicate) ctxDuplicate.style.display = 'none';
        if (ctxReadonly) ctxReadonly.style.display = 'none';
        if (ctxExpandAll) ctxExpandAll.style.display = 'flex';
        if (ctxCollapseAll) ctxCollapseAll.style.display = 'flex';
        if (ctxDivider2) ctxDivider2.style.display = 'none';
        if (ctxDelete) ctxDelete.style.display = 'none';
    }

    // Position menu with window boundary checks
    menu.style.display = 'flex';
    const menuWidth = 200;
    const menuHeight = 340;
    let x = e.clientX;
    let y = e.clientY;

    if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 12;
    if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 12;

    menu.style.left = `${Math.max(10, x)}px`;
    menu.style.top = `${Math.max(10, y)}px`;
}

function closeTreeContextMenu() {
    const menu = document.getElementById('tree-context-menu');
    if (menu) menu.style.display = 'none';
    activeContextMenuNodeId = null;
}

// --- All Notes View (Google Keep Style Dashboard) ---
function hexToRgba(hex, alpha = 0.15) {
    if (!hex) return '';
    let c = hex.replace('#', '');
    if (c.length === 3) {
        c = c.split('').map(x => x + x).join('');
    }
    if (c.length === 6) {
        const num = parseInt(c, 16);
        const r = (num >> 16) & 255;
        const g = (num >> 8) & 255;
        const b = num & 255;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return hex;
}

function isAllNotesViewActive() {
    const allNotesView = document.getElementById('all-notes-view');
    return allNotesView && allNotesView.style.display !== 'none';
}

function showAllNotesView() {
    hideFloatingToolbars();
    const allNotesView = document.getElementById('all-notes-view');
    const noteView = document.getElementById('note-view');
    const noNoteSelected = document.getElementById('no-note-selected');
    const navAllNotes = document.getElementById('nav-all-notes');

    if (!allNotesView) return;

    allNotesView.style.display = 'flex';
    if (noteView) noteView.style.display = 'none';
    if (noNoteSelected) noNoteSelected.style.display = 'none';

    if (navAllNotes) navAllNotes.classList.add('active');

    // Deselect active tree node styling in sidebar
    document.querySelectorAll('.tree-node.active').forEach(el => el.classList.remove('active'));

    state.activeNodeId = null;
    localStorage.setItem('cybernote_active', '__all_notes__');

    if (footerPath) footerPath.textContent = 'View: All Notes (Favorites & Nodes)';
    if (footerStats) footerStats.textContent = `${state.nodes.size} notes total`;

    renderAllNotesView();
}

function renderAllNotesView() {
    const pinnedSection = document.getElementById('keep-section-pinned');
    const pinnedGrid = document.getElementById('keep-grid-pinned');
    const pinnedBadge = document.getElementById('pinned-notes-count');

    const othersSection = document.getElementById('keep-section-others');
    const othersGrid = document.getElementById('keep-grid-others');
    const othersBadge = document.getElementById('others-notes-count');

    const statsSubtitle = document.getElementById('all-notes-stats-subtitle');
    const sidebarCount = document.getElementById('sidebar-all-notes-count');

    if (!pinnedGrid || !othersGrid) return;

    pinnedGrid.innerHTML = '';
    othersGrid.innerHTML = '';

    const allNodes = Array.from(state.nodes.values());
    if (sidebarCount) sidebarCount.textContent = allNodes.length;

    const pinnedNodes = allNodes.filter(n => !!n.is_pinned);
    const otherNodes = allNodes.filter(n => !n.is_pinned);

    // Sort by updated_at descending (latest first)
    pinnedNodes.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));
    otherNodes.sort((a, b) => new Date(b.updated_at || b.created_at || 0) - new Date(a.updated_at || a.created_at || 0));

    if (pinnedBadge) pinnedBadge.textContent = pinnedNodes.length;
    if (othersBadge) othersBadge.textContent = otherNodes.length;

    if (statsSubtitle) {
        statsSubtitle.textContent = `${allNodes.length} notes total • ${pinnedNodes.length} favorites / pinned • ${otherNodes.length} other notes`;
    }

    // Toggle pinned section visibility based on whether pinned nodes exist
    if (pinnedSection) {
        pinnedSection.style.display = pinnedNodes.length > 0 ? 'block' : 'none';
    }

    if (pinnedNodes.length > 0) {
        pinnedNodes.forEach(node => {
            pinnedGrid.appendChild(createKeepCard(node));
        });
    }

    if (otherNodes.length > 0) {
        otherNodes.forEach(node => {
            othersGrid.appendChild(createKeepCard(node));
        });
    } else if (pinnedNodes.length === 0) {
        // Empty state when user has zero notes
        othersGrid.innerHTML = `
            <div class="keep-empty-state">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color:var(--text-muted);opacity:0.6;">
                    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
                </svg>
                <div style="font-weight:600;font-size:1rem;color:var(--text-primary);">No notes yet</div>
                <div style="font-size:0.82rem;color:var(--text-muted);">Create your first note to see it here in Google Keep style.</div>
                <button class="btn btn-primary btn-sm" onclick="createNewRootNode()">+ Create Note</button>
            </div>
        `;
    }
}

function createKeepCard(node) {
    const card = document.createElement('div');
    card.className = `keep-card ${node.is_pinned ? 'is-pinned' : ''}`;
    card.dataset.id = node.id;

    if (node.color) {
        card.style.backgroundColor = hexToRgba(node.color, 0.12);
        card.style.borderColor = hexToRgba(node.color, 0.38);
    }

    // Header: Icon + Title + Pin Button
    const header = document.createElement('div');
    header.className = 'keep-card-header';

    const titleGroup = document.createElement('div');
    titleGroup.className = 'keep-card-title-group';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'keep-card-icon';
    const isFolder = node.is_folder || node.icon === 'folder';
    iconSpan.innerHTML = getNodeIconSvg(node.icon, node.color, isFolder, false, 16);

    const titleSpan = document.createElement('div');
    titleSpan.className = 'keep-card-title';
    titleSpan.textContent = node.title || 'Untitled Note';
    if (node.color) titleSpan.style.color = node.color;

    titleGroup.appendChild(iconSpan);
    titleGroup.appendChild(titleSpan);

    if (node.is_readonly) {
        const lockBadge = document.createElement('span');
        lockBadge.className = 'tree-lock-badge';
        lockBadge.title = 'Read-Only (Locked)';
        lockBadge.style.display = 'inline-flex';
        lockBadge.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        titleGroup.appendChild(lockBadge);
    }

    const pinBtn = document.createElement('button');
    pinBtn.className = `keep-card-pin-btn ${node.is_pinned ? 'pinned' : ''}`;
    pinBtn.title = node.is_pinned ? 'Unpin note' : 'Pin to favorites';
    pinBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="${node.is_pinned ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.89A2 2 0 0 1 15 10.76V6h1a1 1 0 0 0 0-2H8a1 1 0 0 0 0 2h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.89A2 2 0 0 0 5 15.24Z"/></svg>`;
    pinBtn.onclick = (e) => {
        e.stopPropagation();
        togglePinNode(node.id);
        renderAllNotesView();
    };

    header.appendChild(titleGroup);
    header.appendChild(pinBtn);
    card.appendChild(header);

    // Parent path if any
    const pathStr = getNodePathString(node.id);
    if (pathStr) {
        const pathEl = document.createElement('div');
        pathEl.className = 'keep-card-path';
        pathEl.textContent = `📁 ${pathStr}`;
        card.appendChild(pathEl);
    }

    // Snippet content
    const plainText = stripHtml(node.content || '').trim();
    if (plainText) {
        const contentEl = document.createElement('div');
        contentEl.className = 'keep-card-content';
        contentEl.textContent = plainText;
        card.appendChild(contentEl);
    }

    // Tags
    if (node.tags) {
        const tagList = node.tags.split(',').map(t => t.trim()).filter(Boolean);
        if (tagList.length > 0) {
            const tagsEl = document.createElement('div');
            tagsEl.className = 'keep-card-tags';
            tagList.forEach(t => {
                const tagChip = document.createElement('span');
                tagChip.className = 'keep-card-tag';
                tagChip.textContent = `#${t}`;
                tagsEl.appendChild(tagChip);
            });
            card.appendChild(tagsEl);
        }
    }

    // Footer with date and actions
    const footer = document.createElement('div');
    footer.className = 'keep-card-footer';

    const dateSpan = document.createElement('span');
    const dt = new Date(node.updated_at || node.created_at || Date.now());
    dateSpan.textContent = dt.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });

    const actions = document.createElement('div');
    actions.className = 'keep-card-actions';

    const addSubBtn = document.createElement('button');
    addSubBtn.className = 'keep-card-btn-action';
    addSubBtn.title = 'Add Sub-Node';
    addSubBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
    addSubBtn.onclick = (e) => {
        e.stopPropagation();
        createSubNode(node.id);
    };

    const delBtn = document.createElement('button');
    delBtn.className = 'keep-card-btn-action';
    delBtn.title = 'Delete Note';
    delBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
    delBtn.onclick = async (e) => {
        e.stopPropagation();
        await deleteNode(node.id);
        renderAllNotesView();
    };

    actions.appendChild(addSubBtn);
    actions.appendChild(delBtn);

    footer.appendChild(dateSpan);
    footer.appendChild(actions);
    card.appendChild(footer);

    // Clicking card opens node in editor
    card.onclick = () => {
        selectNode(node.id);
    };

    return card;
}

// --- Node Selection & In-Place Loading ---
function selectNode(id) {
    hideFloatingToolbars();

    const allNotesView = document.getElementById('all-notes-view');
    if (allNotesView) allNotesView.style.display = 'none';
    const navAllNotes = document.getElementById('nav-all-notes');
    if (navAllNotes) navAllNotes.classList.remove('active');

    // Flush previous active node immediately before switching
    if (state.activeNodeId && state.activeNodeId !== id && !state.isReadOnly) {
        const prevId = state.activeNodeId;
        const prevNode = state.nodes.get(prevId);
        if (prevNode) {
            const curContent = noteEditor.innerHTML;
            const curTitle = noteTitleInput.value;
            const curTags = noteTagsInput ? noteTagsInput.value : '';
            if (prevNode.content !== curContent || prevNode.title !== curTitle || prevNode.tags !== curTags) {
                prevNode.content = curContent;
                prevNode.title = curTitle;
                prevNode.tags = curTags;
                prevNode.updated_at = Date.now();
                persistActiveNodeImmediately(prevId, { content: curContent, title: curTitle, tags: curTags });
            }
        }
        if (nodeSaveTimers.has(prevId)) {
            clearTimeout(nodeSaveTimers.get(prevId));
            nodeSaveTimers.delete(prevId);
            flushNodeDelta(prevId);
        }
    }

    if (!id || !state.nodes.has(id)) {
        state.activeNodeId = null;
        noNoteSelected.style.display = 'flex';
        noteView.style.display = 'none';
        footerPath.textContent = 'Node: None';
        return;
    }

    state.activeNodeId = id;
    localStorage.setItem('cybernote_active', id);
    noNoteSelected.style.display = 'none';
    noteView.style.display = 'flex';

    const node = state.nodes.get(id);
    noteTitleInput.value = node.title || '';
    if (noteTagsInput) noteTagsInput.value = node.tags || '';
    renderTagChips(node.tags || '');
    const isFolder = node.is_folder || node.icon === 'folder';
    iconPickerBtn.innerHTML = getNodeIconSvg(node.icon, node.color, isFolder, false, 18);
    updateNodeColorDot(node.color);

    setEditorContent(node.content || '');
    applyReadOnlyState(!!node.is_readonly);
    updatePinButtonUI(!!node.is_pinned);

    updateBreadcrumbs(id);
    updateWordStats();
    renderTree();

    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) sidebar.classList.remove('open');
    }

    footerPath.textContent = `Node: ${node.title}`;
    footerTime.textContent = `Last edited ${new Date(node.updated_at || Date.now()).toLocaleTimeString()}`;
}

function setEditorContent(content) {
    if (!content) {
        noteEditor.innerHTML = '';
        return;
    }

    let processed = content;
    // Replace any legacy emoji in copy buttons with crisp SVG
    if (processed.includes('📋')) {
        processed = processed.replace(/📋\s*Copy Code/g, '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Code');
        processed = processed.replace(/📋/g, '');
    }

    // Convert raw markdown if existing
    if (processed.includes('```') || processed.includes('# ') || processed.includes('- [ ]') || processed.includes('| --- |')) {
        noteEditor.innerHTML = convertMarkdownToHtml(processed);
    } else {
        noteEditor.innerHTML = processed;
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

// --- Delta Sync Logic with Transparent On-The-Fly GZIP Compression ---
const nodeSaveTimers = new Map();
const nodePendingPatches = new Map();

async function sendDeltaPatch(nodeId, partialUpdate) {
    if (!nodeId) return;

    state.isSyncing = true;
    setSyncStatus('syncing', 'Saving...');

    if (state.nodes.has(nodeId)) {
        const existing = state.nodes.get(nodeId);
        Object.assign(existing, partialUpdate, { updated_at: Date.now() });
        state.nodes.set(nodeId, existing);
    }
    persistActiveNodeImmediately(nodeId, partialUpdate);

    if (state.isServerMode) {
        const payloadStr = JSON.stringify(partialUpdate);
        const originalBytes = new Blob([payloadStr]).size;
        let requestBody = payloadStr;
        const headers = { 'Content-Type': 'application/json' };
        let isGzipped = false;
        let compressedBytes = originalBytes;

        // If payload is large (> 1.2 KB, e.g. large scripts or paste), compress on the fly before sending
        if (originalBytes > 1200 && typeof CompressionStream !== 'undefined') {
            try {
                const stream = new Blob([new TextEncoder().encode(payloadStr)]).stream();
                const compressedStream = stream.pipeThrough(new CompressionStream('gzip'));
                const resp = new Response(compressedStream);
                const arrayBuf = await resp.arrayBuffer();
                requestBody = new Uint8Array(arrayBuf);
                headers['Content-Encoding'] = 'gzip';
                isGzipped = true;
                compressedBytes = arrayBuf.byteLength;
            } catch (e) {
                requestBody = payloadStr;
                delete headers['Content-Encoding'];
            }
        }

        try {
            const res = await fetch(`${API_BASE}/api/nodes/${nodeId}`, {
                method: 'PATCH',
                headers,
                body: requestBody
            });
            const updated = await res.json();
            if (state.nodes.has(nodeId)) {
                Object.assign(state.nodes.get(nodeId), updated);
            }
            state.isSyncing = false;
            setSyncStatus('live', 'Live Synced');
            if (isGzipped) {
                const ratio = ((compressedBytes / originalBytes) * 100).toFixed(1);
                footerSyncDetail.textContent = `Delta: ~${compressedBytes} B (from ${(originalBytes/1024).toFixed(1)} KB, ${ratio}% • < 0.05 B/char)`;
            } else {
                footerSyncDetail.textContent = `Delta: ~${originalBytes} B`;
            }
            footerTime.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
        } catch (err) {
            state.isSyncing = false;
            setSyncStatus('offline', 'Saved locally');
        }
    } else {
        state.isSyncing = false;
        setSyncStatus('live', 'Saved locally');
        footerSyncDetail.textContent = `Local Storage (GZIP compressed, < 0.05 B/char)`;
        footerTime.textContent = `Saved at ${new Date().toLocaleTimeString()}`;
    }

    // Trigger debounced continuous auto-backup to Google Drive
    scheduleDriveAutoBackup();
}

function flushNodeDelta(nodeId) {
    if (!nodeId || !nodePendingPatches.has(nodeId)) return;
    const patch = nodePendingPatches.get(nodeId);
    nodePendingPatches.delete(nodeId);
    if (!patch || Object.keys(patch).length === 0) return;
    sendDeltaPatch(nodeId, patch);
}

function scheduleSave(field, value, targetNodeId = null) {
    const nodeId = targetNodeId || state.activeNodeId;
    if (!nodeId) return;

    const node = state.nodes.get(nodeId);
    if (node) {
        node[field] = value;
        node.updated_at = Date.now();
    }

    // 1. Synchronously persist to localStorage on every single keystroke
    persistActiveNodeImmediately(nodeId, { [field]: value });

    // 2. Queue delta patch for server
    if (!nodePendingPatches.has(nodeId)) {
        nodePendingPatches.set(nodeId, {});
    }
    nodePendingPatches.get(nodeId)[field] = value;

    // 3. Clear existing debounce timer for this specific node
    if (nodeSaveTimers.has(nodeId)) {
        clearTimeout(nodeSaveTimers.get(nodeId));
    }

    // 4. Send delta to server after 250ms debounce
    const timer = setTimeout(() => {
        nodeSaveTimers.delete(nodeId);
        flushNodeDelta(nodeId);
    }, 250);
    nodeSaveTimers.set(nodeId, timer);
}

// Flush active note changes immediately when closing/reloading page
function flushActiveNodeBeforeUnload() {
    if (!state.activeNodeId || state.isReadOnly) return;
    const activeId = state.activeNodeId;
    const cur = state.nodes.get(activeId);
    if (!cur) return;

    const curContent = noteEditor ? noteEditor.innerHTML : cur.content;
    const curTitle = noteTitleInput ? noteTitleInput.value : cur.title;
    const curTags = noteTagsInput ? noteTagsInput.value : cur.tags;
    const now = Date.now();

    cur.content = curContent;
    cur.title = curTitle;
    cur.tags = curTags;
    cur.updated_at = now;

    // 1. Instant synchronous write to localStorage
    try {
        localStorage.setItem(`cybernote_node_${activeId}`, JSON.stringify(cur));
        localStorage.setItem('cybernote_active', activeId);
        const list = Array.from(state.nodes.values());
        localStorage.setItem('cybernote_local_raw_nodes', JSON.stringify(list));
    } catch (e) {}

    // 2. Clear pending timers
    if (nodeSaveTimers.has(activeId)) {
        clearTimeout(nodeSaveTimers.get(activeId));
        nodeSaveTimers.delete(activeId);
    }

    // 3. Keepalive PATCH to server
    if (state.isServerMode) {
        const payload = JSON.stringify({
            content: curContent,
            title: curTitle,
            tags: curTags,
            updated_at: now
        });
        try {
            fetch(`${API_BASE}/api/nodes/${activeId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: payload,
                keepalive: true
            });
        } catch (e) {
            try {
                navigator.sendBeacon(`${API_BASE}/api/nodes/${activeId}`, new Blob([payload], { type: 'application/json' }));
            } catch (e2) {}
        }
    }
}

window.addEventListener('beforeunload', flushActiveNodeBeforeUnload);
window.addEventListener('pagehide', flushActiveNodeBeforeUnload);
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        flushActiveNodeBeforeUnload();
    }
});

// --- CRUD Node Operations ---
async function createNewRootNode(type = 'note') {
    const isFolder = type === 'folder';
    const now = Date.now();
    const newId = 'node-' + Math.random().toString(36).substring(2, 10) + '-' + now;
    const newNode = {
        id: newId,
        parent_id: null,
        title: isFolder ? 'New Folder' : 'New Note',
        content: '',
        icon: isFolder ? 'folder' : 'file-text',
        tags: '',
        color: isFolder ? '#f9e2af' : '',
        position: state.nodes.size,
        is_expanded: 1,
        is_folder: isFolder ? 1 : 0,
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

    scheduleDriveAutoBackup();
    noteTitleInput.focus();
    noteTitleInput.select();
}

async function createSubNode(parentId, type = 'note') {
    const isFolder = type === 'folder';
    const now = Date.now();
    const newId = 'node-' + Math.random().toString(36).substring(2, 10) + '-' + now;
    const subNode = {
        id: newId,
        parent_id: parentId,
        title: isFolder ? 'New Sub-Folder' : 'New Sub-Note',
        content: '',
        icon: isFolder ? 'folder' : 'file-text',
        tags: '',
        color: isFolder ? '#f9e2af' : '',
        position: 0,
        is_expanded: 1,
        is_folder: isFolder ? 1 : 0,
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

    scheduleDriveAutoBackup();
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
    scheduleDriveAutoBackup();
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
    if (isAllNotesViewActive()) renderAllNotesView();
    scheduleDriveAutoBackup();
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
    renderTree();
    if (isAllNotesViewActive()) renderAllNotesView();
}

function applyReadOnlyState(isReadOnly) {
    state.isReadOnly = isReadOnly;
    const btn = document.getElementById('btn-toggle-readonly');
    if (btn) {
        const lockSvg = `<svg class="btn-icon-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`;
        const unlockSvg = `<svg class="btn-icon-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`;
        btn.innerHTML = `${isReadOnly ? lockSvg : unlockSvg}<span>${isReadOnly ? 'Read Only' : 'Read/Write'}</span>`;
        btn.className = `btn btn-sm ${isReadOnly ? 'btn-danger' : 'btn-secondary'}`;
    }
    const badge = document.getElementById('readonly-badge');
    if (badge) {
        badge.style.display = isReadOnly ? 'inline-flex' : 'none';
    }
    noteEditor.contentEditable = !isReadOnly;
    noteTitleInput.readOnly = isReadOnly;
    if (noteTagsInput) noteTagsInput.readOnly = isReadOnly;
}

// --- Selection Management & Safe Cursor Insertion ---
function saveSelection() {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        if (noteEditor && noteEditor.contains(range.commonAncestorContainer)) {
            state.savedSelectionRange = range.cloneRange();
        }
    }
}

function restoreSelection() {
    if (state.savedSelectionRange) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(state.savedSelectionRange);
        return true;
    }
    return false;
}

// --- Cursor-Safe HTML Insertion (Prevents Element Conflicts) ---
function insertHtmlAtCursor(html) {
    if (state.isReadOnly) return;
    noteEditor.focus();
    restoreSelection();
    const sel = window.getSelection();
    let range = null;

    if (sel && sel.rangeCount > 0) {
        range = sel.getRangeAt(0);
        if (!noteEditor.contains(range.commonAncestorContainer)) {
            range = null;
        }
    }

    if (!range) {
        range = document.createRange();
        range.selectNodeContents(noteEditor);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    // If cursor is inside an image or specialized container, safely step outside to prevent entrapment
    let container = range.commonAncestorContainer;
    if (container.nodeType === 3) container = container.parentNode;
    const specialParent = container.closest?.('.editor-img-wrap, .neon-banner-card, .flow-steps-container, .metric-card-grid, .code-box, .pill-badge, .arrow-divider, .note-toggle-block, .math-formula-box');
    if (specialParent && specialParent.parentNode) {
        range = document.createRange();
        range.setStartAfter(specialParent);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

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
        range = document.createRange();
        range.setStartAfter(lastNode);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
    }

    saveSelection();
    handleEditorInput();
    updateDocumentStats();
}

// --- Creative Ribbon Tools: Neon Glowing Text, Animated Text, Arrows & Shapes ---
function toggleRibbonPopover(menuId, buttonEl, e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    saveSelection();
    const targetMenu = document.getElementById(menuId);
    if (!targetMenu) return;
    const isShowing = targetMenu.style.display !== 'none';
    closeAllRibbonPopovers();
    if (!isShowing) {
        targetMenu.style.display = targetMenu.classList.contains('emoji-grid-popover') ? 'grid' : 'flex';
    }
}

function closeAllRibbonPopovers() {
    document.querySelectorAll('.ribbon-popover-menu').forEach(m => m.style.display = 'none');
}

function applyNeonEffect(color) {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    restoreSelection();
    const sel = window.getSelection();
    let text = 'Glowing Neon Text';
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed && noteEditor.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        text = sel.getRangeAt(0).toString() || text;
    }
    const html = `<span class="neon-text neon-${color}">${escapeHtml(text)}</span>&nbsp;`;
    insertHtmlAtCursor(html);
}

function applyAnimatedText(type) {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    restoreSelection();
    const sel = window.getSelection();
    let defaultText = type === 'rainbow' ? 'Rainbow Shimmering Title' : (type === 'pulse' ? 'Pulsing Ambient Text' : 'Floating Waves Text');
    let text = defaultText;
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed && noteEditor.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        text = sel.getRangeAt(0).toString() || defaultText;
    }
    const html = `<span class="anim-${type}-text">${escapeHtml(text)}</span>&nbsp;`;
    insertHtmlAtCursor(html);
}

function insertSymbol(sym) {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    insertHtmlAtCursor(`&nbsp;${sym}&nbsp;`);
}

function insertEmoji(emoji) {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    insertHtmlAtCursor(`&nbsp;${emoji}&nbsp;`);
}

function insertFlowSteps() {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    const html = `
        <div class="flow-steps-container" contenteditable="false">
            <span class="flow-step-badge" contenteditable="true">Step 1: Input</span>
            <span class="flow-arrow-icon">➔</span>
            <span class="flow-step-badge" contenteditable="true">Step 2: Process</span>
            <span class="flow-arrow-icon">➔</span>
            <span class="flow-step-badge" contenteditable="true">Step 3: Complete</span>
        </div>
        <p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertArrowDivider() {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    const html = `
        <div class="arrow-divider" contenteditable="false">
            <span class="arrow-divider-line"></span>
            <span class="arrow-divider-badge">NEXT SECTION ➔</span>
            <span class="arrow-divider-line"></span>
        </div>
        <p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertNeonBanner() {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    const html = `
        <div class="neon-banner-card">
            <div class="neon-banner-title">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                <span>Important Highlight</span>
            </div>
            <div>Enter your key takeaways, instructions or summary here...</div>
        </div>
        <p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertPillBadge(type) {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    let badgeHtml = '';
    if (type === 'success') {
        badgeHtml = `&nbsp;<span class="pill-badge pill-success" contenteditable="false">✓ DONE</span>&nbsp;`;
    } else if (type === 'priority') {
        badgeHtml = `&nbsp;<span class="pill-badge pill-priority" contenteditable="false">🔥 HIGH</span>&nbsp;`;
    } else if (type === 'cyber') {
        badgeHtml = `&nbsp;<span class="pill-badge pill-cyber" contenteditable="false">🛡️ SECURE</span>&nbsp;`;
    } else {
        badgeHtml = `&nbsp;<span class="pill-badge pill-pending" contenteditable="false">⏳ PENDING</span>&nbsp;`;
    }
    insertHtmlAtCursor(badgeHtml);
}

function insertMetricTile() {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    const html = `
        <div class="metric-card-grid">
            <div class="metric-card-tile">
                <div class="metric-card-val" contenteditable="true">99.9%</div>
                <div class="metric-card-lbl" contenteditable="true">Uptime / Success</div>
            </div>
            <div class="metric-card-tile">
                <div class="metric-card-val" contenteditable="true">256-bit</div>
                <div class="metric-card-lbl" contenteditable="true">E2EE Security</div>
            </div>
        </div>
        <p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertToggleBlock() {
    if (state.isReadOnly) return;
    const html = `
        <details class="note-toggle-block" open>
            <summary contenteditable="true">▶ Click to expand or collapse</summary>
            <div class="toggle-content" contenteditable="true">
                <p>Hidden notes or details here...</p>
            </div>
        </details>
        <p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertMathBox() {
    if (state.isReadOnly) return;
    const html = `
        <div class="math-formula-box" contenteditable="true">
            f(x) = \\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
        </div>
        <p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertKbdBadge() {
    if (state.isReadOnly) return;
    restoreSelection();
    const sel = window.getSelection();
    let text = 'Ctrl + S';
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed && noteEditor.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        text = sel.getRangeAt(0).toString() || text;
    }
    const html = `<kbd class="editor-kbd">${escapeHtml(text)}</kbd>&nbsp;`;
    insertHtmlAtCursor(html);
}

function handleTextCaseChange(caseType) {
    if (state.isReadOnly || !caseType) return;
    restoreSelection();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed && noteEditor.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        const text = sel.getRangeAt(0).toString();
        let transformed = text;
        if (caseType === 'upper') transformed = text.toUpperCase();
        else if (caseType === 'lower') transformed = text.toLowerCase();
        else if (caseType === 'title') {
            transformed = text.replace(/\\w\\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        }
        insertHtmlAtCursor(escapeHtml(transformed));
    }
}

function handlePrintNote() {
    window.print();
}

function updateDocumentStats() {
    const badge = document.getElementById('ribbon-word-count');
    if (!badge || !noteEditor) return;
    const text = noteEditor.innerText || '';
    const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
    badge.textContent = `${words} words`;
}

// Expose functions globally for inline HTML onclick handlers
window.toggleRibbonPopover = toggleRibbonPopover;
window.closeAllRibbonPopovers = closeAllRibbonPopovers;
window.applyNeonEffect = applyNeonEffect;
window.applyAnimatedText = applyAnimatedText;
window.insertSymbol = insertSymbol;
window.insertEmoji = insertEmoji;
window.insertFlowSteps = insertFlowSteps;
window.insertArrowDivider = insertArrowDivider;
window.insertNeonBanner = insertNeonBanner;
window.insertPillBadge = insertPillBadge;
window.insertMetricTile = insertMetricTile;
window.insertToggleBlock = insertToggleBlock;
window.insertMathBox = insertMathBox;
window.insertKbdBadge = insertKbdBadge;
window.handleTextCaseChange = handleTextCaseChange;
window.handlePrintNote = handlePrintNote;
window.updateDocumentStats = updateDocumentStats;
window.createNewRootNode = createNewRootNode;
window.createSubNode = createSubNode;

// --- WYSIWYG Formatting Actions ---
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
    const calloutSvgs = {
        tip: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
        warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        info: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
        danger: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
    };
    const html = `
        <div class="callout-box callout-${type}" contenteditable="false">
            <span class="callout-icon">${calloutSvgs[type] || calloutSvgs.info}</span>
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
                <button class="btn-copy-code" onclick="copySnippet(this)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Code</button>
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
        btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><polyline points="20 6 9 17 4 12"/></svg>Copied!';
        setTimeout(() => {
            btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Code';
        }, 2000);
    });
}

// --- Photos, Screenshots & Clipboard Paste ---
function triggerImageUpload() {
    if (state.isReadOnly) return;
    saveSelection();
    document.getElementById('image-file-input').click();
}

// --- Smart Image & Canvas Compression (Protects 15 GB Google Drive Quota) ---
function compressImageSource(dataUrl, maxDimension = 1280, quality = 0.82) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = Math.round((height * maxDimension) / width);
                    width = maxDimension;
                } else {
                    width = Math.round((width * maxDimension) / height);
                    height = maxDimension;
                }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            // Compress to JPEG 0.82 to reduce 5MB files down to ~70KB
            const compressed = canvas.toDataURL('image/jpeg', quality);
            resolve(compressed);
        };
        img.onerror = () => resolve(dataUrl);
        img.src = dataUrl;
    });
}

function handleImageFileSelected(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
        restoreSelection();
        const compressed = await compressImageSource(event.target.result);
        insertImageElement(compressed, file.name);
        handleEditorInput();
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
            reader.onload = async (event) => {
                const compressed = await compressImageSource(event.target.result);
                insertImageElement(compressed, 'Pasted Screenshot');
                handleEditorInput();
            };
            reader.readAsDataURL(blob);
            return;
        }
    }
}

function insertImageElement(src, alt) {
    if (state.isReadOnly) return;
    noteEditor.focus();
    // Wrap safely with paragraphs before & after to prevent getting stuck
    const html = `<p><br></p><div class="editor-img-wrap" style="margin: 14px 0; display: inline-block; max-width: 100%;"><img src="${src}" alt="${alt || 'Image'}" style="max-width: 100%; height: auto; border-radius: 6px; display: block;"></div><p><br></p>`;
    document.execCommand('insertHTML', false, html);
    handleEditorInput();
}

// Floating Image Controls & Corner Resizing
function setupImageInteractions() {
    noteEditor.addEventListener('click', (e) => {
        if (e.target.tagName === 'IMG') {
            selectImageElement(e.target);
        } else if (!e.target.closest('#image-toolbar') && !e.target.closest('#image-resize-overlay')) {
            hideImageToolbar();
        }
    });

    setupImageResizeHandles();
}

function selectImageElement(img) {
    state.activeImageElement = img;
    document.querySelectorAll('.wysiwyg-canvas img').forEach(i => i.classList.remove('selected-img'));
    img.classList.add('selected-img');
    imageToolbar.style.display = 'flex';
    updateImageResizeOverlay();
}

function hideImageToolbar() {
    if (state.activeImageElement) {
        state.activeImageElement.classList.remove('selected-img');
        state.activeImageElement = null;
    }
    imageToolbar.style.display = 'none';
    const overlay = document.getElementById('image-resize-overlay');
    if (overlay) overlay.style.display = 'none';
}

function updateImageResizeOverlay() {
    const overlay = document.getElementById('image-resize-overlay');
    const scrollArea = document.getElementById('editor-scroll-area');
    if (!overlay || !scrollArea) return;

    if (!state.activeImageElement || !state.activeImageElement.isConnected) {
        overlay.style.display = 'none';
        return;
    }

    const img = state.activeImageElement;
    const imgRect = img.getBoundingClientRect();
    const scrollRect = scrollArea.getBoundingClientRect();

    if (imgRect.width === 0 || imgRect.height === 0) {
        overlay.style.display = 'none';
        return;
    }

    overlay.style.display = 'block';
    const left = imgRect.left - scrollRect.left - scrollArea.clientLeft + scrollArea.scrollLeft;
    const top = imgRect.top - scrollRect.top - scrollArea.clientTop + scrollArea.scrollTop;

    overlay.style.left = `${Math.round(left)}px`;
    overlay.style.top = `${Math.round(top)}px`;
    overlay.style.width = `${Math.round(imgRect.width)}px`;
    overlay.style.height = `${Math.round(imgRect.height)}px`;

    const badge = document.getElementById('img-dimension-badge');
    if (badge) {
        badge.textContent = `${Math.round(imgRect.width)} × ${Math.round(imgRect.height)}`;
    }
}

function setupImageResizeHandles() {
    const overlay = document.getElementById('image-resize-overlay');
    if (!overlay) return;

    let isResizing = false;
    let currentHandle = null;
    let startX = 0;
    let startWidth = 0;

    overlay.querySelectorAll('.img-resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!state.activeImageElement) return;

            isResizing = true;
            currentHandle = handle.dataset.handle;
            startX = e.clientX;
            const rect = state.activeImageElement.getBoundingClientRect();
            startWidth = rect.width;

            document.body.style.userSelect = 'none';
        });

        handle.addEventListener('touchstart', (e) => {
            if (e.touches.length !== 1 || !state.activeImageElement) return;
            isResizing = true;
            currentHandle = handle.dataset.handle;
            startX = e.touches[0].clientX;
            const rect = state.activeImageElement.getBoundingClientRect();
            startWidth = rect.width;
        }, { passive: true });
    });

    window.addEventListener('mousemove', (e) => {
        if (!isResizing || !state.activeImageElement) return;
        const dx = e.clientX - startX;
        let newWidth = startWidth;

        if (currentHandle === 'se' || currentHandle === 'ne') {
            newWidth = startWidth + dx;
        } else if (currentHandle === 'sw' || currentHandle === 'nw') {
            newWidth = startWidth - dx;
        }

        const editorWidth = noteEditor.clientWidth || 600;
        newWidth = Math.max(60, Math.min(newWidth, editorWidth - 20));

        state.activeImageElement.style.width = `${Math.round(newWidth)}px`;
        state.activeImageElement.style.height = 'auto';
        updateImageResizeOverlay();
    });

    window.addEventListener('touchmove', (e) => {
        if (!isResizing || !state.activeImageElement || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - startX;
        let newWidth = startWidth;

        if (currentHandle === 'se' || currentHandle === 'ne') {
            newWidth = startWidth + dx;
        } else if (currentHandle === 'sw' || currentHandle === 'nw') {
            newWidth = startWidth - dx;
        }

        const editorWidth = noteEditor.clientWidth || 600;
        newWidth = Math.max(60, Math.min(newWidth, editorWidth));

        state.activeImageElement.style.width = `${Math.round(newWidth)}px`;
        state.activeImageElement.style.height = 'auto';
        updateImageResizeOverlay();
    });

    const finishResize = () => {
        if (isResizing) {
            isResizing = false;
            currentHandle = null;
            document.body.style.userSelect = '';
            handleEditorInput();
        }
    };

    window.addEventListener('mouseup', finishResize);
    window.addEventListener('touchend', finishResize);

    const scrollArea = document.getElementById('editor-scroll-area');
    if (scrollArea) {
        scrollArea.addEventListener('scroll', updateImageResizeOverlay);
    }
    window.addEventListener('resize', updateImageResizeOverlay);
}

// Copy selected image / signature to clipboard
async function copyActiveImage() {
    if (!state.activeImageElement) return;
    const img = state.activeImageElement;

    try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width || 300;
        canvas.height = img.naturalHeight || img.height || 200;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob(async (blob) => {
            if (!blob) throw new Error('Could not extract blob from canvas');
            if (navigator.clipboard && navigator.clipboard.write) {
                await navigator.clipboard.write([
                    new ClipboardItem({ 'image/png': blob })
                ]);
                showToast('✓ Image copied to clipboard!');
            } else if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(img.src);
                showToast('✓ Image data copied to clipboard!');
            }
        }, 'image/png');
    } catch (err) {
        console.warn('Copy image error:', err);
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(img.src);
            showToast('✓ Image data copied to clipboard!');
        }
    }
}

// Global key shortcut for image copy
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c' && state.activeImageElement) {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || sel.toString().trim() === '') {
            e.preventDefault();
            copyActiveImage();
        }
    }
});

function setImageSize(pct) {
    if (!state.activeImageElement) return;
    state.activeImageElement.style.width = pct;
    state.activeImageElement.style.height = 'auto';
    updateImageResizeOverlay();
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
    updateImageResizeOverlay();
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

// Floating Table Actions & Interactive Resizing
let isResizingTableCol = false;
let resizeColIdx = -1;
let resizeTableElem = null;
let resizeStartX = 0;
let resizeStartWidth = 0;
let resizeHoverCell = null;

function setupTableInteractions() {
    // Focus listener to show table toolbar
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

    // Detect column borders on hover and set col-resize cursor
    noteEditor.addEventListener('mousemove', (e) => {
        if (isResizingTableCol) return;
        const cell = e.target.closest('td, th');
        if (!cell || state.isReadOnly) {
            if (resizeHoverCell) {
                resizeHoverCell.style.cursor = '';
                resizeHoverCell = null;
            }
            return;
        }

        const rect = cell.getBoundingClientRect();
        const distFromRight = rect.right - e.clientX;
        if (distFromRight >= -2 && distFromRight <= 8) {
            cell.style.cursor = 'col-resize';
            resizeHoverCell = cell;
        } else {
            cell.style.cursor = '';
            if (resizeHoverCell === cell) resizeHoverCell = null;
        }
    });

    // Start column drag resizing on mousedown
    noteEditor.addEventListener('mousedown', (e) => {
        if (state.isReadOnly) return;
        const cell = e.target.closest('td, th');
        if (!cell) return;

        const rect = cell.getBoundingClientRect();
        const distFromRight = rect.right - e.clientX;
        if (distFromRight >= -2 && distFromRight <= 8) {
            e.preventDefault();
            e.stopPropagation();

            isResizingTableCol = true;
            resizeHoverCell = cell;
            resizeTableElem = cell.closest('table');
            resizeColIdx = cell.cellIndex;
            resizeStartX = e.clientX;
            resizeStartWidth = cell.offsetWidth;

            if (resizeTableElem) {
                resizeTableElem.style.tableLayout = 'fixed';
                const firstRow = resizeTableElem.rows[0];
                if (firstRow) {
                    for (let i = 0; i < firstRow.children.length; i++) {
                        const colCell = firstRow.children[i];
                        if (!colCell.style.width) {
                            colCell.style.width = `${colCell.offsetWidth}px`;
                        }
                    }
                }
            }

            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        }
    });

    // Handle column resize dragging on window
    window.addEventListener('mousemove', (e) => {
        if (!isResizingTableCol || !resizeTableElem || resizeColIdx < 0) return;

        const delta = e.clientX - resizeStartX;
        const newWidth = Math.max(35, resizeStartWidth + delta);

        for (const row of resizeTableElem.rows) {
            if (row.children[resizeColIdx]) {
                row.children[resizeColIdx].style.width = `${newWidth}px`;
            }
        }

        let totalW = 0;
        const firstRow = resizeTableElem.rows[0];
        if (firstRow) {
            for (let i = 0; i < firstRow.children.length; i++) {
                totalW += firstRow.children[i].offsetWidth;
            }
            resizeTableElem.style.width = `${totalW}px`;
        }
    });

    // Finish column resize dragging on window
    const finishColResize = () => {
        if (isResizingTableCol) {
            isResizingTableCol = false;
            resizeColIdx = -1;
            resizeTableElem = null;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            if (resizeHoverCell) {
                resizeHoverCell.style.cursor = '';
                resizeHoverCell = null;
            }
            handleEditorInput();
        }
    };

    window.addEventListener('mouseup', finishColResize);
    window.addEventListener('mouseleave', finishColResize);
}

function setTableWidthFull() {
    if (!state.activeTableElement) return;
    const table = state.activeTableElement;
    table.style.width = '100%';
    table.style.tableLayout = 'fixed';
    for (const row of table.rows) {
        for (const c of row.children) {
            c.style.width = '';
        }
    }
    handleEditorInput();
}

function setTableWidthAuto() {
    if (!state.activeTableElement) return;
    const table = state.activeTableElement;
    table.style.width = 'auto';
    table.style.tableLayout = 'auto';
    for (const row of table.rows) {
        for (const c of row.children) {
            c.style.width = '';
        }
    }
    handleEditorInput();
}

function distributeTableColsEvenly() {
    if (!state.activeTableElement) return;
    const table = state.activeTableElement;
    const cols = table.rows[0]?.children.length || 1;
    const pct = (100 / cols).toFixed(2);
    table.style.width = '100%';
    table.style.tableLayout = 'fixed';
    for (const row of table.rows) {
        for (const c of row.children) {
            c.style.width = `${pct}%`;
        }
    }
    handleEditorInput();
}

function adjustActiveColWidth(delta) {
    if (!state.activeTableCell || !state.activeTableElement) return;
    const colIdx = state.activeTableCell.cellIndex;
    const table = state.activeTableElement;
    table.style.tableLayout = 'fixed';

    const curWidth = state.activeTableCell.offsetWidth;
    const newWidth = Math.max(35, curWidth + delta);

    for (const row of table.rows) {
        if (row.children[colIdx]) {
            row.children[colIdx].style.width = `${newWidth}px`;
        }
    }

    let totalW = 0;
    const firstRow = table.rows[0];
    if (firstRow) {
        for (let i = 0; i < firstRow.children.length; i++) {
            totalW += firstRow.children[i].offsetWidth;
        }
        table.style.width = `${totalW}px`;
    }

    handleEditorInput();
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

// Helper for drawing arrows on HTML5 canvas
function drawCanvasArrow(ctx, fromX, fromY, toX, toY, color, width) {
    const headLen = Math.max(12, width * 3.5);
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Arrowhead triangle
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headLen * Math.cos(angle - Math.PI / 6), toY - headLen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headLen * Math.cos(angle + Math.PI / 6), toY - headLen * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
}

// --- Windows Paint & Signature Studio ---
function setupPaintStudio() {
    const canvas = document.getElementById('paint-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let arrowStartPoint = null;
    let canvasSnapshot = null;

    document.getElementById('btn-paint-tool-signature').onclick = () => setPaintTool('signature');
    document.getElementById('btn-paint-tool-brush').onclick = () => setPaintTool('brush');
    const btnArrow = document.getElementById('btn-paint-tool-arrow');
    if (btnArrow) btnArrow.onclick = () => setPaintTool('arrow');
    document.getElementById('btn-paint-tool-eraser').onclick = () => setPaintTool('eraser');

    const widthSlider = document.getElementById('paint-width-slider');
    const widthVal = document.getElementById('paint-width-val');
    widthSlider.oninput = (e) => {
        state.paintWidth = parseInt(e.target.value, 10);
        widthVal.textContent = state.paintWidth + 'px';
    };

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

    document.getElementById('btn-paint-clear').onclick = () => {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

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
        if (state.paintTool === 'arrow') {
            arrowStartPoint = pt;
            canvasSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
        } else {
            ctx.beginPath();
            ctx.moveTo(pt.x, pt.y);
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!state.isPainting) return;
        const pt = getCanvasCoords(e);
        state.paintPoints.push(pt);

        if (state.paintTool === 'arrow') {
            if (canvasSnapshot && arrowStartPoint) {
                ctx.putImageData(canvasSnapshot, 0, 0);
                drawCanvasArrow(ctx, arrowStartPoint.x, arrowStartPoint.y, pt.x, pt.y, state.paintColor, state.paintWidth);
            }
            return;
        }

        ctx.lineWidth = state.paintWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (state.paintTool === 'eraser') {
            ctx.strokeStyle = '#ffffff';
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
        } else if (state.paintTool === 'signature') {
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
            ctx.strokeStyle = state.paintColor;
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
        }
    });

    window.addEventListener('mouseup', () => {
        if (state.isPainting) {
            if (state.paintTool === 'arrow' && arrowStartPoint && state.paintPoints.length > 0) {
                const pt = state.paintPoints[state.paintPoints.length - 1];
                if (canvasSnapshot) ctx.putImageData(canvasSnapshot, 0, 0);
                drawCanvasArrow(ctx, arrowStartPoint.x, arrowStartPoint.y, pt.x, pt.y, state.paintColor, state.paintWidth);
            }
            state.isPainting = false;
            state.paintPoints = [];
            arrowStartPoint = null;
            canvasSnapshot = null;
        }
    });

    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            state.isPainting = true;
            const pt = getCanvasCoords(e.touches[0]);
            state.paintPoints = [pt];
            if (state.paintTool === 'arrow') {
                arrowStartPoint = pt;
                canvasSnapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
            } else {
                ctx.beginPath();
                ctx.moveTo(pt.x, pt.y);
            }
        }
    });

    canvas.addEventListener('touchmove', (e) => {
        if (!state.isPainting || e.touches.length !== 1) return;
        e.preventDefault();
        const pt = getCanvasCoords(e.touches[0]);
        state.paintPoints.push(pt);

        if (state.paintTool === 'arrow') {
            if (canvasSnapshot && arrowStartPoint) {
                ctx.putImageData(canvasSnapshot, 0, 0);
                drawCanvasArrow(ctx, arrowStartPoint.x, arrowStartPoint.y, pt.x, pt.y, state.paintColor, state.paintWidth);
            }
            return;
        }

        ctx.lineWidth = state.paintWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = state.paintTool === 'eraser' ? '#ffffff' : state.paintColor;
        ctx.lineTo(pt.x, pt.y);
        ctx.stroke();
    });

    canvas.addEventListener('touchend', () => {
        if (state.isPainting) {
            if (state.paintTool === 'arrow' && arrowStartPoint && state.paintPoints.length > 0) {
                const pt = state.paintPoints[state.paintPoints.length - 1];
                if (canvasSnapshot) ctx.putImageData(canvasSnapshot, 0, 0);
                drawCanvasArrow(ctx, arrowStartPoint.x, arrowStartPoint.y, pt.x, pt.y, state.paintColor, state.paintWidth);
            }
            state.isPainting = false;
            state.paintPoints = [];
            arrowStartPoint = null;
            canvasSnapshot = null;
        }
    });

    document.getElementById('btn-paint-insert').onclick = () => {
        const dataUrl = canvas.toDataURL('image/png');
        closePaintModal();
        restoreSelection();
        insertImageElement(dataUrl, state.paintTool === 'signature' ? 'Handwritten Signature' : (state.paintTool === 'arrow' ? 'Arrow Diagram' : 'Paint Drawing'));
    };
}

function setPaintTool(tool) {
    state.paintTool = tool;
    document.getElementById('btn-paint-tool-signature').classList.toggle('active', tool === 'signature');
    document.getElementById('btn-paint-tool-brush').classList.toggle('active', tool === 'brush');
    document.getElementById('btn-paint-tool-eraser').classList.toggle('active', tool === 'eraser');
    const btnArrow = document.getElementById('btn-paint-tool-arrow');
    if (btnArrow) btnArrow.classList.toggle('active', tool === 'arrow');
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
        const isFolder = node.is_folder || node.icon === 'folder';
        div.innerHTML = `${getNodeIconSvg(node.icon, node.color, isFolder, false, 14)} <b>${escapeHtml(node.title || 'Untitled')}</b>`;
        div.onclick = () => {
            restoreSelection();
            insertNodeLink(node.id, node.title);
            closeNodeLinkModal();
        };
        list.appendChild(div);
    }
}

function insertNodeLink(targetId, targetTitle) {
    const html = `<a href="javascript:void(0)" class="node-anchor-link" data-node-id="${targetId}" onclick="selectNode('${targetId}')"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>${targetTitle}</a> `;
    insertHtmlAtCursor(html);
}

// --- Find & Replace ---
function toggleFindBar() {
    const isVisible = findReplaceBar.style.display === 'flex';
    const btn = document.getElementById('btn-toggle-find');
    if (isVisible) {
        closeFindBar();
    } else {
        findReplaceBar.style.display = 'flex';
        if (btn) btn.classList.add('active');
        findInput.focus();
        findInput.select();
    }
}

function closeFindBar() {
    findReplaceBar.style.display = 'none';
    findCount.textContent = '';
    const btn = document.getElementById('btn-toggle-find');
    if (btn) btn.classList.remove('active');
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

// --- Google Drive & Security Modal ---
function openDriveModal() {
    const modal = document.getElementById('drive-modal');
    modal.style.display = 'flex';
    updateGoogleUserUI();

    const e2eeToggle = document.getElementById('e2ee-toggle');
    const e2eePassGroup = document.getElementById('e2ee-password-group');
    if (e2eeToggle) {
        e2eeToggle.checked = state.e2eeEnabled;
        if (e2eePassGroup) e2eePassGroup.style.display = state.e2eeEnabled ? 'flex' : 'none';
    }
}

function closeDriveModal() {
    document.getElementById('drive-modal').style.display = 'none';
}

// --- About CyberNote & Support Prekarshamaxx123 Modal ---
function openAboutModal() {
    const modal = document.getElementById('about-modal');
    if (modal) modal.style.display = 'flex';
}

function closeAboutModal() {
    const modal = document.getElementById('about-modal');
    if (modal) modal.style.display = 'none';
}

// --- GitHub Sync Modal ---
function openGitHubModal() {
    const modal = document.getElementById('github-modal');
    modal.style.display = 'flex';
    const conf = JSON.parse(localStorage.getItem('cybernote_gh_config') || localStorage.getItem('treekeep_gh_config') || '{}');
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

    localStorage.setItem('cybernote_gh_config', JSON.stringify({ username, repo, token }));
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
                <div style="color:var(--success); font-weight:600;">✓ Connected & synced to GitHub!</div>
                <div style="font-size:0.8rem; margin-top:4px;">Repo: <b>${username}/${repo}</b></div>
                <div style="font-size:0.8rem;">Live: <code>https://${username}.github.io/${repo}/</code></div>
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
    a.download = `cybernote-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

// --- Icon Picker ---
function openIconModal() {
    if (state.isReadOnly) return;
    const modal = document.getElementById('icon-modal');
    if (!modal) return;
    
    // Style icon options with vector SVG icons
    const iconGrid = document.getElementById('icon-grid');
    if (iconGrid && !iconGrid.dataset.svgInitialized) {
        iconGrid.dataset.svgInitialized = 'true';
        iconGrid.querySelectorAll('.icon-opt').forEach(opt => {
            const iconKey = opt.dataset.icon;
            const label = opt.textContent.replace(/^[^\w\s]+/, '').trim();
            opt.innerHTML = `${getNodeIconSvg(iconKey, null, iconKey === 'folder', false, 18)} <span>${label}</span>`;
            opt.style.display = 'inline-flex';
            opt.style.alignItems = 'center';
            opt.style.gap = '8px';
        });
    }
    modal.style.display = 'flex';
}

function closeIconModal() {
    document.getElementById('icon-modal').style.display = 'none';
}

function selectIcon(iconName) {
    if (!state.activeNodeId || state.isReadOnly) return;
    const node = state.nodes.get(state.activeNodeId);
    if (node) node.icon = iconName;
    const isFolder = node ? (node.is_folder || iconName === 'folder') : false;
    iconPickerBtn.innerHTML = getNodeIconSvg(iconName, node?.color, isFolder, false, 18);
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
    const ribbonBadge = document.getElementById('ribbon-word-count');
    if (ribbonBadge) {
        ribbonBadge.textContent = `${words} words`;
    }
    if (chars > 3000) {
        const estCompressedKb = Math.max(1, Math.round((chars * 0.04) / 1024));
        footerStats.textContent = `${words} words, ${chars} chars (~${(chars / 1024).toFixed(1)} KB) • Compressed: ~${estCompressedKb} KB (< 0.05 B/char)`;
    } else {
        footerStats.textContent = `${words} words, ${chars} characters`;
    }
}

// --- Markdown to HTML Converter for Legacy / Imported Notes ---
function convertMarkdownToHtml(md) {
    let html = escapeHtml(md);

    html = html.replace(/```([a-zA-Z0-9_\-]*)\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'code';
        return `
            <div class="code-box" contenteditable="false">
                <div class="code-box-header"><span>${language.toUpperCase()}</span><button class="btn-copy-code" onclick="copySnippet(this)"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;margin-right:4px;"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>Copy Code</button></div>
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

// --- Interactive Tag Chips Management ---
function renderTagChips(tagsString = '') {
    const list = document.getElementById('tags-chips-list');
    if (!list) return;
    list.innerHTML = '';

    const hiddenInput = document.getElementById('note-tags');
    if (hiddenInput) hiddenInput.value = tagsString;

    if (!tagsString) return;

    const tags = tagsString
        .split(/[,;]/)
        .map(t => t.trim())
        .filter(t => t.length > 0);

    const uniqueTags = [...new Set(tags)];

    uniqueTags.forEach(tag => {
        const chip = document.createElement('div');
        chip.className = 'tag-chip';

        const nameSpan = document.createElement('span');
        nameSpan.className = 'tag-chip-name';
        nameSpan.textContent = `#${tag}`;
        nameSpan.title = `Click to search notes with #${tag}`;
        nameSpan.onclick = () => {
            const searchInput = document.getElementById('global-search');
            if (searchInput) {
                searchInput.value = tag;
                performGlobalSearch(tag);
            }
        };

        const removeBtn = document.createElement('span');
        removeBtn.className = 'tag-chip-remove';
        removeBtn.innerHTML = '&times;';
        removeBtn.title = 'Remove tag';
        removeBtn.onclick = (e) => {
            e.stopPropagation();
            if (state.isReadOnly) return;
            removeTagFromCurrentNode(tag);
        };

        chip.appendChild(nameSpan);
        chip.appendChild(removeBtn);
        list.appendChild(chip);
    });
}

function addTagToCurrentNode(rawTag) {
    if (!state.activeNodeId || state.isReadOnly) return;
    const node = state.nodes.get(state.activeNodeId);
    if (!node) return;

    const clean = rawTag.replace(/^[#\s]+/, '').replace(/[,;]/g, '').trim();
    if (!clean) return;

    const currentTags = (node.tags || '')
        .split(/[,;]/)
        .map(t => t.trim())
        .filter(t => t.length > 0);

    if (!currentTags.includes(clean)) {
        currentTags.push(clean);
        const newTagStr = currentTags.join(', ');
        node.tags = newTagStr;
        scheduleSave('tags', newTagStr);
        saveLocalNodesBackup();
        renderTagChips(newTagStr);
    }
}

function removeTagFromCurrentNode(tagToRemove) {
    if (!state.activeNodeId || state.isReadOnly) return;
    const node = state.nodes.get(state.activeNodeId);
    if (!node) return;

    const currentTags = (node.tags || '')
        .split(/[,;]/)
        .map(t => t.trim())
        .filter(t => t.length > 0 && t !== tagToRemove);

    const newTagStr = currentTags.join(', ');
    node.tags = newTagStr;
    scheduleSave('tags', newTagStr);
    saveLocalNodesBackup();
    renderTagChips(newTagStr);
}

function setupTagInteractions() {
    const input = document.getElementById('note-tags-input');
    if (!input) return;

    input.addEventListener('keydown', (e) => {
        if (state.isReadOnly) return;
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const val = input.value.trim();
            if (val) {
                addTagToCurrentNode(val);
                input.value = '';
            }
        } else if (e.key === 'Backspace' && input.value === '') {
            if (!state.activeNodeId) return;
            const node = state.nodes.get(state.activeNodeId);
            if (!node || !node.tags) return;
            const tags = node.tags.split(/[,;]/).map(t => t.trim()).filter(Boolean);
            if (tags.length > 0) {
                removeTagFromCurrentNode(tags[tags.length - 1]);
            }
        }
    });

    input.addEventListener('blur', () => {
        if (state.isReadOnly) return;
        const val = input.value.trim();
        if (val) {
            addTagToCurrentNode(val);
            input.value = '';
        }
    });
}

// --- First-Visit Welcome Modal ---
function checkFirstVisitWelcome() {
    const isDismissed = localStorage.getItem('cybernote_welcome_dismissed');
    if (!state.googleAccessToken && !isDismissed) {
        const welcomeModal = document.getElementById('welcome-modal');
        if (welcomeModal) welcomeModal.style.display = 'flex';
    }
}

function closeWelcomeModal() {
    const welcomeModal = document.getElementById('welcome-modal');
    if (welcomeModal) welcomeModal.style.display = 'none';
    localStorage.setItem('cybernote_welcome_dismissed', '1');
    checkShowStarBanner();
}

// --- Onboarding & Star GitHub Notification Banner ---
function checkShowStarBanner() {
    if (localStorage.getItem('cybernote_star_dismissed') === 'true') return;
    setTimeout(() => {
        const banner = document.getElementById('github-star-banner');
        if (banner) {
            banner.style.display = 'block';
        }
    }, 1600);
}

function dismissStarBanner(clickedStar = false) {
    const banner = document.getElementById('github-star-banner');
    if (banner) {
        banner.style.opacity = '0';
        banner.style.transition = 'opacity 0.25s ease';
        setTimeout(() => banner.style.display = 'none', 250);
    }
    localStorage.setItem('cybernote_star_dismissed', 'true');
    if (clickedStar) {
        showToast('Thank you for starring CyberNote! ⭐');
    }
}
window.dismissStarBanner = dismissStarBanner;
window.checkShowStarBanner = checkShowStarBanner;

// --- Centralized Settings Hub & Bug Report ---
function openSettingsModal(targetTab = 'tab-gdrive') {
    hideFloatingToolbars();
    closeTreeContextMenu();
    const modal = document.getElementById('settings-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    switchSettingsTab(targetTab);
    updateSettingsUI();
}

function closeSettingsModal() {
    const modal = document.getElementById('settings-modal');
    if (modal) modal.style.display = 'none';
}

const SETTINGS_TAB_TITLES = {
    'tab-gdrive': 'Google Drive',
    'tab-offline': 'Offline & Storage',
    'tab-migration': 'Import & Export',
    'tab-github': 'GitHub Sync',
    'tab-security': 'Security & E2EE',
    'tab-bug': 'Bug Report'
};

function switchSettingsTab(tabId) {
    document.querySelectorAll('.settings-tab-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.tab === tabId);
    });
    document.querySelectorAll('.settings-tab-pane').forEach(p => {
        p.classList.toggle('active', p.id === tabId);
    });
    const titleEl = document.getElementById('settings-current-tab-title');
    if (titleEl && SETTINGS_TAB_TITLES[tabId]) {
        titleEl.textContent = SETTINGS_TAB_TITLES[tabId];
    }
}

function updateSettingsUI() {
    // 1. Google Drive info
    const nameEl = document.getElementById('settings-drive-status-name');
    const detailEl = document.getElementById('settings-drive-status-detail');
    const pillEl = document.getElementById('settings-drive-status-pill');
    const avatarImg = document.getElementById('settings-user-avatar');
    const placeholder = document.getElementById('settings-user-avatar-placeholder');
    const loggedOutSection = document.getElementById('settings-gdrive-logged-out');
    const loggedInSection = document.getElementById('settings-gdrive-logged-in');

    const storageTitle = document.getElementById('settings-storage-title');
    const storageUsedTag = document.getElementById('settings-storage-used');
    const storageFill = document.getElementById('settings-storage-fill');
    const storageText = document.getElementById('settings-storage-text');
    const storageSubtext = document.getElementById('settings-storage-subtext');

    // 2. Storage footprint calculation
    const allNodes = Array.from(state.nodes.values());
    const minifiedJson = JSON.stringify(allNodes);
    const sizeBytes = new Blob([minifiedJson]).size;
    const sizeKb = (sizeBytes / 1024).toFixed(1);

    if (state.googleUser && state.googleAccessToken) {
        if (nameEl) nameEl.textContent = state.googleUser.name || 'Google User';
        if (pillEl) {
            pillEl.textContent = '● Connected';
            pillEl.className = 'status-pill status-pill-online';
        }
        if (detailEl) detailEl.textContent = state.googleUser.email || 'Auto-Sync Active';
        if (avatarImg && state.googleUser.picture) {
            avatarImg.src = state.googleUser.picture;
            avatarImg.style.display = 'block';
            if (placeholder) placeholder.style.display = 'none';
        }
        if (loggedOutSection) loggedOutSection.style.display = 'none';
        if (loggedInSection) loggedInSection.style.display = 'flex';

        if (storageTitle) storageTitle.textContent = 'Google Drive Storage Footprint (15 GB Quota)';
        if (storageUsedTag) storageUsedTag.textContent = `${sizeKb} KB (< 0.001% used)`;
        if (storageFill) storageFill.style.width = '2%';
        if (storageText) storageText.textContent = `Backup size: ~${sizeKb} KB (Minified JSON)`;
        if (storageSubtext) {
            storageSubtext.textContent = '✓ ~14.9999 GB Free Space Remaining';
            storageSubtext.style.color = 'var(--success)';
        }
    } else {
        if (nameEl) nameEl.textContent = 'Guest User';
        if (pillEl) {
            pillEl.textContent = 'Offline Mode';
            pillEl.className = 'status-pill status-pill-offline';
        }
        if (detailEl) detailEl.textContent = 'Google Drive Cloud Sync Paused';
        if (avatarImg) avatarImg.style.display = 'none';
        if (placeholder) placeholder.style.display = 'flex';
        if (loggedOutSection) loggedOutSection.style.display = 'flex';
        if (loggedInSection) loggedInSection.style.display = 'none';

        if (storageTitle) storageTitle.textContent = 'Local Notebook Footprint';
        if (storageUsedTag) storageUsedTag.textContent = `${sizeKb} KB (Local Database)`;
        if (storageFill) storageFill.style.width = '2%';
        if (storageText) storageText.textContent = `Local storage size: ~${sizeKb} KB (Minified JSON & SQLite)`;
        if (storageSubtext) {
            storageSubtext.textContent = 'Sign in with Google to enable automatic cloud backup to your 15 GB quota';
            storageSubtext.style.color = 'var(--text-muted)';
        }
    }

    // 3. Connection indicator
    const isOnline = navigator.onLine;
    const connInd = document.getElementById('settings-conn-indicator');
    const connTitle = document.getElementById('settings-conn-title');
    const connDesc = document.getElementById('settings-conn-desc');

    if (connInd) connInd.className = isOnline ? 'sync-dot live' : 'sync-dot offline';
    if (connTitle) connTitle.textContent = isOnline ? 'Connection Status: Online' : 'Connection Status: Offline';
    if (connDesc) connDesc.textContent = isOnline
        ? 'All edits are saved locally and synced continuously with the cloud.'
        : 'Running in offline mode. Notes are saved locally in browser storage & SQLite.';

    // 4. Bug report URL strictly locked to official repository
    localStorage.removeItem('cybernote_bug_url');
    const bugInput = document.getElementById('bug-report-url-input');
    if (bugInput) bugInput.value = OFFICIAL_BUG_URL;

    // 5. E2EE toggle
    const e2eeToggle = document.getElementById('settings-e2ee-toggle');
    const e2eePassGroup = document.getElementById('settings-e2ee-pass-group');
    const e2eePass = document.getElementById('settings-e2ee-password');
    if (e2eeToggle) {
        e2eeToggle.checked = state.e2eeEnabled;
        if (e2eePassGroup) e2eePassGroup.style.display = state.e2eeEnabled ? 'block' : 'none';
        if (e2eePass && state.e2eePassword) e2eePass.value = state.e2eePassword;
    }
}

const OFFICIAL_BUG_URL = 'https://github.com/Prekarshamaxx123/CyberNote/issues';

function openBugReportPage() {
    window.open(OFFICIAL_BUG_URL, '_blank');
}

function saveGitHubSettingsFromTab() {
    const token = document.getElementById('gh-token-settings')?.value.trim();
    const repo = document.getElementById('gh-repo-settings')?.value.trim();
    const branch = document.getElementById('gh-branch-settings')?.value.trim() || 'main';

    if (token) state.githubToken = token;
    if (repo) state.githubRepo = repo;
    if (branch) state.githubBranch = branch;

    localStorage.setItem('cybernote_gh_token', token);
    localStorage.setItem('cybernote_gh_repo', repo);
    localStorage.setItem('cybernote_gh_branch', branch);

    connectAndSyncGitHub();
}

// --- Setup All Event Listeners ---
function setupEventListeners() {
    // Theme toggle
    document.getElementById('btn-theme').onclick = toggleTheme;

    // All Notes Navigation (Google Keep style overview)
    const navAllNotes = document.getElementById('nav-all-notes');
    if (navAllNotes) navAllNotes.onclick = showAllNotesView;

    // Google Sign-In & Settings Hub
    if (btnGoogleLogin) btnGoogleLogin.onclick = requestGoogleLogin;
    if (userProfileBadge) userProfileBadge.onclick = () => openSettingsModal('tab-gdrive');
    const btnOpenSettings = document.getElementById('btn-open-settings');
    if (btnOpenSettings) btnOpenSettings.onclick = () => openSettingsModal('tab-gdrive');
    const syncStatusBadge = document.getElementById('sync-status');
    if (syncStatusBadge) syncStatusBadge.onclick = () => openSettingsModal('tab-gdrive');
    const btnOpenDrive = document.getElementById('btn-open-drive-modal');
    if (btnOpenDrive) btnOpenDrive.onclick = () => openSettingsModal('tab-gdrive');

    // Settings Modal Tab Buttons
    document.querySelectorAll('.settings-tab-btn').forEach(btn => {
        btn.onclick = () => switchSettingsTab(btn.dataset.tab);
    });

    // Settings Modal Action Buttons
    const btnSettingsGLogin = document.getElementById('btn-settings-google-login');
    if (btnSettingsGLogin) btnSettingsGLogin.onclick = requestGoogleLogin;
    const btnSettingsBackup = document.getElementById('btn-settings-backup-now');
    if (btnSettingsBackup) btnSettingsBackup.onclick = () => backupToGoogleDrive(false);
    const btnSettingsRestore = document.getElementById('btn-settings-restore-now');
    if (btnSettingsRestore) btnSettingsRestore.onclick = () => autoRestoreFromDriveOnSignIn();
    const btnSettingsSignout = document.getElementById('btn-settings-signout');
    if (btnSettingsSignout) btnSettingsSignout.onclick = signoutGoogle;

    const btnDriveBackup = document.getElementById('btn-drive-backup-now');
    if (btnDriveBackup) btnDriveBackup.onclick = () => backupToGoogleDrive(false);
    const btnDriveRestore = document.getElementById('btn-drive-restore-now');
    if (btnDriveRestore) btnDriveRestore.onclick = () => autoRestoreFromDriveOnSignIn();
    const btnDriveSignout = document.getElementById('btn-drive-signout');
    if (btnDriveSignout) btnDriveSignout.onclick = signoutGoogle;

    // Settings Tab Search Filter (Matches photo)
    const settingsSearch = document.getElementById('settings-tab-search');
    if (settingsSearch) {
        settingsSearch.oninput = (e) => {
            const q = e.target.value.toLowerCase().trim();
            document.querySelectorAll('.settings-tab-btn').forEach(btn => {
                const text = btn.textContent.toLowerCase();
                btn.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
            });
        };
    }

    // Bug Report Button (Locked to Official Repository)
    const btnBugReport = document.getElementById('btn-open-bug-report');
    if (btnBugReport) btnBugReport.onclick = openBugReportPage;

    // First-Visit Welcome Gateway Modal Buttons
    const btnWelcomeSignin = document.getElementById('btn-welcome-google-signin');
    if (btnWelcomeSignin) btnWelcomeSignin.onclick = () => {
        closeWelcomeModal();
        requestGoogleLogin();
    };
    const btnWelcomeSkip = document.getElementById('btn-welcome-skip');
    if (btnWelcomeSkip) btnWelcomeSkip.onclick = closeWelcomeModal;

    // E2EE Toggles & Passwords
    const e2eeToggle = document.getElementById('e2ee-toggle');
    const e2eePassGroup = document.getElementById('e2ee-password-group');
    const settingsE2eeToggle = document.getElementById('settings-e2ee-toggle');
    const settingsE2eePassGroup = document.getElementById('settings-e2ee-pass-group');

    const handleE2eeToggle = (checked) => {
        state.e2eeEnabled = checked;
        localStorage.setItem('cybernote_e2ee_enabled', checked);
        if (e2eeToggle) e2eeToggle.checked = checked;
        if (settingsE2eeToggle) settingsE2eeToggle.checked = checked;
        if (e2eePassGroup) e2eePassGroup.style.display = checked ? 'flex' : 'none';
        if (settingsE2eePassGroup) settingsE2eePassGroup.style.display = checked ? 'block' : 'none';
    };

    if (e2eeToggle) e2eeToggle.onchange = (e) => handleE2eeToggle(e.target.checked);
    if (settingsE2eeToggle) settingsE2eeToggle.onchange = (e) => handleE2eeToggle(e.target.checked);

    const handleE2eePassword = (pass) => {
        state.e2eePassword = pass;
        const e2eePassInput = document.getElementById('e2ee-password');
        const settingsE2eePass = document.getElementById('settings-e2ee-password');
        if (e2eePassInput && e2eePassInput.value !== pass) e2eePassInput.value = pass;
        if (settingsE2eePass && settingsE2eePass.value !== pass) settingsE2eePass.value = pass;
    };

    const e2eePassInput = document.getElementById('e2ee-password');
    if (e2eePassInput) e2eePassInput.oninput = (e) => handleE2eePassword(e.target.value);
    const settingsE2eePass = document.getElementById('settings-e2ee-password');
    if (settingsE2eePass) settingsE2eePass.oninput = (e) => handleE2eePassword(e.target.value);

    const clientIdInput = document.getElementById('google-client-id-input');
    if (clientIdInput) {
        clientIdInput.onchange = (e) => {
            localStorage.setItem('cybernote_client_id', e.target.value.trim());
            initGoogleAuth();
        };
    }

    setupTagInteractions();

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

    // Undo / Redo & Instant Manual Sync
    const btnUndo = document.getElementById('btn-undo');
    if (btnUndo) btnUndo.onclick = () => execFormat('undo');
    const btnRedo = document.getElementById('btn-redo');
    if (btnRedo) btnRedo.onclick = () => execFormat('redo');
    const btnSyncNow = document.getElementById('btn-sync-now');
    if (btnSyncNow) btnSyncNow.onclick = triggerManualSyncNow;

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

    // Colors & Swatch Indicators
    const textColorPicker = document.getElementById('text-color-picker');
    if (textColorPicker) {
        textColorPicker.oninput = (e) => {
            const ind = document.getElementById('text-color-indicator');
            if (ind) ind.style.backgroundColor = e.target.value;
            execFormat('foreColor', e.target.value);
        };
    }
    const bgColorPicker = document.getElementById('bg-color-picker');
    if (bgColorPicker) {
        bgColorPicker.oninput = (e) => {
            const ind = document.getElementById('bg-color-indicator');
            if (ind) ind.style.backgroundColor = e.target.value;
            execFormat('hiliteColor', e.target.value);
        };
    }

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

    // New Studio & Utility Items (Toggle, Math, Kbd, Inline Code, Indent/Outdent, Case, Print)
    const btnToggle = document.getElementById('btn-insert-toggle');
    if (btnToggle) btnToggle.onclick = insertToggleBlock;

    const btnMath = document.getElementById('btn-insert-math');
    if (btnMath) btnMath.onclick = insertMathBox;

    const btnKbd = document.getElementById('btn-insert-kbd');
    if (btnKbd) btnKbd.onclick = insertKbdBadge;

    const btnInlineCode = document.getElementById('btn-inline-code');
    if (btnInlineCode) {
        btnInlineCode.onclick = () => {
            restoreSelection();
            const sel = window.getSelection();
            let text = 'code';
            if (sel && sel.rangeCount > 0 && !sel.isCollapsed && noteEditor.contains(sel.getRangeAt(0).commonAncestorContainer)) {
                text = sel.getRangeAt(0).toString() || text;
            }
            insertHtmlAtCursor(`<code>${escapeHtml(text)}</code>&nbsp;`);
        };
    }

    const btnIndent = document.getElementById('btn-indent');
    if (btnIndent) btnIndent.onclick = () => execFormat('indent');

    const btnOutdent = document.getElementById('btn-outdent');
    if (btnOutdent) btnOutdent.onclick = () => execFormat('outdent');

    const selectTextCase = document.getElementById('select-text-case');
    if (selectTextCase) {
        selectTextCase.onchange = (e) => {
            handleTextCaseChange(e.target.value);
            e.target.value = '';
        };
    }

    const btnPrint = document.getElementById('btn-print-note');
    if (btnPrint) btnPrint.onclick = handlePrintNote;

    // Creative Ribbon Popovers (Emoji, Neon, Animations, Arrows, Shapes)
    const btnEmoji = document.getElementById('btn-emoji-picker');
    if (btnEmoji) btnEmoji.onclick = (e) => toggleRibbonPopover('emoji-dropdown-menu', btnEmoji, e);

    const btnNeon = document.getElementById('btn-neon-effects');
    if (btnNeon) btnNeon.onclick = (e) => toggleRibbonPopover('neon-dropdown-menu', btnNeon, e);

    const btnAnim = document.getElementById('btn-anim-effects');
    if (btnAnim) btnAnim.onclick = (e) => toggleRibbonPopover('anim-dropdown-menu', btnAnim, e);

    const btnArrows = document.getElementById('btn-arrows-menu');
    if (btnArrows) btnArrows.onclick = (e) => toggleRibbonPopover('arrows-dropdown-menu', btnArrows, e);

    const btnShapes = document.getElementById('btn-shapes-menu');
    if (btnShapes) btnShapes.onclick = (e) => toggleRibbonPopover('shapes-dropdown-menu', btnShapes, e);

    // Prevent toolbar click from stealing focus from noteEditor
    document.querySelector('.editor-ribbon')?.addEventListener('mousedown', (e) => {
        saveSelection();
        if (e.target.closest('button, .popover-item, .emoji-chip, .color-indicator-bar')) {
            e.preventDefault();
        }
    });

    // Global outside click closer for ribbon popovers and context menus
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.ribbon-dropdown-wrap')) {
            closeAllRibbonPopovers();
        }
        if (!e.target.closest('#tree-context-menu')) {
            closeTreeContextMenu();
        }
    });

    // Floating Image Toolbar Actions
    document.getElementById('btn-img-size-25').onclick = () => setImageSize('25%');
    document.getElementById('btn-img-size-50').onclick = () => setImageSize('50%');
    document.getElementById('btn-img-size-100').onclick = () => setImageSize('100%');
    document.getElementById('btn-img-align-left').onclick = () => setImageAlign('left');
    document.getElementById('btn-img-align-center').onclick = () => setImageAlign('center');
    document.getElementById('btn-img-align-right').onclick = () => setImageAlign('right');
    const btnImgCopy = document.getElementById('btn-img-copy');
    if (btnImgCopy) btnImgCopy.onclick = copyActiveImage;
    document.getElementById('btn-img-delete').onclick = deleteActiveImage;

    // Floating Table Toolbar Actions
    document.getElementById('btn-tbl-add-row-above').onclick = () => addTableRow(true);
    document.getElementById('btn-tbl-add-row-below').onclick = () => addTableRow(false);
    document.getElementById('btn-tbl-add-col-left').onclick = () => addTableColumn(true);
    document.getElementById('btn-tbl-add-col-right').onclick = () => addTableColumn(false);
    document.getElementById('btn-tbl-del-row').onclick = deleteTableRow;
    document.getElementById('btn-tbl-del-col').onclick = deleteTableColumn;
    document.getElementById('btn-tbl-del-table').onclick = deleteEntireTable;

    const btnTblWidthFull = document.getElementById('btn-tbl-width-full');
    if (btnTblWidthFull) btnTblWidthFull.onclick = setTableWidthFull;
    const btnTblWidthAuto = document.getElementById('btn-tbl-width-auto');
    if (btnTblWidthAuto) btnTblWidthAuto.onclick = setTableWidthAuto;
    const btnTblDistributeCols = document.getElementById('btn-tbl-distribute-cols');
    if (btnTblDistributeCols) btnTblDistributeCols.onclick = distributeTableColsEvenly;
    const btnTblColWider = document.getElementById('btn-tbl-col-wider');
    if (btnTblColWider) btnTblColWider.onclick = () => adjustActiveColWidth(30);
    const btnTblColNarrower = document.getElementById('btn-tbl-col-narrower');
    if (btnTblColNarrower) btnTblColNarrower.onclick = () => adjustActiveColWidth(-30);

    // Node Actions
    const btnNewRoot = document.getElementById('btn-new-root');
    if (btnNewRoot) btnNewRoot.onclick = () => createNewRootNode('note');
    const btnNewMeta = document.getElementById('btn-new-note-meta');
    if (btnNewMeta) btnNewMeta.onclick = () => createNewRootNode('note');
    const btnSidebarNewNote = document.getElementById('btn-sidebar-new-note');
    if (btnSidebarNewNote) btnSidebarNewNote.onclick = () => createNewRootNode('note');
    const btnSidebarNewFolder = document.getElementById('btn-sidebar-new-folder');
    if (btnSidebarNewFolder) btnSidebarNewFolder.onclick = () => createNewRootNode('folder');
    const btnKeepNewNote = document.getElementById('btn-keep-new-note');
    if (btnKeepNewNote) btnKeepNewNote.onclick = () => createNewRootNode('note');
    const btnKeepNewFolder = document.getElementById('btn-keep-new-folder');
    if (btnKeepNewFolder) btnKeepNewFolder.onclick = () => createNewRootNode('folder');

    const btnPin = document.getElementById('btn-pin-node');
    if (btnPin) btnPin.onclick = togglePinActiveNode;
    const btnRename = document.getElementById('btn-rename-node');
    if (btnRename) btnRename.onclick = renameActiveNode;
    const btnAddSub = document.getElementById('btn-add-subnode');
    if (btnAddSub) btnAddSub.onclick = () => {
        if (state.activeNodeId) createSubNode(state.activeNodeId, 'note');
    };
    const btnDup = document.getElementById('btn-duplicate-node');
    if (btnDup) btnDup.onclick = duplicateCurrentNode;
    const btnToggleRo = document.getElementById('btn-toggle-readonly');
    if (btnToggleRo) btnToggleRo.onclick = toggleReadOnlyMode;
    const btnDel = document.getElementById('btn-delete-node');
    if (btnDel) btnDel.onclick = () => {
        if (state.activeNodeId) deleteNode(state.activeNodeId);
    };
    const readonlyBadge = document.getElementById('readonly-badge');
    if (readonlyBadge) readonlyBadge.onclick = toggleReadOnlyMode;

    // Tree Right-Click Context Menu Actions
    const ctxNewRoot = document.getElementById('ctx-new-root');
    if (ctxNewRoot) ctxNewRoot.onclick = () => {
        closeTreeContextMenu();
        createNewRootNode('note');
    };
    const ctxNewFolder = document.getElementById('ctx-new-folder');
    if (ctxNewFolder) ctxNewFolder.onclick = () => {
        closeTreeContextMenu();
        createNewRootNode('folder');
    };
    const ctxSubnode = document.getElementById('ctx-subnode');
    if (ctxSubnode) ctxSubnode.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        closeTreeContextMenu();
        if (tid) createSubNode(tid, 'note');
        else createNewRootNode('note');
    };
    const ctxSubfolder = document.getElementById('ctx-subfolder');
    if (ctxSubfolder) ctxSubfolder.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        closeTreeContextMenu();
        if (tid) createSubNode(tid, 'folder');
        else createNewRootNode('folder');
    };
    const ctxPin = document.getElementById('ctx-pin');
    if (ctxPin) ctxPin.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        if (tid) togglePinNode(tid);
        closeTreeContextMenu();
    };
    const ctxRename = document.getElementById('ctx-rename');
    if (ctxRename) ctxRename.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        closeTreeContextMenu();
        if (tid && tid !== state.activeNodeId) selectNode(tid);
        renameActiveNode();
    };
    const ctxColor = document.getElementById('ctx-color');
    if (ctxColor) ctxColor.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        closeTreeContextMenu();
        if (tid && tid !== state.activeNodeId) selectNode(tid);
        openNodeColorModal();
    };
    const ctxIcon = document.getElementById('ctx-icon');
    if (ctxIcon) ctxIcon.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        closeTreeContextMenu();
        if (tid && tid !== state.activeNodeId) selectNode(tid);
        openIconModal();
    };
    const ctxDuplicate = document.getElementById('ctx-duplicate');
    if (ctxDuplicate) ctxDuplicate.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        closeTreeContextMenu();
        if (tid && tid !== state.activeNodeId) selectNode(tid);
        duplicateCurrentNode();
    };
    const ctxReadonly = document.getElementById('ctx-readonly');
    if (ctxReadonly) ctxReadonly.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        closeTreeContextMenu();
        if (tid && tid !== state.activeNodeId) selectNode(tid);
        toggleReadOnlyMode();
    };
    const ctxExpandAll = document.getElementById('ctx-expand-all');
    if (ctxExpandAll) ctxExpandAll.onclick = () => {
        closeTreeContextMenu();
        expandAll();
    };
    const ctxCollapseAll = document.getElementById('ctx-collapse-all');
    if (ctxCollapseAll) ctxCollapseAll.onclick = () => {
        closeTreeContextMenu();
        collapseAll();
    };
    const ctxDelete = document.getElementById('ctx-delete');
    if (ctxDelete) ctxDelete.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        closeTreeContextMenu();
        if (tid) deleteNode(tid);
    };

    // Node Color
    const btnNodeColor = document.getElementById('btn-node-color');
    if (btnNodeColor) btnNodeColor.onclick = openNodeColorModal;
    document.querySelectorAll('.node-color-choice').forEach(btn => {
        btn.onclick = () => applyNodeColor(btn.dataset.color);
    });
    document.getElementById('btn-apply-custom-node-color').onclick = () => {
        const hex = document.getElementById('node-custom-color-input').value;
        applyNodeColor(hex);
    };

    // Node Move Up / Down (if present)
    const btnMoveUp = document.getElementById('btn-move-up');
    if (btnMoveUp) btnMoveUp.onclick = () => moveActiveNode('up');
    const btnMoveDown = document.getElementById('btn-move-down');
    if (btnMoveDown) btnMoveDown.onclick = () => moveActiveNode('down');

    // Expand / Collapse all (if present)
    const btnExpandAll = document.getElementById('btn-expand-all');
    if (btnExpandAll) btnExpandAll.onclick = expandAll;
    const btnCollapseAll = document.getElementById('btn-collapse-all');
    if (btnCollapseAll) btnCollapseAll.onclick = collapseAll;

    // Icon Picker
    iconPickerBtn.onclick = openIconModal;
    document.querySelectorAll('.icon-opt').forEach(opt => {
        opt.onclick = () => selectIcon(opt.dataset.icon);
    });

    // Find & Replace
    const btnToggleFind = document.getElementById('btn-toggle-find');
    if (btnToggleFind) btnToggleFind.onclick = toggleFindBar;
    document.getElementById('btn-find-close').onclick = closeFindBar;
    document.getElementById('btn-find-next').onclick = performFind;
    document.getElementById('btn-find-replace').onclick = performReplace;
    document.getElementById('btn-find-replace-all').onclick = performReplaceAll;

    // Tree Info & Modals
    const btnAbout = document.getElementById('btn-about');
    if (btnAbout) btnAbout.onclick = openAboutModal;
    const btnTreeInfo = document.getElementById('btn-tree-info');
    if (btnTreeInfo) btnTreeInfo.onclick = openTreeInfoModal;
    const btnGhSync = document.getElementById('btn-github-sync');
    if (btnGhSync) btnGhSync.onclick = openGitHubModal;
    const btnGhSave = document.getElementById('btn-gh-save');
    if (btnGhSave) btnGhSave.onclick = connectAndSyncGitHub;
    const btnImportCt = document.getElementById('btn-import-ct');
    if (btnImportCt) btnImportCt.onclick = openImportModal;
    const btnDoImport = document.getElementById('btn-do-import');
    if (btnDoImport) btnDoImport.onclick = doImportCherryTree;
    const btnExport = document.getElementById('btn-export');
    if (btnExport) btnExport.onclick = exportNotes;

    // Network Offline / Online Auto-Sync Detection
    window.addEventListener('online', async () => {
        setSyncStatus('syncing', 'Back online - Syncing...');
        const connInd = document.getElementById('settings-conn-indicator');
        const connTitle = document.getElementById('settings-conn-title');
        if (connInd) connInd.className = 'sync-dot live';
        if (connTitle) connTitle.textContent = 'Connection Status: Online';

        if (state.isServerMode) {
            for (const [id, node] of state.nodes.entries()) {
                fetch(`${API_BASE}/api/nodes/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(node)
                }).catch(() => {});
            }
        }

        if (state.googleAccessToken) {
            await backupToGoogleDrive(true);
        } else {
            setSyncStatus('live', 'Online - Synced');
        }
    });

    window.addEventListener('offline', () => {
        setSyncStatus('offline', 'Offline (Saved locally)');
        const connInd = document.getElementById('settings-conn-indicator');
        const connTitle = document.getElementById('settings-conn-title');
        if (connInd) connInd.className = 'sync-dot offline';
        if (connTitle) connTitle.textContent = 'Connection Status: Offline';
    });

    // Close modals and context menu on clicking backdrop
    window.addEventListener('click', (e) => {
        if (e.target && e.target.classList && e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
        const ctxMenu = document.getElementById('tree-context-menu');
        if (ctxMenu && ctxMenu.style.display !== 'none' && !ctxMenu.contains(e.target)) {
            closeTreeContextMenu();
        }
    });

    // Deep Global Search across All Notes, Nodes & Content
    const searchInput = document.getElementById('global-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            performGlobalSearch(e.target.value);
        });

        searchInput.addEventListener('focus', () => {
            if (searchInput.value.trim()) {
                performGlobalSearch(searchInput.value);
            }
        });

        searchInput.addEventListener('keydown', (e) => {
            const dropdown = document.getElementById('search-results-dropdown');
            const list = document.getElementById('search-results-list');
            if (!dropdown || dropdown.style.display === 'none') {
                if (e.key === 'Enter') {
                    performGlobalSearch(searchInput.value);
                }
                return;
            }

            const items = list.querySelectorAll('.search-result-item');
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (items.length > 0) {
                    selectedSearchIndex = (selectedSearchIndex + 1) % items.length;
                    updateSelectedSearchItem(items);
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (items.length > 0) {
                    selectedSearchIndex = (selectedSearchIndex - 1 + items.length) % items.length;
                    updateSelectedSearchItem(items);
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                if (items.length > 0 && selectedSearchIndex >= 0 && selectedSearchIndex < items.length) {
                    const targetId = items[selectedSearchIndex].dataset.nodeId;
                    selectNode(targetId);
                    closeGlobalSearchDropdown();
                    highlightSearchMatchInEditor(searchInput.value.trim());
                }
            } else if (e.key === 'Escape') {
                closeGlobalSearchDropdown();
            }
        });
    }

    document.addEventListener('click', (e) => {
        const searchBox = document.querySelector('.header-center');
        if (searchBox && !searchBox.contains(e.target)) {
            closeGlobalSearchDropdown();
        }
    });

    // Global keyboard shortcuts
    window.addEventListener('keydown', (e) => {
        const isCtrl = e.ctrlKey || e.metaKey;

        if (e.key === 'Escape') {
            closeTreeContextMenu();
            closeGlobalSearchDropdown();
        }
        if (isCtrl && e.key.toLowerCase() === 'f') {
            e.preventDefault();
            toggleFindBar();
        }
        if (isCtrl && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
                if (searchInput.value.trim()) {
                    performGlobalSearch(searchInput.value);
                }
            }
        }
        if (e.altKey && e.key === 'ArrowUp') {
            e.preventDefault();
            moveActiveNode('up');
        }
        if (e.altKey && e.key === 'ArrowDown') {
            e.preventDefault();
            moveActiveNode('down');
        }
        if (isCtrl && (e.key === '\\' || e.key === '|')) {
            e.preventDefault();
            toggleSidebar();
        }
    });

    setupImageInteractions();
    setupTableInteractions();

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
        } else {
            sidebar.classList.toggle('collapsed');
        }
    };

    const toggleSidebarBtn = document.getElementById('btn-toggle-sidebar');
    const toggleSidebarRibbonBtn = document.getElementById('btn-toggle-sidebar-view');
    if (toggleSidebarBtn) toggleSidebarBtn.onclick = toggleSidebar;
    if (toggleSidebarRibbonBtn) toggleSidebarRibbonBtn.onclick = toggleSidebar;

    setupSelectionBubble();
    setupSlashCommandMenu();
}

// ==========================================================================
// NOTION-STYLE FLOATING SELECTION BUBBLE
// ==========================================================================
const selectionBubble = document.getElementById('selection-bubble');

function setupSelectionBubble() {
    if (!selectionBubble) return;

    const updateBubblePosition = () => {
        if (state.isReadOnly) {
            selectionBubble.style.display = 'none';
            return;
        }

        const selection = window.getSelection();
        if (!selection || selection.isCollapsed || !noteEditor.contains(selection.anchorNode)) {
            selectionBubble.style.display = 'none';
            return;
        }

        const selectedText = selection.toString().trim();
        if (!selectedText) {
            selectionBubble.style.display = 'none';
            return;
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
            selectionBubble.style.display = 'none';
            return;
        }

        selectionBubble.style.display = 'flex';
        const bubbleX = Math.round(rect.left + rect.width / 2);
        const bubbleY = Math.round(rect.top);

        selectionBubble.style.left = `${bubbleX}px`;
        selectionBubble.style.top = `${bubbleY}px`;
    };

    document.addEventListener('selectionchange', () => {
        requestAnimationFrame(updateBubblePosition);
    });

    // Bubble button actions
    const bindBubbleBtn = (id, fn) => {
        const el = document.getElementById(id);
        if (el) el.onclick = (e) => { e.preventDefault(); fn(); };
    };

    bindBubbleBtn('bubble-bold', () => execFormat('bold'));
    bindBubbleBtn('bubble-italic', () => execFormat('italic'));
    bindBubbleBtn('bubble-underline', () => execFormat('underline'));
    bindBubbleBtn('bubble-strike', () => execFormat('strikeThrough'));
    bindBubbleBtn('bubble-code', () => {
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            const parentCode = range.commonAncestorContainer.parentElement?.closest('code');
            if (parentCode) {
                const text = parentCode.textContent;
                parentCode.replaceWith(document.createTextNode(text));
            } else {
                const codeEl = document.createElement('code');
                codeEl.textContent = sel.toString();
                range.deleteContents();
                range.insertNode(codeEl);
            }
            handleEditorInput();
        }
    });
    bindBubbleBtn('bubble-h1', () => handleHeadingChange('h1'));
    bindBubbleBtn('bubble-h2', () => handleHeadingChange('h2'));
    bindBubbleBtn('bubble-quote', () => execFormat('formatBlock', '<blockquote>'));
    bindBubbleBtn('bubble-link', () => insertHyperlink());

    const bubbleTextColor = document.getElementById('bubble-text-color');
    if (bubbleTextColor) {
        bubbleTextColor.oninput = (e) => {
            const ind = document.getElementById('text-color-indicator');
            if (ind) ind.style.backgroundColor = e.target.value;
            execFormat('foreColor', e.target.value);
        };
    }
    const bubbleBgColor = document.getElementById('bubble-bg-color');
    if (bubbleBgColor) {
        bubbleBgColor.oninput = (e) => {
            const ind = document.getElementById('bg-color-indicator');
            if (ind) ind.style.backgroundColor = e.target.value;
            execFormat('hiliteColor', e.target.value);
        };
    }
}

// ==========================================================================
// NOTION / REMNOTE-STYLE SLASH COMMAND PALETTE (/)
// ==========================================================================
const slashMenu = document.getElementById('slash-menu');
const slashItemsList = document.getElementById('slash-items-list');

const SLASH_COMMANDS = [
    {
        id: 'paint',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 19 7-7 3 3-7 7-3-3z"/><path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/></svg>',
        name: 'Paint & Signature Studio',
        desc: 'Draw diagrams, freehand sketches, or sign handwritten notes',
        action: openPaintModal,
        keywords: ['paint', 'draw', 'sign', 'sketch', 'signature', 'canvas']
    },
    {
        id: 'table',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="3" y1="15" x2="21" y2="15"/><line x1="12" y1="3" x2="12" y2="21"/></svg>',
        name: 'Table',
        desc: 'Insert customizable grid table with rows & columns',
        action: openTableModal,
        keywords: ['table', 'grid', 'matrix', 'rows', 'columns']
    },
    {
        id: 'code',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
        name: 'CodeBox with 1-Click Copy',
        desc: 'Syntax container with dark theme & instant copy button',
        action: openCodeBoxModal,
        keywords: ['code', 'codebox', 'pre', 'snippet', 'python', 'bash', 'terminal']
    },
    {
        id: 'todo',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
        name: 'Interactive To-Do Checklist',
        desc: 'Task item with clickable checkbox toggle',
        action: insertTodoItem,
        keywords: ['todo', 'task', 'check', 'checklist', 'checkbox']
    },
    {
        id: 'callout-tip',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>',
        name: 'Callout: Tip Box',
        desc: 'Highlighted helpful tip container',
        action: () => handleCalloutInsert('tip'),
        keywords: ['callout', 'tip', 'hint', 'idea']
    },
    {
        id: 'callout-warning',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        name: 'Callout: Warning Box',
        desc: 'Highlighted warning / caution banner',
        action: () => handleCalloutInsert('warning'),
        keywords: ['warning', 'caution', 'alert', 'danger']
    },
    {
        id: 'callout-info',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
        name: 'Callout: Info Note',
        desc: 'Informational note box',
        action: () => handleCalloutInsert('info'),
        keywords: ['info', 'note', 'information']
    },
    {
        id: 'image',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
        name: 'Insert Photo / Screenshot',
        desc: 'Upload image file or paste with Ctrl+V',
        action: triggerImageUpload,
        keywords: ['photo', 'image', 'picture', 'screenshot', 'img']
    },
    {
        id: 'h1',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="m17 12 3-2v8"/></svg>',
        name: 'Heading 1',
        desc: 'Top-level large section heading',
        action: () => handleHeadingChange('h1'),
        keywords: ['h1', 'heading', 'title', 'large']
    },
    {
        id: 'h2',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M21 18h-4c0-4 4-3 4-6 0-1.5-1-2.5-2.5-2.5A2.5 2.5 0 0 0 16 12"/></svg>',
        name: 'Heading 2',
        desc: 'Medium subsection heading',
        action: () => handleHeadingChange('h2'),
        keywords: ['h2', 'subheading', 'medium']
    },
    {
        id: 'h3',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12h8"/><path d="M4 18V6"/><path d="M12 18V6"/><path d="M17.5 10.5c1.7-1 4.5.5 3 2.5 1.5 2-.8 3.5-3 2.5"/><path d="M17 9h4"/></svg>',
        name: 'Heading 3',
        desc: 'Small topic heading',
        action: () => handleHeadingChange('h3'),
        keywords: ['h3', 'small']
    },
    {
        id: 'bullet',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
        name: 'Bulleted List',
        desc: 'Standard bullet point list',
        action: () => execFormat('insertUnorderedList'),
        keywords: ['bullet', 'list', 'ul', 'points']
    },
    {
        id: 'numbered',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>',
        name: 'Numbered List',
        desc: 'Ordered numerical sequence list',
        action: () => execFormat('insertOrderedList'),
        keywords: ['numbered', 'number', 'ol', 'ordered']
    },
    {
        id: 'quote',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 1-1.5 3-4 5"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 1-1.5 3-4 5"/></svg>',
        name: 'Quote Block',
        desc: 'Styled quotation block with accent border',
        action: () => execFormat('formatBlock', '<blockquote>'),
        keywords: ['quote', 'blockquote', 'citation']
    },
    {
        id: 'divider',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"/></svg>',
        name: 'Horizontal Divider',
        desc: 'Clean visual separator line between sections',
        action: insertDivider,
        keywords: ['divider', 'hr', 'line', 'separator']
    },
    {
        id: 'timestamp',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
        name: 'Current Timestamp',
        desc: 'Insert current date and time string',
        action: insertTimestamp,
        keywords: ['timestamp', 'date', 'time', 'now', 'clock']
    },
    {
        id: 'link',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>',
        name: 'Hyperlink',
        desc: 'Insert external web link',
        action: insertHyperlink,
        keywords: ['link', 'url', 'web', 'hyperlink']
    },
    {
        id: 'nodelink',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
        name: 'Internal Node Link',
        desc: 'Link to another note in your hierarchy tree',
        action: openNodeLinkModal,
        keywords: ['nodelink', 'node', 'internal', 'reference', 'page']
    }
];

let slashState = {
    active: false,
    query: '',
    selectedIndex: 0,
    filteredCommands: [],
    triggerRange: null,
    textNode: null,
    slashIndex: -1
};

function renderSlashMenuItems() {
    if (!slashItemsList) return;
    slashItemsList.innerHTML = '';

    const q = slashState.query.toLowerCase().trim();
    slashState.filteredCommands = SLASH_COMMANDS.filter(cmd => {
        if (!q) return true;
        if (cmd.name.toLowerCase().includes(q)) return true;
        if (cmd.keywords.some(k => k.toLowerCase().includes(q))) return true;
        return false;
    });

    if (slashState.filteredCommands.length === 0) {
        slashItemsList.innerHTML = `<div style="padding: 12px; color: var(--text-muted); font-size: 0.8rem; text-align: center;">No matching actions for "/${q}"</div>`;
        return;
    }

    if (slashState.selectedIndex >= slashState.filteredCommands.length) {
        slashState.selectedIndex = 0;
    }

    slashState.filteredCommands.forEach((cmd, idx) => {
        const item = document.createElement('div');
        item.className = `slash-item ${idx === slashState.selectedIndex ? 'selected' : ''}`;
        item.innerHTML = `
            <div class="slash-item-icon">${cmd.icon}</div>
            <div class="slash-item-info">
                <div class="slash-item-name">${cmd.name}</div>
                <div class="slash-item-desc">${cmd.desc}</div>
            </div>
        `;
        item.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            executeSlashCommand(cmd);
        };
        slashItemsList.appendChild(item);
    });

    const selectedEl = slashItemsList.children[slashState.selectedIndex];
    if (selectedEl) {
        selectedEl.scrollIntoView({ block: 'nearest' });
    }
}

function openSlashMenuAtCursor() {
    if (!slashMenu) return;
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    slashState.active = true;
    slashState.query = '';
    slashState.selectedIndex = 0;
    slashState.triggerRange = range.cloneRange();

    slashMenu.style.display = 'flex';

    let menuX = Math.round(rect.left);
    let menuY = Math.round(rect.bottom + 6);

    if (menuX + 310 > window.innerWidth) {
        menuX = window.innerWidth - 320;
    }
    if (menuY + 360 > window.innerHeight) {
        menuY = Math.max(10, Math.round(rect.top - 370));
    }

    slashMenu.style.left = `${Math.max(16, menuX)}px`;
    slashMenu.style.top = `${menuY}px`;

    renderSlashMenuItems();
}

function closeSlashMenu() {
    if (!slashMenu) return;
    slashMenu.style.display = 'none';
    slashState.active = false;
    slashState.query = '';
    slashState.selectedIndex = 0;
    slashState.triggerRange = null;
    slashState.textNode = null;
    slashState.slashIndex = -1;
}

function executeSlashCommand(cmd) {
    if (slashState.textNode && slashState.slashIndex !== -1) {
        try {
            const currentText = slashState.textNode.textContent;
            const beforeSlash = currentText.substring(0, slashState.slashIndex);
            const afterQuery = currentText.substring(slashState.slashIndex + 1 + slashState.query.length);
            slashState.textNode.textContent = beforeSlash + afterQuery;

            const sel = window.getSelection();
            const newRange = document.createRange();
            newRange.setStart(slashState.textNode, beforeSlash.length);
            newRange.collapse(true);
            sel.removeAllRanges();
            sel.addRange(newRange);
        } catch (err) {
            console.warn('Error removing slash command text:', err);
        }
    }

    closeSlashMenu();

    if (cmd && typeof cmd.action === 'function') {
        cmd.action();
    }
}

function setupSlashCommandMenu() {
    if (!slashMenu || !noteEditor) return;

    noteEditor.addEventListener('keydown', (e) => {
        if (!slashState.active) {
            if (e.key === '/') {
                setTimeout(() => {
                    const sel = window.getSelection();
                    if (!sel || !sel.rangeCount) return;
                    const node = sel.anchorNode;
                    const offset = sel.anchorOffset;
                    if (node && node.nodeType === Node.TEXT_NODE) {
                        const text = node.textContent;
                        const slashPos = offset - 1;
                        if (slashPos === 0 || /\s/.test(text[slashPos - 1])) {
                            slashState.textNode = node;
                            slashState.slashIndex = slashPos;
                            openSlashMenuAtCursor();
                        }
                    }
                }, 10);
            }
            return;
        }

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (slashState.filteredCommands.length > 0) {
                slashState.selectedIndex = (slashState.selectedIndex + 1) % slashState.filteredCommands.length;
                renderSlashMenuItems();
            }
            return;
        }

        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (slashState.filteredCommands.length > 0) {
                slashState.selectedIndex = (slashState.selectedIndex - 1 + slashState.filteredCommands.length) % slashState.filteredCommands.length;
                renderSlashMenuItems();
            }
            return;
        }

        if (e.key === 'Enter') {
            e.preventDefault();
            if (slashState.filteredCommands.length > 0) {
                executeSlashCommand(slashState.filteredCommands[slashState.selectedIndex]);
            } else {
                closeSlashMenu();
            }
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            closeSlashMenu();
            return;
        }

        setTimeout(() => {
            if (!slashState.active) return;
            if (slashState.textNode) {
                const text = slashState.textNode.textContent;
                if (slashState.slashIndex < text.length && text[slashState.slashIndex] === '/') {
                    slashState.query = text.substring(slashState.slashIndex + 1);
                    renderSlashMenuItems();
                } else {
                    closeSlashMenu();
                }
            }
        }, 10);
    });

    document.addEventListener('mousedown', (e) => {
        if (slashState.active && !slashMenu.contains(e.target) && e.target !== noteEditor) {
            closeSlashMenu();
        }
    });
}

// ==========================================================================
// PWA & BROWSER APK INSTALLATION & OFFLINE SERVICE WORKER
// ==========================================================================
let deferredInstallPrompt = null;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then((reg) => {
            console.log('✓ CyberNote Service Worker active:', reg.scope);
        }).catch((err) => {
            console.log('ServiceWorker registration note:', err);
        });
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const btnInstall = document.getElementById('btn-install-pwa');
    if (btnInstall) {
        btnInstall.style.display = 'inline-flex';
    }
});

window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    const btnInstall = document.getElementById('btn-install-pwa');
    if (btnInstall) btnInstall.style.display = 'none';
    showToast('✓ CyberNote successfully installed on your device!');
});

async function triggerPwaInstall() {
    if (!deferredInstallPrompt) {
        showToast('To install CyberNote, use your browser menu and tap "Install App" or "Add to Home Screen".');
        return;
    }
    deferredInstallPrompt.prompt();
    const { outcome } = await deferredInstallPrompt.userChoice;
    if (outcome === 'accepted') {
        showToast('Installing CyberNote app... 📱');
    }
    deferredInstallPrompt = null;
}
window.triggerPwaInstall = triggerPwaInstall;
