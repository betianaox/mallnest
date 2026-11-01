// Cadena de fallback de la IA (documento de arquitectura, sección 4.6).
//
// Las dos apps la usan igual: se prueba cada proveedor en orden y, si todos
// fallan, la función devuelve null y la app sigue sin IA (búsqueda común o
// textos escritos a mano). En producción los proveedores viven en la Lambda
// `ai`, que es la única que tiene la clave de Gemini.

export type AIProviderId = 'gemini-principal' | 'gemini-liviano';

/** El proveedor se quedó sin cuota: se pasa al siguiente. */
export class AIQuotaExceededError extends Error {}

export interface AIProviderBase {
  id: AIProviderId;
}

/** Prueba cada proveedor en orden; si todos fallan devuelve null. */
export async function withFallback<P extends AIProviderBase, T>(
  providers: readonly P[],
  run: (provider: P) => Promise<T>,
): Promise<{ result: T; provider: AIProviderId } | null> {
  for (const provider of providers) {
    try {
      return { result: await run(provider), provider: provider.id };
    } catch {
      // Sin cuota (AIQuotaExceededError) o cualquier otro error: siguiente proveedor.
      continue;
    }
  }
  return null;
}
