import React from 'react';

function PortfolioSummary({ assets, currentPrices, currency }) {
  const currencySymbol = currency === 'USD' ? '$' : '₩';

  const calculateTotals = () => {
    let totalPurchaseValue = 0;
    let totalCurrentValue = 0;

    assets.forEach(asset => {
      const currentPrice = currentPrices[asset.ticker.toUpperCase()];
      totalPurchaseValue += asset.purchasePrice * asset.quantity;
      // If price is available, add to current value, otherwise, for calculation purposes, consider it same as purchase
      if (currentPrice) {
        totalCurrentValue += currentPrice * asset.quantity;
      } else {
        totalCurrentValue += asset.purchasePrice * asset.quantity;
      }
    });

    const totalReturn = totalCurrentValue - totalPurchaseValue;
    const totalReturnPercentage = (totalPurchaseValue === 0) ? 0 : (totalReturn / totalPurchaseValue) * 100;

    const returnClass = totalReturn >= 0 ? 'text-success' : 'text-danger';

    return {
      totalCurrentValue: totalCurrentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalReturn: totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
      totalReturnPercentage: totalReturnPercentage.toFixed(2),
      returnClass
    };
  };

  const { totalCurrentValue, totalReturn, totalReturnPercentage, returnClass } = calculateTotals();

  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title mb-0">포트폴리오 요약</h5>
      </div>
      <div className="card-body text-center">
        <div className="row">
          <div className="col-6">
            <h6>총 자산</h6>
            <p className="fs-4">{currencySymbol}{totalCurrentValue}</p>
          </div>
          <div className="col-6">
            <h6>총 수익</h6>
            <p className={`fs-4 ${returnClass}`}>{currencySymbol}{totalReturn}</p>
            <small className={returnClass}>({totalReturnPercentage}%)</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioSummary;
