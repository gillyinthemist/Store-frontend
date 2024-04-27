import { FormControl, TextField } from '@mui/material';

export default function SearchFilter({ query, onChange }) {
  return (
    <FormControl
      fullWidth
      margin="normal"
      sx={{ flex: 1, minWidth: '150px', marginRight: '16px' }}
    >
      <TextField
        id="search"
        label="Search Products"
        variant="outlined"
        onChange={onChange}
        value={query}
        type="search"
      />
    </FormControl>
  );
}
