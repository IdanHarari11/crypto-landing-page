"use client"

import { useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'
import { format } from 'date-fns'
import { useQuery } from '@tanstack/react-query'
import { getCoinData, TIME_RANGES } from '@/lib/crypto-service'
import { motion } from 'framer-motion'

export function CryptoChart({ 
  coinId, 
  coinName, 
  className = "" 
}) {
  const chartContainerRef = useRef(null)
  const [selectedRange, setSelectedRange] = useState('1D')
  const [priceChange, setPriceChange] = useState(0)

  const { data, isLoading } = useQuery({
    queryKey: ['crypto', coinId, selectedRange],
    queryFn: () => getCoinData(coinId, TIME_RANGES[selectedRange])
  })

  useEffect(() => {
    if (!chartContainerRef.current || !data || data.length === 0) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: 'transparent' },
        textColor: '#ffffff',
        fontFamily: 'Rubik',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.1)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.1)' },
      },
      width: chartContainerRef.current.clientWidth,
      height: 200,
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        visible: true,
        borderVisible: false,
      },
    })

    const lineSeries = chart.addLineSeries({
      color: data[data.length - 1].value > data[0].value ? '#22c55e' : '#ef4444',
      lineWidth: 2,
      lineStyle: 0,
      priceLineVisible: false,
      lastValueVisible: false,
    })

    lineSeries.setData(data)

    // Calculate price change
    const startPrice = data[0].value
    const endPrice = data[data.length - 1].value
    const change = ((endPrice - startPrice) / startPrice) * 100
    setPriceChange(change)

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current.clientWidth })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      chart.remove()
      window.removeEventListener('resize', handleResize)
    }
  }, [data])

  return (
    <div className="glass p-3 rounded-xl h-full flex flex-col">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-white">{coinName}</h3>
          {!isLoading && data && (
            <div className="flex items-center gap-1 text-right">
              <span className="text-base font-bold text-white">
                ${data[data.length - 1].value.toFixed(2)}
              </span>
              <span className={`text-xs font-medium ${
                priceChange >= 0 ? 'text-primary-green' : 'text-red-500'
              }`}>
                {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {Object.keys(TIME_RANGES).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-medium transition-all ${
                selectedRange === range
                  ? 'bg-primary-green text-white'
                  : 'text-white hover:bg-primary-green/10'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div ref={chartContainerRef} className="w-full flex-1 mt-1" />
    </div>
  )
} 