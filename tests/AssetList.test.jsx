import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssetList from '../components/AssetList';

describe('AssetList', () => {
  const mockAssets = [
    { ticker: 'BTC', purchasePrice: 50000, quantity: 0.5 },
    { ticker: 'ETH', purchasePrice: 3000, quantity: 2 },
  ];
  const mockCurrentPrices = {
    BTC: 55000,
    ETH: 3200,
  };
  const mockFavorites = ['BTC'];
  const toggleFavorite = jest.fn();
  const deleteAsset = jest.fn();
  const onEdit = jest.fn();
  const currency = 'USD';

  beforeEach(() => {
    toggleFavorite.mockClear();
    deleteAsset.mockClear();
    onEdit.mockClear();
  });

  test('renders AssetList with assets', () => {
    render(
      <AssetList
        assets={mockAssets}
        currentPrices={mockCurrentPrices}
        isLoading={false}
        favorites={mockFavorites}
        toggleFavorite={toggleFavorite}
        deleteAsset={deleteAsset}
        onEdit={onEdit}
        currency={currency}
      />
    );

    expect(screen.getByText('내 자산 목록')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
    expect(screen.getByText('ETH')).toBeInTheDocument();
    expect(screen.getByText('$55,000.00')).toBeInTheDocument(); // Current Price for BTC
    expect(screen.getByText('$3,200.00')).toBeInTheDocument(); // Current Price for ETH
  });

  test('displays loading spinner when isLoading is true and assets exist', () => {
    render(
      <AssetList
        assets={mockAssets}
        currentPrices={mockCurrentPrices}
        isLoading={true}
        favorites={mockFavorites}
        toggleFavorite={toggleFavorite}
        deleteAsset={deleteAsset}
        onEdit={onEdit}
        currency={currency}
      />
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('displays no assets message when no assets', () => {
    render(
      <AssetList
        assets={[]}
        currentPrices={{}}
        isLoading={false}
        favorites={[]}
        toggleFavorite={toggleFavorite}
        deleteAsset={deleteAsset}
        onEdit={onEdit}
        currency={currency}
      />
    );
    expect(screen.getByText('추가된 자산이 없습니다.')).toBeInTheDocument();
  });

  test('calls toggleFavorite when favorite button is clicked', () => {
    render(
      <AssetList
        assets={mockAssets}
        currentPrices={mockCurrentPrices}
        isLoading={false}
        favorites={mockFavorites}
        toggleFavorite={toggleFavorite}
        deleteAsset={deleteAsset}
        onEdit={onEdit}
        currency={currency}
      />
    );

    fireEvent.click(screen.getAllByTitle('Toggle Favorite')[0]);
    expect(toggleFavorite).toHaveBeenCalledTimes(1);
    expect(toggleFavorite).toHaveBeenCalledWith('BTC');
  });

  test('calls deleteAsset when delete button is clicked', () => {
    render(
      <AssetList
        assets={mockAssets}
        currentPrices={mockCurrentPrices}
        isLoading={false}
        favorites={mockFavorites}
        toggleFavorite={toggleFavorite}
        deleteAsset={deleteAsset}
        onEdit={onEdit}
        currency={currency}
      />
    );

    fireEvent.click(screen.getByTitle('Delete BTC'));
    expect(deleteAsset).toHaveBeenCalledTimes(1);
    expect(deleteAsset).toHaveBeenCalledWith('BTC');
  });

  test('calls onEdit when edit button is clicked', () => {
    render(
      <AssetList
        assets={mockAssets}
        currentPrices={mockCurrentPrices}
        isLoading={false}
        favorites={mockFavorites}
        toggleFavorite={toggleFavorite}
        deleteAsset={deleteAsset}
        onEdit={onEdit}
        currency={currency}
      />
    );

    fireEvent.click(screen.getByTitle('Edit BTC'));
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(mockAssets[0]);
  });
});
