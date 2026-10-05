# 🛡️ CyberNote - Secure Hierarchical Cloud Notes System

> **The Security of CherryTree + The Speed of Google Keep's Micro-Sync + Google Drive Instant Auto-Restore & Full AES-256 Encryption**

CyberNote is a lightweight, cross-platform, ultra-secure hierarchical note-taking application designed for cybersecurity researchers, developers, and power users.

---

## ⚡ Why CyberNote?

| Feature | CherryTree | Google Keep | 🛡️ CyberNote |
| :--- | :---: | :---: | :---: |
| **Direct In-Place WYSIWYG Editing** | ⚠️ GTK RichText | ❌ Basic | ✅ **Yes (No split preview tab!)** |
| **Google Sign-In & Drive Auto-Restore** | ❌ None | ✅ Yes | ✅ **Yes (Auto-restores on Login!)** |
| **Full Security (AES-256-GCM E2EE)** | ⚠️ Basic zip pwd | ❌ Plaintext to Google | ✅ **Military-grade AES-256 Encryption** |
| **Paint Studio & Handwritten Signatures** | ❌ No | ❌ Basic draw | ✅ **Yes (Smooth Bezier Ink & Canvas)** |
| **Draw & Edit Tables In-Cell** | ⚠️ Plain dialog | ❌ No | ✅ **Yes (Interactive Floating Toolbar)** |
| **Hierarchical Tree (Subnodes & Colors)** | ✅ Yes | ❌ No | ✅ **Yes (Infinite Tree + Node Colors)** |
| **Code Boxes with 1-Click Copy** | ✅ Yes | ❌ No | ✅ **Yes (Copy Code Button)** |
| **Direct Screenshot Pasting** | ✅ Yes | ⚠️ Manual | ✅ **Direct `Ctrl+V` Paste from Clipboard** |
| **Free Hosting on GitHub Pages** | ❌ Desktop only | ❌ Proprietary | ✅ **100% Free on GitHub Pages** |
| **Mobile & Cross-Device Access** | ⚠️ Needs separate app | ✅ Yes | ✅ **Yes (PWA on Android / iOS / PC)** |

---

## ☁️ Google Sign-In & Google Drive Auto-Backup

### How It Works:
1. Open CyberNote in your browser: `http://localhost:3000` or on your **GitHub Pages** URL.
2. Click **"Sign in with Google"** in the top right.
3. Sign in to your Google Account.
4. **Instant Auto-Restore:** CyberNote automatically queries your Google Drive for `CyberNote_Backup.json` and immediately loads all your notes and tree structure!
5. **Continuous Auto-Backup:** As you type and edit notes, CyberNote automatically syncs updates to your Google Drive in the background (debounced, micro-payloads).

### 🛡️ Full Security & Privacy:
- **Sandbox Scope (`drive.file`):** CyberNote only requests access to files it creates. It has **zero access** to your other files, photos, or documents on Google Drive.
- **Client-Side AES-256-GCM Encryption (E2EE):**
  - In the ☁️ **Drive** settings modal, toggle **"Enable Client-Side AES-256-GCM Encryption"**.
  - Set a Master Passphrase.
  - Your notes are encrypted inside your browser using 256-bit AES-GCM (with PBKDF2 100,000 rounds) before being uploaded to Google Drive.
  - Even Google itself cannot read your notes!

---

## 🚀 Local Run (1-Click Run on Linux)

```bash
cd "/home/kali/Projects/auto cloud upload/tree-cloud-notes"
./start.sh
```

### 📱 Access from your Phone / Wi-Fi
When `start.sh` runs, it displays your local Wi-Fi IP address:
```
💻 This Computer: http://localhost:3000
📱 Phone / Wi-Fi: http://192.168.1.XX:3000
```
Open that URL on your phone's browser to access your notes from your mobile device!

---

## 🐙 How to Host on GitHub Pages (Free Cloud Hosting)

1. Create a new repository on [GitHub](https://github.com/new) named `cybernote`.
2. Push this project to GitHub:
   ```bash
   cd "/home/kali/Projects/auto cloud upload/tree-cloud-notes"
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/cybernote.git
   git push -u origin main
   ```
3. In your repo, go to **Settings** -> **Pages** -> under **Source**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will deploy CyberNote automatically!
5. Your web app is live at `https://<YOUR_GITHUB_USERNAME>.github.io/cybernote/`

---

## 📥 Import Your CherryTree Notes (.ctb or .ctd)

1. Click the **📥 Import** button in the top navigation bar.
2. Enter the path to your file (e.g. `/home/kali/Documents/cherry/all.ctb`).
3. Click **Start Import**. All nodes, hierarchy, and code boxes are imported seamlessly!

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + B` | Bold text |
| `Ctrl + I` | Italic text |
| `Ctrl + U` | Underline text |
| `Ctrl + Z` | Undo note edit |
| `Ctrl + Y` | Redo note edit |
| `Ctrl + F` | Find & Replace in current note |
| `Ctrl + K` | Global search across all notes & tags |
| `Ctrl + V` | Paste image / screenshot directly from clipboard |
| `Tab` | Indent 4 spaces |
| `Alt + Up` | Move selected node UP in hierarchy |
| `Alt + Down` | Move selected node DOWN in hierarchy |
