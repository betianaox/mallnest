import { type Store } from '@mallnest/core';

import { PHOTOS } from './photos';

// Tiendas de ejemplo (decisión 11). Son ficticias y se muestran como demo.
// Más adelante este listado lo devuelve el backend en AWS.
export const DEMO_STORES: Store[] = [
  {
    id: 'dulce',
    cover: PHOTOS.cov_dulce,
    slug: 'dulce-horno',
    name: 'Dulce Horno',
    tagline: 'Pastelería artesanal, horneada cada mañana',
    category: 'Pastelería',
    brand: {
      primary: '#BE185D',
      secondary: '#FCE7F1',
      background: '#FFF7FA',
      text: '#3B0A22',
      logoText: 'DH',
    },
    vitrina: {
      banners: [
        { id: 'b1', title: 'Tortas por encargo', subtitle: 'Con 48 h de anticipación', collectionId: 'dulce-tortas', icon: 'cake-variant', image: PHOTOS.ban_tortas },
        { id: 'b2', title: 'Cajas para regalar', subtitle: 'Desayunos y meriendas', collectionId: 'dulce-cajas', icon: 'gift-outline', image: PHOTOS.ban_cajas },
      ],
      featuredCollectionIds: ['dulce-tortas', 'dulce-masas', 'dulce-cajas'],
    },
    createdAt: '2026-11-07',
    featured: true,
    sortScore: 5,
    status: 'approved',
    isDemo: true,
  },
  {
    id: 'patitas',
    cover: PHOTOS.cov_patitas,
    slug: 'patitas',
    name: 'Patitas',
    tagline: 'Todo para tu perro y tu gato, con envío en el día',
    category: 'Mascotas',
    brand: {
      primary: '#0F766E',
      secondary: '#D5F2EE',
      background: '#F4FBFA',
      text: '#0B2724',
      logoText: 'P',
    },
    vitrina: {
      banners: [
        { id: 'b1', title: 'Semana del perro', subtitle: '15 % en alimentos', collectionId: 'patitas-perros', icon: 'dog', image: PHOTOS.ban_perro },
        { id: 'b2', title: 'Mundo gato', subtitle: 'Rascadores y snacks', collectionId: 'patitas-gatos', icon: 'cat', image: PHOTOS.ban_gato },
      ],
      featuredCollectionIds: ['patitas-perros', 'patitas-gatos', 'patitas-juguetes'],
    },
    createdAt: '2026-11-07',
    featured: true,
    sortScore: 4,
    status: 'approved',
    isDemo: true,
  },
  {
    id: 'aurora',
    cover: PHOTOS.cov_aurora,
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
        { id: 'b1', title: 'Nueva temporada', subtitle: 'Primavera / verano', collectionId: 'aurora-new', icon: 'hanger', image: PHOTOS.ban_moda },
        { id: 'b2', title: 'Básicos', subtitle: 'Los que nunca fallan', collectionId: 'aurora-basics', icon: 'tshirt-crew', image: PHOTOS.ban_basicos },
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
    cover: PHOTOS.cov_grano,
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
          icon: 'coffee',
          image: PHOTOS.ban_cafe,
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
    cover: PHOTOS.cov_lumen,
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
        { id: 'b1', title: 'Luz cálida', subtitle: 'Lámparas y velas', collectionId: 'lumen-light', icon: 'floor-lamp', image: PHOTOS.ban_luz },
        { id: 'b2', title: 'Textiles', subtitle: 'Mantas y almohadones', collectionId: 'lumen-textile', icon: 'sofa', image: PHOTOS.ban_textil },
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
