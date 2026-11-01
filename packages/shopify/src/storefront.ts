// Cliente mínimo de la Storefront API de Shopify (GraphQL).
//
// Todavía no lo usa ninguna app: hoy el catálogo sale de datos de ejemplo.
// Cuando se conecte, cada tienda aporta su dominio y su token PÚBLICO de
// Storefront (es de solo lectura y está pensado para vivir en el cliente).
// El token de la Admin API, en cambio, nunca llega a las apps: vive en el backend.

export const STOREFRONT_API_VERSION = '2026-10';

export interface StorefrontConfig {
  /** mitienda.myshopify.com */
  domain: string;
  /** Token público de la Storefront API. */
  publicToken: string;
  apiVersion?: string;
}

export class StorefrontError extends Error {}

export function createStorefrontClient(config: StorefrontConfig) {
  const url = `https://${config.domain}/api/${config.apiVersion ?? STOREFRONT_API_VERSION}/graphql.json`;

  return {
    async query<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': config.publicToken,
        },
        body: JSON.stringify({ query, variables }),
      });
      if (!response.ok) throw new StorefrontError(`Storefront API: HTTP ${response.status}`);
      const body = (await response.json()) as { data?: T; errors?: { message: string }[] };
      if (body.errors?.length) throw new StorefrontError(body.errors.map((e) => e.message).join('; '));
      if (!body.data) throw new StorefrontError('Storefront API: respuesta sin datos');
      return body.data;
    },
  };
}

export type StorefrontClient = ReturnType<typeof createStorefrontClient>;
