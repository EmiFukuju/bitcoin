import React, { useState } from 'react';

function AssetForm({ addAsset, supportedTickers, currency }) {
  const [ticker, setTicker] = useState('');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ticker || !purchasePrice || !quantity) return;

    addAsset({ 
      ticker,
      purchasePrice: parseFloat(purchasePrice),
      quantity: parseFloat(quantity),
      inputCurrency: currency
    });

    setTicker('');
    setPurchasePrice('');
    setQuantity('');
  };

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title mb-0">새 자산 추가</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="ticker" className="form-label">종목</label>
            <select
              id="ticker"
              className="form-select"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
            >
              <option value="" disabled>코인 선택...</option>
              {Object.keys(supportedTickers).map(tickerSymbol => (
                <option key={tickerSymbol} value={tickerSymbol}>
                  {tickerSymbol}
                </option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="col-md-8 mb-3">
              <label htmlFor="purchasePrice" className="form-label">구매 단가</label>
              <input
                type="number"
                className="form-control"
                id="purchasePrice"
                placeholder="예: 50000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label htmlFor="quantity" className="form-label">수량</label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                placeholder="예: 0.5"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">자산 추가</button>
        </form>
      </div>
    </div>
  );
}

export default AssetForm;
