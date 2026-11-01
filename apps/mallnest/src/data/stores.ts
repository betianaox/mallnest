import { type Store } from '@mallnest/core';

// Tres tiendas de ejemplo (decisión 11). Son ficticias y se muestran como demo.
// Más adelante este listado lo devuelve el backend en AWS.
export const DEMO_STORES: Store[] = [
  {
    id: 'aurora',
    slug: 'aurora-studio',
    name: 'Aurora Studio',
    tagline: 'Ropa urbana y básicos de autor',
    category: 'Moda',
    brand: {
      primary: '#C2410C',
      secondary: '#FDEBD8',
      background: '#FFF8F1',
      text: '#2B1A10',
      logoText: 'A',
    },
    vitrina: {
      banners: [
        { id: 'b1', title: 'Nueva temporada', subtitle: 'Primavera / verano', collectionId: 'aurora-new' },
        { id: 'b2', title: 'Básicos', subtitle: 'Los que nunca fallan', collectionId: 'aurora-basics' },
      ],
      featuredCollectionIds: ['aurora-new', 'aurora-basics'],
    },
    createdAt: '2026-11-01',
    featured: false,
    sortScore: 3,
    status: 'approved',
    isDemo: true,
  },
  {
    id: 'grano',
    slug: 'grano-y-brasa',
    name: 'Grano & Brasa',
    tagline: 'Café de especialidad tostado cada semana',
    category: 'Cafetería',
    brand: {
      primary: '#3F6212',
      secondary: '#E7F0D6',
      background: '#F8FAF3',
      text: '#1A2410',
      logoText: 'G&B',
    },
    vitrina: {
      banners: [
        {
          id: 'b1',
          title: 'Tostado de la semana',
          subtitle: 'Etiopía Yirgacheffe',
          collectionId: 'grano-coffee',
        },
      ],
      featuredCollectionIds: ['grano-coffee', 'grano-gear'],
    },
    createdAt: '2026-11-01',
    featured: false,
    sortScore: 2,
    status: 'approved',
    isDemo: true,
  },
  {
    id: 'lumen',
    slug: 'casa-lumen',
    name: 'Casa Lumen',
    tagline: 'Objetos y deco para habitar con calma',
    category: 'Deco',
    brand: {
      primary: '#1E3A8A',
      secondary: '#DCE6FA',
      background: '#F6F8FD',
      text: '#0F1A33',
      logoText: 'L',
    },
    vitrina: {
      banners: [
        { id: 'b1', title: 'Luz cálida', subtitle: 'Lámparas y velas', collectionId: 'lumen-light' },
        { id: 'b2', title: 'Textiles', subtitle: 'Mantas y almohadones', collectionId: 'lumen-textile' },
      ],
      featuredCollectionIds: ['lumen-light', 'lumen-textile'],
    },
    createdAt: '2026-11-01',
    featured: false,
    sortScore: 1,
    status: 'approved',
    isDemo: true,
  },
];
