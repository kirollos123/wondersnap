#!/bin/bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
cd "$HOME/wondersnap"
npm start >/dev/null 2>&1 &
sleep 2
google-chrome --app=http://localhost:5173 --user-data-dir="$HOME/.wondersnap-chrome"
pkill -f server.mjs
