# Mallnest Business

App para comerciantes: conectan su tienda Shopify y gestionan su local en Mallnest desde el celular.
Parte del monorepo de Mallnest (ver el [README](../../README.md) y [`docs/arquitectura.md`](../../docs/arquitectura.md)).

> Estado: **mock visual**. Usa datos de ejemplo. Todavía no se conecta con AWS, Shopify ni Gemini, y el login es simulado.

## Stack

- React Native + Expo (Expo Router) + TypeScript

## Cómo correrla

Desde la raíz del repo:

```bash
npm install
npm run business
```

En el login, "Entrar como administradora (demo)" habilita el panel de aprobación.

## Pantallas

| Ruta | Pantalla |
|------|----------|
| `/login` | Registro / login (después: Cognito con mail o Google) |
| `/onboarding` | Alta en 3 pasos: conectar Shopify, personalizar, publicar |
| `/home` | Estado de la tienda y accesos rápidos |
| `/brand` | Marca: nombre, frase (con sugerencias de IA), rubro, logo y color |
| `/vitrina` | Banners (con sugerencias de IA) y colecciones del inicio |
| `/preview` | Vista previa de la tienda como la ve el cliente |
| `/share` | Link y QR de la tienda |
| `/admin` | Aprobación de tiendas (solo administradora) |

## Estructura

```
src/
├── app/          # Pantallas (Expo Router)
├── components/   # Componentes propios de esta app (los compartidos están en @mallnest/ui)
├── data/         # Datos de ejemplo del comerciante
├── services/     # Hoy mock, después AWS / Shopify / Gemini
├── state/        # Estado del comerciante (sesión, Shopify, tienda, aprobación)
└── theme/        # La marca de la app (platformTheme); el sistema de temas está en @mallnest/ui
```

Los tipos están en `@mallnest/core`, y el sistema de temas, `ui`, `store-logo`, `product-card` y `store-home` en `@mallnest/ui`: la vista previa muestra la tienda con los mismos componentes que la app Mallnest.

## Próximos pasos

- Login real con Cognito y conexión con Shopify por OAuth (el token se guarda solo en el backend).
- Guardar la configuración en AWS (DynamoDB / S3).
- IA: la Lambda `ai` con Gemini y cadena de fallback (`src/services/ai.ts` simula la interfaz).
- QR real a partir del link.
