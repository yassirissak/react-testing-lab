import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from '../components/App';

describe('App', () => {
  it('renders the bank title', () => {
    global.fetch = vi.fn(() => new Promise(() => {}));

    render(<App />);
    expect(screen.getByRole('heading', { name: /the royal bank of flatiron/i })).toBeInTheDocument();
  });
});
