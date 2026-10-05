#!/usr/bin/env python3
import sys
import os
import sqlite3
import xml.etree.ElementTree as ET
import re
import time

def clean_cherrytree_txt(raw_xml):
    if not raw_xml:
        return ""
    if not raw_xml.strip().startswith("<?xml") and not raw_xml.strip().startswith("<node>"):
        return raw_xml

    try:
        # Wrap or parse XML
        root = ET.fromstring(raw_xml.strip())
        texts = []
        for elem in root.iter():
            if elem.tag == 'rich_text':
                txt = elem.text or ""
                # Check formatting
                weight = elem.get('weight')
                style = elem.get('style')
                family = elem.get('family')
                bg = elem.get('background')
                
                if family == 'monospace':
                    txt = f"`{txt}`"
                elif weight == 'heavy' or weight == 'bold':
                    txt = f"**{txt}**"
                elif style == 'italic':
                    txt = f"*{txt}*"
                
                texts.append(txt)
            elif elem.tag == 'codebox':
                code = elem.get('txt', '') or elem.text or ""
                lang = elem.get('syntax', 'bash')
                texts.append(f"\n```{lang}\n{code}\n```\n")
        return "".join(texts)
    except Exception:
        # Fallback regex strip
        clean = re.sub(r'<[^>]+>', '', raw_xml)
        return clean.strip()

def import_ctb(ctb_path, target_db_path):
    print(f"Importing CherryTree SQLite (.ctb): {ctb_path}")
    src_conn = sqlite3.connect(ctb_path)
    src_cur = src_conn.cursor()

    tgt_conn = sqlite3.connect(target_db_path)
    tgt_cur = tgt_conn.cursor()

    # Get parent relationships from children table: (node_id, father_id, sequence)
    parents = {}
    try:
        src_cur.execute("SELECT node_id, father_id, sequence FROM children")
        for row in src_cur.fetchall():
            node_id, father_id, seq = row
            p_id = None if father_id == 0 else f"ct-{father_id}"
            parents[node_id] = (p_id, seq)
    except Exception as e:
        print("Warning reading children:", e)

    # Read nodes
    src_cur.execute("SELECT node_id, name, txt, syntax, tags, ts_creation, ts_lastsave FROM node")
    nodes = src_cur.fetchall()

    imported_count = 0
    now = int(time.time() * 1000)

    for row in nodes:
        node_id, name, raw_txt, syntax, tags, ts_c, ts_m = row
        clean_txt = clean_cherrytree_txt(raw_txt)

        parent_info = parents.get(node_id, (None, 0))
        parent_id = parent_info[0]
        pos = parent_info[1]

        target_id = f"ct-{node_id}"
        icon = 'terminal' if (syntax and 'sh' in syntax) else ('code' if syntax else 'folder')
        c_time = (ts_c * 1000) if ts_c else now
        m_time = (ts_m * 1000) if ts_m else now

        tgt_cur.execute("""
            INSERT OR REPLACE INTO nodes (id, parent_id, title, content, icon, tags, position, is_expanded, created_at, updated_at, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, 0)
        """, (target_id, parent_id, name, clean_txt, icon, tags or '', pos, c_time, m_time))
        imported_count += 1

    tgt_conn.commit()
    tgt_conn.close()
    src_conn.close()
    print(f"Successfully imported {imported_count} nodes from {ctb_path}")

def import_ctd(ctd_path, target_db_path):
    print(f"Importing CherryTree XML (.ctd): {ctd_path}")
    tree = ET.parse(ctd_path)
    root = tree.getroot()

    tgt_conn = sqlite3.connect(target_db_path)
    tgt_cur = tgt_conn.cursor()

    imported_count = 0
    now = int(time.time() * 1000)

    def process_node(node_elem, parent_id, pos):
        nonlocal imported_count
        u_id = node_elem.get('unique_id', str(imported_count + 1))
        name = node_elem.get('name', 'Untitled')
        tags = node_elem.get('tags', '')
        syntax = node_elem.get('prog_lang', '')
        ts_c = int(node_elem.get('ts_creation', '0') or '0')
        ts_m = int(node_elem.get('ts_lastsave', '0') or '0')

        # Collect rich text
        texts = []
        for child in node_elem:
            if child.tag == 'rich_text':
                texts.append(child.text or '')
            elif child.tag == 'codebox':
                code = child.get('txt', '') or child.text or ''
                lang = child.get('syntax', 'bash')
                texts.append(f"\n```{lang}\n{code}\n```\n")

        content = "".join(texts)
        target_id = f"ct-{u_id}"
        icon = 'terminal' if (syntax and 'sh' in syntax) else 'file-text'
        c_time = (ts_c * 1000) if ts_c else now
        m_time = (ts_m * 1000) if ts_m else now

        tgt_cur.execute("""
            INSERT OR REPLACE INTO nodes (id, parent_id, title, content, icon, tags, position, is_expanded, created_at, updated_at, deleted)
            VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, 0)
        """, (target_id, parent_id, name, content, icon, tags, pos, c_time, m_time))
        imported_count += 1

        child_pos = 0
        for child in node_elem:
            if child.tag == 'node':
                process_node(child, target_id, child_pos)
                child_pos += 1

    root_pos = 0
    for child in root:
        if child.tag == 'node':
            process_node(child, None, root_pos)
            root_pos += 1

    tgt_conn.commit()
    tgt_conn.close()
    print(f"Successfully imported {imported_count} nodes from {ctd_path}")

def main():
    if len(sys.argv) < 3:
        print("Usage: cherrytree_importer.py <path_to_ctb_or_ctd> <target_sqlite_db>")
        sys.exit(1)

    src_file = sys.argv[1]
    target_db = sys.argv[2]

    if not os.path.exists(src_file):
        print(f"Error: {src_file} does not exist.")
        sys.exit(1)

    ext = os.path.splitext(src_file)[1].lower()
    if ext == '.ctb':
        import_ctb(src_file, target_db)
    elif ext in ('.ctd', '.xml'):
        import_ctd(src_file, target_db)
    else:
        # Check header
        with open(src_file, 'rb') as f:
            header = f.read(16)
            if b'SQLite format 3' in header:
                import_ctb(src_file, target_db)
            else:
                import_ctd(src_file, target_db)

if __name__ == '__main__':
    main()
