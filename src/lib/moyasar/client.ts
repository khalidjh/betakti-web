import 'server-only';

const BASE = 'https://api.moyasar.com/v1';

function authHeader(): string {
  const key = process.env.MOYASAR_SECRET_KEY;
  if (!key) throw new Error('MOYASAR_SECRET_KEY not set');
  return 'Basic ' + Buffer.from(`${key}:`).toString('base64');
}

export async function fetchPayment(id: string) {
  const res = await fetch(`${BASE}/payments/${id}`, {
    headers: { Authorization: authHeader() },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Moyasar fetchPayment failed: ${res.status}`);
  return res.json();
}
