const BASE_URL = 'https://fakestoreapi.com/products';

export async function fetchProducts() {
  try {
    const response = await fetch(BASE_URL);
    return await response.json();
  } catch (error) {
    return 'Error fetching products';
  }
}
