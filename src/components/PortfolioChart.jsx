import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  Filler
);

// Mapping for ticker to CoinGecko API ID
const tickerToApiId = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  XRP: 'ripple',
  DOGE: 'dogecoin',
};

const getChartOptions = (currency) => ({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '포트폴리오 수익 (최근 30일)',
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day'
      }
    },
    y: {
      ticks: {
        callback: function(value) {
          const currencySymbol = currency === 'USD' ? '$' : '₩';
          return currencySymbol + value.toLocaleString();
        }
      }
    }
  }
});

function PortfolioChart({ transactions, currency, exchangeRate }) {
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const generateChartData = async () => {
      if (transactions.length === 0 || !exchangeRate) {
        setIsLoading(false);
        setChartData(null);
        return;
      }

      setIsLoading(true);

      try {
        const uniqueIds = [...new Set(transactions.map(t => tickerToApiId[t.ticker]).filter(Boolean))];
        
        const pricePromises = uniqueIds.map(id => 
          fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`)
            .then(res => res.json())
        );
        
        const priceResults = await Promise.all(pricePromises);

        const pricesByAsset = uniqueIds.reduce((acc, id, index) => {
          if(priceResults[index].prices) {
            acc[id] = priceResults[index].prices.reduce((priceMap, [timestamp, price]) => {
              const date = new Date(timestamp).toISOString().split('T')[0];
              priceMap[date] = price;
              return priceMap;
            }, {});
          }
          return acc;
        }, {});

        const dailyReturnsUSD = {};
        for (let i = 29; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateString = date.toISOString().split('T')[0];

          let totalCostBasis = 0;
          let totalMarketValue = 0;
          const assetsOnDate = transactions.filter(t => new Date(t.date) <= date);
          
          const portfolioOnDate = {};
          assetsOnDate.forEach(t => {
            if (!portfolioOnDate[t.ticker]) {
              portfolioOnDate[t.ticker] = { quantity: 0, cost: 0 };
            }
            portfolioOnDate[t.ticker].quantity += t.quantity;
            portfolioOnDate[t.ticker].cost += t.quantity * t.purchasePrice;
          });

          for (const ticker in portfolioOnDate) {
            const apiId = tickerToApiId[ticker];
            const price = pricesByAsset[apiId]?.[dateString];
            totalCostBasis += portfolioOnDate[ticker].cost;
            if (price) {
              totalMarketValue += portfolioOnDate[ticker].quantity * price;
            } else {
              totalMarketValue += portfolioOnDate[ticker].cost;
            }
          }
          dailyReturnsUSD[dateString] = totalMarketValue - totalCostBasis;
        }

        const displayReturns = Object.values(dailyReturnsUSD).map(value => value * exchangeRate);
        const finalReturn = displayReturns[displayReturns.length - 1] || 0;

        setChartData({
          labels: Object.keys(dailyReturnsUSD),
          datasets: [
            {
              label: '포트폴리오 수익',
              data: displayReturns,
              borderColor: finalReturn >= 0 ? '#28a745' : '#dc3545',
              backgroundColor: finalReturn >= 0 ? 'rgba(40, 167, 69, 0.2)' : 'rgba(220, 53, 69, 0.2)',
              fill: true,
              tension: 0.1
            },
          ],
        });

      } catch (error) {
        console.error("Error generating chart data:", error);
      }
      setIsLoading(false);
    };

    generateChartData();
  }, [transactions, currency, exchangeRate]);

  return (
    <div className="card">
      <div className="card-body">
        {isLoading ? (
          <div className="text-center"><div className="spinner-border" role="status"><span className="visually-hidden">로딩 중...</span></div></div>
        ) : chartData ? (
          <Line options={getChartOptions(currency)} data={chartData} />
        ) : (
          <div className="text-center text-muted">자산을 추가하면 차트가 표시됩니다.</div>
        )}
      </div>
    </div>
  );
}

export default PortfolioChart;
