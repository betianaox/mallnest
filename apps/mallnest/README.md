# Mallnest

App para compradores: un shopping de tiendas Shopify en una sola app.
Parte del monorepo de Mallnest (ver el [README](../../README.md) y [`docs/arquitectura.md`](../../docs/arquitectura.md)).

> Estado: **mock visual**. Usa datos de ejemplo. Todavía no se conecta con AWS, Shopify ni Gemini, y no tiene login.

## Stack

- React Native + Expo (Expo Router) + TypeScript

## Cómo correrla

Desde la raíz del repo:

```bash
npm install
npm run app
```

Escaneá el QR con Expo Go o abrí un emulador Android.
Para probar el acceso por link: `npx uri-scheme open mallnest://t/aurora-studio --android`

## Pantallas

| Ruta | Pantalla |
|------|----------|
| `/` | Entrada: decide si mostrar el listado o abrir la tienda predeterminada |
| `/stores` | Listado de tiendas con buscador y acceso al personal shopper |
| `/shopper` | Personal shopper con IA: busca en todas las tiendas |
| `/t/[slug]` | Acceso por link o QR de una tienda |
| `/store/[storeId]` | Inicio de la tienda (marca, banners, colecciones) |
| `/store/[storeId]/catalog` | Catálogo con filtros por colección |
| `/store/[storeId]/search` | Búsqueda inteligente (IA) o común dentro de la tienda |
| `/store/[storeId]/product/[productId]` | Detalle de producto con variantes |
| `/store/[storeId]/cart` | Carrito de la tienda |
| `/store/[storeId]/checkout` | Checkout simulado (después: Shopify Checkout Kit) |

## Estructura

```
src/
├── app/          # Pantallas (Expo Router)
├── components/   # Componentes propios de esta app (los compartidos están en @mallnest/ui)
├── data/         # Datos de ejemplo (3 tiendas demo)
├── services/     # Única puerta a los datos: hoy mock, después AWS / Shopify / Gemini
├── state/        # Estado global (tienda predeterminada, carrito por tienda)
└── theme/        # La marca de la app (platformTheme); el sistema de temas está en @mallnest/ui
```

Las pantallas solo usan `src/services`. Para conectar el backend real se reemplaza la implementación de los servicios sin tocar las pantallas.

## Próximos pasos

- Servicios reales: listado de tiendas desde AWS, catálogo desde la Storefront API de Shopify.
- IA: la Lambda `ai` con Gemini y cadena de fallback (`src/services/ai.ts` simula la interfaz).
- Guardar la tienda predeterminada en el dispositivo.
- Checkout con Shopify Checkout Kit.
