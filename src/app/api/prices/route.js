// GET /api/prices  ->  same as CoinGecko /simple/price for USDT, BTC, ETH, XRP in USD and ILS (+24h change).
// Used by the moving coins on the home page. One upstream call per minute, shared by every visitor.
import { COINS, VS, fromCoinGecko, priceResponse, unavailable } from '../../../lib/coingecko';

export const runtime = 'nodejs';

export async function GET() {
  const path = `/simple/price?ids=${COINS.join(',')}&vs_currencies=${VS.join(',')}&include_24hr_change=true`;
  try {
    return priceResponse(await fromCoinGecko(path, 60), 60);
  } catch {
    return unavailable();
  }
}
