import { DEMO_STORES } from '@/data/stores';
import { type Store } from '@mallnest/core';

// Capa de servicios: las pantallas solo hablan con estas funciones.
// Hoy devuelven datos de ejemplo; después llaman a las Lambdas de AWS
// sin que cambien las pantallas.

/**
 * Orden flexible del listado (decisión 16): destacadas primero, después por
 * puntaje y por fecha de alta. Cambiar el criterio no requiere tocar pantallas.
 */
function sortStores(stores: Store[]): Store[] {
  return [...stores].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    if (a.sortScore !== b.sortScore) return b.sortScore - a.sortScore;
    return b.createdAt.localeCompare(a.createdAt);
  });
}

/** Tiendas aprobadas, listas para mostrar en el listado. */
export async function getApprovedStores(): Promise<Store[]> {
  return sortStores(DEMO_STORES.filter((s) => s.status === 'approved'));
}

export async function getStoreById(id: string): Promise<Store | undefined> {
  return DEMO_STORES.find((s) => s.id === id);
}

/** Para el link y el QR de cada tienda: mallnest.app/t/<slug> */
export async function getStoreBySlug(slug: string): Promise<Store | undefined> {
  return DEMO_STORES.find((s) => s.slug === slug);
}
