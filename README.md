# Mallnest

Un shopping de tiendas Shopify en el celular. Dos apps Android de un mismo producto:

- **Mallnest** (`apps/mallnest`): para comprar. Listado de tiendas con buscador, la tienda elegida queda como predeterminada, personal shopper con IA y checkout de Shopify.
- **Mallnest Business** (`apps/business`): para comercios. Conectan su tienda Shopify y arman su local (marca, vitrina, link y QR) desde el teléfono.

> Estado: **mock visual**. Las dos apps funcionan con datos de ejemplo; todavía no se conectan con AWS, Shopify ni Gemini.

Las decisiones de producto y de arquitectura están en [`docs/arquitectura.md`](docs/arquitectura.md).

## Estructura

```
apps/
  mallnest/     App para comprar          → @mallnest/app
  business/     App para comercios        → @mallnest/business
packages/
  core/         Tipos, formato y cadena de fallback de la IA  → @mallnest/core
  ui/           Sistema de temas y componentes compartidos    → @mallnest/ui
  shopify/      Cliente de la Storefront API (GraphQL)        → @mallnest/shopify
docs/
  arquitectura.md
```

## Stack

- React Native + Expo (Expo Router) + TypeScript, en un monorepo con npm workspaces.
- Próximamente: backend serverless en AWS (Lambda, DynamoDB, S3, Cognito), Shopify (Storefront API, Admin API con OAuth, Checkout Kit) y Google Gemini con modelos de respaldo.

## Cómo correrlo

Todo se instala una sola vez, desde la raíz:

```bash
npm install
npm run app        # Mallnest
npm run business   # Mallnest Business
npm run typecheck  # las dos apps
```

Para agregar una dependencia a una app, desde su carpeta: `npx expo install <paquete>`.
