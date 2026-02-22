import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AccountContainer from '../../components/AccountContainer';

const initialTransactions = [
  {
    id: '1',
    date: '2019-12-01',
    description: 'Initial Item',
    category: 'Income',
    amount: 1000,
  },
];

describe('Add transactions', () => {
  it('adds a new transaction to the frontend and calls a POST request', async () => {
    const createdTransaction = {
      id: '2',
      date: '2026-02-22',
      description: 'Coffee',
      category: 'Food',
      amount: -4.5,
    };

    global.fetch = vi
      .fn()
      .mockResolvedValueOnce({
        json: () => Promise.resolve(initialTransactions),
        ok: true,
        status: 200,
      })
      .mockResolvedValueOnce({
        json: () => Promise.resolve(createdTransaction),
        ok: true,
        status: 201,
      });

    render(<AccountContainer />);

    await screen.findByText('Initial Item');

    const user = userEvent.setup();
    const dateInput = document.querySelector('input[name="date"]');

    await user.type(dateInput, '2026-02-22');
    await user.type(screen.getByPlaceholderText('Description'), 'Coffee');
    await user.type(screen.getByPlaceholderText('Category'), 'Food');
    await user.type(screen.getByPlaceholderText('Amount'), '4.50');
    await user.click(screen.getByRole('button', { name: /add transaction/i }));

    expect(await screen.findByText('Coffee')).toBeInTheDocument();

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('http://localhost:6001/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: '2026-02-22',
          description: 'Coffee',
          category: 'Food',
          amount: '4.5',
        }),
      });
    });
  });
});
