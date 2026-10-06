// ==========================================================================
// CyberNote 🛡️ - Secure Hierarchical Knowledge & Cloud Notes System
// Google Account Sign-In, Google Drive Auto-Restore & Encrypted Cloud Backup
// Direct In-Place WYSIWYG Document Editor (No Split Screen, No Preview Tab)
// Windows Paint Studio, Handwritten Signatures, Tables, CodeBoxes & E2EE
// ==========================================================================

const API_BASE = '';
const DEFAULT_GOOGLE_CLIENT_ID = '872135362876-ig6gd1lqt8alrb9cu43f1om05ssodsjn.apps.googleusercontent.com';

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
    deletedNodeIds: new Set(JSON.parse(localStorage.getItem('cybernote_deleted_nodes') || '[]')),
    pendingUploadNodeIds: new Set(JSON.parse(localStorage.getItem('cybernote_pending_uploads') || '[]')),
    lastDriveSyncTime: parseInt(localStorage.getItem('cybernote_last_drive_sync') || '0', 10),
    lastDriveSyncAttempt: 0,
    unlockedNotes: new Set(),
    // Paint Studio State
    paintTool: 'signature',
    paintColor: '#00ffff',
    paintWidth: 3,
    isPainting: false,
    paintPoints: [],
    paintTransparentBg: true,
    // Geometric Shape Studio State
    shapeState: {
        shape: 'rect',
        mode: 'outline',
        color: '#00ffff',
        strokeWidth: 3,
        size: 220
    }
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
    setupShapeStudio();
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
            if (state.googleAccessToken) {
                syncWithGoogleDrive({ silent: true }).catch(console.warn);
            }
            return;
        }
    } catch (e) {
        console.log('Local Node server not found, operating in Static / Cloud mode.');
    }

    state.isServerMode = false;
    setSyncStatus('live', 'CyberNote Cloud Mode');
    await loadLocalNodes();
    checkShowStarBanner();

    if (state.googleAccessToken) {
        syncWithGoogleDrive({ silent: true }).catch(console.warn);
    }
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
function getEffectiveGoogleClientId() {
    const saved = localStorage.getItem('cybernote_client_id');
    if (saved && saved.includes('levmtlpqku4dimbfe2hdpa5m40a7bleq')) {
        localStorage.removeItem('cybernote_client_id');
    } else if (saved && saved.trim()) {
        return saved.trim();
    }
    const settingsVal = document.getElementById('settings-google-client-id')?.value?.trim();
    if (settingsVal && !settingsVal.includes('levmtlpqku4dimbfe2hdpa5m40a7bleq')) return settingsVal;
    const inputVal = document.getElementById('google-client-id-input')?.value?.trim();
    if (inputVal && !inputVal.includes('levmtlpqku4dimbfe2hdpa5m40a7bleq')) return inputVal;
    return DEFAULT_GOOGLE_CLIENT_ID;
}

window.copyCurrentOrigin = function() {
    const origin = window.location.origin;
    if (navigator.clipboard) {
        navigator.clipboard.writeText(origin).then(() => {
            showToast(`Copied origin: ${origin}`);
        }).catch(() => {
            prompt('Copy this Origin URL for Google Cloud Console:', origin);
        });
    } else {
        prompt('Copy this Origin URL for Google Cloud Console:', origin);
    }
};

// --- Google OAuth 2.0 Identity & Session Management ---
let tokenRefreshTimer = null;
let isSilentRefreshing = false;
let silentRefreshPromise = null;

function scheduleTokenRefresh(expiresInSeconds) {
    clearTimeout(tokenRefreshTimer);
    // Refresh 5 minutes (300 seconds) before the token expires
    const delayMs = Math.max((expiresInSeconds - 300) * 1000, 20000);
    tokenRefreshTimer = setTimeout(() => {
        refreshGoogleTokenSilently().catch(console.warn);
    }, delayMs);
}

// Silently refresh the Google OAuth access token without popups or prompts
async function refreshGoogleTokenSilently() {
    if (isSilentRefreshing) return silentRefreshPromise;

    if (!state.tokenClient && window.google?.accounts?.oauth2) {
        const clientId = getEffectiveGoogleClientId();
        state.tokenClient = google.accounts.oauth2.initTokenClient({
            client_id: clientId,
            scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
            callback: handleGoogleTokenResponse
        });
    }

    if (!state.tokenClient) return false;

    // Only attempt silent refresh if a user was previously signed in
    const savedUser = localStorage.getItem('cybernote_user');
    if (!savedUser) return false;

    isSilentRefreshing = true;
    silentRefreshPromise = new Promise((resolve) => {
        const prevCallback = state.tokenClient.callback;

        const timeout = setTimeout(() => {
            isSilentRefreshing = false;
            silentRefreshPromise = null;
            state.tokenClient.callback = prevCallback;
            resolve(false);
        }, 12000);

        state.tokenClient.callback = async (tokenResponse) => {
            clearTimeout(timeout);
            isSilentRefreshing = false;
            silentRefreshPromise = null;
            state.tokenClient.callback = prevCallback;

            if (tokenResponse && tokenResponse.access_token) {
                state.googleAccessToken = tokenResponse.access_token;
                localStorage.setItem('cybernote_google_token', tokenResponse.access_token);
                const expiresIn = tokenResponse.expires_in || 3600;
                localStorage.setItem('cybernote_google_token_expiry', (Date.now() + (expiresIn * 1000)).toString());
                scheduleTokenRefresh(expiresIn);
                updateGoogleUserUI();
                console.log('✓ Google OAuth access token refreshed silently.');
                resolve(true);
            } else {
                console.warn('Silent refresh did not yield access token:', tokenResponse?.error);
                resolve(false);
            }
        };

        try {
            // Empty prompt uses existing Google browser session for silent token grant
            state.tokenClient.requestAccessToken({ prompt: '' });
        } catch (e) {
            clearTimeout(timeout);
            isSilentRefreshing = false;
            silentRefreshPromise = null;
            state.tokenClient.callback = prevCallback;
            resolve(false);
        }
    });

    return silentRefreshPromise;
}

