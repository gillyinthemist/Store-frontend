import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import App from '../App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
  });

  it('contains the correct heading', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Products/i)).toBeInTheDocument();
  });
});
