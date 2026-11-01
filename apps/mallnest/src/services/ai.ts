import { type AIProviderId, type Product, withFallback } from '@mallnest/core';
import { getProductsForStores } from '@/services/catalog';
import { getApprovedStores } from '@/services/stores';

// IA de Mallnest: personal shopper (documento, sección 4.6).
//
// Un solo motor con dos modos:
// - General: busca en todas las tiendas aprobadas (pantalla /shopper).
// - Dentro de una tienda: el mismo motor filtrado por storeId (búsqueda inteligente).
//
// En producción, la app NO llama a Gemini directamente: llama a la Lambda `ai`,
// que tiene la clave de la API y aplica la cadena de fallback:
//   1. modelo principal de Gemini
//   2. modelo liviano de Gemini (si el principal se queda sin cuota o falla)
//   3. sin IA: la app usa la búsqueda común
//
// Primera versión (pocas tiendas): el backend junta los catálogos de las tiendas
// aprobadas (con caché) y se los pasa a Gemini. Cuando crezca, se reemplaza por
// un índice de productos sincronizado con webhooks de Shopify, sin cambiar la app.
//
// Este archivo simula ese comportamiento para el mock.

interface ShopperResult {
  productIds: string[];
  explanation: string;
}

interface AIProvider {
  id: AIProviderId;
  shop(query: string, catalog: Product[]): Promise<ShopperResult>;
}

const STOP_WORDS = [
  'algo',
  'para',
  'quiero',
  'busco',
  'regalar',
  'regalo',
  'necesito',
  'tenés',
  'tienen',
  'unos',
  'unas',
];

/** Proveedor simulado: interpreta precio máximo y palabras clave de forma muy simple. */
function mockProvider(id: AIProviderId): AIProvider {
  return {
    id,
    async shop(query, catalog) {
      await new Promise((r) => setTimeout(r, 400));
      const q = query.toLowerCase();
      const priceRe = /(?:hasta|menos de|max(?:imo)?)\s*\$?\s*([\d.]+)/;
      const maxMatch = q.match(priceRe);
      const maxPrice = maxMatch ? Number(maxMatch[1].replace(/\./g, '')) : undefined;
      const words = q
        .replace(priceRe, '')
        .split(/\s+/)
        .filter((w) => w.length > 3 && !STOP_WORDS.includes(w));

      const matches = catalog.filter((p) => {
        if (maxPrice !== undefined && p.price > maxPrice) return false;
        if (words.length === 0) return true;
        const text = `${p.title} ${p.description}`.toLowerCase();
        return words.some((w) => text.includes(w.slice(0, -1)));
      });

      const parts: string[] = [];
      if (maxPrice !== undefined) parts.push(`hasta $${maxPrice.toLocaleString('es-AR')}`);
      if (words.length) parts.push(`relacionados con “${words.join(', ')}”`);
      return {
        productIds: matches.map((p) => p.id),
        explanation: parts.length ? `Busqué productos ${parts.join(' y ')}.` : 'Estas son algunas opciones.',
      };
    },
  };
}

const PROVIDERS: AIProvider[] = [mockProvider('gemini-principal'), mockProvider('gemini-liviano')];

export interface PersonalShopperResponse {
  products: Product[];
  explanation: string;
  provider: AIProviderId;
}

/**
 * Personal shopper.
 * - Sin storeId: busca en todas las tiendas aprobadas.
 * - Con storeId: busca solo en esa tienda.
 * Devuelve null si la IA no está disponible.
 */
export async function personalShopper(
  query: string,
  storeId?: string,
): Promise<PersonalShopperResponse | null> {
  if (!query.trim()) return null;
  const storeIds = storeId ? [storeId] : (await getApprovedStores()).map((s) => s.id);
  const catalog = await getProductsForStores(storeIds);
  const outcome = await withFallback(PROVIDERS, (p) => p.shop(query, catalog));
  if (!outcome) return null;
  return {
    products: catalog.filter((p) => outcome.result.productIds.includes(p.id)),
    explanation: outcome.result.explanation,
    provider: outcome.provider,
  };
}

export { AIQuotaExceededError, type AIProviderId } from '@mallnest/core';
