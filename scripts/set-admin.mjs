#!/usr/bin/env node
/*
 * Grant or revoke the `admin: true` Firebase custom claim by email.
 *
 * Usage:
 *   node scripts/set-admin.mjs <email>            # grant admin
 *   node scripts/set-admin.mjs <email> --revoke   # revoke admin
 *
 * After running, the user must sign out and back in for the new session
 * cookie to carry the claim. SvelteKit hooks read the claim from the cookie.
 *
 * Required env (loaded from .env.local):
 *   FIREBASE_ADMIN_PROJECT_ID
 *   FIREBASE_ADMIN_CLIENT_EMAIL
 *   FIREBASE_ADMIN_PRIVATE_KEY
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, '..');

function loadDotenvLocal() {
  try {
    const raw = readFileSync(join(REPO_ROOT, '.env.local'), 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eq = trimmed.indexOf('=');
      if (eq < 0) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = val;
    }
  } catch {
    // .env.local missing is OK if vars already exported
  }
}
loadDotenvLocal();

const args = process.argv.slice(2);
const REVOKE = args.includes('--revoke');
const email = args.find((a) => !a.startsWith('--'));
if (!email) {
  console.error('Usage: node scripts/set-admin.mjs <email> [--revoke]');
  process.exit(1);
}

const { cert, getApps, initializeApp } = await import('firebase-admin/app');
const { getAuth } = await import('firebase-admin/auth');

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_ADMIN_PRIVATE_KEY ?? '').replace(/\\n/g, '\n')
    })
  });
}

const auth = getAuth();
const user = await auth.getUserByEmail(email);
const existing = user.customClaims ?? {};
const next = { ...existing };
if (REVOKE) delete next.admin;
else next.admin = true;

await auth.setCustomUserClaims(user.uid, next);
console.log(
  `[set-admin] ${REVOKE ? 'revoked' : 'granted'} admin for ${email} (uid=${user.uid})`
);
console.log('User must sign out and sign back in for the session cookie to refresh.');
