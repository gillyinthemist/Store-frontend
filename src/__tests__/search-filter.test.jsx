import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import SearchFilter from '../components/search-filter';

describe('SearchFilter component', () => {
  it('input should update on change', () => {
    const handleChange = jest.fn();
    render(<SearchFilter query="" onChange={handleChange} />);

    const inputElement = screen.getByLabelText(/search products/i);
    fireEvent.change(inputElement, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
