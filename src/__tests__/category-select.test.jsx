import { render, screen, fireEvent } from '@testing-library/react';
import CategorySelect from '../components/category-select';
import { describe, it, expect } from 'vitest';

describe('CategorySelect component', () => {
  it('renders with the correct label', () => {
    const categories = ['Books', 'Electronics', 'Furniture'];
    const { getByLabelText } = render(
      <CategorySelect
        categories={categories}
        selectedCategory=""
        onChange={() => {}}
      />
    );
    expect(getByLabelText('Category')).toBeInTheDocument();
  });

  it('lists all categories', () => {
    const categories = ['Books', 'Electronics', 'Furniture'];
    const { getByRole, getAllByRole } = render(
      <CategorySelect
        categories={categories}
        selectedCategory=""
        onChange={() => {}}
      />
    );
    fireEvent.mouseDown(getByRole('button')); // Open the dropdown
    const options = getAllByRole('option');
    expect(options.length).toBe(categories.length);
    expect(options.map((option) => option.textContent)).toEqual(categories);
  });

  it('calls onChange handler when a category is selected', () => {
    const categories = ['Books', 'Electronics', 'Furniture'];
    const onChangeMock = vi.fn();
    const { getByRole } = render(
      <CategorySelect
        categories={categories}
        selectedCategory=""
        onChange={onChangeMock}
      />
    );
    fireEvent.mouseDown(getByRole('button')); // Open the dropdown
    fireEvent.click(getByRole('option', { name: 'Electronics' }));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: 'Electronics' }),
      })
    );
  });
});
