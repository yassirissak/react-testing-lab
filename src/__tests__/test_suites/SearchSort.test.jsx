import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
  {
    id: '3',
    date: '2019-12-09',
    description: 'Lyft Ride',
    category: 'Transportation',
    amount: -13.25,
  },
];

describe('Search and sort transactions', () => {
  it('updates the page when the search input changes', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
        ok: true,
        status: 200,
      })
    );

    render(<AccountContainer />);

    await screen.findByText('Chipotle');

    const searchInput = screen.getByPlaceholderText('Search your Recent Transactions');
    fireEvent.change(searchInput, { target: { value: 'chip' } });

    expect(screen.getByText('Chipotle')).toBeInTheDocument();
    expect(screen.queryByText('Lyft Ride')).not.toBeInTheDocument();
  });

  it('sorts transactions when sort value changes', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockTransactions),
        ok: true,
        status: 200,
      })
    );

    render(<AccountContainer />);

    await screen.findByText('Lyft Ride');

    const user = userEvent.setup();
    await user.selectOptions(screen.getByRole('combobox'), 'category');

    const rows = screen.getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Chipotle');
  });
});
