"use client"

import { CryptoChart } from '@/components/ui/crypto-chart'
import { COIN_IDS } from '@/lib/crypto-service'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const COINS = [
  { id: COIN_IDS.bitcoin, name: 'ביטקוין (BTC)' },
  { id: COIN_IDS.ripple, name: 'ריפל (XRP)' },
  { id: COIN_IDS.ethereum, name: 'אתריום (ETH)' },
]

export function CryptoCharts() {
  return (
    <QueryClientProvider client={queryClient}>
      <section className="container mx-auto px-4 -mt-48 sm:-mt-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {COINS.map((coin) => (
            <div key={coin.id} className="w-full min-h-[200px] lg:min-h-[280px]">
              <CryptoChart
                coinId={coin.id}
                coinName={coin.name}
              />
            </div>
          ))}
        </div>
      </section>
    </QueryClientProvider>
  )
} 