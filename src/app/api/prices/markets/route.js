// GET /api/prices/markets  ->  same as CoinGecko /coins/markets for the four coins (used only for the coin logos).
// Logos almost never change, so one call a day is enough.
import { COINS, fromCoinGecko, priceResponse, unavailable } from '../../../../lib/coingecko';

export const runtime = 'nodejs';

export async function GET() {
  const path = `/coins/markets?vs_currency=usd&ids=${COINS.join(',')}`;
  try {
    return priceResponse(await fromCoinGecko(path, 86400), 86400);
  } catch {
    return unavailable();
  }
}
