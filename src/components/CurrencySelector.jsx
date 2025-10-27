import React from 'react';

function CurrencySelector({ currency, setCurrency }) {
  return (
    <div className="btn-group">
      <button 
        type="button" 
        className={`btn ${currency === 'USD' ? 'btn-primary' : 'btn-outline-secondary'}`} 
        onClick={() => setCurrency('USD')}
      >
        USD
      </button>
      <button 
        type="button" 
        className={`btn ${currency === 'KRW' ? 'btn-primary' : 'btn-outline-secondary'}`} 
        onClick={() => setCurrency('KRW')}
      >
        KRW
      </button>
    </div>
  );
}

export default CurrencySelector;
