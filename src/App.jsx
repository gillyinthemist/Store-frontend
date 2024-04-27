import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { fetchProducts } from './services/api-service';
import {
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Alert,
  Paper,
  Toolbar,
} from '@mui/material';
import SearchFilter from './components/search-filter';
import SortSelect from './components/sort-select';
import CategorySelect from './components/category-select';
import ProductGrid from './components/product-grid';
import Copyright from './components/copyright';
export default function App() {
  const [products, setProducts] = useState([]);
  const [state, setState] = useState({ query: '', list: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortType, setSortType] = useState('none');
  const sortByField = 'title';

  useEffect(() => {
    async function getProducts() {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
        setState({ query: '', list: fetchedProducts });

        const uniqueCategories = Array.from(
          new Set(fetchedProducts.map((p) => p.category))
        );
        setCategories(['all', ...uniqueCategories]);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        setIsLoading(false);
      }
    }
    getProducts();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.title.toLowerCase().includes(value) &&
        (selectedCategory === 'all' || product.category === selectedCategory)
    );

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

  function handleSortChange(event) {
    const newSortType = event.target.value;
    setSortType(newSortType);
    const sortedProducts = sortFunc(state.list, newSortType, sortByField);
    setState({ ...state, list: sortedProducts });
  }

  function handleCategoryChange(event) {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    const filteredProducts = products.filter(
      (p) => p.category === newCategory || newCategory === 'all'
    );
    setState({ query: state.query, list: filteredProducts });
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Products
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {isLoading ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '50vh',
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Paper elevation={3} sx={{ p: 2 }}>
            <Toolbar
              disableGutters
              sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}
            >
              <SearchFilter query={state.query} onChange={handleChange} />
              <SortSelect sortType={sortType} onChange={handleSortChange} />
              <CategorySelect
                categories={categories}
                selectedCategory={selectedCategory}
                onChange={handleCategoryChange}
              />
            </Toolbar>
            <ProductGrid products={state.list} />
          </Paper>
        )}
      </Box>
      <Copyright />
    </Container>
  );
}
