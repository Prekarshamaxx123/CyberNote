# 🌲 TreeKeep - Hierarchical Cloud Notes with Real-Time Delta Sync

> **The Power of CherryTree's Hierarchical Tree + The Speed of Google Keep's Micro-Sync**

TreeKeep is a lightweight, cross-platform hierarchical note-taking application designed to solve the heavy cloud-sync problem of traditional single-file note software.

---

## ⚡ Why TreeKeep?

| Feature | CherryTree | Google Keep | 🌲 TreeKeep |
| :--- | :---: | :---: | :---: |
| **Hierarchical Tree (Subnodes)** | ✅ Yes | ❌ No | ✅ **Yes (Infinite Tree)** |
| **Code Boxes with Highlighting** | ✅ Yes | ❌ No | ✅ **Yes (with Copy Button)** |
| **Interactive Checklists** | ⚠️ Basic | ✅ Yes | ✅ **Yes (Live Checkboxes)** |
| **Google Keep Delta Micro-Sync** | ❌ Full file (5MB+) | ✅ Yes | ✅ **Yes (~200 Bytes per edit!)** |
| **Mobile & Cross-Device Access** | ⚠️ Needs separate app | ✅ Yes | ✅ **Yes (PWA on Phone/PC)** |
| **Zero Heavy Dependencies** | ❌ Needs GTK libraries | ❌ Proprietary Cloud | ✅ **Built-in Node.js & SQLite** |

---

## 🚀 Quick Start (1-Click Run)

To start TreeKeep on your Linux PC:

```bash
cd "/home/kali/Projects/auto cloud upload/tree-cloud-notes"
./start.sh
```

Or using Node:
```bash
node server.js
```

### 📱 Access from your Phone / Other Devices (Wi-Fi)
When `start.sh` runs, it displays your local Wi-Fi IP address:
```
💻 This Computer: http://localhost:3000
📱 Phone / Wi-Fi: http://192.168.1.XX:3000
```
Open that URL on your Android or iPhone browser!
* **Install as Mobile App (PWA):** In Chrome on your phone, tap **"Add to Home Screen"** or **"Install TreeKeep"** to get a full-screen, native app experience!

---

## 📥 Import Your CherryTree Notes (.ctb or .ctd)

You can import all your existing notes (including parent-child hierarchy and rich text) directly:

### Option 1: From the Web UI
1. Click the **📥 Import** button in the top navigation bar.
2. Enter the path to your file (e.g. `/home/kali/Documents/cherry/all.ctb`).
3. Click **Start Import**.

### Option 2: From the Terminal
```bash
python3 importers/cherrytree_importer.py "/home/kali/Documents/cherry/all.ctb" "data/notes.db"
```

---

## 🔬 How Delta Micro-Sync Works

Instead of uploading a 5 MB file on every auto-save:
1. When you type in TreeKeep, it debounces for 450ms after you pause.
2. It sends an HTTP `PATCH` payload with **ONLY the modified field**:
   ```json
   { "content": "updated notes text" }
   ```
3. Network payload: **~150 to 300 bytes**!
4. Over a 10-hour workday, you consume less than **1 MB of data total**, instead of 1.5 GB!
5. Real-time updates are pushed to all open tabs and devices instantly via **Server-Sent Events (SSE)**.

---

## 📁 Project Structure

```
tree-cloud-notes/
├── server.js              # Ultra-fast server with builtin Node SQLite & SSE
├── package.json           # Project manifest
├── start.sh               # 1-click startup script with IP detection
├── data/
│   └── notes.db           # SQLite database (auto-created)
├── importers/
│   └── cherrytree_importer.py  # .ctb and .ctd parser
└── public/
    ├── index.html         # Modern web workspace
    ├── app.js             # Reactive UI & delta sync engine
    ├── style.css          # Dark/Light theme & responsive styling
    └── manifest.json      # PWA mobile app manifest
```
