import axios from 'axios'

const COINAPI_KEY = '36d38ddb-5565-4463-b28e-b4752860c326'
const COINAPI_URL = 'https://rest.coinapi.io/v1'

const COIN_IDS = {
  bitcoin: 'BTC',
  ethereum: 'ETH',
  ripple: 'XRP',
  stellar: 'XLM'
}

const TIME_RANGES = {
  '1D': { 
    period: '1DAY',
    timeStart: () => {
      const date = new Date()
      date.setDate(date.getDate() - 1)
      return date.toISOString()
    }
  },
  '5D': {
    period: '1DAY',
    timeStart: () => {
      const date = new Date()
      date.setDate(date.getDate() - 5)
      return date.toISOString()
    }
  },
  '1M': {
    period: '1DAY',
    timeStart: () => {
      const date = new Date()
      date.setMonth(date.getMonth() - 1)
      return date.toISOString()
    }
  },
  'YTD': {
    period: '1DAY',
    timeStart: () => {
      return new Date(new Date().getFullYear(), 0, 1).toISOString()
    }
  },
  '1Y': {
    period: '1DAY',
    timeStart: () => {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 1)
      return date.toISOString()
    }
  },
  '5Y': {
    period: '1DAY',
    timeStart: () => {
      const date = new Date()
      date.setFullYear(date.getFullYear() - 5)
      return date.toISOString()
    }
  }
}

export async function getCoinData(coinId, timeRange = '1D') {
  const { period, timeStart } = TIME_RANGES[timeRange]
  const startTime = timeStart()
  
  try {
    const response = await fetch(
      `${COINAPI_URL}/ohlcv/${coinId}/USD/history?period_id=${period}&time_start=${startTime}`, {
        method: 'GET',
        headers: {
          'X-CoinAPI-Key': COINAPI_KEY
        }
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    if (!data || data.length === 0) {
      console.log("No data returned for", coinId)
      return []
    }

    // Map the data to the format expected by the chart
    return data.map(day => ({
      time: new Date(day.time_period_start).getTime() / 1000,
      value: day.price_close || day.close_price
    }))

  } catch (error) {
    console.error('Error fetching crypto data:', error)
    return []
  }
}

// Helper function to get current price
export async function getCurrentPrice(coinId) {
  try {
    const response = await fetch(
      `${COINAPI_URL}/exchangerate/${coinId}/USD`, {
        method: 'GET',
        headers: {
          'X-CoinAPI-Key': COINAPI_KEY
        }
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return data.rate

  } catch (error) {
    console.error('Error fetching current price:', error)
    return null
  }
}

export { COIN_IDS, TIME_RANGES } 