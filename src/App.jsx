import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';
import ProductCard from './components/product-card';
import { useEffect, useState } from 'react';
import { fetchProducts } from './services/api-service';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export default function App() {
  //store all products
  const [products, setProducts] = useState([]);
  //stateful products
  const [state, setState] = useState({
    query: '',
    list: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  //get products on load
  useEffect(() => {
    async function getProducts() {
      setProducts(await fetchProducts());
      setState({
        query: '',
        list: await fetchProducts(),
      });
    }
    getProducts();
  }, []);

  // Store sortby order i.e. ascending or descending
  const [sortType, setSortType] = useState('ascending');

  // Sortby field i.e. title or description
  const sortByField = 'title';

  // Store filter/latest products
  const [result, setResult] = useState();

  // Filter products on typing in search input
  const handleChange = (e) => {
    const results = products.filter((product) => {
      if (e.target.value === '') return products;
      return product[sortByField]
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });

    setResult(results);

    setState({
      query: e.target.value,
      list: sortFunc(results, sortType, sortByField),
    });
  };

  // Sort products depending on sort type and available results
  function sortFunc(results, sortType, sortByField) {
    if (sortType === 'ascending') {
      results.sort((a, b) => (a[sortByField] < b[sortByField] ? -1 : 1));
    } else if (sortType === 'descending') {
      results.sort((a, b) => (b[sortByField] > a[sortByField] ? 1 : -1));
    }
    return results;
  }

  // Dropdown to sort products in ascending or descending order depending on title.
  function updateProducts(e) {
    setSortType(e);
    setState({
      query: state.query,
      list: !result
        ? sortFunc(products, e, sortByField)
        : sortFunc(result, e, sortByField),
    });
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Products{' '}
        </Typography>
        <FormControl>
          <TextField
            id="search"
            label="search"
            variant="outlined"
            onChange={handleChange}
            value={state.query}
            type="search"
          />

          <InputLabel id="sortby-label">Sort by</InputLabel>
          <Select
            labelId="sortby-label"
            id="sortby"
            defaultValue={'DEFAULT'}
            onChange={(e) => updateProducts(e.target.value)}
            label="Sort By"
          >
            <MenuItem value={'ascending'}>Ascending</MenuItem>
            <MenuItem value={'descending'}>Descending</MenuItem>
          </Select>
        </FormControl>
        {products.length > 0 && (
          <Grid container spacing={2}>
            {state.list.map((product) => (
              <Grid key={product.id} item xs={6}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        )}
        <Copyright />
      </Box>
    </Container>
  );
}
