import React from 'react';

function AssetList({ assets, currentPrices, isLoading, favorites, toggleFavorite, currency, deleteAsset, onEdit }) {
  const currencySymbol = currency === 'USD' ? '$' : '₩';

  const calculateReturn = (asset) => {
    const currentPrice = currentPrices[asset.ticker.toUpperCase()];
    if (!currentPrice) {
      return { currentPrice: 'N/A', currentValue: 'N/A', returnPercentage: 'N/A', returnClass: 'text-muted' };
    }

    const purchaseValue = asset.purchasePrice * asset.quantity;
    const currentValue = currentPrice * asset.quantity;
    const returnPercentage = purchaseValue === 0 ? 0 : ((currentValue - purchaseValue) / purchaseValue) * 100;

    const returnClass = returnPercentage >= 0 ? 'text-success' : 'text-danger';

    return {
      currentPrice: currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      currentValue: currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      returnPercentage: returnPercentage.toFixed(2),
      returnClass
    };
  };

  if (isLoading && assets.length > 0) {
    return <div className="text-center"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title mb-0">내 자산 목록</h5>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th style={{ width: '5%' }}>★</th>
                <th>종목</th>
                <th className="text-end">{`구매 단가 (${currencySymbol})`}</th>
                <th className="text-end">수량</th>
                <th className="text-end">{`현재가 (${currencySymbol})`}</th>
                <th className="text-end">{`현재 가치 (${currencySymbol})`}</th>
                <th className="text-end">수익률 (%)</th>
                <th className="text-center">삭제</th>
                <th className="text-center">수정</th>
              </tr>
            </thead>
            <tbody>
              {assets.length > 0 ? (
                assets.map((asset, index) => {
                  const { currentPrice, currentValue, returnPercentage, returnClass } = calculateReturn(asset);
                  const isFavorite = favorites.includes(asset.ticker);
                  return (
                    <tr key={index}>
                      <td>
                        <button 
                          className={`btn btn-sm btn-link p-0 ${isFavorite ? 'text-warning' : 'text-muted'}`}
                          onClick={() => toggleFavorite(asset.ticker)}
                          title="Toggle Favorite"
                        >
                          {isFavorite ? '★' : '☆'}
                        </button>
                      </td>
                      <td><strong>{asset.ticker}</strong></td>
                      <td className="text-end">{currencySymbol}{asset.purchasePrice.toLocaleString()}</td>
                      <td className="text-end">{asset.quantity}</td>
                      <td className="text-end">{currencySymbol}{currentPrice}</td>
                      <td className="text-end">{currencySymbol}{currentValue}</td>
                      <td className={`text-end fw-bold ${returnClass}`}>{returnPercentage}%</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => onEdit(asset)}
                          title={`Edit ${asset.ticker}`}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteAsset(asset.ticker)}
                          title={`Delete ${asset.ticker}`}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-muted">추가된 자산이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssetList;
