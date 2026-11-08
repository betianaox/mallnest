import { type Collection, type Product, type Store } from '@mallnest/core';

// Datos de ejemplo del comerciante.
// Más adelante:
// - El catálogo sale de su tienda Shopify (Admin/Storefront API) al conectarla.
// - La configuración de la tienda se guarda en el backend de AWS.

export const MERCHANT_STORE_ID = 'mi-tienda';

/** Colecciones que "trae" la conexión simulada con Shopify. */
export const MERCHANT_COLLECTIONS: Collection[] = [
  { id: 'mt-new', storeId: MERCHANT_STORE_ID, title: 'Novedades' },
  { id: 'mt-sale', storeId: MERCHANT_STORE_ID, title: 'Ofertas' },
  { id: 'mt-gifts', storeId: MERCHANT_STORE_ID, title: 'Para regalar' },
];

export const MERCHANT_PRODUCTS: Product[] = [
  {
    id: 'mt-1',
    icon: 'cake-variant',
    storeId: MERCHANT_STORE_ID,
    collectionIds: ['mt-new'],
    title: 'Torta de frutillas',
    description: '',
    price: 34000,
    currency: 'ARS',
    options: [],
  },
  {
    id: 'mt-2',
    icon: 'cookie',
    storeId: MERCHANT_STORE_ID,
    collectionIds: ['mt-new', 'mt-gifts'],
    title: 'Alfajores de maicena x 6',
    description: '',
    price: 8900,
    currency: 'ARS',
    options: [],
  },
  {
    id: 'mt-3',
    icon: 'bread-slice',
    storeId: MERCHANT_STORE_ID,
    collectionIds: ['mt-sale'],
    title: 'Budín marmolado',
    description: '',
    price: 9200,
    currency: 'ARS',
    options: [],
  },
  {
    id: 'mt-4',
    icon: 'cupcake',
    storeId: MERCHANT_STORE_ID,
    collectionIds: ['mt-gifts'],
    title: 'Box de cupcakes',
    description: '',
    price: 13500,
    currency: 'ARS',
    options: [],
  },
  {
    id: 'mt-5',
    icon: 'food-apple',
    storeId: MERCHANT_STORE_ID,
    collectionIds: ['mt-sale', 'mt-new'],
    title: 'Tarta de manzana',
    description: '',
    price: 21000,
    currency: 'ARS',
    options: [],
  },
];

/** Paleta sugerida para elegir el color principal de la tienda. */
export const BRAND_PALETTE = [
  { primary: '#C2410C', secondary: '#FDEBD8', background: '#FFF8F1', text: '#2B1A10' },
  { primary: '#BE185D', secondary: '#FCE4F0', background: '#FFF7FB', text: '#2E0F1F' },
  { primary: '#3F6212', secondary: '#E7F0D6', background: '#F8FAF3', text: '#1A2410' },
  { primary: '#0F766E', secondary: '#D5F2EE', background: '#F3FBFA', text: '#0B2422' },
  { primary: '#1E3A8A', secondary: '#DCE6FA', background: '#F6F8FD', text: '#0F1A33' },
  { primary: '#16131F', secondary: '#ECEAF2', background: '#FAFAFC', text: '#16131F' },
];

/** Borrador inicial de la tienda del comerciante. */
export function createInitialStore(): Store {
  return {
    id: MERCHANT_STORE_ID,
    slug: 'mi-tienda',
    name: 'Mi tienda',
    tagline: 'Contá en una frase qué vendés',
    category: 'Otros',
    brand: { ...BRAND_PALETTE[0], logoText: 'M' },
    vitrina: {
      banners: [
        { id: 'banner-1', title: 'Bienvenidos', subtitle: 'Conocé lo nuevo', collectionId: 'mt-new', icon: 'gift-outline' },
      ],
      featuredCollectionIds: ['mt-new', 'mt-sale'],
    },
    createdAt: new Date().toISOString().slice(0, 10),
    featured: false,
    sortScore: 0,
    status: 'pending',
    isDemo: false,
  };
}

/** Tiendas registradas que ve la administradora (panel de aprobación). */
export interface AdminStoreRow {
  id: string;
  name: string;
  category: string;
  approved: boolean;
  isDemo: boolean;
}

export const ADMIN_STORES: AdminStoreRow[] = [
  { id: 'dulce', name: 'Dulce Horno', category: 'Pastelería', approved: true, isDemo: true },
  { id: 'patitas', name: 'Patitas', category: 'Mascotas', approved: true, isDemo: true },
  { id: 'aurora', name: 'Aurora Studio', category: 'Moda', approved: true, isDemo: true },
  { id: 'grano', name: 'Grano & Brasa', category: 'Cafetería', approved: true, isDemo: true },
  { id: 'lumen', name: 'Casa Lumen', category: 'Deco', approved: true, isDemo: true },
];
