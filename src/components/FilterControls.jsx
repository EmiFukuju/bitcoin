import React from 'react';

function FilterControls({ holdings, filter, setFilter }) {
  const tickers = ['ALL', ...holdings.map(h => h.ticker)];

  return (
    <div className="d-flex justify-content-center flex-wrap mb-4">
      {tickers.map(ticker => (
        <div key={ticker} className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="tickerFilter"
            id={`filter-${ticker}`}
            value={ticker}
            checked={filter === ticker}
            onChange={() => setFilter(ticker)}
          />
          <label className="form-check-label" htmlFor={`filter-${ticker}`}>
            {ticker}
          </label>
        </div>
      ))}
    </div>
  );
}

export default FilterControls;
