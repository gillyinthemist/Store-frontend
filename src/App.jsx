import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
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
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({ query: '', list: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('none');
  const sortByField = 'title';
  const [result, setResult] = useState();

  useEffect(() => {
    async function getProducts() {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setState({ query: '', list: fetchedProducts });
      setIsLoading(false);

      // Set categories
      const uniqueCategories = Array.from(
        new Set(fetchedProducts.map((p) => p.category))
      );
      setCategories(['all', ...uniqueCategories]);
    }
    getProducts();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product[sortByField].toLowerCase().includes(value) &&
        (selectedCategory === 'all' || product.category === selectedCategory)
    );

    setResult(filteredProducts);

    setState({
      query: value,
      list: sortFunc(filteredProducts, sortType, sortByField),
    });
  };

  function sortFunc(results, sortType, sortByField) {
    return results.sort((a, b) =>
      sortType === 'ascending'
        ? a[sortByField].localeCompare(b[sortByField])
        : b[sortByField].localeCompare(a[sortByField])
    );
  }

  function updateProducts(sortType) {
    setSortType(sortType);
    setState({
      query: state.query,
      list: !result
        ? sortFunc(products, sortType, sortByField)
        : sortFunc(result, sortType, sortByField),
    });
  }

  function handleCategoryChange(event) {
    const category = event.target.value;
    setSelectedCategory(category);
    const filteredProducts = products.filter(
      (p) => p.category === category || category === 'all'
    );
    setState({ ...state, list: filteredProducts });
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Products
        </Typography>
        <FormControl fullWidth margin="normal">
          <TextField
            id="search"
            label="Search"
            variant="outlined"
            onChange={handleChange}
            value={state.query}
            type="search"
          />
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="sortby-label">Sort by</InputLabel>
          <Select
            labelId="sortby-label"
            id="sortby"
            value={sortType}
            onChange={(e) => updateProducts(e.target.value)}
            label="Sort By"
          >
            <MenuItem value="none" disabled>
              None
            </MenuItem>
            <MenuItem value="ascending">Ascending</MenuItem>
            <MenuItem value="descending">Descending</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal">
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid container spacing={2}>
          {state.list.map((product) => (
            <Grid key={product.id} item xs={12} sm={6} md={4}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
