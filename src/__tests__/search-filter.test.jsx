import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import SearchFilter from '../components/search-filter';

describe('SearchFilter component', () => {
  it('renders with the correct label', () => {
    const { getByLabelText } = render(
      <SearchFilter query="" onChange={() => {}} />
    );
    expect(getByLabelText(/search products/i)).toBeInTheDocument();
  });

  it('displays the correct query value', () => {
    const testQuery = 'sample query';
    const { getByDisplayValue } = render(
      <SearchFilter query={testQuery} onChange={() => {}} />
    );
    expect(getByDisplayValue(testQuery)).toBeInTheDocument();
  });
});