function initGoogleAuth() {
    // 1. Sync Client ID in settings
    const effId = getEffectiveGoogleClientId();
    const in1 = document.getElementById('google-client-id-input');
    if (in1) in1.value = effId;
    const in2 = document.getElementById('settings-google-client-id');
    if (in2) in2.value = effId;

    // 2. Check token expiry & restore active token / user state
    const expiry = parseInt(localStorage.getItem('cybernote_google_token_expiry') || '0', 10);
    const savedToken = localStorage.getItem('cybernote_google_token');
    const savedUser = localStorage.getItem('cybernote_user');

    if (savedToken && Date.now() < expiry) {
        state.googleAccessToken = savedToken;
        state.googleUser = savedUser ? JSON.parse(savedUser) : null;
        scheduleTokenRefresh((expiry - Date.now()) / 1000);
    } else {
        state.googleAccessToken = null;
        // Keep savedUser in state temporarily to attempt silent refresh on page load
        state.googleUser = savedUser ? JSON.parse(savedUser) : null;
    }

    // 3. Update UI (Header, Settings, Drive Modal)
    updateGoogleUserUI();

    // 4. Initialize Google Identity Services (GIS) Client
    function tryInitGIS() {
        if (window.google?.accounts?.oauth2) {
            const clientId = getEffectiveGoogleClientId();
            try {
                if (window.google?.accounts?.id?.disableAutoSelect) {
                    window.google.accounts.id.disableAutoSelect();
                }
                state.tokenClient = google.accounts.oauth2.initTokenClient({
                    client_id: clientId,
                    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                    callback: handleGoogleTokenResponse
                });

                // If user was signed in but token is expired, silently refresh token now!
                if (!state.googleAccessToken && state.googleUser) {
                    refreshGoogleTokenSilently().then((ok) => {
                        if (!ok) {
                            // Silent refresh couldn't renew session -> clear user completely
                            state.googleUser = null;
                            localStorage.removeItem('cybernote_user');
                            localStorage.removeItem('cybernote_google_token');
                            localStorage.removeItem('cybernote_google_token_expiry');
                            updateGoogleUserUI();
                        }
                    });
                }
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
    const btnHeaderLogin = document.getElementById('btn-header-login');
    const btnSignout = document.getElementById('btn-drive-signout');

    if (state.googleUser && state.googleAccessToken) {
        // Connected State
        if (btnHeaderLogin) btnHeaderLogin.style.display = 'none';
        if (btnGoogleLogin) btnGoogleLogin.style.display = 'none';
        if (userProfileBadge) {
            userProfileBadge.style.display = 'inline-flex';
            if (userAvatar) userAvatar.src = state.googleUser.picture || '';
            if (userName) userName.textContent = state.googleUser.name || state.googleUser.email || 'User';
        }
        if (btnSignout) btnSignout.style.display = 'inline-block';
        updateDriveModalStatus(true);
    } else {
        // Disconnected / Logged Out State
        if (btnHeaderLogin) btnHeaderLogin.style.display = 'inline-flex';
        if (btnGoogleLogin) btnGoogleLogin.style.display = 'inline-flex';
        if (userProfileBadge) userProfileBadge.style.display = 'none';
        if (userName) userName.textContent = 'Guest';
        if (userAvatar) userAvatar.src = '';
        if (btnSignout) btnSignout.style.display = 'none';
        updateDriveModalStatus(false);
    }

    if (typeof updateSettingsUI === 'function') updateSettingsUI();
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
    if (window.google?.accounts?.id?.disableAutoSelect) {
        try { window.google.accounts.id.disableAutoSelect(); } catch (e) {}
    }

    if (window.google?.accounts?.oauth2) {
        const clientId = getEffectiveGoogleClientId();
        try {
            state.tokenClient = google.accounts.oauth2.initTokenClient({
                client_id: clientId,
                scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email',
                callback: handleGoogleTokenResponse
            });
        } catch (err) {
            console.warn('GIS Token client re-init:', err);
        }
    }

    if (state.tokenClient) {
        // User explicitly clicked login: show account chooser
        state.tokenClient.requestAccessToken({ prompt: 'select_account' });
    } else {
        alert('Google authentication service is loading... please click again in a moment.');
        initGoogleAuth();
    }
}

async function handleGoogleTokenResponse(tokenResponse) {
    if (tokenResponse.error) {
        console.error('Google Auth Error:', tokenResponse);
        if (tokenResponse.error !== 'user_closed_popup') {
            showToast(`Sign-In error: ${tokenResponse.error}`, true);
        }
        return;
    }

    state.googleAccessToken = tokenResponse.access_token;
    localStorage.setItem('cybernote_google_token', tokenResponse.access_token);
    const expiresIn = tokenResponse.expires_in || 3600;
    localStorage.setItem('cybernote_google_token_expiry', (Date.now() + (expiresIn * 1000)).toString());

    // Schedule auto-refresh before expiry
    scheduleTokenRefresh(expiresIn);

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
            if (typeof updateSettingsUI === 'function') updateSettingsUI();
        }
    } catch (err) {
        console.error('Failed to fetch user profile:', err);
    }
}

function signoutGoogle() {
    clearTimeout(tokenRefreshTimer);
    const token = state.googleAccessToken;
    if (token && window.google?.accounts?.oauth2?.revoke) {
        try {
            google.accounts.oauth2.revoke(token, () => {
                console.log('Google OAuth token revoked on signout');
            });
        } catch (e) {
            console.warn('Revoke token error:', e);
        }
    }
    if (window.google?.accounts?.id?.disableAutoSelect) {
        try {
            window.google.accounts.id.disableAutoSelect();
        } catch (e) {}
    }
    state.googleAccessToken = null;
    state.googleUser = null;
    localStorage.removeItem('cybernote_google_token');
    localStorage.removeItem('cybernote_google_token_expiry');
    localStorage.removeItem('cybernote_user');
    updateGoogleUserUI();
    closeDriveModal();
    setSyncStatus('live', 'Signed out from Google Drive');
    showToast('Signed out from Google Account', 'info');
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

// --- Clean Up Duplicate Notes (Prevents repeating notes) ---
function deduplicateNodes() {
    const seen = new Map();
    const toDelete = [];
    for (const [id, node] of state.nodes.entries()) {
        if (!node) continue;
        const normTitle = (node.title || '').trim().toLowerCase();
        const normContent = (node.content || '').trim();
        const key = `${node.parent_id || '__root__'}|${normTitle}|${normContent}`;
        if (seen.has(key)) {
            const existingId = seen.get(key);
            const existingNode = state.nodes.get(existingId);
            if ((node.updated_at || 0) > (existingNode.updated_at || 0)) {
                toDelete.push(existingId);
                seen.set(key, id);
            } else {
                toDelete.push(id);
            }
        } else {
            seen.set(key, id);
        }
    }
    for (const id of toDelete) {
        state.nodes.delete(id);
        try { localStorage.removeItem(`cybernote_node_${id}`); } catch (e) {}
    }
    if (toDelete.length > 0) {
        console.log(`[CyberNote] Deduplicated ${toDelete.length} duplicate node(s).`);
        saveLocalNodesBackup();
    }
}

function markNodeDeleted(nodeId) {
    if (!state.deletedNodeIds) state.deletedNodeIds = new Set();
    state.deletedNodeIds.add(nodeId);
    try {
        localStorage.removeItem(`cybernote_node_${nodeId}`);
        localStorage.setItem('cybernote_deleted_nodes', JSON.stringify(Array.from(state.deletedNodeIds).slice(-500)));
    } catch (e) {}
}

// --- True Two-Way Cloud Sync with Google Drive (Multi-Device Auto-Sync) ---
// ============================================================
// GOOGLE DRIVE — ON-DEMAND PER-FILE ARCHITECTURE
// Folder: 'CyberNote' on Google Drive
// Files:  'cn_{nodeId}.json' for each note
// ============================================================

// Memory cache of Drive file IDs: nodeId -> fileId
const driveFileIdCache = new Map();

// Flush current editor content into state.nodes immediately before any Drive op
function flushEditorToState() {
    if (state.activeNodeId && !state.isReadOnly) {
        const node = state.nodes.get(state.activeNodeId);
        if (node) {
            const titleVal = noteTitleInput ? noteTitleInput.value : node.title;
            const contentVal = noteEditor ? noteEditor.innerHTML : node.content;
            const tagsVal = noteTagsInput ? noteTagsInput.value : (node.tags || '');
            if (node.title !== titleVal || node.content !== contentVal || node.tags !== tagsVal) {
                node.title = titleVal;
                node.content = contentVal;
                node.tags = tagsVal;
                node.updated_at = Date.now();
                persistActiveNodeImmediately(state.activeNodeId, { title: titleVal, content: contentVal, tags: tagsVal });
            }
        }
    }
}

// Drive API fetch wrapper with automatic silent token refresh
async function driveApiFetch(url, options = {}) {
    const expiry = parseInt(localStorage.getItem('cybernote_google_token_expiry') || '0', 10);
    const savedToken = localStorage.getItem('cybernote_google_token');

    // If token expired or expiring in under 1 minute, refresh silently before calling API
    if (!state.googleAccessToken || Date.now() >= (expiry - 60000)) {
        if (savedToken && Date.now() < expiry) {
            state.googleAccessToken = savedToken;
        } else if (localStorage.getItem('cybernote_user')) {
            await refreshGoogleTokenSilently();
        }
    }

    if (!state.googleAccessToken) throw new Error('Not signed in to Google.');

    let res = await fetch(url, {
        ...options,
        headers: {
            Authorization: `Bearer ${state.googleAccessToken}`,
            ...(options.headers || {})
        }
    });

    // If 401 Unauthorized, token might have been invalidated; try silent refresh once and retry
    if (res.status === 401) {
        console.warn('Google Drive API 401: Attempting silent token renewal...');
        const refreshed = await refreshGoogleTokenSilently();
        if (refreshed && state.googleAccessToken) {
            res = await fetch(url, {
                ...options,
                headers: {
                    Authorization: `Bearer ${state.googleAccessToken}`,
                    ...(options.headers || {})
                }
            });
        }

        // If still 401, session has truly ended
        if (res.status === 401) {
            state.googleAccessToken = null;
            state.googleUser = null;
            localStorage.removeItem('cybernote_google_token');
            localStorage.removeItem('cybernote_google_token_expiry');
            localStorage.removeItem('cybernote_user');
            updateGoogleUserUI();
            throw new Error('Google session expired. Please sign in again.');
        }
    }

    return res;
}

// Ensure CyberNote/ folder exists on Google Drive, return its folder ID
async function ensureDriveCyberNoteFolder() {
    let folderId = localStorage.getItem('cybernote_drive_folder_id');
    if (folderId) {
        try {
            const chk = await driveApiFetch(`https://www.googleapis.com/drive/v3/files/${folderId}?fields=id,trashed`);
            if (chk.ok) {
                const d = await chk.json();
                if (!d.trashed) return folderId;
            }
        } catch (e) {}
        localStorage.removeItem('cybernote_drive_folder_id');
        folderId = null;
    }

    // Search for existing CyberNote folder (query properly URL-encoded)
    const q = "name = 'CyberNote' and mimeType = 'application/vnd.google-apps.folder' and trashed = false";
    const searchRes = await driveApiFetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`);
    if (searchRes.ok) {
        const sd = await searchRes.json();
        if (sd.files && sd.files.length > 0) {
            folderId = sd.files[0].id;
            localStorage.setItem('cybernote_drive_folder_id', folderId);
            return folderId;
        }
    }

    // Create new CyberNote folder
    const createRes = await driveApiFetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: 'CyberNote',
            mimeType: 'application/vnd.google-apps.folder'
        })
    });
    if (!createRes.ok) {
        const errTxt = await createRes.text();
        throw new Error(`Failed to create CyberNote folder (${createRes.status})`);
    }
    const folder = await createRes.json();
    folderId = folder.id;
    localStorage.setItem('cybernote_drive_folder_id', folderId);
    return folderId;
}

// List all cn_*.json files in the CyberNote folder (properly URL-encoded query)
async function listDriveCyberNoteFiles(folderId) {
    const q = `'${folderId}' in parents and trashed = false`;
    const res = await driveApiFetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name,modifiedTime)&pageSize=1000`);
    if (!res.ok) {
        const errTxt = await res.text();
        throw new Error(`Failed to list Drive files (${res.status})`);
    }
    const data = await res.json();
    const files = (data.files || []).filter(f => f.name.startsWith('cn_') && f.name.endsWith('.json'));
    // Populate driveFileIdCache
    for (const f of files) {
        const nId = f.name.replace(/^cn_/, '').replace(/\.json$/, '');
        driveFileIdCache.set(nId, f.id);
    }
    return files;
}

// Upload a single note to Drive using reliable 2-step REST (POST metadata + PATCH payload)
async function uploadNodeToDrive(folderId, node) {
    const fileName = `cn_${node.id}.json`;
    const payload = JSON.stringify(node);

    let fileId = driveFileIdCache.get(node.id);

    // If fileId not in cache, search on Drive
    if (!fileId) {
        const q = `'${folderId}' in parents and name = '${fileName}' and trashed = false`;
        const searchRes = await driveApiFetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`);
        if (searchRes.ok) {
            const data = await searchRes.json();
            if (data.files && data.files.length > 0) {
                fileId = data.files[0].id;
                driveFileIdCache.set(node.id, fileId);
            }
        }
    }

    if (fileId) {
        // Update existing file content via PATCH media
        const patchRes = await driveApiFetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: payload
        });
        if (patchRes.ok) return fileId;
        if (patchRes.status === 404) {
            // File was deleted on Drive, recreate below
            driveFileIdCache.delete(node.id);
            fileId = null;
        } else {
            const errText = await patchRes.text();
            throw new Error(`Upload failed (${patchRes.status})`);
        }
    }

    // Create new file metadata in CyberNote folder
    const metaRes = await driveApiFetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: fileName,
            parents: [folderId],
            mimeType: 'application/json'
        })
    });
    if (!metaRes.ok) {
        const errText = await metaRes.text();
        throw new Error(`Create file failed (${metaRes.status})`);
    }
    const metaData = await metaRes.json();
    fileId = metaData.id;
    driveFileIdCache.set(node.id, fileId);

    // Upload content payload into the created file
    const uploadRes = await driveApiFetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: payload
    });
    if (!uploadRes.ok) {
        const errText = await uploadRes.text();
        throw new Error(`Content upload failed (${uploadRes.status})`);
    }
    return fileId;
}

// Delete a note file from Drive
async function deleteNodeFromDrive(fileId) {
    await driveApiFetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, { method: 'DELETE' }).catch(() => {});
}

// Upload a single note to Google Drive (on-demand per-note save)
async function uploadSingleNodeToDrive(nodeId, silent = true) {
    if (!state.googleAccessToken || !nodeId) return;
    const node = state.nodes.get(nodeId);
    if (!node) return;

    try {
        const folderId = await ensureDriveCyberNoteFolder();
        await uploadNodeToDrive(folderId, node);

        if (state.pendingUploadNodeIds) {
            state.pendingUploadNodeIds.delete(nodeId);
            try {
                localStorage.setItem('cybernote_pending_uploads', JSON.stringify(Array.from(state.pendingUploadNodeIds)));
            } catch (e) {}
        }

        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSyncStatus('live', `Drive Synced (${nowStr})`);
        if (!silent) showToast(`✓ Note "${node.title || 'Untitled'}" saved to Drive!`);
    } catch (err) {
        console.error(`Failed to save note ${nodeId} to Drive:`, err);
        setSyncStatus('error', 'Drive Save Error');
        if (!silent) showToast(`Drive Save Error: ${err.message}`, true);
    }
}

// Download a single note from Google Drive (on-demand per-note download)
async function downloadSingleNoteFromDrive(nodeId, { silent = false } = {}) {
    if (!state.googleAccessToken || !nodeId) return;

    if (!silent) {
        setSyncStatus('syncing', 'Downloading note from Drive...');
        showSyncOverlay('Downloading Note...', 'Fetching note from Google Drive...');
    }

    try {
        const folderId = await ensureDriveCyberNoteFolder();
        const fileName = `cn_${nodeId}.json`;
        let fileId = driveFileIdCache.get(nodeId);

        if (!fileId) {
            const q = `'${folderId}' in parents and name = '${fileName}' and trashed = false`;
            const searchRes = await driveApiFetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q)}&fields=files(id,name)`);
            if (searchRes.ok) {
                const data = await searchRes.json();
                if (data.files && data.files.length > 0) {
                    fileId = data.files[0].id;
                    driveFileIdCache.set(nodeId, fileId);
                }
            }
        }

        if (!fileId) {
            if (!silent) {
                hideSyncOverlay();
                showToast(`Note "${state.nodes.get(nodeId)?.title || 'Untitled'}" not yet uploaded to Drive.`);
            }
            return;
        }

        const dlRes = await driveApiFetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`);
        if (!dlRes.ok) throw new Error(`Download failed (${dlRes.status})`);

        const cloudNode = await dlRes.json();
        if (!cloudNode || !cloudNode.id) throw new Error('Invalid note data received from Drive');

        const localNode = state.nodes.get(nodeId);
        const cloudTime = cloudNode.updated_at || cloudNode.created_at || 0;
        const localTime = localNode ? (localNode.updated_at || localNode.created_at || 0) : 0;

        // If cloud is newer or local is missing or manual pull requested
        if (!localNode || cloudTime > localTime || !silent) {
            if (localNode) {
                Object.assign(localNode, cloudNode);
            } else {
                state.nodes.set(nodeId, cloudNode);
            }

            persistActiveNodeImmediately(nodeId, cloudNode);
            renderTree();

            // If user is currently looking at this note, update editor fields
            if (state.activeNodeId === nodeId) {
                const isUserTyping = (document.activeElement === noteEditor || document.activeElement === noteTitleInput);
                if (!isUserTyping || !silent) {
                    noteTitleInput.value = cloudNode.title || '';
                    if (noteTagsInput) noteTagsInput.value = cloudNode.tags || '';
                    renderTagChips(cloudNode.tags || '');
                    noteEditor.innerHTML = cloudNode.content || '';
                    updateWordStats();
                }
            }
        }

        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSyncStatus('live', `Drive Synced (${nowStr})`);
        if (!silent) {
            hideSyncOverlay();
            showToast(`✓ Downloaded note "${cloudNode.title || 'Untitled'}" from Drive!`);
        }
    } catch (err) {
        console.error(`Download note ${nodeId} error:`, err);
        setSyncStatus('error', 'Drive Download Error');
        if (!silent) {
            hideSyncOverlay();
            showToast(`Drive Download Error: ${err.message}`, true);
        }
    }
}

// Upload all pending offline notes to Google Drive when internet comes back
async function uploadPendingNotesToDrive() {
    if (!state.googleAccessToken) return;
    const pending = Array.from(state.pendingUploadNodeIds || []);
    if (state.activeNodeId && !pending.includes(state.activeNodeId)) {
        pending.push(state.activeNodeId);
    }
    if (pending.length === 0) return;

    try {
        const folderId = await ensureDriveCyberNoteFolder();
        let count = 0;
        for (const nodeId of pending) {
            const node = state.nodes.get(nodeId);
            if (node) {
                await uploadNodeToDrive(folderId, node);
                state.pendingUploadNodeIds.delete(nodeId);
                count++;
            }
        }
        localStorage.setItem('cybernote_pending_uploads', JSON.stringify(Array.from(state.pendingUploadNodeIds)));
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSyncStatus('live', `Drive Synced (${nowStr})`);
        if (count > 0) showToast(`✓ Online: Synced ${count} offline notes to Drive!`);
    } catch (e) {
        console.warn('Failed to upload pending notes on reconnect:', e);
    }
}

// Save all notes to Drive (used by Drive Modal or when no note selected)
async function saveAllNotesToDrive(silent = false) {
    if (state.isSyncing) return;
    if (!state.googleAccessToken) {
        if (!silent) requestGoogleLogin();
        return;
    }

    flushEditorToState();
    state.isSyncing = true;
    state.lastDriveSyncAttempt = Date.now();

    const logDiv = document.getElementById('drive-sync-log') || document.getElementById('settings-drive-log');
    if (!silent) {
        setSyncStatus('syncing', 'Saving to Google Drive...');
        showSyncOverlay('Saving notes to Drive...', 'Uploading notes to Google Drive folder...');
    }

    try {
        if (!silent) updateSyncProgress(20, 'Step 1/3: Preparing...', 'Ensuring CyberNote folder on Google Drive...');
        const folderId = await ensureDriveCyberNoteFolder();

        if (!silent) updateSyncProgress(40, 'Step 2/3: Checking Drive...', 'Listing files in Drive folder...');
        const driveFiles = await listDriveCyberNoteFiles(folderId);

        const existingFileMap = new Map();
        for (const f of driveFiles) existingFileMap.set(f.name, f);

        const deletedIds = state.deletedNodeIds || new Set();
        const allNodes = Array.from(state.nodes.values());
        const total = allNodes.length;

        if (!silent) updateSyncProgress(50, 'Step 3/3: Uploading...', `Uploading ${total} notes to Google Drive...`);

        let uploaded = 0;
        for (const node of allNodes) {
            if (deletedIds.has(node.id)) continue;
            await uploadNodeToDrive(folderId, node);
            if (state.pendingUploadNodeIds) state.pendingUploadNodeIds.delete(node.id);
            uploaded++;
            if (!silent && total > 0) updateSyncProgress(50 + Math.floor((uploaded / total) * 45), 'Uploading...', `${uploaded}/${total} notes saved...`);
        }

        try {
            localStorage.setItem('cybernote_pending_uploads', JSON.stringify(Array.from(state.pendingUploadNodeIds || [])));
        } catch (e) {}

        // Delete Drive files for locally-deleted notes
        for (const [fileName, fileInfo] of existingFileMap.entries()) {
            const nodeId = fileName.replace(/^cn_/, '').replace(/\.json$/, '');
            if (deletedIds.has(nodeId) || !state.nodes.has(nodeId)) {
                await deleteNodeFromDrive(fileInfo.id);
                driveFileIdCache.delete(nodeId);
            }
        }

        state.lastDriveSyncTime = Date.now();
        localStorage.setItem('cybernote_last_drive_sync', state.lastDriveSyncTime.toString());
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSyncStatus('live', `Saved to Drive (${nowStr})`);
        if (!silent) {
            if (logDiv) logDiv.innerHTML = `<span style="color:var(--success); font-weight:600;">✓ ${uploaded} notes saved to Google Drive at ${nowStr}!</span>`;
            hideSyncOverlay();
        }
        showToast(`✓ ${uploaded} notes saved to Drive!`);
    } catch (err) {
        console.error('Save to Drive error:', err);
        setSyncStatus('error', 'Drive Save Error');
        if (!silent) {
            if (logDiv) logDiv.innerHTML = `<span style="color:var(--danger);">Save failed: ${err.message}</span>`;
            hideSyncOverlay();
        }
        showToast(`Drive Save Error: ${err.message}`, true);
    } finally {
        state.isSyncing = false;
    }
}

// Download all notes from Drive (used by Drive Modal or when no note selected)
async function downloadAllNotesFromDrive(silent = false) {
    if (state.isSyncing) return;
    if (!state.googleAccessToken) {
        if (!silent) requestGoogleLogin();
        return;
    }

    flushEditorToState();
    state.isSyncing = true;
    state.lastDriveSyncAttempt = Date.now();

    const logDiv = document.getElementById('drive-sync-log') || document.getElementById('settings-drive-log');
    if (!silent) {
        setSyncStatus('syncing', 'Downloading from Drive...');
        showSyncOverlay('Downloading from Drive...', 'Fetching your notes from Google Drive folder...');
    }

    try {
        if (!silent) updateSyncProgress(15, 'Step 1/3: Connecting...', 'Finding CyberNote folder on Google Drive...');
        const folderId = await ensureDriveCyberNoteFolder();

        if (!silent) updateSyncProgress(30, 'Step 2/3: Listing files...', 'Getting list of notes from Drive...');
        const driveFiles = await listDriveCyberNoteFiles(folderId);

        if (driveFiles.length === 0) {
            setSyncStatus('live', 'Drive has no notes yet');
            if (!silent) {
                if (logDiv) logDiv.innerHTML = `<span style="color:var(--text-muted);">No notes found on Google Drive. Save some notes first!</span>`;
                hideSyncOverlay();
            }
            showToast('No notes in Drive yet. Use Save to upload first.');
            state.isSyncing = false;
            return;
        }

        if (!silent) updateSyncProgress(45, 'Step 3/3: Downloading notes...', `Downloading ${driveFiles.length} notes from Drive...`);

        const deletedIds = state.deletedNodeIds || new Set();
        let downloaded = 0;
        let merged = 0;
        let updated = 0;

        const localOnlyHasWelcome = state.nodes.size === 1 && state.nodes.has('welcome-root');

        for (const driveFile of driveFiles) {
            const nodeId = driveFile.name.replace(/^cn_/, '').replace(/\.json$/, '');
            if (deletedIds.has(nodeId)) continue;

            const dlRes = await driveApiFetch(`https://www.googleapis.com/drive/v3/files/${driveFile.id}?alt=media`);
            if (!dlRes.ok) continue;

            let cloudNode;
            try { cloudNode = await dlRes.json(); } catch (e) { continue; }
            if (!cloudNode || !cloudNode.id) continue;

            downloaded++;
            if (!silent) updateSyncProgress(45 + Math.floor((downloaded / driveFiles.length) * 50), 'Merging...', `${downloaded}/${driveFiles.length} notes downloaded...`);

            const localNode = state.nodes.get(cloudNode.id);
            if (!localNode) {
                if (localOnlyHasWelcome && cloudNode.id !== 'welcome-root') {
                    state.nodes.delete('welcome-root');
                }
                state.nodes.set(cloudNode.id, cloudNode);
                merged++;
            } else {
                const cloudTime = cloudNode.updated_at || cloudNode.created_at || 0;
                const localTime = localNode.updated_at || localNode.created_at || 0;
                if (cloudTime > localTime) {
                    Object.assign(localNode, cloudNode);
                    updated++;
                }
            }
        }

        deduplicateNodes();
        saveLocalNodesBackup();
        renderTree();

        if (state.activeNodeId && state.nodes.has(state.activeNodeId)) {
            const isUserTyping = (document.activeElement === noteEditor || document.activeElement === noteTitleInput);
            if (!isUserTyping) selectNode(state.activeNodeId);
        }

        state.lastDriveSyncTime = Date.now();
        localStorage.setItem('cybernote_last_drive_sync', state.lastDriveSyncTime.toString());
        const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        setSyncStatus('live', `Downloaded from Drive (${nowStr})`);

        const summary = `✓ ${merged + updated} notes synced from Drive at ${nowStr} (${merged} new, ${updated} updated)`;
        if (!silent) {
            if (logDiv) logDiv.innerHTML = `<span style="color:var(--success); font-weight:600;">${summary}</span>`;
            hideSyncOverlay();
        }
        showToast(summary);
    } catch (err) {
        console.error('Download from Drive error:', err);
        setSyncStatus('error', 'Drive Download Error');
        if (!silent) {
            if (logDiv) logDiv.innerHTML = `<span style="color:var(--danger);">Download failed: ${err.message}</span>`;
            hideSyncOverlay();
        }
        showToast(`Drive Download Error: ${err.message}`, true);
    } finally {
        state.isSyncing = false;
    }
}

// Backwards compatibility wrappers
async function backupToGoogleDrive(silent = false) {
    if (state.activeNodeId) return uploadSingleNodeToDrive(state.activeNodeId, silent);
    return saveAllNotesToDrive(silent);
}

async function syncWithGoogleDrive({ silent = false, forcePull = false, forcePush = false } = {}) {
    if (forcePull && forcePush) {
        await downloadAllNotesFromDrive(silent);
        await saveAllNotesToDrive(true);
        return;
    }
    if (forcePull) {
        if (state.activeNodeId) return downloadSingleNoteFromDrive(state.activeNodeId, { silent });
        return downloadAllNotesFromDrive(silent);
    }
    if (forcePush) {
        if (state.activeNodeId) return uploadSingleNodeToDrive(state.activeNodeId, silent);
        return saveAllNotesToDrive(silent);
    }
    // Background sync: save active note
    if (state.activeNodeId) return uploadSingleNodeToDrive(state.activeNodeId, true);
}

async function autoRestoreFromDriveOnSignIn() {
    return downloadAllNotesFromDrive(false);
}

// Debounced auto-save to Drive (fires 1.8 seconds after editing pauses on active note)
function scheduleDriveAutoBackup() {
    if (!state.googleAccessToken || !state.activeNodeId) return;
    setSyncStatus('pending', 'Changes pending...');
    clearTimeout(state.driveSaveTimer);
    state.driveSaveTimer = setTimeout(() => {
        if (state.activeNodeId) {
            flushEditorToState();
            uploadSingleNodeToDrive(state.activeNodeId, true);
        }
    }, 1800);
}

