import { render, screen } from '@testing-library/react';
import App from './App';

test('renders BookNest app', () => {
  render(<App />);
  const headingElement = screen.getByText(/BookNest/i);
  expect(headingElement).toBeInTheDocument();
});
