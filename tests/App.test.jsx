import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App';

// Mock useLocalStorage hook
jest.mock('../hooks/useLocalStorage', () => {
  let value = {}; // Use a simple variable to hold the mocked state
  return {
    __esModule: true,
    default: (key, initialValue) => {
      value[key] = value[key] === undefined ? initialValue : value[key];
      const setValue = (newValue) => {
        value[key] = newValue;
      };
      return [value[key], setValue];
    },
  };
});

// Mock fetch for CoinGecko API
global.fetch = jest.fn((url) => {
  if (url.includes('simple/price')) {
    return Promise.resolve({
      json: () => Promise.resolve({ tether: { krw: 1300 } }),
    });
  } else if (url.includes('coins/') && url.includes('/tickers')) {
    return Promise.resolve({
      json: () => Promise.resolve({
        tickers: [
          { market: { name: 'Binance' }, converted_last: { usd: 50000 } },
          { market: { name: 'Coinbase' }, converted_last: { usd: 49900 } },
        ],
      }),
    });
  }
  return Promise.reject(new Error('unknown url'));
});

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
    expect(screen.getByText('포트폴리오 트래커')).toBeInTheDocument();
  });
});