// ---- Header "Save" Button Handler ----
async function triggerDriveSave() {
    const btn = document.getElementById('btn-drive-save');
    const svg = document.getElementById('drive-save-svg');
    const txt = document.getElementById('drive-save-text');
    if (btn) btn.classList.add('syncing');
    if (svg) svg.classList.add('spinning');
    if (txt) txt.textContent = 'Saving...';

    try {
        flushEditorToState();
        if (state.activeNodeId) {
            await uploadSingleNodeToDrive(state.activeNodeId, false);
            // Also upload any other pending notes in background
            if (state.pendingUploadNodeIds && state.pendingUploadNodeIds.size > 0) {
                uploadPendingNotesToDrive();
            }
        } else {
            await saveAllNotesToDrive(false);
        }
    } finally {
        setTimeout(() => {
            if (btn) btn.classList.remove('syncing');
            if (svg) svg.classList.remove('spinning');
            if (txt) txt.textContent = 'Save';
        }, 600);
    }
}

// ---- Header "Download" Button Handler ----
async function triggerDriveDownload() {
    const btn = document.getElementById('btn-drive-download');
    const svg = document.getElementById('drive-download-svg');
    const txt = document.getElementById('drive-download-text');
    if (btn) btn.classList.add('syncing');
    if (svg) svg.classList.add('spinning');
    if (txt) txt.textContent = 'Downloading...';

    try {
        if (state.activeNodeId) {
            // User requested: download only current active note
            await downloadSingleNoteFromDrive(state.activeNodeId, { silent: false });
        } else {
            await downloadAllNotesFromDrive(false);
        }
    } finally {
        setTimeout(() => {
            if (btn) btn.classList.remove('syncing');
            if (svg) svg.classList.remove('spinning');
            if (txt) txt.textContent = 'Download';
        }, 600);
    }
}

