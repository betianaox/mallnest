import { MERCHANT_COLLECTIONS, MERCHANT_PRODUCTS } from '@/data/merchant';
import { type Collection, type Product } from '@mallnest/core';

// Hoy: datos de ejemplo. Después: el catálogo de la tienda Shopify conectada.

export async function getMerchantCollections(): Promise<Collection[]> {
  return MERCHANT_COLLECTIONS;
}

export async function getMerchantProducts(): Promise<Product[]> {
  return MERCHANT_PRODUCTS;
}

export { formatPrice } from '@mallnest/core';
