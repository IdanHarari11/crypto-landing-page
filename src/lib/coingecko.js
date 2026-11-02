// Server-only (import it only from route handlers): the one place that talks to CoinGecko.
// - Allow-list of coins / currencies / ranges (nobody can use our server to query anything else)
// - Optional free "Demo" API key from the env (higher limit, never sent to the browser)
// - Next.js data cache via `revalidate`, plus a "last good answer" fallback if CoinGecko fails

const BASE = 'https://api.coingecko.com/api/v3';

export const COINS = ['tether', 'bitcoin', 'ethereum', 'ripple'];
export const VS = ['usd', 'ils'];
export const DAYS = ['1', '7', '30', '365'];

const lastGood = new Map();

export async function fromCoinGecko(path, revalidate) {
  const headers = { accept: 'application/json' };
  const key = process.env.COINGECKO_DEMO_API_KEY;
  if (key) headers['x-cg-demo-api-key'] = key;
  try {
    const res = await fetch(BASE + path, { headers, next: { revalidate } });
    if (!res.ok) throw new Error('CoinGecko ' + res.status);
    const body = await res.json();
    const date = Date.parse(res.headers.get('date') ?? '');
    const hit = { body, at: Number.isNaN(date) ? Date.now() : date };
    lastGood.set(path, hit);
    return { ...hit, stale: false };
  } catch (err) {
    const hit = lastGood.get(path);
    if (hit) return { ...hit, stale: true };
    throw err;
  }
}

// Same JSON shape CoinGecko returns, so the site's existing parsing code does not change.
// x-updated-at / x-stale let the page show "updated X minutes ago" if it wants to.
export function priceResponse(r, maxAge) {
  return new Response(JSON.stringify(r.body), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': `public, s-maxage=${maxAge}, stale-while-revalidate=${maxAge * 10}`,
      'x-updated-at': new Date(r.at).toISOString(),
      'x-stale': r.stale ? '1' : '0',
    },
  });
}

export function unavailable(status = 503) {
  return new Response(JSON.stringify({ error: 'prices unavailable' }), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}
