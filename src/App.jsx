import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from './ProTip';
import Copyright from './Copyright';
import ProductCard from './components/product-card';
import { useEffect, useState } from 'react';
import { fetchProducts } from './services/api-service';

export default function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      setProducts(await fetchProducts());
    }
    getProducts();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Products{' '}
        </Typography>

        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
