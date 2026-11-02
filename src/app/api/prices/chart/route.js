// GET /api/prices/chart?id=bitcoin&vs=usd&days=1  ->  same as CoinGecko /coins/{id}/market_chart
// Used by the market tab (sparklines) and by the calculator's live USDT rate (tether / ils / 1 day).
import { COINS, DAYS, VS, fromCoinGecko, priceResponse, unavailable } from '../../../../lib/coingecko';

export const runtime = 'nodejs';

// how long one answer is reused, per range (seconds)
const TTL = { '1': 120, '7': 900, '30': 3600, '365': 21600 };

export async function GET(req) {
  const q = new URL(req.url).searchParams;
  const id = q.get('id') ?? '', vs = q.get('vs') ?? '', days = q.get('days') ?? '';
  if (!COINS.includes(id) || !VS.includes(vs) || !DAYS.includes(days)) {
    return unavailable(400);
  }
  const path = `/coins/${id}/market_chart?vs_currency=${vs}&days=${days}`;
  try {
    return priceResponse(await fromCoinGecko(path, TTL[days]), TTL[days]);
  } catch {
    return unavailable();
  }
}
