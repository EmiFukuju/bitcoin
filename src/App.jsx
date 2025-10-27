import { useState, useEffect, useMemo } from 'react';
import './App.css';
import AssetList from './components/AssetList';
import AssetForm from './components/AssetForm';
import PortfolioSummary from './components/PortfolioSummary';
import PortfolioChart from './components/PortfolioChart';
import FilterControls from './components/FilterControls';
import CurrencySelector from './components/CurrencySelector';
import EditAssetModal from './components/EditAssetModal';


import useLocalStorage from './hooks/useLocalStorage';

// Simple mapping for ticker to CoinGecko API ID
const tickerToApiId = {
  BTC: 'bitcoin',
  ETH: 'ethereum',
  XRP: 'ripple',
  DOGE: 'dogecoin',
  SOL: 'solana',
  ADA: 'cardano',
  AVAX: 'avalanche-2',
  LINK: 'chainlink',
  MATIC: 'matic-network',
  UNI: 'uniswap',
  DOT: 'polkadot',
  LTC: 'litecoin',
  BCH: 'bitcoin-cash',
};

function App() {
  const [transactions, setTransactions] = useLocalStorage('transactions', []);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [currency, setCurrency] = useLocalStorage('currency', 'USD');
  const [usdPrices, setUsdPrices] = useState({});
  const [exchangeRate, setExchangeRate] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  const addTransaction = (transaction) => {
    let priceInUsd = transaction.purchasePrice;
    console.log('Initial purchasePrice:', transaction.purchasePrice);
    console.log('Input currency:', transaction.inputCurrency);
    console.log('Current exchangeRate:', exchangeRate);

    if (transaction.inputCurrency === 'KRW') {
      if (exchangeRate === 1) { // A simple check if the rate is not loaded
        alert('환율 정보가 로딩 중입니다. 잠시 후 다시 시도해주세요.');
        return;
      }
      priceInUsd = transaction.purchasePrice / exchangeRate;
      console.log('Converted priceInUsd (from KRW):', priceInUsd);
    }

    const newTransaction = {
      ticker: transaction.ticker,
      purchasePrice: priceInUsd, // Always store in USD
      quantity: transaction.quantity,
      date: new Date().toISOString(),
    };

    setTransactions([...transactions, newTransaction]);
  };

  const updateAsset = (ticker, newQuantity, newPurchasePrice) => {
    // 기존 거래 기록 중 해당 ticker의 모든 기록을 제거
    const filteredTransactions = transactions.filter(t => t.ticker !== ticker);

    // 새로운 정보로 거래 기록 추가 (단순화를 위해 기존 기록을 대체하는 방식)
    const updatedTransaction = {
      ticker: ticker,
      purchasePrice: newPurchasePrice, // 이미 USD로 변환된 가격이라고 가정
      quantity: newQuantity,
      date: new Date().toISOString(),
    };
    setTransactions([...filteredTransactions, updatedTransaction]);
  };

  const deleteAsset = (ticker) => {
    if (window.confirm(`정말로 ${ticker}의 모든 거래 기록을 삭제하시겠습니까?`)) {
      const newTransactions = transactions.filter(t => t.ticker !== ticker);
      setTransactions(newTransactions);
    }
  };

  const resetPortfolio = () => {
    if (window.confirm('정말로 모든 거래 기록을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      setTransactions([]);
      setFavorites([]);
    }
  };

  const toggleFavorite = (ticker) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(ticker)
        ? prevFavorites.filter(f => f !== ticker)
        : [...prevFavorites, ticker]
    );
  };

  // Calculate current holdings from transactions (always in USD)
  const holdings = useMemo(() => {
    const portfolio = {};
    transactions.forEach(t => {
      if (!portfolio[t.ticker]) {
        portfolio[t.ticker] = { ticker: t.ticker, quantity: 0, totalCost: 0 };
      }
      portfolio[t.ticker].quantity += t.quantity;
      portfolio[t.ticker].totalCost += t.quantity * t.purchasePrice;
    });

    const calculatedHoldings = Object.values(portfolio).map(h => ({
      ...h,
      purchasePrice: h.totalCost / h.quantity, // Weighted average price in USD
    }));

    calculatedHoldings.sort((a, b) => {
      const aIsFav = favorites.includes(a.ticker);
      const bIsFav = favorites.includes(b.ticker);
      if (aIsFav === bIsFav) return 0;
      return aIsFav ? -1 : 1;
    });

    return calculatedHoldings;
  }, [transactions, favorites]);

  // Fetch exchange rate when currency changes
  useEffect(() => {
    const fetchExchangeRate = async () => {
      if (currency === 'USD') {
        setExchangeRate(1);
        return;
      }
      try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=krw`);
        const data = await response.json();
        setExchangeRate(data.tether.krw);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
        setExchangeRate(1); // Fallback to 1
      }
    };
    fetchExchangeRate();
  }, [currency]);

  // Fetch asset prices in USD
  useEffect(() => {
    const fetchPrices = async () => {
      if (holdings.length === 0) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);

      try {
        const pricePromises = holdings.map(holding => {
          const apiId = tickerToApiId[holding.ticker.toUpperCase()];
          if (!apiId) return Promise.resolve(null);
          return fetch(`https://api.coingecko.com/api/v3/coins/${apiId}/tickers`);
        });

        const responses = await Promise.all(pricePromises);
        const jsonData = await Promise.all(responses.map(res => res ? res.json() : null));

        const newPrices = {};
        jsonData.forEach((data, index) => {
          if (!data) return;
          const holding = holdings[index];
          const binanceTicker = data.tickers.find(t => t.market.name === 'Binance');

          if (binanceTicker) {
            newPrices[holding.ticker.toUpperCase()] = binanceTicker.converted_last.usd;
          } else if (data.tickers.length > 0) {
            newPrices[holding.ticker.toUpperCase()] = data.tickers[0].converted_last.usd;
          }
        });
        setUsdPrices(newPrices);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
      setIsLoading(false);
    };

    fetchPrices();
  }, [holdings]);

  // --- Data for Display ---
  const displayHoldings = useMemo(() => {
    return holdings.map(h => ({...h, purchasePrice: h.purchasePrice * exchangeRate}));
  }, [holdings, exchangeRate]);

  const displayPrices = useMemo(() => {
    const newPrices = {};
    for (const key in usdPrices) {
      newPrices[key] = usdPrices[key] * exchangeRate;
    }
    return newPrices;
  }, [usdPrices, exchangeRate]);

  const filteredTransactions = useMemo(() => {
    if (filter === 'ALL') return transactions;
    return transactions.filter(t => t.ticker === filter);
  }, [transactions, filter]);

  const filteredHoldings = useMemo(() => {
    if (filter === 'ALL') return displayHoldings;
    return displayHoldings.filter(h => h.ticker === filter);
  }, [displayHoldings, filter]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">포트폴리오 트래커</h1>
        <CurrencySelector currency={currency} setCurrency={setCurrency} />
      </div>
      <FilterControls holdings={holdings} filter={filter} setFilter={setFilter} />
      <div className="row">
        <div className="col-lg-6 mb-4">
          <PortfolioSummary assets={filteredHoldings} currentPrices={displayPrices} currency={currency} />
        </div>
        <div className="col-lg-6 mb-4">
          <AssetForm addAsset={addTransaction} supportedTickers={tickerToApiId} currency={currency} />
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <PortfolioChart transactions={filteredTransactions} currency={currency} exchangeRate={exchangeRate} />
        </div>
      </div>
      <AssetList 
        assets={filteredHoldings} 
        currentPrices={displayPrices} 
        isLoading={isLoading}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        currency={currency}
        deleteAsset={deleteAsset}
        onEdit={(asset) => {
          setEditingAsset(asset);
          setIsEditModalOpen(true);
        }}
      />
      <div className="text-center mt-4 mb-4">
        <button className="btn btn-danger" onClick={resetPortfolio}>
          포트폴리오 초기화
        </button>
      </div>

      {editingAsset && (
        <EditAssetModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          asset={editingAsset}
          updateAsset={updateAsset}
          currency={currency}
        />
      )}
    </div>
  );
}

export default App;