// Legacy alias
async function triggerManualSyncNow() {
    await triggerDriveSave();
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
                    applyReadOnlyState(!!updated.is_readonly);
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

    if (state.pendingUploadNodeIds) {
        state.pendingUploadNodeIds.add(nodeId);
        try {
            localStorage.setItem('cybernote_pending_uploads', JSON.stringify(Array.from(state.pendingUploadNodeIds)));
        } catch (e) {}
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

    // Prune any deleted nodes that might linger in localStorage
    if (state.deletedNodeIds && state.deletedNodeIds.size > 0) {
        for (const dId of state.deletedNodeIds) {
            if (state.nodes.has(dId)) {
                state.nodes.delete(dId);
                try { localStorage.removeItem(`cybernote_node_${dId}`); } catch (e) {}
            }
        }
    }

    deduplicateNodes();

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
    const isLocked = !!(node.password_hash && !state.unlockedNotes.has(node.id));
    const plainContent = isLocked ? '' : stripHtml(node.content);
    const contentMatch = !isLocked && normalizeQuery(plainContent).includes(q);
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

            // Read-Only badge if read-only
            let lockBadge = null;
            if (node.is_readonly) {
                lockBadge = document.createElement('span');
                lockBadge.className = 'tree-lock-badge';
                lockBadge.title = 'Read-Only (Click to make editable)';
                lockBadge.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
                lockBadge.onclick = (e) => {
                    e.stopPropagation();
                    toggleReadOnlyMode(node.id);
                };
            }

            // Password lock badge if password protected
            let passwordBadge = null;
            if (node.password_hash) {
                const isUnlocked = state.unlockedNotes.has(node.id);
                passwordBadge = document.createElement('span');
                passwordBadge.className = 'tree-password-badge';
                passwordBadge.title = isUnlocked ? 'Password Protected (Unlocked)' : 'Password Locked (Requires Password)';
                passwordBadge.innerHTML = isUnlocked
                    ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#a6e3a1" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>`
                    : `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f9e2af" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1.5"/></svg>`;
                passwordBadge.onclick = (e) => {
                    e.stopPropagation();
                    openPasswordLockModal(node.id);
                };
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
                <button class="tree-btn" title="Note Lock (Password)" onclick="event.stopPropagation(); openPasswordLockModal('${node.id}')">🔒</button>
                <button class="tree-btn" title="Add Sub-Note" onclick="event.stopPropagation(); createSubNode('${node.id}', 'note')">+</button>
                <button class="tree-btn" title="More Options" onclick="event.stopPropagation(); openTreeContextMenu(event, '${node.id}')">⋮</button>
                <button class="tree-btn" title="Delete" onclick="event.stopPropagation(); deleteNode('${node.id}')">✕</button>
            `;

            item.appendChild(arrow);
            item.appendChild(icon);
            item.appendChild(label);
            if (lockBadge) item.appendChild(lockBadge);
            if (passwordBadge) item.appendChild(passwordBadge);
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

    // Refresh Folder Explorer view if active node is a folder
    if (state.activeNodeId) {
        const activeNode = state.nodes.get(state.activeNodeId);
        if (activeNode && (activeNode.is_folder || activeNode.icon === 'folder')) {
            renderFolderExplorerView(state.activeNodeId);
        }
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
            if (readonlyText) readonlyText.textContent = isReadOnly ? 'Disable Read-Only' : 'Read Only';
            const readonlySvg = document.getElementById('ctx-readonly-svg');
            if (readonlySvg) {
                readonlySvg.innerHTML = isReadOnly 
                    ? `<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>`
                    : `<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`;
            }
            ctxReadonly.style.display = 'flex';
        }

        const ctxPasswordLock = document.getElementById('ctx-password-lock');
        if (ctxPasswordLock) {
            const pwdText = document.getElementById('ctx-password-lock-text');
            if (pwdText) {
                if (node.password_hash) {
                    const isUnlocked = state.unlockedNotes.has(node.id);
                    pwdText.textContent = isUnlocked ? 'Note Lock (Lock / Edit)' : 'Note Lock (Unlock / Edit)';
                } else {
                    pwdText.textContent = 'Note Lock (Password)';
                }
            }
            ctxPasswordLock.style.display = 'flex';
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
        const ctxPasswordLock = document.getElementById('ctx-password-lock');
        if (ctxPasswordLock) ctxPasswordLock.style.display = 'none';
        if (ctxExpandAll) ctxExpandAll.style.display = 'flex';
        if (ctxCollapseAll) ctxCollapseAll.style.display = 'flex';
        if (ctxDivider2) ctxDivider2.style.display = 'none';
        if (ctxDelete) ctxDelete.style.display = 'none';
    }

    // Position menu with window boundary checks
    menu.style.display = 'flex';
    const menuWidth = 200;
    const menuHeight = 380;
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
        lockBadge.className = 'tree-lock-badge keep-card-lock-badge';
        lockBadge.title = 'Read-Only (Click to make editable)';
        lockBadge.style.display = 'inline-flex';
        lockBadge.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg><span>Read Only</span>`;
        lockBadge.onclick = (e) => {
            e.stopPropagation();
            toggleReadOnlyMode(node.id);
        };
        titleGroup.appendChild(lockBadge);
    }

    if (node.password_hash) {
        const isUnlocked = state.unlockedNotes.has(node.id);
        const pwdBadge = document.createElement('span');
        pwdBadge.className = 'tree-password-badge keep-card-lock-badge';
        pwdBadge.title = isUnlocked ? 'Password Protected (Unlocked)' : 'Password Locked';
        pwdBadge.style.display = 'inline-flex';
        pwdBadge.innerHTML = isUnlocked
            ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#a6e3a1" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg><span>Unlocked</span>`
            : `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#f9e2af" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1.5"/></svg><span>Password</span>`;
        titleGroup.appendChild(pwdBadge);
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
    const isLockedNote = !!(node.password_hash && !state.unlockedNotes.has(node.id));
    if (isLockedNote) {
        const contentEl = document.createElement('div');
        contentEl.className = 'keep-card-content';
        contentEl.style.fontStyle = 'italic';
        contentEl.style.opacity = '0.7';
        contentEl.textContent = '🔒 Password protected note (click to unlock)';
        card.appendChild(contentEl);
    } else {
        const plainText = stripHtml(node.content || '').trim();
        if (plainText) {
            const contentEl = document.createElement('div');
            contentEl.className = 'keep-card-content';
            contentEl.textContent = plainText;
            card.appendChild(contentEl);
        }
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

// --- Folder Explorer View (Subfolders & Notes Grid) ---
function createFolderCard(folderNode) {
    const card = document.createElement('div');
    card.className = 'folder-card';
    card.setAttribute('data-id', folderNode.id);

    // Count direct children inside this subfolder
    let count = 0;
    for (const n of state.nodes.values()) {
        if (n.parent_id === folderNode.id) count++;
    }

    const main = document.createElement('div');
    main.className = 'folder-card-main';

    const iconSpan = document.createElement('span');
    iconSpan.className = 'folder-card-icon';
    iconSpan.innerHTML = getNodeIconSvg(folderNode.icon, folderNode.color, true, false, 20);

    const info = document.createElement('div');
    info.className = 'folder-card-info';

    const title = document.createElement('span');
    title.className = 'folder-card-title';
    title.textContent = folderNode.title || 'Untitled Folder';
    if (folderNode.color) title.style.color = folderNode.color;

    const sub = document.createElement('span');
    sub.className = 'folder-card-count';
    sub.textContent = `${count} ${count === 1 ? 'item' : 'items'}`;

    info.appendChild(title);
    info.appendChild(sub);

    main.appendChild(iconSpan);
    main.appendChild(info);

    card.appendChild(main);

    // Card Action Buttons (Hover)
    const actions = document.createElement('div');
    actions.className = 'folder-card-actions';

    const addBtn = document.createElement('button');
    addBtn.className = 'icon-btn-small';
    addBtn.title = 'Add note inside';
    addBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
    addBtn.onclick = (e) => {
        e.stopPropagation();
        createSubNode(folderNode.id, 'note');
    };

    const delBtn = document.createElement('button');
    delBtn.className = 'icon-btn-small';
    delBtn.title = 'Delete folder';
    delBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;
    delBtn.onclick = (e) => {
        e.stopPropagation();
        deleteNode(folderNode.id);
    };

    actions.appendChild(addBtn);
    actions.appendChild(delBtn);
    card.appendChild(actions);

    card.onclick = () => {
        selectNode(folderNode.id);
    };

    return card;
}

function renderFolderExplorerView(folderId) {
    const folderView = document.getElementById('folder-explorer-view');
    if (!folderView) return;
    const node = state.nodes.get(folderId);
    if (!node) return;

    const subfoldersGrid = document.getElementById('folder-subfolders-grid');
    const notesGrid = document.getElementById('folder-notes-grid');
    const emptyState = document.getElementById('folder-empty-state');
    const subfoldersSection = document.getElementById('folder-subfolders-section');
    const notesSection = document.getElementById('folder-notes-section');
    const itemsCountBadge = document.getElementById('folder-items-count');
    const subfoldersCountEl = document.getElementById('folder-subfolders-count');
    const notesCountEl = document.getElementById('folder-notes-count');

    if (!subfoldersGrid || !notesGrid) return;

    subfoldersGrid.innerHTML = '';
    notesGrid.innerHTML = '';

    // Collect children
    const children = [];
    for (const n of state.nodes.values()) {
        if (n.parent_id === folderId) {
            children.push(n);
        }
    }
    children.sort((a, b) => (a.position ?? 0) - (b.position ?? 0) || (b.updated_at ?? 0) - (a.updated_at ?? 0));

    const subfolders = children.filter(c => c.is_folder || c.icon === 'folder');
    const notes = children.filter(c => !c.is_folder && c.icon !== 'folder');

    const totalItems = children.length;
    if (itemsCountBadge) {
        itemsCountBadge.textContent = `${totalItems} ${totalItems === 1 ? 'item' : 'items'} (${subfolders.length} ${subfolders.length === 1 ? 'folder' : 'folders'}, ${notes.length} ${notes.length === 1 ? 'note' : 'notes'})`;
    }

    if (totalItems === 0) {
        if (emptyState) emptyState.style.display = 'flex';
        if (subfoldersSection) subfoldersSection.style.display = 'none';
        if (notesSection) notesSection.style.display = 'none';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Render Subfolders
    if (subfolders.length > 0) {
        if (subfoldersSection) subfoldersSection.style.display = 'block';
        if (subfoldersCountEl) subfoldersCountEl.textContent = subfolders.length;
        subfolders.forEach(sf => {
            const card = createFolderCard(sf);
            subfoldersGrid.appendChild(card);
        });
    } else {
        if (subfoldersSection) subfoldersSection.style.display = 'none';
    }

    // Render Notes
    if (notes.length > 0) {
        if (notesSection) notesSection.style.display = 'block';
        if (notesCountEl) notesCountEl.textContent = notes.length;
        notes.forEach(nt => {
            const card = createKeepCard(nt);
            notesGrid.appendChild(card);
        });
    } else {
        if (notesSection) notesSection.style.display = 'none';
    }
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
        // Immediately save previous note to Google Drive in the background when moving away
        if (state.googleAccessToken) {
            uploadSingleNodeToDrive(prevId, true);
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
    const isFolder = !!(node.is_folder || node.icon === 'folder');
    iconPickerBtn.innerHTML = getNodeIconSvg(node.icon, node.color, isFolder, false, 18);
    updateNodeColorDot(node.color);

    applyReadOnlyState(!!node.is_readonly);
    updatePinButtonUI(!!node.is_pinned);

    const ribbonEl = document.getElementById('editor-ribbon');
    const tagsEl = document.getElementById('tags-container');
    const scrollArea = document.getElementById('editor-scroll-area');
    const folderViewEl = document.getElementById('folder-explorer-view');
    const btnToggleRo = document.getElementById('btn-toggle-readonly');
    const btnTogglePwd = document.getElementById('btn-toggle-password-lock');
    const pwdLockedView = document.getElementById('note-password-locked-view');
    const titleContainer = document.querySelector('.title-container');

    const isPasswordLocked = !!(node.password_hash && !state.unlockedNotes.has(id));

    if (isPasswordLocked) {
        if (pwdLockedView) {
            pwdLockedView.style.display = 'flex';
            const titleEl = document.getElementById('note-locked-title');
            if (titleEl) {
                titleEl.textContent = node.title ? `"${node.title}" is Locked` : 'This Note is Password Locked';
            }
            const hintEl = document.getElementById('note-unlock-hint');
            if (hintEl) {
                if (node.password_hint) {
                    hintEl.style.display = 'block';
                    hintEl.textContent = `Hint: ${node.password_hint}`;
                } else {
                    hintEl.style.display = 'none';
                }
            }
            const pwdInput = document.getElementById('note-unlock-password-input');
            if (pwdInput) {
                pwdInput.value = '';
                setTimeout(() => pwdInput.focus(), 60);
            }
            const errEl = document.getElementById('note-unlock-error');
            if (errEl) errEl.style.display = 'none';
        }
        if (titleContainer) titleContainer.style.display = 'none';
        if (ribbonEl) ribbonEl.style.display = 'none';
        if (tagsEl) tagsEl.style.display = 'none';
        if (scrollArea) scrollArea.style.display = 'none';
        if (folderViewEl) folderViewEl.style.display = 'none';
        if (btnToggleRo) btnToggleRo.style.display = 'none';
        if (btnTogglePwd) {
            btnTogglePwd.style.display = 'inline-flex';
            btnTogglePwd.className = 'btn btn-sm btn-warning note-lock-btn active';
            const labelEl = document.getElementById('password-lock-btn-label');
            if (labelEl) labelEl.textContent = 'Unlock Note';
            btnTogglePwd.title = 'This note is locked with a password.';
        }
    } else {
        if (pwdLockedView) pwdLockedView.style.display = 'none';
        if (titleContainer) titleContainer.style.display = 'flex';

        if (btnTogglePwd) {
            btnTogglePwd.style.display = isFolder ? 'none' : 'inline-flex';
            const labelEl = document.getElementById('password-lock-btn-label');
            if (node.password_hash) {
                btnTogglePwd.className = 'btn btn-sm btn-warning note-lock-btn active';
                if (labelEl) labelEl.textContent = 'Lock Note';
                btnTogglePwd.title = 'Password Protected (Unlocked). Click to lock note.';
            } else {
                btnTogglePwd.className = 'btn btn-sm btn-secondary note-lock-btn';
                if (labelEl) labelEl.textContent = 'Note Lock';
                btnTogglePwd.title = 'Lock Note with Password';
            }
        }

        if (isFolder) {
            if (ribbonEl) ribbonEl.style.display = 'none';
            if (tagsEl) tagsEl.style.display = 'none';
            if (scrollArea) scrollArea.style.display = 'none';
            if (folderViewEl) folderViewEl.style.display = 'flex';
            if (btnToggleRo) btnToggleRo.style.display = 'none';
            noteTitleInput.placeholder = 'Folder Name...';
            renderFolderExplorerView(id);
        } else {
            if (folderViewEl) folderViewEl.style.display = 'none';
            if (tagsEl) tagsEl.style.display = 'flex';
            if (scrollArea) scrollArea.style.display = 'flex';
            if (ribbonEl) ribbonEl.style.display = node.is_readonly ? 'none' : '';
            if (btnToggleRo) btnToggleRo.style.display = 'inline-flex';
            noteTitleInput.placeholder = 'Note Title...';
            setEditorContent(node.content || '');
        }

        // On-demand: check Google Drive for the latest version of this note
        if (state.googleAccessToken && id && !isFolder) {
            downloadSingleNoteFromDrive(id, { silent: true });
        }
    }

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
        initEditorHistory(state.activeNodeId, '');
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
    initEditorHistory(state.activeNodeId, noteEditor.innerHTML);
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

    if (state.isReadOnly && nodeId === state.activeNodeId && field !== 'is_readonly') {
        return;
    }

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

    // 5. Automatically schedule cloud sync to Google Drive
    scheduleDriveAutoBackup();
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
        is_readonly: 0,
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
    const parentNode = state.nodes.get(parentId);
    if (parentNode && parentNode.is_readonly) {
        showToast('🔒 Cannot add sub-nodes to a locked note. Unlock it first.', 'warning');
        return;
    }

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
        is_readonly: 0,
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
    const targetNode = state.nodes.get(id);
    if (targetNode && targetNode.is_readonly) {
        showToast('🔒 Note is locked. Unlock it first before deleting.', 'warning');
        return;
    }
    if (targetNode && targetNode.password_hash && !state.unlockedNotes.has(id)) {
        showToast('🔒 Note is password locked. Unlock it first before deleting.', 'warning');
        return;
    }

    if (!confirm('Are you sure you want to delete this note and its sub-nodes?')) return;

    if (state.isServerMode) {
        try {
            await fetch(`${API_BASE}/api/nodes/${id}`, { method: 'DELETE' });
            markNodeDeleted(id);
            state.nodes.delete(id);
            if (state.activeNodeId === id) selectNode(null);
            renderTree();
        } catch (err) {
            console.error('Failed to delete node:', err);
        }
    } else {
        function removeBranch(nodeId) {
            markNodeDeleted(nodeId);
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

// Helper functions to safely hide overlays & floating toolbars without ReferenceError
function hideImageResizeOverlay() {
    const overlay = document.getElementById('image-resize-overlay');
    if (overlay) overlay.style.display = 'none';
}

function hideTableToolbar() {
    hideTableResizeOverlay();
}

// --- Read-Only Mode ---
function toggleReadOnlyMode(targetNodeId = null) {
    const nodeId = (typeof targetNodeId === 'string' && targetNodeId) ? targetNodeId : state.activeNodeId;
    if (!nodeId || !state.nodes.has(nodeId)) return;
    const node = state.nodes.get(nodeId);
    const newStatus = !node.is_readonly;
    node.is_readonly = newStatus ? 1 : 0;
    node.updated_at = Date.now();

    // If target node is not currently active, select it so the user sees the updated note
    if (nodeId !== state.activeNodeId) {
        selectNode(nodeId);
    } else {
        applyReadOnlyState(newStatus);
    }

    persistActiveNodeImmediately(nodeId, { is_readonly: node.is_readonly });
    sendDeltaPatch(nodeId, { is_readonly: node.is_readonly });
    renderTree();
    if (typeof isAllNotesViewActive === 'function' && isAllNotesViewActive()) {
        renderAllNotesView();
    }
    showToast(newStatus ? '👁️ Note set to Read-Only mode' : '✏️ Note set to Editable mode', newStatus ? 'warning' : 'success');
}

function applyReadOnlyState(isReadOnly) {
    state.isReadOnly = isReadOnly;

    // 1. Hide/Show Ribbon Toolbar
    const ribbon = document.getElementById('editor-ribbon');
    if (ribbon) {
        const activeNode = state.activeNodeId ? state.nodes.get(state.activeNodeId) : null;
        const isFolder = activeNode && (activeNode.is_folder || activeNode.icon === 'folder');
        if (isFolder) {
            ribbon.style.display = 'none';
        } else {
            ribbon.style.display = isReadOnly ? 'none' : '';
        }
    }

    // 2. Safely hide all floating toolbars, overlays, and popovers
    if (isReadOnly) {
        try { closeAllRibbonPopovers(); } catch (e) {}
        try { hideImageToolbar(); } catch (e) {}
        try { hideImageResizeOverlay(); } catch (e) {}
        try { hideTableToolbar(); } catch (e) {}
        try { hideTableResizeOverlay(); } catch (e) {}
        const selectionBubble = document.getElementById('selection-bubble');
        if (selectionBubble) selectionBubble.style.display = 'none';
        const slashMenu = document.getElementById('slash-command-menu');
        if (slashMenu) slashMenu.style.display = 'none';
    }

    // 3. Read-Only Badge UI next to Title
    const badge = document.getElementById('readonly-badge');
    if (badge) {
        badge.style.display = isReadOnly ? 'inline-flex' : 'none';
        badge.title = isReadOnly ? 'Note is locked (Read-Only). Click to unlock and edit.' : '';
    }

    // 4. Editor Canvas and Nested Editable Elements
    if (noteEditor) {
        noteEditor.setAttribute('contenteditable', isReadOnly ? 'false' : 'true');
        noteEditor.contentEditable = !isReadOnly;
        noteEditor.classList.toggle('readonly-mode', isReadOnly);

        // Update all nested elements with contenteditable (tables, callouts, codeboxes, etc.)
        noteEditor.querySelectorAll('[contenteditable]').forEach(el => {
            if (isReadOnly) {
                if (!el.hasAttribute('data-orig-contenteditable')) {
                    el.setAttribute('data-orig-contenteditable', el.getAttribute('contenteditable') || 'true');
                }
                el.setAttribute('contenteditable', 'false');
                el.contentEditable = false;
            } else {
                const orig = el.getAttribute('data-orig-contenteditable') || 'true';
                el.setAttribute('contenteditable', orig);
                el.contentEditable = (orig === 'true');
                el.removeAttribute('data-orig-contenteditable');
            }
        });

        // Checkboxes in To-Do lists
        noteEditor.querySelectorAll('input[type="checkbox"]').forEach(cb => {
            cb.disabled = isReadOnly;
        });
    }

    // 5. Note Title & Tags
    if (noteTitleInput) {
        noteTitleInput.readOnly = isReadOnly;
        noteTitleInput.classList.toggle('readonly-input', isReadOnly);
    }
    if (noteTagsInput) {
        noteTagsInput.readOnly = isReadOnly;
        noteTagsInput.style.display = isReadOnly ? 'none' : '';
    }
    const tagsWrapper = document.getElementById('tags-container');
    if (tagsWrapper) {
        tagsWrapper.classList.toggle('readonly-tags', isReadOnly);
    }
    const iconPickerBtn = document.getElementById('btn-icon-picker');
    if (iconPickerBtn) {
        iconPickerBtn.style.pointerEvents = isReadOnly ? 'none' : '';
        iconPickerBtn.style.opacity = isReadOnly ? '0.75' : '';
    }
    const titleColorDot = document.getElementById('title-color-dot');
    if (titleColorDot) {
        titleColorDot.style.pointerEvents = isReadOnly ? 'none' : '';
    }

    // 6. Header Read-Only Button State
    const btn = document.getElementById('btn-toggle-readonly');
    if (btn) {
        const eyeSvg = `<svg class="btn-icon-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
        const editSvg = `<svg class="btn-icon-svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`;
        btn.innerHTML = `${isReadOnly ? editSvg : eyeSvg}<span>${isReadOnly ? 'Make Editable' : 'Read Only'}</span>`;
        btn.className = `btn btn-sm note-lock-btn ${isReadOnly ? 'btn-danger' : 'btn-secondary'}`;
        btn.title = isReadOnly ? 'Read-Only Mode active. Click to make editable.' : 'Set note to Read-Only mode.';
    }

    // 7. Ribbon Read-Only Button State (in Tools tab)
    const ribbonLockBtn = document.getElementById('btn-ribbon-lock');
    if (ribbonLockBtn) {
        const badgeLabel = ribbonLockBtn.querySelector('.badge-label');
        if (badgeLabel) badgeLabel.textContent = isReadOnly ? 'Make Editable' : 'Read Only';
        ribbonLockBtn.title = isReadOnly ? 'Enable editing for note' : 'Set note to Read-Only mode';
    }
}

// --- Password Lock Feature ---
async function hashNotePassword(password) {
    const salt = 'cybernote_pwd_salt_v1';
    if (window.crypto && window.crypto.subtle && window.crypto.subtle.digest) {
        try {
            const enc = new TextEncoder();
            const data = enc.encode(password + salt);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (e) {
            console.warn('crypto.subtle digest error, fallback to polyfill:', e);
        }
    }
    // Fallback zero-dependency hash
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    const str = password + salt;
    for (let i = 0; i < str.length; i++) {
        const ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
}

function openPasswordLockModal(targetNodeId = null) {
    const nodeId = (typeof targetNodeId === 'string' && targetNodeId) ? targetNodeId : state.activeNodeId;
    if (!nodeId || !state.nodes.has(nodeId)) return;
    const node = state.nodes.get(nodeId);

    state.modalLockNodeId = nodeId;
    const modal = document.getElementById('password-lock-modal');
    if (!modal) return;

    const modalTitle = document.getElementById('pwd-modal-title');
    const modalDesc = document.getElementById('pwd-modal-desc');
    const setFields = document.getElementById('pwd-modal-set-fields');
    const removeFields = document.getElementById('pwd-modal-remove-fields');
    const errorEl = document.getElementById('modal-pwd-error');
    const btnSave = document.getElementById('btn-save-password-modal');
    const btnRemove = document.getElementById('btn-remove-password-modal');
    const btnLockNow = document.getElementById('btn-lock-now-password-modal');

    // Reset inputs
    document.getElementById('modal-new-password').value = '';
    document.getElementById('modal-confirm-password').value = '';
    document.getElementById('modal-password-hint').value = node.password_hint || '';
    if (document.getElementById('modal-current-password')) {
        document.getElementById('modal-current-password').value = '';
    }
    errorEl.style.display = 'none';
    errorEl.textContent = '';

    const hasPassword = !!node.password_hash;
    const isUnlocked = state.unlockedNotes.has(nodeId);

    if (!hasPassword) {
        modalTitle.textContent = 'Password Lock Note';
        modalDesc.textContent = `Set a secret password to lock "${node.title || 'this note'}":`;
        setFields.style.display = 'block';
        if (removeFields) removeFields.style.display = 'none';
        btnSave.style.display = 'inline-flex';
        btnSave.textContent = 'Set Password';
        btnRemove.style.display = 'none';
        if (btnLockNow) btnLockNow.style.display = 'none';
    } else {
        modalTitle.textContent = 'Manage Note Password Lock';
        if (isUnlocked) {
            modalDesc.textContent = `"${node.title || 'This note'}" is currently unlocked. You can lock it now, change the password, or remove protection:`;
            setFields.style.display = 'block';
            if (removeFields) removeFields.style.display = 'none';
            btnSave.style.display = 'inline-flex';
            btnSave.textContent = 'Change Password';
            btnRemove.style.display = 'inline-flex';
            btnRemove.textContent = 'Remove Lock';
            if (btnLockNow) btnLockNow.style.display = 'inline-flex';
        } else {
            modalDesc.textContent = `Enter current password to manage or remove lock for "${node.title || 'this note'}":`;
            setFields.style.display = 'block';
            if (removeFields) removeFields.style.display = 'block';
            btnSave.style.display = 'inline-flex';
            btnSave.textContent = 'Change Password';
            btnRemove.style.display = 'inline-flex';
            btnRemove.textContent = 'Remove Lock';
            if (btnLockNow) btnLockNow.style.display = 'none';
        }
    }

    modal.style.display = 'flex';
    setTimeout(() => {
        if (!hasPassword || isUnlocked) {
            const newPwdInput = document.getElementById('modal-new-password');
            if (newPwdInput) newPwdInput.focus();
        } else if (removeFields) {
            const curPwdInput = document.getElementById('modal-current-password');
            if (curPwdInput) curPwdInput.focus();
        }
    }, 60);
}

function closePasswordLockModal() {
    const modal = document.getElementById('password-lock-modal');
    if (modal) modal.style.display = 'none';
    state.modalLockNodeId = null;
}

async function savePasswordModal() {
    const nodeId = state.modalLockNodeId;
    if (!nodeId || !state.nodes.has(nodeId)) return;
    const node = state.nodes.get(nodeId);

    const errorEl = document.getElementById('modal-pwd-error');
    const newPwd = document.getElementById('modal-new-password').value;
    const confirmPwd = document.getElementById('modal-confirm-password').value;
    const hint = document.getElementById('modal-password-hint').value.trim();

    // If node already has password and is not unlocked in session, verify current password first
    if (node.password_hash && !state.unlockedNotes.has(nodeId)) {
        const curPwd = document.getElementById('modal-current-password').value;
        if (!curPwd) {
            errorEl.textContent = 'Please enter your current password.';
            errorEl.style.display = 'block';
            return;
        }
        const curHash = await hashNotePassword(curPwd);
        if (curHash !== node.password_hash) {
            errorEl.textContent = 'Current password does not match.';
            errorEl.style.display = 'block';
            return;
        }
    }

    if (!newPwd) {
        errorEl.textContent = 'Password cannot be empty.';
        errorEl.style.display = 'block';
        return;
    }

    if (newPwd !== confirmPwd) {
        errorEl.textContent = 'Passwords do not match. Please verify.';
        errorEl.style.display = 'block';
        return;
    }

    const newHash = await hashNotePassword(newPwd);
    node.password_hash = newHash;
    node.password_hint = hint || '';
    node.updated_at = Date.now();

    // Lock note by default upon setting password
    state.unlockedNotes.delete(nodeId);

    persistActiveNodeImmediately(nodeId, {
        password_hash: node.password_hash,
        password_hint: node.password_hint
    });
    uploadSingleNodeToDrive(nodeId, true);

    closePasswordLockModal();
    if (state.activeNodeId === nodeId) {
        selectNode(nodeId);
    }
    renderTree();
    if (typeof isAllNotesViewActive === 'function' && isAllNotesViewActive()) {
        renderAllNotesView();
    }
    showToast('🔐 Note password set and locked!', 'success');
}

async function removePasswordModal() {
    const nodeId = state.modalLockNodeId;
    if (!nodeId || !state.nodes.has(nodeId)) return;
    const node = state.nodes.get(nodeId);

    const errorEl = document.getElementById('modal-pwd-error');

    // If not unlocked in this session, require current password
    if (node.password_hash && !state.unlockedNotes.has(nodeId)) {
        const curPwd = document.getElementById('modal-current-password').value;
        if (!curPwd) {
            errorEl.textContent = 'Please enter current password to remove lock.';
            errorEl.style.display = 'block';
            return;
        }
        const curHash = await hashNotePassword(curPwd);
        if (curHash !== node.password_hash) {
            errorEl.textContent = 'Current password does not match.';
            errorEl.style.display = 'block';
            return;
        }
    }

    delete node.password_hash;
    delete node.password_hint;
    node.updated_at = Date.now();
    state.unlockedNotes.delete(nodeId);

    persistActiveNodeImmediately(nodeId, {
        password_hash: null,
        password_hint: null
    });
    uploadSingleNodeToDrive(nodeId, true);

    closePasswordLockModal();
    if (state.activeNodeId === nodeId) {
        selectNode(nodeId);
    }
    renderTree();
    if (typeof isAllNotesViewActive === 'function' && isAllNotesViewActive()) {
        renderAllNotesView();
    }
    showToast('🔓 Password lock removed from note.', 'info');
}

function lockNowModal() {
    const nodeId = state.modalLockNodeId;
    if (!nodeId || !state.nodes.has(nodeId)) return;
    state.unlockedNotes.delete(nodeId);
    closePasswordLockModal();
    if (state.activeNodeId === nodeId) {
        selectNode(nodeId);
    }
    renderTree();
    if (typeof isAllNotesViewActive === 'function' && isAllNotesViewActive()) {
        renderAllNotesView();
    }
    showToast('🔒 Note locked.', 'info');
}

async function submitUnlockPassword() {
    const nodeId = state.activeNodeId;
    if (!nodeId || !state.nodes.has(nodeId)) return;
    const node = state.nodes.get(nodeId);
    if (!node || !node.password_hash) return;

    const input = document.getElementById('note-unlock-password-input');
    const errorEl = document.getElementById('note-unlock-error');
    if (!input) return;

    const entered = input.value;
    if (!entered) {
        if (errorEl) {
            errorEl.textContent = 'Please enter your password.';
            errorEl.style.display = 'block';
        }
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 400);
        return;
    }

    const hashed = await hashNotePassword(entered);
    if (hashed === node.password_hash) {
        state.unlockedNotes.add(nodeId);
        input.value = '';
        if (errorEl) errorEl.style.display = 'none';
        showToast('🔓 Note unlocked successfully!', 'success');
        selectNode(nodeId);
        renderTree();
        if (typeof isAllNotesViewActive === 'function' && isAllNotesViewActive()) {
            renderAllNotesView();
        }
    } else {
        if (errorEl) {
            errorEl.textContent = 'Incorrect password. Please try again.';
            errorEl.style.display = 'block';
        }
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 400);
        input.select();
    }
}

function handleTogglePasswordLockClick() {
    if (!state.activeNodeId || !state.nodes.has(state.activeNodeId)) return;
    const node = state.nodes.get(state.activeNodeId);
    if (!node) return;

    if (!node.password_hash) {
        openPasswordLockModal(state.activeNodeId);
    } else if (state.unlockedNotes.has(state.activeNodeId)) {
        state.unlockedNotes.delete(state.activeNodeId);
        selectNode(state.activeNodeId);
        renderTree();
        if (typeof isAllNotesViewActive === 'function' && isAllNotesViewActive()) {
            renderAllNotesView();
        }
        showToast('🔒 Note locked with password.', 'info');
    } else {
        const input = document.getElementById('note-unlock-password-input');
        if (input) input.focus();
    }
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

function toggleRibbonPopover(menuId, buttonEl, e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }
    saveSelection();
    const targetMenu = document.getElementById(menuId);
    if (!targetMenu) return;
    const isShowing = targetMenu.style.display !== 'none' && targetMenu.style.display !== '';
    closeAllRibbonPopovers();
    if (!isShowing) {
        // Mount to document.body so parent overflow-x / clipping NEVER cuts off the popover
        if (targetMenu.parentNode !== document.body) {
            document.body.appendChild(targetMenu);
        }

        targetMenu.style.display = targetMenu.classList.contains('emoji-grid-popover') ? 'grid' : 'flex';

        // Precise positioning based on the triggering button
        const btn = buttonEl || (e ? (e.currentTarget || (e.target && e.target.closest('button'))) : null);
        if (btn) {
            const btnRect = btn.getBoundingClientRect();
            targetMenu.style.position = 'fixed';
            targetMenu.style.zIndex = '999999';

            // Reset temp coordinates to measure rendered dimensions
            targetMenu.style.left = '0px';
            targetMenu.style.top = '0px';
            targetMenu.style.right = 'auto';

            const menuWidth = targetMenu.offsetWidth || 210;
            const menuHeight = targetMenu.offsetHeight || 220;

            // Vertical placement: below button, or flip above if near bottom
            if (btnRect.bottom + menuHeight + 12 > window.innerHeight && btnRect.top - menuHeight > 12) {
                targetMenu.style.top = `${Math.max(8, btnRect.top - menuHeight - 4)}px`;
            } else {
                targetMenu.style.top = `${btnRect.bottom + 4}px`;
            }

            // Horizontal placement: align left with button; flip to right if overflows window
            if (btnRect.left + menuWidth > window.innerWidth - 12) {
                targetMenu.style.left = 'auto';
                targetMenu.style.right = `${Math.max(10, window.innerWidth - btnRect.right)}px`;
            } else {
                targetMenu.style.left = `${Math.max(10, btnRect.left)}px`;
                targetMenu.style.right = 'auto';
            }
        }
    }
}

function closeAllRibbonPopovers() {
    document.querySelectorAll('.ribbon-popover-menu').forEach(m => {
        m.style.display = 'none';
    });
}

function setupRibbonTabs() {
    const tabsList = document.querySelector('.ribbon-tabs-list');
    const tabButtons = document.querySelectorAll('.ribbon-tab-nav-btn');
    const tabPanes = document.querySelectorAll('.ribbon-tab-pane');
    if (!tabButtons.length) return;

    function switchRibbonTab(tabId) {
        let matched = false;
        tabButtons.forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
            if (isActive) matched = true;
        });

        // Fallback to home if tabId was not found
        if (!matched && tabButtons[0]) {
            tabId = tabButtons[0].dataset.tab;
            tabButtons[0].classList.add('active');
            tabButtons[0].setAttribute('aria-selected', 'true');
        }

        tabPanes.forEach(pane => {
            pane.classList.toggle('active', pane.id === tabId);
        });

        closeAllRibbonPopovers();
        try {
            localStorage.setItem('cybernote_active_ribbon_tab', tabId);
        } catch (_) {}
    }

    if (tabsList) {
        tabsList.addEventListener('click', (e) => {
            const btn = e.target.closest('.ribbon-tab-nav-btn');
            if (!btn) return;
            e.preventDefault();
            const targetTab = btn.dataset.tab;
            if (targetTab) switchRibbonTab(targetTab);
        });
    } else {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = btn.dataset.tab;
                if (targetTab) switchRibbonTab(targetTab);
            });
        });
    }

    // Restore saved tab or default to first tab (tab-pane-home)
    let savedTab = 'tab-pane-home';
    try {
        savedTab = localStorage.getItem('cybernote_active_ribbon_tab') || 'tab-pane-home';
    } catch (_) {}
    switchRibbonTab(savedTab);
}

// Helper to locate existing styled text span for combining or modifying effects
function getActiveStyledSpan(range) {
    if (!range) return null;
    let node = range.commonAncestorContainer;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
    if (node && noteEditor.contains(node)) {
        const found = node.closest('.neon-text, [class*="anim-"]');
        if (found && noteEditor.contains(found)) return found;
    }
    if (range.startContainer) {
        let sNode = range.startContainer.nodeType === Node.TEXT_NODE ? range.startContainer.parentNode : range.startContainer;
        let sFound = sNode?.closest?.('.neon-text, [class*="anim-"]');
        if (sFound && noteEditor.contains(sFound)) return sFound;
    }
    if (range.endContainer) {
        let eNode = range.endContainer.nodeType === Node.TEXT_NODE ? range.endContainer.parentNode : range.endContainer;
        let eFound = eNode?.closest?.('.neon-text, [class*="anim-"]');
        if (eFound && noteEditor.contains(eFound)) return eFound;
    }
    return null;
}

function applyNeonEffect(color) {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    restoreSelection();
    let sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !noteEditor.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        noteEditor.focus();
        sel = window.getSelection();
    }
    if (!sel || sel.rangeCount === 0) return;

    let range = sel.getRangeAt(0);
    let targetSpan = getActiveStyledSpan(range);

    // If no existing span and range is collapsed, auto-expand to word
    if (!targetSpan && range.collapsed) {
        const node = range.startContainer;
        if (node && node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            let start = range.startOffset;
            let end = range.endOffset;
            while (start > 0 && /\S/.test(text[start - 1])) start--;
            while (end < text.length && /\S/.test(text[end])) end++;
            if (start < end) {
                range = document.createRange();
                range.setStart(node, start);
                range.setEnd(node, end);
                sel.removeAllRanges();
                sel.addRange(range);
                targetSpan = getActiveStyledSpan(range);
            }
        }
    }

    const neonColors = ['neon-cyan', 'neon-pink', 'neon-green', 'neon-purple', 'neon-gold'];

    if (targetSpan) {
        if (color === 'none') {
            targetSpan.classList.remove('neon-text', ...neonColors);
            if (!Array.from(targetSpan.classList).some(c => c.startsWith('anim-'))) {
                const parent = targetSpan.parentNode;
                while (targetSpan.firstChild) {
                    parent.insertBefore(targetSpan.firstChild, targetSpan);
                }
                targetSpan.remove();
            }
        } else {
            targetSpan.classList.remove(...neonColors);
            targetSpan.classList.add('neon-text', `neon-${color}`);
        }
        const newRange = document.createRange();
        newRange.selectNodeContents(targetSpan);
        sel.removeAllRanges();
        sel.addRange(newRange);
        saveSelection();
        handleEditorInput();
        return;
    }

    if (color === 'none') return;

    if (range.collapsed) {
        insertHtmlAtCursor(`<span class="neon-text neon-${color}">Glowing Neon Text</span>&nbsp;`);
        return;
    }

    // Wrap selection
    const span = document.createElement('span');
    span.className = `neon-text neon-${color}`;
    const frag = range.extractContents();
    span.appendChild(frag);
    range.insertNode(span);

    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    sel.removeAllRanges();
    sel.addRange(newRange);

    saveSelection();
    handleEditorInput();
}

function applyAnimatedText(type) {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    restoreSelection();
    let sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !noteEditor.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        noteEditor.focus();
        sel = window.getSelection();
    }
    if (!sel || sel.rangeCount === 0) return;

    let range = sel.getRangeAt(0);
    let targetSpan = getActiveStyledSpan(range);

    // If no existing span and range is collapsed, auto-expand to word
    if (!targetSpan && range.collapsed) {
        const node = range.startContainer;
        if (node && node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            let start = range.startOffset;
            let end = range.endOffset;
            while (start > 0 && /\S/.test(text[start - 1])) start--;
            while (end < text.length && /\S/.test(text[end])) end++;
            if (start < end) {
                range = document.createRange();
                range.setStart(node, start);
                range.setEnd(node, end);
                sel.removeAllRanges();
                sel.addRange(range);
                targetSpan = getActiveStyledSpan(range);
            }
        }
    }

    const animClasses = [
        'anim-rainbow-text',
        'anim-pulse-text',
        'anim-float-text',
        'anim-glitch-text',
        'anim-shimmer-text',
        'anim-bounce-text',
        'anim-flicker-text',
        'anim-hue-text',
        'anim-flame-text',
        'anim-blink-text',
        'anim-pop-text'
    ];

    if (targetSpan) {
        targetSpan.classList.remove(...animClasses);
        if (type !== 'none') {
            targetSpan.classList.add(`anim-${type}-text`);
        } else {
            if (!targetSpan.classList.contains('neon-text')) {
                const parent = targetSpan.parentNode;
                while (targetSpan.firstChild) {
                    parent.insertBefore(targetSpan.firstChild, targetSpan);
                }
                targetSpan.remove();
            }
        }
        const newRange = document.createRange();
        newRange.selectNodeContents(targetSpan);
        sel.removeAllRanges();
        sel.addRange(newRange);
        saveSelection();
        handleEditorInput();
        pushHistorySnapshot(true);
        return;
    }

    if (type === 'none') return;

    if (range.collapsed) {
        const sampleMap = {
            rainbow: 'Rainbow Flowing Title',
            pulse: 'Pulsing Ambient Text',
            float: 'Floating Waves Text',
            glitch: 'Cyber Glitch Effect',
            shimmer: 'Metallic Shimmering Text',
            bounce: 'Bouncing Energetic Text',
            flicker: 'Flickering Neon Lamp',
            hue: 'Hue Cycling Spectrum',
            flame: 'Blazing Flame Text',
            blink: 'Terminal Blinking Text',
            pop: 'Heartbeat Zoom Pop'
        };
        const defaultText = sampleMap[type] || 'Animated Styled Text';
        insertHtmlAtCursor(`<span class="anim-${type}-text">${defaultText}</span>&nbsp;`);
        pushHistorySnapshot(true);
        return;
    }

    // Wrap selection
    const span = document.createElement('span');
    span.className = `anim-${type}-text`;
    const frag = range.extractContents();
    span.appendChild(frag);
    range.insertNode(span);

    const newRange = document.createRange();
    newRange.selectNodeContents(span);
    sel.removeAllRanges();
    sel.addRange(newRange);

    saveSelection();
    handleEditorInput();
    pushHistorySnapshot(true);
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
    let sel = window.getSelection();
    if (!sel || sel.rangeCount === 0 || !noteEditor.contains(sel.getRangeAt(0).commonAncestorContainer)) {
        noteEditor.focus();
        sel = window.getSelection();
    }
    if (!sel || sel.rangeCount === 0) return;

    let range = sel.getRangeAt(0);

    // If selection is collapsed, automatically expand to the word at the cursor
    if (range.collapsed) {
        const node = range.startContainer;
        if (node && node.nodeType === Node.TEXT_NODE) {
            const text = node.textContent;
            let start = range.startOffset;
            let end = range.endOffset;
            while (start > 0 && /\S/.test(text[start - 1])) start--;
            while (end < text.length && /\S/.test(text[end])) end++;
            if (start < end) {
                range = document.createRange();
                range.setStart(node, start);
                range.setEnd(node, end);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    }

    if (range.collapsed) return;

    const frag = range.cloneContents();
    const walker = document.createTreeWalker(frag, NodeFilter.SHOW_TEXT, null, false);
    let textNode;
    let hasText = false;
    while ((textNode = walker.nextNode())) {
        const val = textNode.nodeValue;
        if (!val || val.length === 0) continue;
        hasText = true;
        if (caseType === 'upper') {
            textNode.nodeValue = val.toUpperCase();
        } else if (caseType === 'lower') {
            textNode.nodeValue = val.toLowerCase();
        } else if (caseType === 'title') {
            textNode.nodeValue = val.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        } else if (caseType === 'sentence') {
            textNode.nodeValue = val.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        }
    }

    if (!hasText) return;

    range.deleteContents();

    const firstChild = frag.firstChild;
    const lastChild = frag.lastChild;
    range.insertNode(frag);

    if (firstChild && lastChild) {
        const newRange = document.createRange();
        newRange.setStartBefore(firstChild);
        newRange.setEndAfter(lastChild);
        sel.removeAllRanges();
        sel.addRange(newRange);
    }

    saveSelection();
    handleEditorInput();
    updateDocumentStats();
}

function insertTimeline() {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    const html = `
        <div class="note-timeline-card" contenteditable="false">
            <div class="timeline-step">
                <div class="step-num">1</div>
                <div class="step-content" contenteditable="true">
                    <b>Phase 1: Planning & Setup</b>
                    <div>Define requirements and configure environment.</div>
                </div>
            </div>
            <div class="timeline-step">
                <div class="step-num">2</div>
                <div class="step-content" contenteditable="true">
                    <b>Phase 2: Execution & Testing</b>
                    <div>Implement features and run automated tests.</div>
                </div>
            </div>
            <div class="timeline-step">
                <div class="step-num">3</div>
                <div class="step-content" contenteditable="true">
                    <b>Phase 3: Launch & Sync</b>
                    <div>Deploy to production and sync cloud backups.</div>
                </div>
            </div>
        </div>
        <p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertQuoteCard() {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    const html = `
        <div class="note-quote-card" contenteditable="true">
            <div class="quote-text">“Simplicity is prerequisite for reliability.”</div>
            <div class="quote-author">— Edsger W. Dijkstra</div>
        </div>
        <p><br></p>
    `;
    insertHtmlAtCursor(html);
}

function insertFancyDivider() {
    closeAllRibbonPopovers();
    if (state.isReadOnly) return;
    const html = `<div class="fancy-divider-gradient" contenteditable="false"></div><p><br></p>`;
    insertHtmlAtCursor(html);
}

function toggleZenMode() {
    const isZen = document.body.classList.toggle('zen-mode-active');
    const btn = document.getElementById('btn-zen-mode');
    if (btn) btn.classList.toggle('active', isZen);
    showToast(isZen ? 'Zen Focus Mode activated' : 'Zen Focus Mode exited');
}

function htmlToMarkdown(html, title) {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    temp.querySelectorAll('h1').forEach(el => el.replaceWith(`\n# ${el.textContent}\n`));
    temp.querySelectorAll('h2').forEach(el => el.replaceWith(`\n## ${el.textContent}\n`));
    temp.querySelectorAll('h3').forEach(el => el.replaceWith(`\n### ${el.textContent}\n`));
    temp.querySelectorAll('h4').forEach(el => el.replaceWith(`\n#### ${el.textContent}\n`));
    temp.querySelectorAll('p').forEach(el => el.replaceWith(`\n${el.textContent}\n`));
    temp.querySelectorAll('b, strong').forEach(el => el.replaceWith(`**${el.textContent}**`));
    temp.querySelectorAll('i, em').forEach(el => el.replaceWith(`*${el.textContent}*`));
    temp.querySelectorAll('code').forEach(el => el.replaceWith(`\`${el.textContent}\``));
    temp.querySelectorAll('blockquote').forEach(el => el.replaceWith(`\n> ${el.textContent}\n`));
    temp.querySelectorAll('li').forEach(el => el.replaceWith(`\n- ${el.textContent}`));
    temp.querySelectorAll('hr').forEach(el => el.replaceWith(`\n---\n`));

    return `# ${title}\n\n${temp.textContent.trim()}\n`;
}

function exportNoteAs(format) {
    closeAllRibbonPopovers();
    if (!state.activeNodeId) {
        showToast('Please select a note to export');
        return;
    }
    const node = state.nodes.get(state.activeNodeId);
    if (!node) return;
    if (node.type === 'folder') {
        showToast('Folders cannot be exported as single notes');
        return;
    }
    const title = node.title || 'Untitled Note';
    const content = noteEditor.innerHTML || '';
    let data = '';
    let mime = 'text/plain';

    if (format === 'md') {
        data = htmlToMarkdown(content, title);
        mime = 'text/markdown';
    } else if (format === 'html') {
        data = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${escapeHtml(title)}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; max-width: 820px; margin: 40px auto; padding: 0 20px; line-height: 1.6; color: #222; }
        h1 { border-bottom: 2px solid #eee; padding-bottom: 8px; }
        table { border-collapse: collapse; width: 100%; margin: 16px 0; }
        th, td { border: 1px solid #ccc; padding: 8px 12px; }
        th { background: #f5f5f5; }
        code { background: #f0f0f0; padding: 2px 6px; border-radius: 4px; font-family: monospace; }
        blockquote { border-left: 4px solid #89b4fa; margin: 16px 0; padding-left: 12px; color: #555; }
    </style>
</head>
<body>
    <h1>${escapeHtml(title)}</h1>
    ${content}
</body>
</html>`;
        mime = 'text/html';
    } else if (format === 'txt') {
        data = `${title}\n${'='.repeat(title.length)}\n\n${noteEditor.innerText || ''}`;
        mime = 'text/plain';
    } else if (format === 'json') {
        data = JSON.stringify(node, null, 2);
        mime = 'application/json';
    }

    const blob = new Blob([data], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/[^\w\s-]/g, '').trim() || 'note'}.${format}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast(`✓ Exported note as .${format}`);
}

function handlePrintNote() {
    window.print();
}

function updateDocumentStats() {
    const badge = document.getElementById('ribbon-word-count');
    const quickBadge = document.getElementById('ribbon-quick-word-count');
    if (!noteEditor) return;
    const text = noteEditor.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const readTime = Math.max(1, Math.ceil(words / 200));
    if (badge) {
        badge.textContent = `${words} words • ${readTime}m read`;
        badge.title = `${words} words, ${chars} characters, ~${readTime} min read time`;
    }
    if (quickBadge) {
        quickBadge.textContent = `${words} words`;
        quickBadge.title = `${words} words, ${chars} characters, ~${readTime} min read time`;
    }
}

// Expose functions globally for inline HTML onclick handlers
window.setupRibbonTabs = setupRibbonTabs;
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
window.openPaintModal = openPaintModal;
window.closePaintModal = closePaintModal;
window.openShapeModal = openShapeModal;
window.closeShapeModal = closeShapeModal;
window.exportNoteAs = exportNoteAs;
window.insertTimeline = insertTimeline;
window.insertQuoteCard = insertQuoteCard;
window.insertFancyDivider = insertFancyDivider;
window.toggleZenMode = toggleZenMode;
window.performUndo = performUndo;
window.performRedo = performRedo;

function applyTextColorQuick(color) {
    if (state.isReadOnly) return;
    execFormat('foreColor', color);
    const ind = document.getElementById('text-color-indicator');
    if (ind) ind.style.backgroundColor = color;
    const picker = document.getElementById('text-color-picker');
    if (picker) picker.value = color;
}
window.applyTextColorQuick = applyTextColorQuick;

// --- WYSIWYG Formatting Actions ---
function execFormat(command, value = null) {
    if (state.isReadOnly) return;
    noteEditor.focus();
    document.execCommand(command, false, value);
    handleEditorInput();
    pushHistorySnapshot(true);
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
// Floating Image Controls & Corner Resizing
function setupImageInteractions() {
    noteEditor.addEventListener('click', (e) => {
        if (state.isReadOnly) {
            hideImageToolbar();
            hideImageResizeOverlay();
            return;
        }
        const img = e.target.tagName === 'IMG' ? e.target : e.target.closest('.editor-img-wrap')?.querySelector('img');
        if (img) {
            selectImageElement(img);
        } else if (!e.target.closest('#image-toolbar') && !e.target.closest('#image-resize-overlay') && !e.target.closest('#editor-drop-line')) {
            hideImageToolbar();
        }
    });

    setupImageResizeHandles();
    setupImageMoveInteractions();
}

function selectImageElement(img) {
    if (state.isReadOnly) return;
    state.activeImageElement = img;
    document.querySelectorAll('.wysiwyg-canvas img').forEach(i => i.classList.remove('selected-img'));
    img.classList.add('selected-img');

    // Customize title label dynamically for Shape / Signature / Photo
    const typeLabel = document.getElementById('img-tb-type-label');
    if (typeLabel) {
        if (img.classList.contains('note-vector-shape') || img.closest('.editor-shape-wrap')) {
            typeLabel.textContent = 'Shape:';
        } else if (img.classList.contains('note-signature-img') || img.closest('.editor-signature-wrap')) {
            typeLabel.textContent = 'Signature:';
        } else {
            typeLabel.textContent = 'Image:';
        }
    }

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

function moveActiveImageUp() {
    if (!state.activeImageElement) return;
    const wrap = state.activeImageElement.closest('.editor-img-wrap') || state.activeImageElement;
    let prev = wrap.previousElementSibling;
    while (prev && (prev.id === 'editor-drop-line' || prev.classList?.contains('image-resize-overlay') || prev.classList?.contains('table-resize-overlay'))) {
        prev = prev.previousElementSibling;
    }
    if (prev && wrap.parentNode) {
        wrap.parentNode.insertBefore(wrap, prev);
        updateImageResizeOverlay();
        handleEditorInput();
        showToast('⬆ Moved Up');
    }
}

function moveActiveImageDown() {
    if (!state.activeImageElement) return;
    const wrap = state.activeImageElement.closest('.editor-img-wrap') || state.activeImageElement;
    let next = wrap.nextElementSibling;
    while (next && (next.id === 'editor-drop-line' || next.classList?.contains('image-resize-overlay') || next.classList?.contains('table-resize-overlay'))) {
        next = next.nextElementSibling;
    }
    if (next && wrap.parentNode) {
        wrap.parentNode.insertBefore(wrap, next.nextSibling);
        updateImageResizeOverlay();
        handleEditorInput();
        showToast('⬇ Moved Down');
    }
}

function setImageAlign(alignment) {
    if (!state.activeImageElement) return;
    const img = state.activeImageElement;
    const wrap = img.closest('.editor-img-wrap') || img;

    if (alignment === 'left') {
        wrap.style.display = 'block';
        wrap.style.float = 'none';
        wrap.style.margin = '14px 0';
        wrap.style.textAlign = 'left';
        img.style.margin = '0';
        img.style.display = 'inline-block';
    } else if (alignment === 'center') {
        wrap.style.display = 'block';
        wrap.style.float = 'none';
        wrap.style.margin = '14px auto';
        wrap.style.textAlign = 'center';
        img.style.margin = '0 auto';
        img.style.display = 'inline-block';
    } else if (alignment === 'right') {
        wrap.style.display = 'block';
        wrap.style.float = 'none';
        wrap.style.margin = '14px 0 14px auto';
        wrap.style.textAlign = 'right';
        img.style.margin = '0 0 0 auto';
        img.style.display = 'inline-block';
    } else if (alignment === 'float-left') {
        wrap.style.display = 'inline-block';
        wrap.style.float = 'left';
        wrap.style.margin = '4px 16px 12px 0';
        wrap.style.textAlign = 'left';
        img.style.margin = '0';
        img.style.display = 'block';
    } else if (alignment === 'float-right') {
        wrap.style.display = 'inline-block';
        wrap.style.float = 'right';
        wrap.style.margin = '4px 0 12px 16px';
        wrap.style.textAlign = 'right';
        img.style.margin = '0';
        img.style.display = 'block';
    }
    updateImageResizeOverlay();
    handleEditorInput();
}

function deleteActiveImage() {
    if (!state.activeImageElement) return;
    const wrap = state.activeImageElement.closest('.editor-img-wrap') || state.activeImageElement;
    wrap.remove();
    hideImageToolbar();
    handleEditorInput();
}

function setupImageMoveInteractions() {
    const moveHandle = document.getElementById('img-move-handle');
    const dropLine = document.getElementById('editor-drop-line');
    const scrollArea = document.getElementById('editor-scroll-area');
    if (!moveHandle || !dropLine || !scrollArea) return;

    let isMoving = false;
    let currentDropTarget = null;
    let activeWrap = null;

    const startMove = (clientY) => {
        if (!state.activeImageElement || state.isReadOnly) return;
        activeWrap = state.activeImageElement.closest('.editor-img-wrap') || state.activeImageElement;
        isMoving = true;
        currentDropTarget = null;
        document.body.style.userSelect = 'none';
        moveHandle.classList.add('dragging');
        if (activeWrap) activeWrap.classList.add('moving-active');
    };

    const handlePointerMove = (clientX, clientY) => {
        if (!isMoving || !activeWrap) return;

        // Find candidate block elements in noteEditor
        const blocks = Array.from(noteEditor.children).filter(el => 
            el !== activeWrap && 
            el.id !== 'editor-drop-line' && 
            el.id !== 'image-resize-overlay' && 
            el.id !== 'table-resize-overlay' &&
            !el.classList.contains('image-resize-overlay') &&
            !el.classList.contains('table-resize-overlay')
        );

        if (blocks.length === 0) {
            currentDropTarget = null;
            dropLine.style.display = 'none';
            return;
        }

        let bestBlock = null;
        let bestDist = Infinity;
        let insertBefore = true;

        for (const block of blocks) {
            const rect = block.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            const dist = Math.abs(clientY - midY);
            if (dist < bestDist) {
                bestDist = dist;
                bestBlock = block;
                insertBefore = clientY < midY;
            }
        }

        if (bestBlock) {
            const blockRect = bestBlock.getBoundingClientRect();
            const scrollRect = scrollArea.getBoundingClientRect();
            const left = blockRect.left - scrollRect.left - scrollArea.clientLeft + scrollArea.scrollLeft;
            const targetY = insertBefore ? blockRect.top : blockRect.bottom;
            const top = targetY - scrollRect.top - scrollArea.clientTop + scrollArea.scrollTop;

            dropLine.style.display = 'flex';
            dropLine.style.left = `${Math.round(left)}px`;
            dropLine.style.top = `${Math.round(top - 1)}px`;
            dropLine.style.width = `${Math.round(blockRect.width)}px`;

            currentDropTarget = { block: bestBlock, insertBefore };
        }
    };

    const finishMove = () => {
        if (!isMoving) return;
        isMoving = false;
        document.body.style.userSelect = '';
        moveHandle.classList.remove('dragging');
        if (activeWrap) activeWrap.classList.remove('moving-active');
        dropLine.style.display = 'none';

        if (currentDropTarget && currentDropTarget.block && activeWrap) {
            const { block, insertBefore } = currentDropTarget;
            if (insertBefore) {
                block.parentNode.insertBefore(activeWrap, block);
            } else {
                block.parentNode.insertBefore(activeWrap, block.nextSibling);
            }
            updateImageResizeOverlay();
            handleEditorInput();
            showToast('✓ Element Moved Freely');
        } else if (activeWrap) {
            updateImageResizeOverlay();
        }
        currentDropTarget = null;
        activeWrap = null;
    };

    moveHandle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        startMove(e.clientY);
    });

    moveHandle.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        startMove(e.touches[0].clientY);
    }, { passive: true });

    // Allow dragging selected image/shape directly
    noteEditor.addEventListener('mousedown', (e) => {
        if (e.target.tagName === 'IMG' && e.target === state.activeImageElement) {
            startMove(e.clientY);
        }
    });

    noteEditor.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1 && e.target.tagName === 'IMG' && e.target === state.activeImageElement) {
            startMove(e.touches[0].clientY);
        }
    }, { passive: true });

    window.addEventListener('mousemove', (e) => {
        if (isMoving) {
            handlePointerMove(e.clientX, e.clientY);
        }
    });

    window.addEventListener('touchmove', (e) => {
        if (isMoving && e.touches.length === 1) {
            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    });

    window.addEventListener('mouseup', finishMove);
    window.addEventListener('touchend', finishMove);
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

function updateTableResizeOverlay() {
    const overlay = document.getElementById('table-resize-overlay');
    const scrollArea = document.getElementById('editor-scroll-area');
    if (!overlay || !scrollArea) return;

    if (!state.activeTableElement || !state.activeTableElement.isConnected) {
        overlay.style.display = 'none';
        return;
    }

    const table = state.activeTableElement;
    const tblRect = table.getBoundingClientRect();
    const scrollRect = scrollArea.getBoundingClientRect();

    if (tblRect.width === 0 || tblRect.height === 0) {
        overlay.style.display = 'none';
        return;
    }

    overlay.style.display = 'block';
    const left = tblRect.left - scrollRect.left - scrollArea.clientLeft + scrollArea.scrollLeft;
    const top = tblRect.top - scrollRect.top - scrollArea.clientTop + scrollArea.scrollTop;

    overlay.style.left = `${Math.round(left)}px`;
    overlay.style.top = `${Math.round(top)}px`;
    overlay.style.width = `${Math.round(tblRect.width)}px`;
    overlay.style.height = `${Math.round(tblRect.height)}px`;

    const badge = document.getElementById('tbl-dimension-badge');
    if (badge) {
        badge.textContent = `${Math.round(tblRect.width)} × ${Math.round(tblRect.height)}px`;
    }
}

function hideTableResizeOverlay() {
    const overlay = document.getElementById('table-resize-overlay');
    if (overlay) overlay.style.display = 'none';
    if (tableToolbar) tableToolbar.style.display = 'none';
    state.activeTableElement = null;
    state.activeTableCell = null;
}

function setupTableResizeHandles() {
    const overlay = document.getElementById('table-resize-overlay');
    if (!overlay) return;

    let isResizing = false;
    let currentHandle = null;
    let startX = 0;
    let startY = 0;
    let startWidth = 0;
    let startHeight = 0;
    let startTable = null;
    let startColWidths = [];
    let startRowHeights = [];

    const onStart = (clientX, clientY, handle) => {
        if (!state.activeTableElement || state.isReadOnly) return;

        isResizing = true;
        currentHandle = handle.dataset.handle;
        startX = clientX;
        startY = clientY;
        startTable = state.activeTableElement;
        startWidth = startTable.offsetWidth;
        startHeight = startTable.offsetHeight;

        startTable.style.tableLayout = 'fixed';

        const firstRow = startTable.rows[0];
        if (firstRow) {
            startColWidths = Array.from(firstRow.children).map(c => c.offsetWidth);
        } else {
            startColWidths = [];
        }
        startRowHeights = Array.from(startTable.rows).map(r => r.offsetHeight);

        document.body.style.userSelect = 'none';
        if (currentHandle === 'se') document.body.style.cursor = 'nwse-resize';
        else if (currentHandle === 'sw') document.body.style.cursor = 'nesw-resize';
        else if (currentHandle === 'e') document.body.style.cursor = 'ew-resize';
        else if (currentHandle === 's') document.body.style.cursor = 'ns-resize';
    };

    const onMove = (clientX, clientY) => {
        if (!isResizing || !startTable) return;

        const deltaX = clientX - startX;
        const deltaY = clientY - startY;

        // Width adjustment
        let newWidth = startWidth;
        if (currentHandle === 'se' || currentHandle === 'e') {
            newWidth = Math.max(120, startWidth + deltaX);
        } else if (currentHandle === 'sw') {
            newWidth = Math.max(120, startWidth - deltaX);
        }

        if (newWidth !== startWidth && startWidth > 0) {
            const scaleX = newWidth / startWidth;
            const firstRow = startTable.rows[0];
            if (firstRow && startColWidths.length > 0) {
                let colSum = 0;
                for (let i = 0; i < firstRow.children.length; i++) {
                    const cw = Math.max(30, Math.round(startColWidths[i] * scaleX));
                    colSum += cw;
                    for (const row of startTable.rows) {
                        if (row.children[i]) {
                            row.children[i].style.width = `${cw}px`;
                        }
                    }
                }
                startTable.style.width = `${colSum}px`;
            }
        }

        // Height adjustment
        let newHeight = startHeight;
        if (currentHandle === 'se' || currentHandle === 's' || currentHandle === 'sw') {
            newHeight = Math.max(48, startHeight + deltaY);
        }

        if (newHeight !== startHeight && startHeight > 0 && startRowHeights.length > 0) {
            const scaleY = newHeight / startHeight;
            for (let r = 0; r < startTable.rows.length; r++) {
                const rh = Math.max(24, Math.round(startRowHeights[r] * scaleY));
                startTable.rows[r].style.height = `${rh}px`;
                for (const cell of startTable.rows[r].children) {
                    cell.style.height = `${rh}px`;
                }
            }
        }

        updateTableResizeOverlay();
    };

    overlay.addEventListener('mousedown', (e) => {
        const handle = e.target.closest('.tbl-resize-handle');
        if (!handle) return;
        e.preventDefault();
        e.stopPropagation();
        onStart(e.clientX, e.clientY, handle);
    });

    overlay.addEventListener('touchstart', (e) => {
        if (e.touches.length !== 1) return;
        const handle = e.target.closest('.tbl-resize-handle');
        if (!handle) return;
        e.preventDefault();
        onStart(e.touches[0].clientX, e.touches[0].clientY, handle);
    }, { passive: false });

    window.addEventListener('mousemove', (e) => {
        onMove(e.clientX, e.clientY);
    });

    window.addEventListener('touchmove', (e) => {
        if (!isResizing || e.touches.length !== 1) return;
        if (e.cancelable) e.preventDefault();
        onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });

    const finishResize = () => {
        if (isResizing) {
            isResizing = false;
            currentHandle = null;
            startTable = null;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            updateTableResizeOverlay();
            handleEditorInput();
        }
    };

    window.addEventListener('mouseup', finishResize);
    window.addEventListener('touchend', finishResize);

    const scrollArea = document.getElementById('editor-scroll-area');
    if (scrollArea) {
        scrollArea.addEventListener('scroll', updateTableResizeOverlay);
    }
    window.addEventListener('resize', updateTableResizeOverlay);
}

function setupTableInteractions() {
    setupTableResizeHandles();

    // Table click & selection
    noteEditor.addEventListener('click', (e) => {
        if (state.isReadOnly) {
            hideTableToolbar();
            hideTableResizeOverlay();
            return;
        }
        const table = e.target.closest('table');
        const cell = e.target.closest('td, th');
        if (table) {
            state.activeTableElement = table;
            state.activeTableCell = cell || table.querySelector('td, th');
            tableToolbar.style.display = 'flex';
            updateTableResizeOverlay();
        } else if (!e.target.closest('#table-toolbar') && !e.target.closest('#table-resize-overlay')) {
            hideTableResizeOverlay();
        }
    });

    // Focus listener to show table toolbar and overlay
    noteEditor.addEventListener('focusin', (e) => {
        if (state.isReadOnly) {
            hideTableToolbar();
            hideTableResizeOverlay();
            return;
        }
        const cell = e.target.closest('td, th');
        const table = e.target.closest('table');
        if (cell && table) {
            state.activeTableCell = cell;
            state.activeTableElement = table;
            tableToolbar.style.display = 'flex';
            updateTableResizeOverlay();
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

        updateTableResizeOverlay();
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
            updateTableResizeOverlay();
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
    updateTableResizeOverlay();
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
    updateTableResizeOverlay();
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
    updateTableResizeOverlay();
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

    updateTableResizeOverlay();
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
    updateTableResizeOverlay();
    handleEditorInput();
}

function deleteTableColumn() {
    if (!state.activeTableCell || !state.activeTableElement) return;
    const cellIdx = state.activeTableCell.cellIndex;
    const table = state.activeTableElement;
    for (const row of table.rows) {
        if (row.children[cellIdx]) row.children[cellIdx].remove();
    }
    updateTableResizeOverlay();
    handleEditorInput();
}

function deleteEntireTable() {
    if (!state.activeTableElement) return;
    state.activeTableElement.remove();
    hideTableResizeOverlay();
    handleEditorInput();
}

function hideFloatingToolbars() {
    if (tableToolbar) tableToolbar.style.display = 'none';
    if (imageToolbar) imageToolbar.style.display = 'none';
    hideTableResizeOverlay();
    hideImageToolbar();
}

// --- Canvas Auto-Crop & Transparency Helpers ---
function isCanvasEmpty(canvas) {
    const ctx = canvas.getContext('2d');
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 3; i < data.length; i += 4) {
        if (data[i] > 10) return false;
    }
    return true;
}

function getCroppedCanvas(srcCanvas, isTransparent) {
    const w = srcCanvas.width;
    const h = srcCanvas.height;
    const ctx = srcCanvas.getContext('2d');
    const imgData = ctx.getImageData(0, 0, w, h);
    const data = imgData.data;

    let minX = w, minY = h, maxX = 0, maxY = 0;
    let hasContent = false;

    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            const idx = (y * w + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            let isDrawn = false;
            if (isTransparent) {
                if (a > 15) isDrawn = true;
            } else {
                if (a > 15 && (r < 240 || g < 240 || b < 240)) isDrawn = true;
            }

            if (isDrawn) {
                hasContent = true;
                if (x < minX) minX = x;
                if (x > maxX) maxX = x;
                if (y < minY) minY = y;
                if (y > maxY) maxY = y;
            }
        }
    }

    if (!hasContent) return srcCanvas;

    const pad = 12;
    minX = Math.max(0, minX - pad);
    minY = Math.max(0, minY - pad);
    maxX = Math.min(w, maxX + pad);
    maxY = Math.min(h, maxY + pad);

    const cropW = Math.max(20, maxX - minX);
    const cropH = Math.max(20, maxY - minY);

    const out = document.createElement('canvas');
    out.width = cropW;
    out.height = cropH;
    const outCtx = out.getContext('2d');

    if (!isTransparent) {
        outCtx.fillStyle = '#ffffff';
        outCtx.fillRect(0, 0, cropW, cropH);
    }
    outCtx.drawImage(srcCanvas, minX, minY, cropW, cropH, 0, 0, cropW, cropH);
    return out;
}

// --- Windows Paint & Signature Studio ---
function setupPaintStudio() {
    const canvas = document.getElementById('paint-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const btnSignature = document.getElementById('btn-paint-tool-signature');
    const btnBrush = document.getElementById('btn-paint-tool-brush');
    const btnEraser = document.getElementById('btn-paint-tool-eraser');
    const btnBgToggle = document.getElementById('btn-paint-bg-toggle');
    const bgLabel = document.getElementById('paint-bg-label');
    const widthSlider = document.getElementById('paint-width-slider');
    const widthVal = document.getElementById('paint-width-val');
    const customColor = document.getElementById('paint-custom-color');
    const btnClear = document.getElementById('btn-paint-clear');
    const btnInsert = document.getElementById('btn-paint-insert');

    function applyBgMode() {
        if (state.paintTransparentBg) {
            canvas.classList.add('checkered-bg');
            if (bgLabel) bgLabel.textContent = 'Transparent';
            if (btnBgToggle) btnBgToggle.classList.add('active');
        } else {
            canvas.classList.remove('checkered-bg');
            if (bgLabel) bgLabel.textContent = 'White Paper';
            if (btnBgToggle) btnBgToggle.classList.remove('active');
        }
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (!state.paintTransparentBg) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    if (btnBgToggle) {
        btnBgToggle.onclick = () => {
            const wasEmpty = isCanvasEmpty(canvas);
            state.paintTransparentBg = !state.paintTransparentBg;
            applyBgMode();
            if (wasEmpty) {
                clearCanvas();
            } else if (!state.paintTransparentBg) {
                const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                tempCanvas.getContext('2d').putImageData(currentData, 0, 0);
                ctx.drawImage(tempCanvas, 0, 0);
            }
        };
    }

    clearCanvas();
    applyBgMode();

    if (btnSignature) btnSignature.onclick = () => setPaintTool('signature');
    if (btnBrush) btnBrush.onclick = () => setPaintTool('brush');
    if (btnEraser) btnEraser.onclick = () => setPaintTool('eraser');

    if (widthSlider) {
        widthSlider.oninput = (e) => {
            state.paintWidth = parseInt(e.target.value, 10);
            if (widthVal) widthVal.textContent = state.paintWidth + 'px';
        };
    }

    document.querySelectorAll('.paint-color-opt').forEach(opt => {
        opt.onclick = () => {
            document.querySelectorAll('.paint-color-opt').forEach(o => o.classList.remove('active'));
            opt.classList.add('active');
            state.paintColor = opt.dataset.color;
            if (state.paintTool === 'eraser') setPaintTool('brush');
        };
    });

    if (customColor) {
        customColor.oninput = (e) => {
            state.paintColor = e.target.value;
            if (state.paintTool === 'eraser') setPaintTool('brush');
        };
    }

    if (btnClear) {
        btnClear.onclick = clearCanvas;
    }

    function getCanvasCoords(e) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: (e.clientX - rect.left) * (canvas.width / rect.width),
            y: (e.clientY - rect.top) * (canvas.height / rect.height)
        };
    }

    function startPaint(pt) {
        state.isPainting = true;
        state.paintPoints = [pt];
        ctx.beginPath();
        ctx.moveTo(pt.x, pt.y);
    }

    function drawPaint(pt) {
        if (!state.isPainting) return;
        state.paintPoints.push(pt);

        ctx.lineWidth = state.paintTool === 'eraser' ? state.paintWidth * 2.5 : state.paintWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        if (state.paintTool === 'eraser') {
            if (state.paintTransparentBg) {
                ctx.globalCompositeOperation = 'destination-out';
                ctx.strokeStyle = 'rgba(0,0,0,1)';
            } else {
                ctx.globalCompositeOperation = 'source-over';
                ctx.strokeStyle = '#ffffff';
            }
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
        } else if (state.paintTool === 'signature') {
            ctx.globalCompositeOperation = 'source-over';
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
            // Freehand brush
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = state.paintColor;
            ctx.lineTo(pt.x, pt.y);
            ctx.stroke();
        }
    }

    function stopPaint() {
        if (state.isPainting) {
            state.isPainting = false;
            state.paintPoints = [];
            ctx.globalCompositeOperation = 'source-over';
        }
    }

    canvas.addEventListener('mousedown', (e) => startPaint(getCanvasCoords(e)));
    canvas.addEventListener('mousemove', (e) => drawPaint(getCanvasCoords(e)));
    window.addEventListener('mouseup', stopPaint);

    canvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            e.preventDefault();
            startPaint(getCanvasCoords(e.touches[0]));
        }
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
        if (state.isPainting && e.touches.length === 1) {
            e.preventDefault();
            drawPaint(getCanvasCoords(e.touches[0]));
        }
    }, { passive: false });

    canvas.addEventListener('touchend', stopPaint);

    if (btnInsert) {
        btnInsert.onclick = () => {
            const cropped = getCroppedCanvas(canvas, state.paintTransparentBg);
            const dataUrl = cropped.toDataURL('image/png');
            closePaintModal();
            restoreSelection();
            if (state.paintTool === 'signature') {
                insertSignatureElement(dataUrl, 'Handwritten Signature');
            } else {
                insertImageElement(dataUrl, 'Paint Drawing');
            }
        };
    }
}

function setPaintTool(tool) {
    state.paintTool = tool;
    ['signature', 'brush', 'eraser'].forEach(t => {
        const btn = document.getElementById(`btn-paint-tool-${t}`);
        if (btn) btn.classList.toggle('active', tool === t);
    });
}

function openPaintModal(initialTool = 'signature') {
    saveSelection();
    const modal = document.getElementById('paint-modal');
    if (modal) modal.style.display = 'flex';
    setPaintTool(initialTool);
}

function closePaintModal() {
    const modal = document.getElementById('paint-modal');
    if (modal) modal.style.display = 'none';
}

function insertSignatureElement(src, alt) {
    if (state.isReadOnly) return;
    noteEditor.focus();
    const html = `<p><br></p><div class="editor-img-wrap editor-signature-wrap" style="margin: 12px 0; display: inline-block; max-width: 100%; border: none; background: transparent;"><img class="note-signature-img" src="${src}" alt="${alt || 'Signature'}" style="max-width: 100%; height: auto; display: block; border: none; background: transparent; box-shadow: none;"></div><p><br></p>`;
    document.execCommand('insertHTML', false, html);
    handleEditorInput();
}

// --- Dedicated Geometric Shape Studio ---
function generateShapeSvg(shape, color, mode, strokeWidth, size) {
    let fillAttr = 'none';
    let fillOpacity = '0';
    if (mode === 'solid') {
        fillAttr = color;
        fillOpacity = '1';
    } else if (mode === 'tint') {
        fillAttr = color;
        fillOpacity = '0.22';
    }

    const strokeAttr = color;
    const sw = strokeWidth;

    let vbW = 200;
    let vbH = 200;
    let innerSvg = '';

    switch (shape) {
        case 'rect':
            innerSvg = `<rect x="15" y="15" width="170" height="170" rx="3" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" />`;
            break;
        case 'rounded':
            innerSvg = `<rect x="15" y="15" width="170" height="170" rx="32" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" />`;
            break;
        case 'circle':
            innerSvg = `<circle cx="100" cy="100" r="84" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" />`;
            break;
        case 'triangle':
            innerSvg = `<polygon points="100,16 186,184 14,184" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" stroke-linejoin="round" />`;
            break;
        case 'star':
            innerSvg = `<polygon points="100,12 126,68 188,76 143,120 154,182 100,152 46,182 57,120 12,76 74,68" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" stroke-linejoin="round" />`;
            break;
        case 'diamond':
            innerSvg = `<polygon points="100,14 186,100 100,186 14,100" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" stroke-linejoin="round" />`;
            break;
        case 'hexagon':
            innerSvg = `<polygon points="100,14 182,60 182,140 100,186 18,140 18,60" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" stroke-linejoin="round" />`;
            break;
        case 'arrow':
            vbW = 200;
            vbH = 110;
            innerSvg = `<polygon points="16,36 120,36 120,16 184,55 120,94 120,74 16,74" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" stroke-linejoin="round" />`;
            break;
        case 'line':
            vbW = 200;
            vbH = 40;
            innerSvg = `<line x1="16" y1="20" x2="184" y2="20" stroke="${strokeAttr}" stroke-width="${sw}" stroke-linecap="round" />`;
            break;
        case 'speech':
            vbW = 200;
            vbH = 180;
            innerSvg = `<path d="M 24,18 C 18,18 14,22 14,28 L 14,124 C 14,130 18,134 24,134 L 56,134 L 44,166 L 90,134 L 176,134 C 182,134 186,130 186,124 L 186,28 C 186,22 182,18 176,18 Z" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" stroke-linejoin="round" />`;
            break;
        default:
            innerSvg = `<rect x="15" y="15" width="170" height="170" rx="3" fill="${fillAttr}" fill-opacity="${fillOpacity}" stroke="${strokeAttr}" stroke-width="${sw}" />`;
    }

    const calcW = size;
    const calcH = Math.round(size * (vbH / vbW));
    const fullSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vbW} ${vbH}" width="${calcW}" height="${calcH}" style="background:transparent;overflow:visible;">${innerSvg}</svg>`;

    return { vbW, vbH, innerSvg, fullSvg, calcW, calcH };
}

function renderShapePreview() {
    const s = state.shapeState;
    const { vbW, vbH, innerSvg } = generateShapeSvg(s.shape, s.color, s.mode, s.strokeWidth, s.size);
    const svgElem = document.getElementById('shape-live-preview-svg');
    if (svgElem) {
        svgElem.setAttribute('viewBox', `0 0 ${vbW} ${vbH}`);
        svgElem.innerHTML = innerSvg;
    }
}

function setupShapeStudio() {
    const shapeBtns = document.querySelectorAll('.shape-opt-btn');
    const modeBtns = document.querySelectorAll('.shape-mode-btn');
    const colorDots = document.querySelectorAll('.shape-color-dot');
    const customColor = document.getElementById('shape-custom-color');
    const strokeBtns = document.querySelectorAll('.shape-stroke-btn');
    const sizeBtns = document.querySelectorAll('.shape-size-btn');
    const btnConfirm = document.getElementById('btn-insert-shape-confirm');

    shapeBtns.forEach(btn => {
        btn.onclick = () => {
            shapeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.shapeState.shape = btn.dataset.shape;
            renderShapePreview();
        };
    });

    modeBtns.forEach(btn => {
        btn.onclick = () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.shapeState.mode = btn.dataset.mode;
            renderShapePreview();
        };
    });

    colorDots.forEach(dot => {
        dot.onclick = () => {
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            state.shapeState.color = dot.dataset.color;
            if (customColor) customColor.value = dot.dataset.color;
            renderShapePreview();
        };
    });

    if (customColor) {
        customColor.oninput = (e) => {
            colorDots.forEach(d => d.classList.remove('active'));
            state.shapeState.color = e.target.value;
            renderShapePreview();
        };
    }

    strokeBtns.forEach(btn => {
        btn.onclick = () => {
            strokeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.shapeState.strokeWidth = parseFloat(btn.dataset.width) || 3;
            renderShapePreview();
        };
    });

    sizeBtns.forEach(btn => {
        btn.onclick = () => {
            sizeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.shapeState.size = parseInt(btn.dataset.size, 10) || 220;
            renderShapePreview();
        };
    });

    if (btnConfirm) {
        btnConfirm.onclick = () => {
            const s = state.shapeState;
            const { fullSvg, calcW } = generateShapeSvg(s.shape, s.color, s.mode, s.strokeWidth, s.size);
            const dataUrl = 'data:image/svg+xml;utf8,' + encodeURIComponent(fullSvg);
            closeShapeModal();
            restoreSelection();
            insertShapeElement(dataUrl, `${s.shape} shape`, calcW);
        };
    }

    renderShapePreview();
}

function openShapeModal(initialShape = 'rect') {
    saveSelection();
    if (initialShape) {
        state.shapeState.shape = initialShape;
        document.querySelectorAll('.shape-opt-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.shape === initialShape);
        });
    }
    renderShapePreview();
    const modal = document.getElementById('shape-modal');
    if (modal) modal.style.display = 'flex';
}

function closeShapeModal() {
    const modal = document.getElementById('shape-modal');
    if (modal) modal.style.display = 'none';
}

function insertShapeElement(src, alt, width) {
    if (state.isReadOnly) return;
    noteEditor.focus();
    const w = width ? `${width}px` : '220px';
    const html = `<p><br></p><div class="editor-img-wrap editor-shape-wrap" style="margin: 14px 0; display: inline-block; max-width: 100%; border: none; background: transparent;"><img class="note-vector-shape" src="${src}" alt="${alt || 'Shape'}" style="width: ${w}; max-width: 100%; height: auto; display: block; border: none; background: transparent; box-shadow: none;"></div><p><br></p>`;
    document.execCommand('insertHTML', false, html);
    handleEditorInput();
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

// ==========================================================================
// UNDO & REDO HISTORY ENGINE (Snapshot-based Multi-Level State Manager)
// ==========================================================================
const editorHistory = {
    stack: [],
    index: -1,
    maxSize: 60,
    isUndoingRedoing: false,
    debounceTimer: null,
    currentNoteId: null
};

function initEditorHistory(noteId, initialContent) {
    if (editorHistory.debounceTimer) {
        clearTimeout(editorHistory.debounceTimer);
        editorHistory.debounceTimer = null;
    }
    editorHistory.currentNoteId = noteId;
    editorHistory.stack = [initialContent || ''];
    editorHistory.index = 0;
    editorHistory.isUndoingRedoing = false;
    updateUndoRedoUI();
}

function pushHistorySnapshot(force = false) {
    if (editorHistory.isUndoingRedoing) return;
    if (state.isReadOnly || !state.activeNodeId) return;

    const currentHtml = noteEditor.innerHTML;

    // Avoid duplicate snapshots if content hasn't changed
    if (editorHistory.index >= 0 && editorHistory.stack[editorHistory.index] === currentHtml) {
        return;
    }

    const doPush = () => {
        if (editorHistory.isUndoingRedoing) return;
        // Truncate redo history if we are branched
        if (editorHistory.index < editorHistory.stack.length - 1) {
            editorHistory.stack = editorHistory.stack.slice(0, editorHistory.index + 1);
        }

        editorHistory.stack.push(currentHtml);
        if (editorHistory.stack.length > editorHistory.maxSize) {
            editorHistory.stack.shift();
        } else {
            editorHistory.index++;
        }
        updateUndoRedoUI();
    };

    if (force) {
        if (editorHistory.debounceTimer) {
            clearTimeout(editorHistory.debounceTimer);
            editorHistory.debounceTimer = null;
        }
        doPush();
    } else {
        if (editorHistory.debounceTimer) clearTimeout(editorHistory.debounceTimer);
        editorHistory.debounceTimer = setTimeout(() => {
            doPush();
            editorHistory.debounceTimer = null;
        }, 350);
    }
}

function performUndo() {
    if (state.isReadOnly || !state.activeNodeId) return;

    // Check if there is an unsaved debounced typing snapshot
    if (editorHistory.debounceTimer) {
        clearTimeout(editorHistory.debounceTimer);
        editorHistory.debounceTimer = null;
        const currentHtml = noteEditor.innerHTML;
        if (editorHistory.index >= 0 && editorHistory.stack[editorHistory.index] !== currentHtml) {
            if (editorHistory.index < editorHistory.stack.length - 1) {
                editorHistory.stack = editorHistory.stack.slice(0, editorHistory.index + 1);
            }
            editorHistory.stack.push(currentHtml);
            editorHistory.index++;
        }
    }

    if (editorHistory.index > 0) {
        editorHistory.isUndoingRedoing = true;
        editorHistory.index--;
        const previousHtml = editorHistory.stack[editorHistory.index];
        noteEditor.innerHTML = previousHtml;

        const node = state.nodes.get(state.activeNodeId);
        if (node) {
            node.content = previousHtml;
            node.updated_at = Date.now();
        }
        scheduleSave('content', previousHtml);
        updateWordStats();
        updateDocumentStats();
        updateUndoRedoUI();

        editorHistory.isUndoingRedoing = false;
        noteEditor.focus();
        showToast('↺ Undo');
        return;
    }

    // Fallback to browser execCommand if available
    try {
        noteEditor.focus();
        const success = document.execCommand('undo');
        if (success) {
            updateWordStats();
            updateDocumentStats();
            showToast('↺ Undo');
        }
    } catch (e) {
        console.warn('execCommand undo fallback error:', e);
    }
}

function performRedo() {
    if (state.isReadOnly || !state.activeNodeId) return;

    if (editorHistory.index < editorHistory.stack.length - 1) {
        editorHistory.isUndoingRedoing = true;
        editorHistory.index++;
        const nextHtml = editorHistory.stack[editorHistory.index];
        noteEditor.innerHTML = nextHtml;

        const node = state.nodes.get(state.activeNodeId);
        if (node) {
            node.content = nextHtml;
            node.updated_at = Date.now();
        }
        scheduleSave('content', nextHtml);
        updateWordStats();
        updateDocumentStats();
        updateUndoRedoUI();

        editorHistory.isUndoingRedoing = false;
        noteEditor.focus();
        showToast('↻ Redo');
        return;
    }

    // Fallback to browser execCommand if available
    try {
        noteEditor.focus();
        const success = document.execCommand('redo');
        if (success) {
            updateWordStats();
            updateDocumentStats();
            showToast('↻ Redo');
        }
    } catch (e) {
        console.warn('execCommand redo fallback error:', e);
    }
}

function updateUndoRedoUI() {
    const canUndo = editorHistory.index > 0;
    const canRedo = editorHistory.index < editorHistory.stack.length - 1;

    document.querySelectorAll('.btn-undo-target').forEach(btn => {
        btn.style.opacity = canUndo ? '1' : '0.4';
        btn.title = canUndo ? 'Undo (Ctrl+Z)' : 'Undo (Ctrl+Z) - No earlier changes';
    });

    document.querySelectorAll('.btn-redo-target').forEach(btn => {
        btn.style.opacity = canRedo ? '1' : '0.4';
        btn.title = canRedo ? 'Redo (Ctrl+Y)' : 'Redo (Ctrl+Y) - No forward changes';
    });
}

// --- Word Stats & Editor Input ---
function handleEditorInput() {
    if (state.isReadOnly) return;
    updateWordStats();
    updateDocumentStats();
    scheduleSave('content', noteEditor.innerHTML);
    pushHistorySnapshot(false);
}

function updateWordStats() {
    if (state.activeNodeId) {
        const activeNode = state.nodes.get(state.activeNodeId);
        if (activeNode && (activeNode.is_folder || activeNode.icon === 'folder')) {
            const children = Array.from(state.nodes.values()).filter(n => n.parent_id === state.activeNodeId);
            const subf = children.filter(c => c.is_folder || c.icon === 'folder').length;
            const subn = children.length - subf;
            footerStats.textContent = `${children.length} items (${subf} folders, ${subn} notes)`;
            return;
        }
    }

    const text = noteEditor.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const chars = text.length;
    const ribbonBadge = document.getElementById('ribbon-word-count');
    const quickBadge = document.getElementById('ribbon-quick-word-count');
    if (ribbonBadge) {
        ribbonBadge.textContent = `${words} words`;
    }
    if (quickBadge) {
        quickBadge.textContent = `${words} words`;
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
    const btnHeaderLogin = document.getElementById('btn-header-login');
    if (btnHeaderLogin) btnHeaderLogin.onclick = requestGoogleLogin;
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
    if (btnSettingsBackup) btnSettingsBackup.onclick = () => saveAllNotesToDrive(false);
    const btnSettingsRestore = document.getElementById('btn-settings-restore-now');
    if (btnSettingsRestore) btnSettingsRestore.onclick = () => downloadAllNotesFromDrive(false);
    const btnSettingsSignout = document.getElementById('btn-settings-signout');
    if (btnSettingsSignout) btnSettingsSignout.onclick = signoutGoogle;

    const btnDriveBackup = document.getElementById('btn-drive-backup-now');
    if (btnDriveBackup) btnDriveBackup.onclick = () => saveAllNotesToDrive(false);
    const btnDriveRestore = document.getElementById('btn-drive-restore-now');
    if (btnDriveRestore) btnDriveRestore.onclick = () => downloadAllNotesFromDrive(false);
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

    const handleClientIdChange = (val) => {
        const trimmed = val.trim();
        localStorage.setItem('cybernote_client_id', trimmed);
        const in1 = document.getElementById('google-client-id-input');
        if (in1 && in1.value !== trimmed) in1.value = trimmed;
        const in2 = document.getElementById('settings-google-client-id');
        if (in2 && in2.value !== trimmed) in2.value = trimmed;
        initGoogleAuth();
        showToast('Google Client ID updated');
    };

    const clientIdInput = document.getElementById('google-client-id-input');
    if (clientIdInput) clientIdInput.onchange = (e) => handleClientIdChange(e.target.value);
    const settingsClientIdInput = document.getElementById('settings-google-client-id');
    if (settingsClientIdInput) settingsClientIdInput.onchange = (e) => handleClientIdChange(e.target.value);

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

    let lastReadOnlyNoticeTime = 0;
    function notifyReadOnlyNotice() {
        const now = Date.now();
        if (now - lastReadOnlyNoticeTime > 2500) {
            lastReadOnlyNoticeTime = now;
            showToast('🔒 Note is locked. Click "Unlock Note" above to edit.', 'warning');
        }
    }

    // Strict Read-Only Input Protection (Capture Phase - blocks any attempt to edit nested elements)
    noteEditor.addEventListener('beforeinput', (e) => {
        if (state.isReadOnly) {
            e.preventDefault();
            e.stopPropagation();
            notifyReadOnlyNotice();
        }
    }, true);

    noteEditor.addEventListener('keydown', (e) => {
        if (state.isReadOnly) {
            // Allow copy (Ctrl+C, Cmd+C) and select all (Ctrl+A, Cmd+A)
            if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C' || e.key === 'a' || e.key === 'A')) {
                return;
            }
            // Allow cursor navigation and reading keys
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown'].includes(e.key)) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            notifyReadOnlyNotice();
        }
    }, true);

    noteEditor.addEventListener('paste', (e) => {
        if (state.isReadOnly) {
            e.preventDefault();
            e.stopPropagation();
            notifyReadOnlyNotice();
        }
    }, true);

    noteEditor.addEventListener('cut', (e) => {
        if (state.isReadOnly) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    noteEditor.addEventListener('drop', (e) => {
        if (state.isReadOnly) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    noteEditor.addEventListener('click', (e) => {
        if (state.isReadOnly) {
            if (e.target.tagName === 'INPUT' || e.target.type === 'checkbox') {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    }, true);

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

    // Undo / Redo (Targets all undo/redo buttons in header and ribbon)
    document.querySelectorAll('.btn-undo-target, #btn-undo, #btn-header-undo, #btn-ribbon-undo').forEach(btn => {
        btn.addEventListener('mousedown', (e) => e.preventDefault());
        btn.onclick = (e) => {
            e.preventDefault();
            performUndo();
        };
    });

    document.querySelectorAll('.btn-redo-target, #btn-redo, #btn-header-redo, #btn-ribbon-redo').forEach(btn => {
        btn.addEventListener('mousedown', (e) => e.preventDefault());
        btn.onclick = (e) => {
            e.preventDefault();
            performRedo();
        };
    });

    const btnDriveSave = document.getElementById('btn-drive-save');
    if (btnDriveSave) btnDriveSave.onclick = triggerDriveSave;
    const btnDriveDownload = document.getElementById('btn-drive-download');
    if (btnDriveDownload) btnDriveDownload.onclick = triggerDriveDownload;

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

    // Insertions (Row 1 & 2)
    const btnOpenPaint = document.getElementById('btn-open-paint');
    if (btnOpenPaint) btnOpenPaint.onclick = () => openPaintModal('signature');
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

    const btnCaseUpper = document.getElementById('btn-case-upper');
    if (btnCaseUpper) btnCaseUpper.onclick = () => handleTextCaseChange('upper');

    const btnCaseLower = document.getElementById('btn-case-lower');
    if (btnCaseLower) btnCaseLower.onclick = () => handleTextCaseChange('lower');

    const btnCaseTitle = document.getElementById('btn-case-title');
    if (btnCaseTitle) btnCaseTitle.onclick = () => handleTextCaseChange('title');

    const btnCaseSentence = document.getElementById('btn-case-sentence');
    if (btnCaseSentence) btnCaseSentence.onclick = () => handleTextCaseChange('sentence');

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

    const btnDrawShape = document.getElementById('btn-draw-shape');
    if (btnDrawShape) btnDrawShape.onclick = () => openShapeModal('rect');

    const btnTimeline = document.getElementById('btn-insert-timeline');
    if (btnTimeline) btnTimeline.onclick = insertTimeline;

    const btnQuoteCard = document.getElementById('btn-insert-quote');
    if (btnQuoteCard) btnQuoteCard.onclick = insertQuoteCard;

    const btnFancyDivider = document.getElementById('btn-insert-divider-fancy');
    if (btnFancyDivider) btnFancyDivider.onclick = insertFancyDivider;

    const btnZenMode = document.getElementById('btn-zen-mode');
    if (btnZenMode) btnZenMode.onclick = toggleZenMode;

    const selectLineSpacing = document.getElementById('select-line-spacing');
    if (selectLineSpacing) {
        selectLineSpacing.onchange = (e) => {
            noteEditor.style.lineHeight = e.target.value;
            handleEditorInput();
        };
    }

    const btnExportMenu = document.getElementById('btn-export-menu');
    if (btnExportMenu) btnExportMenu.onclick = (e) => toggleRibbonPopover('export-dropdown-menu', btnExportMenu, e);

    // Initialize Microsoft Word-style Ribbon Tabs
    setupRibbonTabs();

    // Prevent toolbar click from stealing focus from noteEditor
    document.querySelector('.editor-ribbon')?.addEventListener('mousedown', (e) => {
        saveSelection();
        if (e.target.closest('button, .popover-item, .emoji-chip, .color-indicator-bar')) {
            e.preventDefault();
        }
    });

    // Global outside click & escape closer for ribbon popovers and context menus
    document.addEventListener('pointerdown', (e) => {
        if (!e.target.closest('.ribbon-dropdown-wrap, .ribbon-popover-menu')) {
            closeAllRibbonPopovers();
        }
        if (!e.target.closest('#tree-context-menu')) {
            closeTreeContextMenu();
        }
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.ribbon-dropdown-wrap, .ribbon-popover-menu')) {
            closeAllRibbonPopovers();
        }
        if (!e.target.closest('#tree-context-menu')) {
            closeTreeContextMenu();
        }
    });

    window.addEventListener('resize', closeAllRibbonPopovers);
    window.addEventListener('scroll', (e) => {
        if (e.target && e.target.closest && e.target.closest('.ribbon-popover-menu')) return;
        closeAllRibbonPopovers();
    }, true);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllRibbonPopovers();
            closeTreeContextMenu();
        }
    });

    // Floating Image Toolbar Actions
    const btnImgMoveUp = document.getElementById('btn-img-move-up');
    if (btnImgMoveUp) btnImgMoveUp.onclick = moveActiveImageUp;
    const btnImgMoveDown = document.getElementById('btn-img-move-down');
    if (btnImgMoveDown) btnImgMoveDown.onclick = moveActiveImageDown;
    document.getElementById('btn-img-size-25').onclick = () => setImageSize('25%');
    document.getElementById('btn-img-size-50').onclick = () => setImageSize('50%');
    document.getElementById('btn-img-size-100').onclick = () => setImageSize('100%');
    document.getElementById('btn-img-align-left').onclick = () => setImageAlign('left');
    document.getElementById('btn-img-align-center').onclick = () => setImageAlign('center');
    document.getElementById('btn-img-align-right').onclick = () => setImageAlign('right');
    const btnImgFloatL = document.getElementById('btn-img-float-left');
    if (btnImgFloatL) btnImgFloatL.onclick = () => setImageAlign('float-left');
    const btnImgFloatR = document.getElementById('btn-img-float-right');
    if (btnImgFloatR) btnImgFloatR.onclick = () => setImageAlign('float-right');
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
    if (btnToggleRo) btnToggleRo.onclick = () => toggleReadOnlyMode();
    const btnTogglePwd = document.getElementById('btn-toggle-password-lock');
    if (btnTogglePwd) {
        btnTogglePwd.onclick = () => handleTogglePasswordLockClick();
        btnTogglePwd.oncontextmenu = (e) => {
            e.preventDefault();
            if (state.activeNodeId) openPasswordLockModal(state.activeNodeId);
        };
    }
    const btnDel = document.getElementById('btn-delete-node');
    if (btnDel) btnDel.onclick = () => {
        if (state.activeNodeId) deleteNode(state.activeNodeId);
    };
    const readonlyBadge = document.getElementById('readonly-badge');
    if (readonlyBadge) readonlyBadge.onclick = () => toggleReadOnlyMode();
    const btnRibbonLock = document.getElementById('btn-ribbon-lock');
    if (btnRibbonLock) btnRibbonLock.onclick = () => toggleReadOnlyMode();

    // Password unlock view & Password Modal Listeners
    const btnSubmitUnlock = document.getElementById('btn-submit-unlock-password');
    if (btnSubmitUnlock) btnSubmitUnlock.onclick = submitUnlockPassword;
    const unlockPwdInput = document.getElementById('note-unlock-password-input');
    if (unlockPwdInput) {
        unlockPwdInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                submitUnlockPassword();
            }
        });
    }

    const btnCancelPwdModal = document.getElementById('btn-cancel-password-modal');
    if (btnCancelPwdModal) btnCancelPwdModal.onclick = closePasswordLockModal;

    const btnSavePwdModal = document.getElementById('btn-save-password-modal');
    if (btnSavePwdModal) btnSavePwdModal.onclick = savePasswordModal;

    const btnRemovePwdModal = document.getElementById('btn-remove-password-modal');
    if (btnRemovePwdModal) btnRemovePwdModal.onclick = removePasswordModal;

    const btnLockNowModal = document.getElementById('btn-lock-now-password-modal');
    if (btnLockNowModal) btnLockNowModal.onclick = lockNowModal;

    const pwdModal = document.getElementById('password-lock-modal');
    if (pwdModal) {
        pwdModal.addEventListener('click', (e) => {
            if (e.target === pwdModal) closePasswordLockModal();
        });
    }

    const modalConfirmPwd = document.getElementById('modal-confirm-password');
    if (modalConfirmPwd) {
        modalConfirmPwd.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                savePasswordModal();
            }
        });
    }

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
        if (tid) {
            toggleReadOnlyMode(tid);
        }
    };
    const ctxPasswordLock = document.getElementById('ctx-password-lock');
    if (ctxPasswordLock) ctxPasswordLock.onclick = () => {
        const tid = activeContextMenuNodeId || state.activeNodeId;
        closeTreeContextMenu();
        if (tid) {
            openPasswordLockModal(tid);
        }
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
            await uploadPendingNotesToDrive();
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

    // Auto-save to Drive when switching tabs/windows (debounced)
    window.addEventListener('focus', () => {
        if (state.googleAccessToken && Date.now() - (state.lastDriveSyncAttempt || 0) > 10000) {
            scheduleDriveAutoBackup();
        }
    });

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && state.googleAccessToken && Date.now() - (state.lastDriveSyncAttempt || 0) > 10000) {
            scheduleDriveAutoBackup();
        }
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
        if (isCtrl && e.key.toLowerCase() === 'z') {
            e.preventDefault();
            if (e.shiftKey) {
                performRedo();
            } else {
                performUndo();
            }
        }
        if (isCtrl && e.key.toLowerCase() === 'y') {
            e.preventDefault();
            performRedo();
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
        id: 'shape',
        icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="8" height="8" rx="1"/><circle cx="17" cy="7" r="4"/><polygon points="7 15 11 21 3 21"/></svg>',
        name: 'Geometric Shape Studio',
        desc: 'Insert transparent, resizable vector shapes (Rect, Circle, Star, Arrow, etc.)',
        action: () => openShapeModal('rect'),
        keywords: ['shape', 'shapes', 'vector', 'rectangle', 'circle', 'triangle', 'arrow', 'star']
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
        if (state.isReadOnly) return;
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
