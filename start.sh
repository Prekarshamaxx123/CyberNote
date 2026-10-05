#!/usr/bin/env bash
# ==============================================================================
# TreeKeep 🌲 - 1-Click Startup Script
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "${SCRIPT_DIR}"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}======================================================${NC}"
echo -e "${GREEN}   🌲 TreeKeep - Hierarchical Cloud Notes System       ${NC}"
echo -e "${BLUE}======================================================${NC}"

# Find local IP address for phone / network access
LOCAL_IP=$(ip -4 addr show scope global | grep -oP '(?<=inet\s)\d+(\.\d+){3}' | head -n 1 || hostname -I | awk '{print $1}')
[ -z "${LOCAL_IP}" ] && LOCAL_IP="localhost"

PORT=3000

echo -e "\n${CYAN}Access URLs:${NC}"
echo -e "  💻 This Computer:  ${GREEN}http://localhost:${PORT}${NC}"
echo -e "  📱 Phone / Wi-Fi:  ${GREEN}http://${LOCAL_IP}:${PORT}${NC}\n"

echo -e "${YELLOW}Key Features:${NC}"
echo -e "  • Infinite Hierarchical Tree Structure (like CherryTree)"
echo -e "  • Google Keep-Speed Delta Micro-Sync (~200 bytes per edit)"
echo -e "  • Syntax-highlighted Code Boxes with Copy button"
echo -e "  • Interactive Checklists (To-Do lists)"
echo -e "  • 1-Click CherryTree .ctb / .ctd Import\n"

# Open browser asynchronously
(sleep 1 && (xdg-open "http://localhost:${PORT}" || x-www-browser "http://localhost:${PORT}") 2>/dev/null) &

# Run Node server
exec node server.js
