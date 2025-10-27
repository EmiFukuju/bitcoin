import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AssetForm from '../components/AssetForm';

describe('AssetForm', () => {
  const supportedTickers = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
  };
  const addAsset = jest.fn();
  const currency = 'USD';

  beforeEach(() => {
    addAsset.mockClear();
  });

  test('renders AssetForm correctly', () => {
    render(<AssetForm addAsset={addAsset} supportedTickers={supportedTickers} currency={currency} />);
    expect(screen.getByText('새 자산 추가')).toBeInTheDocument();
    expect(screen.getByLabelText('종목')).toBeInTheDocument();
    expect(screen.getByLabelText('구매 단가')).toBeInTheDocument();
    expect(screen.getByLabelText('수량')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '자산 추가' })).toBeInTheDocument();
  });

  test('submits form with valid data', () => {
    render(<AssetForm addAsset={addAsset} supportedTickers={supportedTickers} currency={currency} />);

    fireEvent.change(screen.getByLabelText('종목'), { target: { value: 'BTC' } });
    fireEvent.change(screen.getByLabelText('구매 단가'), { target: { value: '50000' } });
    fireEvent.change(screen.getByLabelText('수량'), { target: { value: '0.5' } });

    fireEvent.click(screen.getByRole('button', { name: '자산 추가' }));

    expect(addAsset).toHaveBeenCalledTimes(1);
    expect(addAsset).toHaveBeenCalledWith({
      ticker: 'BTC',
      purchasePrice: 50000,
      quantity: 0.5,
      inputCurrency: 'USD',
    });

    // 폼 제출 후 입력 필드가 초기화되는지 확인
    expect(screen.getByLabelText('종목')).toHaveValue('');
    expect(screen.getByLabelText('구매 단가')).toHaveValue(null);
    expect(screen.getByLabelText('수량')).toHaveValue(null);
  });

  test('does not submit form with empty data', () => {
    render(<AssetForm addAsset={addAsset} supportedTickers={supportedTickers} currency={currency} />);

    fireEvent.click(screen.getByRole('button', { name: '자산 추가' }));

    expect(addAsset).not.toHaveBeenCalled();
  });
});
