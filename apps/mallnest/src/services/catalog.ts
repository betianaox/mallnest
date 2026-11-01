import { DEMO_COLLECTIONS, DEMO_PRODUCTS } from '@/data/catalog';
import { type Collection, type Product } from '@mallnest/core';

// Hoy: datos de ejemplo. Después: consultas GraphQL a la Storefront API de Shopify
// de la tienda elegida.

export async function getCollections(storeId: string): Promise<Collection[]> {
  return DEMO_COLLECTIONS.filter((c) => c.storeId === storeId);
}

export async function getProducts(storeId: string, collectionId?: string): Promise<Product[]> {
  return DEMO_PRODUCTS.filter(
    (p) => p.storeId === storeId && (!collectionId || p.collectionIds.includes(collectionId)),
  );
}

export async function getProduct(productId: string): Promise<Product | undefined> {
  return DEMO_PRODUCTS.find((p) => p.id === productId);
}

export async function searchProducts(storeId: string, query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return DEMO_PRODUCTS.filter(
    (p) =>
      p.storeId === storeId && (p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
  );
}

/** Productos de todas las tiendas indicadas (para el personal shopper general). */
export async function getProductsForStores(storeIds: string[]): Promise<Product[]> {
  return DEMO_PRODUCTS.filter((p) => storeIds.includes(p.storeId));
}

export { formatPrice } from '@mallnest/core';
