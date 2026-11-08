// Tipos del dominio de Mallnest.
// Hoy se llenan con datos de ejemplo (src/data). Más adelante:
// - Store y StoreBrand vendrán del backend en AWS (DynamoDB).
// - Collection y Product vendrán de la Storefront API de Shopify.

export type StoreStatus = 'pending' | 'approved';

export type StoreCategory = 'Moda' | 'Cafetería' | 'Deco' | 'Pastelería' | 'Mascotas' | 'Otros';

export interface StoreBrand {
  /** Color principal (botones, acentos). */
  primary: string;
  /** Color secundario (fondos de tarjetas, chips). */
  secondary: string;
  /** Fondo general de la tienda. */
  background: string;
  /** Color de texto sobre el fondo. */
  text: string;
  /** Texto corto que reemplaza al logo mientras no haya imágenes. */
  logoText: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  /** Colección a la que lleva el banner. */
  collectionId?: string;
  /** Ilustración del banner (nombre de un icono) mientras no haya foto. */
  icon?: string;
  /** Foto del banner; si está, reemplaza a la ilustración. */
  image?: string;
}

export interface StoreVitrina {
  banners: Banner[];
  /** Colecciones que se muestran en el inicio, en este orden. */
  featuredCollectionIds: string[];
}

export interface Store {
  id: string;
  /** Identificador para el link y el QR: mallnest.app/t/<slug> */
  slug: string;
  name: string;
  tagline: string;
  category: StoreCategory;
  brand: StoreBrand;
  vitrina: StoreVitrina;
  // Campos para que el orden del listado sea flexible (decisión 16).
  createdAt: string;
  featured: boolean;
  sortScore: number;
  status: StoreStatus;
  /** Tiendas de ejemplo: se muestran identificadas como demo (decisión 17). */
  isDemo: boolean;
}

export interface Collection {
  id: string;
  storeId: string;
  title: string;
}

export interface ProductVariantOption {
  name: string; // ej: "Talle"
  values: string[]; // ej: ["S", "M", "L"]
}

export interface Product {
  id: string;
  storeId: string;
  collectionIds: string[];
  title: string;
  description: string;
  price: number;
  currency: string;
  options: ProductVariantOption[];
  /** Ilustración del producto (nombre de un icono) mientras no haya foto. */
  icon?: string;
  /** Foto del producto (de Shopify); si está, reemplaza a la ilustración. */
  image?: string;
}

export interface CartLine {
  productId: string;
  title: string;
  price: number;
  currency: string;
  quantity: number;
  icon?: string;
  image?: string;
  /** Variante elegida, ej: { Talle: "M", Color: "Negro" } */
  selectedOptions: Record<string, string>;
}
