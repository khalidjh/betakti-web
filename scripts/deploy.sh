#!/usr/bin/env bash
# Deploy betakti.com to the LightNode box.
#
# This repo is the source of truth. The server's own `src/` had been stale for
# weeks because deploys only ever copied build output — which nearly cost a
# fortnight of editor work when a copy of the server tree was mistaken for the
# newer source. So: push the source, build there, restart.
#
#   ./scripts/deploy.sh            # push, build, restart
#   ./scripts/deploy.sh --no-build # push only (content/env changes)
set -euo pipefail

HOST="${BETAKTI_HOST:-root@149.104.71.238}"
REMOTE="/var/www/betakti"
BUILD=1
[ "${1:-}" = "--no-build" ] && BUILD=0

cd "$(dirname "$0")/.."

if [ -n "$(git status --porcelain)" ]; then
  echo "warning: working tree is dirty — deploying it anyway" >&2
fi
echo "==> deploying $(git rev-parse --short HEAD) to $HOST"

# --delete keeps the server from accumulating files no longer in the repo.
# node_modules and build stay: they are the server's, not ours. .env holds the
# server's secrets and must never be overwritten from here.
rsync -a --delete \
  --exclude node_modules --exclude .svelte-kit --exclude build \
  --exclude 'build.bak-*' --exclude '.env*' --exclude .git \
  ./ "$HOST:$REMOTE/"

if [ "$BUILD" = "1" ]; then
  # Dev dependencies are installed on purpose: the build runs here, and vite,
  # svelte and @tailwindcss/vite all live in devDependencies. --omit=dev fails
  # with "Cannot find package '@tailwindcss/vite'" and leaves the old build
  # serving, which looks like a successful deploy until a new page 404s.
  #
  # 3584MB because the box has 2GB of RAM and the default heap OOMs partway
  # through the Vite build, leaving build/ half written.
  ssh "$HOST" "cd $REMOTE && \
    cp -r build build.bak-\$(date +%Y%m%d-%H%M%S) 2>/dev/null || true && \
    npm ci --no-audit --no-fund >/dev/null 2>&1 || npm install --no-audit --no-fund >/dev/null && \
    NODE_OPTIONS=--max-old-space-size=3584 npm run build 2>&1 | tail -3 && \
    systemctl restart betakti && sleep 3 && systemctl is-active betakti"
fi

echo "==> checking"
for path in / /welcome /get /dmca; do
  code=$(curl -s -o /dev/null -w '%{http_code}' -m 20 "https://betakti.com$path")
  echo "    $path -> $code"
done
echo "==> done"
