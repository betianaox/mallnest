import { type Collection, type Product } from '@mallnest/core';

// Catálogo de ejemplo. Más adelante sale de la Storefront API de Shopify de cada tienda.

export const DEMO_COLLECTIONS: Collection[] = [
  { id: 'aurora-new', storeId: 'aurora', title: 'Nueva temporada' },
  { id: 'aurora-basics', storeId: 'aurora', title: 'Básicos' },
  { id: 'grano-coffee', storeId: 'grano', title: 'Café en grano' },
  { id: 'grano-gear', storeId: 'grano', title: 'Accesorios' },
  { id: 'lumen-light', storeId: 'lumen', title: 'Iluminación' },
  { id: 'lumen-textile', storeId: 'lumen', title: 'Textiles' },
];

const ARS = 'ARS';

export const DEMO_PRODUCTS: Product[] = [
  // Aurora Studio
  {
    id: 'p-aurora-1',
    storeId: 'aurora',
    collectionIds: ['aurora-new'],
    title: 'Campera rompeviento',
    price: 68000,
    currency: ARS,
    description: 'Liviana, repelente al agua y con capucha guardable.',
    options: [
      { name: 'Talle', values: ['S', 'M', 'L', 'XL'] },
      { name: 'Color', values: ['Terracota', 'Negro'] },
    ],
  },
  {
    id: 'p-aurora-2',
    storeId: 'aurora',
    collectionIds: ['aurora-new'],
    title: 'Pantalón cargo',
    price: 52000,
    currency: ARS,
    description: 'Gabardina con bolsillos laterales y calce relajado.',
    options: [{ name: 'Talle', values: ['38', '40', '42', '44'] }],
  },
  {
    id: 'p-aurora-3',
    storeId: 'aurora',
    collectionIds: ['aurora-basics'],
    title: 'Remera oversize',
    price: 21000,
    currency: ARS,
    description: 'Algodón peinado 24/1, cuello reforzado.',
    options: [
      { name: 'Talle', values: ['S', 'M', 'L'] },
      { name: 'Color', values: ['Blanco', 'Arena', 'Negro'] },
    ],
  },
  {
    id: 'p-aurora-4',
    storeId: 'aurora',
    collectionIds: ['aurora-basics'],
    title: 'Buzo con capucha',
    price: 45000,
    currency: ARS,
    description: 'Frisa invisible, abrigado y suave.',
    options: [{ name: 'Talle', values: ['S', 'M', 'L', 'XL'] }],
  },
  // Grano & Brasa
  {
    id: 'p-grano-1',
    storeId: 'grano',
    collectionIds: ['grano-coffee'],
    title: 'Etiopía Yirgacheffe 250 g',
    price: 16500,
    currency: ARS,
    description: 'Notas florales y cítricas. Tueste claro.',
    options: [{ name: 'Molienda', values: ['En grano', 'Filtro', 'Espresso'] }],
  },
  {
    id: 'p-grano-2',
    storeId: 'grano',
    collectionIds: ['grano-coffee'],
    title: 'Colombia Huila 250 g',
    price: 14800,
    currency: ARS,
    description: 'Chocolate, caramelo y cuerpo medio.',
    options: [{ name: 'Molienda', values: ['En grano', 'Filtro', 'Espresso'] }],
  },
  {
    id: 'p-grano-3',
    storeId: 'grano',
    collectionIds: ['grano-gear'],
    title: 'Prensa francesa 600 ml',
    price: 32000,
    currency: ARS,
    description: 'Vidrio borosilicato y filtro de acero.',
    options: [],
  },
  // Casa Lumen
  {
    id: 'p-lumen-1',
    storeId: 'lumen',
    collectionIds: ['lumen-light'],
    title: 'Lámpara de mesa Nube',
    price: 89000,
    currency: ARS,
    description: 'Pantalla de papel de arroz y base de madera.',
    options: [{ name: 'Color', values: ['Natural', 'Blanco'] }],
  },
  {
    id: 'p-lumen-2',
    storeId: 'lumen',
    collectionIds: ['lumen-light'],
    title: 'Vela de soja Bosque',
    price: 18500,
    currency: ARS,
    description: 'Aroma a cedro y pino. 40 horas de duración.',
    options: [],
  },
  {
    id: 'p-lumen-3',
    storeId: 'lumen',
    collectionIds: ['lumen-textile'],
    title: 'Manta tejida',
    price: 64000,
    currency: ARS,
    description: 'Algodón y lana, 130 x 170 cm.',
    options: [{ name: 'Color', values: ['Crudo', 'Azul noche'] }],
  },
];
