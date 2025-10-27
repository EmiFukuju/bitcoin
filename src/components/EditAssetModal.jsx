import React, { useState, useEffect } from 'react';

function EditAssetModal({ isOpen, onClose, asset, updateAsset, currency }) {
  const [newQuantity, setNewQuantity] = useState('');
  const [newPurchasePrice, setNewPurchasePrice] = useState('');

  useEffect(() => {
    if (asset) {
      setNewQuantity(asset.quantity);
      setNewPurchasePrice(asset.purchasePrice);
    }
  }, [asset]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuantity || !newPurchasePrice) return;

    updateAsset(asset.ticker, parseFloat(newQuantity), parseFloat(newPurchasePrice));
    onClose();
  };

  if (!isOpen) return null;

  const currencySymbol = currency === 'USD' ? '$' : '₩';

  return (
    <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{asset.ticker} 자산 수정</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="editQuantity" className="form-label">수량</label>
                <input
                  type="number"
                  className="form-control"
                  id="editQuantity"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editPurchasePrice" className="form-label">구매 단가 ({currencySymbol})</label>
                <input
                  type="number"
                  className="form-control"
                  id="editPurchasePrice"
                  value={newPurchasePrice}
                  onChange={(e) => setNewPurchasePrice(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">저장</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditAssetModal;