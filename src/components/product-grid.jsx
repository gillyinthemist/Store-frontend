import { Grid } from '@mui/material';
import ProductCard from './product-card';

export default function ProductGrid({ products }) {
  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
          <ProductCard product={product} />
        </Grid>
      ))}
    </Grid>
  );
}
