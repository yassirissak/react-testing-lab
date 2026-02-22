import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AccountContainer from '../../components/AccountContainer';

const mockTransactions = [
  {
    id: '1',
    date: '2019-12-01',
    description: "Paycheck from Bob's Burgers",
    category: 'Income',
    amount: 1000,
  },
  {
    id: '2',
    date: '2019-12-06',
    description: 'Chipotle',
    category: 'Food',
    amount: -17.59,
  },
];

describe('Display transactions', () => {
  it('displays transactions on startup', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
        ok: true,
        status: 200,
      })
    );

    render(<AccountContainer />);

    expect(await screen.findByText("Paycheck from Bob's Burgers")).toBeInTheDocument();
    expect(screen.getByText('Chipotle')).toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:6001/transactions');
    });
  });
});
