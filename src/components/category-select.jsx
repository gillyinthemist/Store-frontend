import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function CategorySelect({
  categories,
  selectedCategory,
  onChange,
}) {
  return (
    <FormControl margin="normal" sx={{ flex: 1, minWidth: '120px' }}>
      <InputLabel id="category-label">Category</InputLabel>
      <Select
        labelId="category-label"
        id="category"
        value={selectedCategory}
        onChange={onChange}
        label="Category"
      >
        {categories.map((category) => (
          <MenuItem key={category} value={category}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
