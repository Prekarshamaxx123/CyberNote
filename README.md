# 🌲 TreeKeep - Hierarchical Cloud Notes with Real-Time Delta Sync

> **The Power of CherryTree's Hierarchical Tree + The Speed of Google Keep's Micro-Sync + GitHub Pages Cloud Hosting**

TreeKeep is a lightweight, cross-platform hierarchical note-taking application designed to solve the heavy cloud-sync problem of traditional single-file note software.

---

## ⚡ Why TreeKeep?

| Feature | CherryTree | Google Keep | 🌲 TreeKeep |
| :--- | :---: | :---: | :---: |
| **Hierarchical Tree (Subnodes)** | ✅ Yes | ❌ No | ✅ **Yes (Infinite Tree Hierarchy)** |
| **Undo / Redo History** | ✅ Yes | ⚠️ Basic | ✅ **Yes (`Ctrl+Z`, `Ctrl+Y`)** |
| **CherryTree Rich Inserters** | ✅ Yes | ❌ No | ✅ **CodeBox, Tables, Images, Timestamps, Node Links** |
| **Screenshot Pasting** | ✅ Yes | ⚠️ Manual | ✅ **Direct `Ctrl+V` Paste from Clipboard** |
| **Find & Replace** | ✅ Yes | ❌ No | ✅ **In-note Search & Replace (`Ctrl+F`)** |
| **Google Keep Delta Micro-Sync** | ❌ Full file (5MB+) | ✅ Yes | ✅ **Yes (~200 Bytes per edit!)** |
| **Host on GitHub Pages** | ❌ Desktop only | ❌ Google proprietary | ✅ **100% Free Hosting on GitHub Pages** |
| **Cloud Sync to Private GitHub Repo** | ❌ No | ❌ Google only | ✅ **Yes (via GitHub REST API)** |
| **Mobile & Cross-Device Access** | ⚠️ Needs separate app | ✅ Yes | ✅ **Yes (PWA on Phone/PC/Mac)** |

---

## 🐙 How to Host on GitHub Pages (Free Cloud Hosting)

You can host TreeKeep for free on GitHub Pages and access your notes anywhere in the world from any device (phone, laptop, tablet):

### Step 1: Create a New Repository on GitHub
1. Go to [GitHub New Repository](https://github.com/new).
2. Name it (for example: `tree-cloud-notes`).
3. Set it to **Public** or **Private** (GitHub Pages supports private repositories on GitHub Pro, or public repositories on free accounts).
4. Do NOT initialize with a README (keep it empty).

### Step 2: Push this Project to GitHub
In your terminal on Kali Linux, run:

```bash
cd "/home/kali/Projects/auto cloud upload/tree-cloud-notes"
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/tree-cloud-notes.git
git push -u origin main
```

*(If you already have a remote, simply run `git push -u origin main`)*

### Step 3: Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/<YOUR_GITHUB_USERNAME>/tree-cloud-notes`
2. Click **Settings** -> **Pages** (in the left sidebar).
3. Under **Build and deployment**:
   - **Source:** Select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will automatically build and deploy TreeKeep!
5. Your notes web app will be live at:
   `https://<YOUR_GITHUB_USERNAME>.github.io/tree-cloud-notes/`

---

## ☁️ GitHub Cloud Sync Setup

Inside the TreeKeep web app (either running locally or on GitHub Pages):
1. Click the **🐙 GitHub** button in the top navigation bar.
2. Enter your **GitHub Username**, **Repository Name**, and a **Personal Access Token (PAT)** (created at GitHub Settings -> Developer Settings -> Personal Access Tokens -> Tokens (classic) with `repo` scope).
3. Click **Connect & Sync Now**.
4. Your notes are automatically backed up directly into your private GitHub repository in `data/notes.json`!

---

## 🚀 Local Run (Zero-Config Linux Server)

To start TreeKeep locally on your Linux machine:

```bash
cd "/home/kali/Projects/auto cloud upload/tree-cloud-notes"
./start.sh
```

### 📱 Access from your Phone / Local Wi-Fi
When `start.sh` runs, it displays your local Wi-Fi IP address:
```
💻 This Computer: http://localhost:3000
📱 Phone / Wi-Fi: http://192.168.1.XX:3000
```
Open that URL on your phone's browser to read and edit your notes while on the same Wi-Fi!

---

## 📥 Import Your CherryTree Notes (.ctb or .ctd)

You can import all your existing notes (including parent-child hierarchy, bandit/overthewire notes, etc.) directly:

### Option 1: From the Web UI
1. Click the **📥 Import** button in the top navigation bar.
2. Enter the path to your file (e.g. `/home/kali/Documents/cherry/all.ctb`).
3. Click **Start Import**.

### Option 2: From the Terminal
```bash
python3 importers/cherrytree_importer.py "/home/kali/Documents/cherry/all.ctb" "data/notes.db"
```

---

## ⌨️ Keyboard Shortcuts Reference

| Shortcut | Action |
| :--- | :--- |
| `Ctrl + Z` | Undo note edit |
| `Ctrl + Y` or `Ctrl + Shift + Z` | Redo note edit |
| `Ctrl + F` | Find & Replace in current note |
| `Ctrl + K` | Global search across all notes & tags |
| `Ctrl + V` | Paste image / screenshot directly from clipboard |
| `Tab` | Insert 4 spaces indentation |
| `Alt + Up` | Move selected node UP in hierarchy |
| `Alt + Down` | Move selected node DOWN in hierarchy |
