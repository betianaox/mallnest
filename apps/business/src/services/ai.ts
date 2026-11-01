import { type AIProviderId, type Store, withFallback } from '@mallnest/core';

// IA de Mallnest Business (documento, sección 4.6).
//
// En producción, la app llama a la Lambda `ai` del backend, que tiene la clave
// de Gemini y aplica la cadena de fallback:
//   1. modelo principal de Gemini
//   2. modelo liviano de Gemini (si el principal se queda sin cuota o falla)
//   3. sin IA: el comerciante escribe los textos a mano
//
// Este archivo simula ese comportamiento para el mock.

interface AIProvider {
  id: AIProviderId;
  suggest(prompt: SuggestionRequest): Promise<string[]>;
}

type SuggestionRequest =
  { kind: 'tagline'; store: Store } | { kind: 'banner'; store: Store; collectionTitle?: string };

const TAGLINES: Record<string, string[]> = {
  Moda: [
    'Prendas para todos los días, con estilo propio',
    'Moda cómoda y de calidad',
    'Tu próximo favorito está acá',
  ],
  Cafetería: [
    'Café recién tostado, directo a tu taza',
    'Granos de especialidad para disfrutar en casa',
    'El ritual del café, bien hecho',
  ],
  Deco: [
    'Objetos que hacen hogar',
    'Deco simple para espacios con calma',
    'Detalles que transforman tus ambientes',
  ],
  Otros: ['Productos elegidos con dedicación', 'Lo que buscás, en un solo lugar', 'Calidad y buena atención'],
};

/** Proveedor simulado con respuestas de ejemplo. */
function mockProvider(id: AIProviderId): AIProvider {
  return {
    id,
    async suggest(request) {
      await new Promise((r) => setTimeout(r, 600));
      if (request.kind === 'tagline') return TAGLINES[request.store.category] ?? TAGLINES.Otros;
      const topic = request.collectionTitle ?? 'Novedades';
      return [`${topic} que te van a encantar`, `Descubrí ${topic.toLowerCase()}`, `${topic}: elegí la tuya`];
    },
  };
}

const PROVIDERS: AIProvider[] = [mockProvider('gemini-principal'), mockProvider('gemini-liviano')];

/** Sugerencias de frase para el local. null = IA no disponible. */
export function suggestTaglines(store: Store): Promise<string[] | null> {
  return withFallback(PROVIDERS, (p) => p.suggest({ kind: 'tagline', store })).then(
    (outcome) => outcome?.result ?? null,
  );
}

/** Sugerencias de título para un banner. null = IA no disponible. */
export function suggestBannerTitles(store: Store, collectionTitle?: string): Promise<string[] | null> {
  return withFallback(PROVIDERS, (p) => p.suggest({ kind: 'banner', store, collectionTitle })).then(
    (outcome) => outcome?.result ?? null,
  );
}

export { AIQuotaExceededError, type AIProviderId } from '@mallnest/core';
