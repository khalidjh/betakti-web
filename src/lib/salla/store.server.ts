import { appendFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { env } from '$env/dynamic/private';

/**
 * What the Salla app keeps per merchant, on the box's disk — not in the web
 * tree, not in Firestore. One JSON file is enough until there are more than a
 * handful of stores; the tokens in it are the keys to a merchant's store, so
 * the directory is 700 and the file 600.
 */
const DIR = env.SALLA_DATA_DIR || '/var/lib/betakti-salla';
const STORES = join(DIR, 'stores.json');
const EVENTS = join(DIR, 'events.log');

export interface SallaStore {
  merchant: number;
  installed_at?: string;
  uninstalled_at?: string;
  store_type?: string;
  access_token?: string;
  refresh_token?: string;
  /** Unix seconds, as `app.store.authorize` sends it. */
  expires?: number;
  scope?: string;
  authorized_at?: string;
  updated_at: string;
}

type Stores = Record<string, SallaStore>;

async function ensureDir() {
  await mkdir(DIR, { recursive: true, mode: 0o700 });
}

async function readStores(): Promise<Stores> {
  try {
    return JSON.parse(await readFile(STORES, 'utf8')) as Stores;
  } catch {
    return {};
  }
}

// Webhooks can land together (install + authorize arrive within a second), so
// writes go through one queue: read, change, write to a temp file, rename.
let queue: Promise<unknown> = Promise.resolve();

export function updateStore(merchant: number, change: (s: SallaStore) => SallaStore | null) {
  const run = queue.then(async () => {
    await ensureDir();
    const stores = await readStores();
    const key = String(merchant);
    const next = change(stores[key] ?? { merchant, updated_at: '' });
    if (next) stores[key] = { ...next, merchant, updated_at: new Date().toISOString() };
    else delete stores[key];
    const tmp = `${STORES}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(stores, null, 2), { mode: 0o600 });
    await rename(tmp, STORES);
  });
  queue = run.catch(() => {});
  return run;
}

export async function getStore(merchant: number): Promise<SallaStore | null> {
  return (await readStores())[String(merchant)] ?? null;
}

/** One line per catalogue event: who, what, which item. No customer data. */
export async function logEvent(line: Record<string, unknown>) {
  await ensureDir();
  await appendFile(EVENTS, JSON.stringify(line) + '\n', { mode: 0o600 });
}
