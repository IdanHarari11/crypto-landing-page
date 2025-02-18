"use client"

import React, { useState, useEffect } from 'react';
import { LineChart, Line, Tooltip, ResponsiveContainer, Area } from 'recharts';
import axios from 'axios';

const timeRanges = {
  '1D': '1',
  '1W': '7',
  '1M': '30',
  'YTD': 'year_to_date',
  '1Y': '365',
  'ALL': 'max'
};

export const CryptoChart = ({ coinId, name, color = "#39FF14" }) => {
  const [data, setData] = useState([]);
  const [range, setRange] = useState('1Y');
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`, {
          params: {
            vs_currency: 'usd',
            days: timeRanges[range]
          }
        });
        const formattedData = response.data.prices.map(([timestamp, price]) => ({
          date: new Date(timestamp).toLocaleDateString(),
          price
        }));
        setData(formattedData);
        const latestPrice = formattedData[formattedData.length - 1]?.price;
        const initialPrice = formattedData[0]?.price;
        setCurrentPrice(latestPrice);
        setPriceChange(((latestPrice - initialPrice) / initialPrice) * 100);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [coinId, range]);

  return (
    <div className="p-4 bg-white bg-opacity-50 backdrop-blur-lg shadow-lg rounded-lg mb-6 w-full md:w-1/5 border border-white border-opacity-30">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold text-black">{name}</h2>
        {currentPrice && (
          <div className="text-right">
            <p className={`text-sm ${priceChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {priceChange >= 0 ? '↑' : '↓'} {priceChange.toFixed(2)}%
            </p>
            <p className="text-xl font-bold text-black">${currentPrice.toFixed(2)}</p>
          </div>
        )}
      </div>
      <div className="flex justify-between mb-4">
        {Object.keys(timeRanges).map((key) => (
          <button
            key={key}
            onClick={() => setRange(key)}
            className={`px-2 py-1 rounded ${range === key ? 'bg-green-500 text-white' : 'text-black'}`}
          >
            {key}
          </button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <defs>
            <linearGradient id={`gradient-${coinId}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '8px' }} />
          <Area type="monotone" dataKey="price" stroke="none" fill={`url(#gradient-${coinId})`} />
          <Line
            type="monotone"
            dataKey="price"
            stroke={color}
            strokeWidth={2.5}
            dot={false}
            style={{ filter: 'drop-shadow(0 0 10px #39FF14)' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
