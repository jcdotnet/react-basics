import {render, screen } from '@testing-library/react';
import App from './App';

test('Renders Heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading')
  expect(heading).toBeInTheDocument();
})
