import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

export default function SortSelect({ sortType, onChange }) {
  return (
    <FormControl
      margin="normal"
      sx={{ flex: 1, minWidth: '120px', marginRight: '16px' }}
    >
      <InputLabel id="sortby-label">Sort by</InputLabel>
      <Select
        labelId="sortby-label"
        id="sortby"
        value={sortType}
        onChange={onChange}
        label="Sort By"
      >
        <MenuItem value="none" disabled>
          None
        </MenuItem>
        <MenuItem value="ascending">Ascending</MenuItem>
        <MenuItem value="descending">Descending</MenuItem>
      </Select>
    </FormControl>
  );
}
