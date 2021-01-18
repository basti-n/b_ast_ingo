import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the Bingo Headline', () => {
  render(<App />);
  const headline = screen.getByText(/Bingo/i);
  expect(headline).toBeInTheDocument();
});
