# Mallnest — Arquitectura y decisiones

> Documento vivo con las definiciones de producto y arquitectura tomadas hasta ahora.
> Última actualización: 31/10/2026 (renombrado de Shopnest a Mallnest)

---

## 1. Resumen del producto

Mallnest es una plataforma de tiendas online para comerciantes que usan **Shopify**, compuesta por **dos apps móviles** publicadas en Google Play desde la cuenta propia (ImagoStack):

- **Mallnest** (clientes): una sola app que reúne todas las tiendas. El cliente elige una tienda, que queda como predeterminada, y compra dentro de la app con la marca (logo y colores) de esa tienda.
- **Mallnest Business** (comerciantes): el comerciante conecta su tienda Shopify y gestiona desde el celular cómo se ve su tienda en Mallnest.

Al principio el producto es **gratis**. La monetización **está a definir a futuro**, según cómo crezca el producto. Opciones consideradas hasta ahora:

- Cobrar a las tiendas por aparecer **destacadas** en el listado.
- Cobrar un **pequeño porcentaje por transacción**, si el volumen de ventas crece.

Etapas previstas:

1. **Lanzamiento gratuito**: conectar Shopify, crear la tienda, personalizarla y aparecer en el listado es gratis. Sin comisiones.
2. **Crecimiento**: medir comerciantes registrados, tiendas configuradas y activas, compradores que usan la app y compras generadas.
3. **Monetización**: cuando estar en Mallnest aporte valor, cobrar por visibilidad o funciones adicionales (destacadas, promociones, herramientas avanzadas). Entrar y la personalización básica siguen siendo gratis.

El mayor riesgo a validar no es conseguir comerciantes, sino **atraer compradores** suficientes para que tener un local en Mallnest sea valioso.

### Objetivos

1. Publicar un producto real en Play Store (no un proyecto de portfolio).
2. Ganar experiencia real en **Shopify** y **AWS serverless**, que aparecen con frecuencia en avisos de trabajo.
3. Costo **$0** mientras el uso sea bajo.
4. Que la arquitectura **escale** si el producto crece.

---

## 2. Decisiones tomadas

| # | Decisión | Motivo |
|---|----------|--------|
| 1 | Nombre: **Mallnest** (y **Mallnest Business**) | Comunica "un shopping de tiendas" (refuerza el concepto de local dentro de un shopping), es internacional, no se encontraron apps con ese nombre y se despega de las búsquedas de Shopify y apps parecidas (Shop, Shopney, Shoppy). |
| 2 | **Una sola app cliente** con todas las tiendas, publicada siempre desde la cuenta propia | Es el modelo que permiten las políticas de Play Store (app que agrupa clientes). Publicar una app por comerciante desde la misma cuenta está prohibido por la política de spam/plantillas. |
| 3 | **Nunca** se publican apps en cuentas de Play Store de terceros | Decisión de negocio: todo sale de la cuenta propia. |
| 4 | **Dos apps separadas**: cliente y comerciante | Mejor experiencia para cada tipo de usuario y mejor producto para vender al comerciante. Tienen propósitos distintos, así que no cuentan como apps duplicadas. |
| 5 | El comerciante gestiona **todo desde Mallnest Business** (no hay panel web) | Se le vende la experiencia de manejar su tienda desde el celular. |
| 6 | **Shopify** como motor de ecommerce | Productos, stock, carrito, checkout, pagos y pedidos ya resueltos. La app no maneja datos de tarjetas. |
| 7 | **AWS serverless** como backend propio | Configuración de cada tienda, listado de tiendas, conexión con Shopify. Costo $0 dentro de la capa gratuita y escala solo. |
| 8 | **React Native + Expo + TypeScript**, en un **monorepo** | Stack ya conocido. El monorepo permite compartir componentes, tema y clientes de API entre las dos apps. |
| 9 | Inicio de la app cliente: **listado de todas las tiendas con buscador** | Si hay una sola tienda, se entra directo. El cliente elige una y queda como predeterminada. |
| 9b | Desde cualquier tienda siempre se puede **volver al listado**, con un acceso **sutil** | Que la tienda elegida se sienta como "su app", sin perder la opción de ver otras. El acceso no está activo si hay una sola tienda. |
| 10 | Orden del listado: **orden propio por ahora** | La monetización está a definir. Si se cobra por posición, las tiendas pagas se marcarán como "Destacada" por transparencia. |
| 11 | Arrancar con **3 tiendas ficticias** de ejemplo | Validar el producto completo sin clientes reales. |
| 12 | Las tiendas nuevas requieren **aprobación** antes de aparecer | Control de contenido: Google considera responsable al dueño de la app por lo que se muestra. |
| 13 | AWS: plan **Free** al inicio, pasar a **Paid** antes de los 6 meses con alerta de presupuesto | El plan Free cierra la cuenta a los 6 meses. En Paid se sigue pagando $0 dentro de los servicios "siempre gratis". |
| 14 | Cada tienda tiene un **link y un QR** propios como **acceso directo adicional** (no necesario) | Los primeros compradores llegan desde las redes de cada comerciante. El link evita que tengan que buscar la tienda en el listado. El listado sigue siendo la entrada principal. |
| 15 | Posicionamiento: Mallnest es un **canal adicional** para comerciantes de Shopify, no un reemplazo de su tienda | "Un local dentro de un shopping": el comerciante mantiene su tienda propia y suma un canal móvil compartido. |
| 16 | **Orden del listado flexible** desde el inicio (tiendas nuevas, destacadas y orgánicas) | Permite evolucionar el catálogo y la monetización sin rediseñar. Sin algoritmo complejo por ahora. |
| 17 | Las tiendas de ejemplo se identifican como **demo** | No simular comerciantes reales. Además, las tiendas de desarrollo de Shopify no procesan pagos reales. |
| 19 | Uso **híbrido**: la app sirve tanto para descubrir tiendas nuevas como para acceder a las que el cliente ya conoce | Cada persona la usa como quiera: entrar directo a su tienda (predeterminada o por link) o explorar el listado. No se fuerza un único uso. |
| 20 | **IA con Gemini** (no la IA de AWS), con **fallback** si se queda sin cuota | Proveedor ya conocido (usado en Oráculos). La app nunca depende de la IA para funcionar. |
| 21 | Primera versión con **pocas funciones de IA, simples** | Suma en la descripción de la app y agrega integración con IA al proyecto (objetivo de posicionamiento profesional). |
| 18 | Alta de tienda en **3 pasos**: conectar Shopify, personalizar, publicar (enviar a aprobación) | La simplicidad es un diferencial. Comunicar que la aprobación puede demorar. No prometer "3 pasos" hasta validarlo con comerciantes reales. |

---

## 3. Apps y pantallas

### 3.1 Mallnest (cliente)

**Lógica al abrir la app**

0. Si el cliente llega por el **link o QR** de una tienda → entra directo a esa tienda y queda como predeterminada (acceso adicional, no obligatorio).
1. Si existe **una sola tienda** aprobada → entra directo a esa tienda.
2. Si el cliente ya **eligió una predeterminada** → entra directo a esa.
3. Si no → muestra el **listado de tiendas**.

**Pantallas (primera versión)**

| Pantalla | Descripción |
|----------|-------------|
| Listado de tiendas | Miniaturas de todas las tiendas aprobadas + buscador. Al elegir una, queda como predeterminada. Se oculta si hay una sola tienda. |
| Inicio de la tienda | Logo, colores, banners y colecciones configurados por el comerciante. |
| Catálogo | Colecciones y listado de productos. |
| Búsqueda | Búsqueda de productos dentro de la tienda. |
| Detalle de producto | Fotos, precio, descripción y variantes (talle, color, etc.). |
| Carrito | Un carrito por tienda (en Shopify cada carrito pertenece a una tienda). |
| Checkout | Checkout de Shopify dentro de la app (Checkout Kit para React Native). Pago como invitado en la primera versión. |
| Volver al listado | Siempre hay una forma de volver al inicio con todas las tiendas, pero **sutil** (no compite con la tienda). **No está activa si existe una sola tienda.** |

**Para versiones siguientes:** cuenta del cliente, historial de pedidos, favoritos, notificaciones push.

### 3.2 Mallnest Business (comerciante)

| Pantalla | Descripción |
|----------|-------------|
| Registro / login | Con mail o Google. |
| Conectar Shopify | Abre la autorización de Shopify (OAuth), el comerciante acepta y vuelve a la app conectado. |
| Marca | Logo, colores principales y miniatura para el listado de tiendas. |
| Vitrina | Banners y colecciones que aparecen en el inicio de su tienda, y su orden. |
| Vista previa | La tienda tal como la ve el cliente (usa los mismos componentes que la app cliente). |
| Estado | Pendiente de aprobación / publicada. |
| Compartir | Link y QR de su tienda para difundir en redes, WhatsApp o en el local. |
| Administración (solo la dueña de Mallnest) | Lista de tiendas registradas con interruptor para aprobarlas. Pantalla oculta, visible solo para el usuario administrador. |

**Para versiones siguientes:** pedidos recientes, edición de productos y precios (vía Admin API de Shopify), estadísticas.

Los productos, precios, stock y pedidos se siguen gestionando en Shopify.

---

## 4. Arquitectura

```
┌────────────────────┐        ┌────────────────────────┐
│ Mallnest Business  │        │ Mallnest (cliente)     │
│ (comerciante)      │        │                        │
└─────────┬──────────┘        └───────┬─────────┬──────┘
          │                           │         │
          │ config de tienda          │ config  │ productos, carrito,
          │ conexión Shopify          │ listado │ checkout
          ▼                           ▼         ▼
┌──────────────────────────────────────┐  ┌──────────────┐
│ AWS (backend propio)                 │  │ Shopify      │
│ Lambda · DynamoDB · S3 · Cognito     │──│ Storefront   │
│                                      │  │ API / Admin  │
└──────────────────────────────────────┘  │ API          │
                                          └──────────────┘
```

### 4.1 Qué hace cada parte

**Shopify**
- Productos, colecciones, stock, carrito, checkout, pagos y pedidos.
- **Storefront API** (GraphQL): la app cliente lee productos y arma el carrito.
- **Checkout Kit** para React Native: el pago se hace en el checkout de Shopify dentro de la app.
- **Admin API**: el backend la usa con el permiso que otorga cada comerciante al conectar su tienda.
- Se necesita una **app registrada en la cuenta de Shopify Partner** para que los comerciantes autoricen el acceso a su tienda.

**AWS**
- **Lambda** (Node.js + TypeScript): lógica del backend (listado de tiendas, configuración, conexión con Shopify, aprobación).
- **DynamoDB**: datos de cada tienda y su configuración.
- **S3**: logos, miniaturas y banners.
- **Cognito**: login de comerciantes (y de clientes en versiones futuras).
- Exposición de las Lambdas: **Function URLs** (sin costo extra) o **API Gateway HTTP API** (centavos por millón de peticiones).

**Apps (React Native + Expo)**
- Todo el diseño sale de un **tema central**: ningún color ni logo fijo en el código.
- La app cliente carga la configuración de la tienda elegida y aplica su tema.

### Qué resuelve cada comerciante en su Shopify (no Mallnest)

Mallnest **no es el vendedor**: cada compra es del comerciante, en su tienda Shopify. Todo lo que configura en Shopify se aplica automáticamente al checkout dentro de Mallnest.

| Tema | Cómo se resuelve |
|------|------------------|
| Pagos | Pasarela que el comerciante configure en Shopify. En Argentina, típicamente Mercado Pago (apps oficiales para Shopify). |
| Envíos | Zonas, tarifas, retiro en local, envío gratis: configurados en Shopify, o con apps de transportistas. |
| Facturación electrónica (Argentina) | Shopify no emite facturas ARCA por sí solo. El comerciante usa una app del Shopify App Store que las genera desde sus pedidos. |
| Impuestos, mails de confirmación, pedidos, devoluciones, stock | Shopify. |
| Atención al cliente | El comerciante. |

### 4.2 Links y QR de tienda (acceso adicional)

Formato de ejemplo: `mallnest.app/t/<tienda>`. El QR es el mismo link.

- **Si el cliente tiene la app**: Android App Links (archivo `assetlinks.json` en el dominio + configuración en la app) abren Mallnest directo en esa tienda.
- **Si no la tiene**: el link abre una página web simple con el logo de la tienda y botón de descarga. El botón va a Play Store con la tienda como referencia, y en la primera apertura la app la lee con la **Play Install Referrer API**.
- La página web incluye también un botón "Abrir en la app" (algunos navegadores internos, como el de Instagram, no saltan solos a la app).
- La página y el `assetlinks.json` pueden alojarse gratis al principio (por ejemplo, un subdominio de Vercel) y migrar a dominio propio después.
- No se usa Firebase Dynamic Links (dado de baja por Google).

### 4.3 Datos de cada tienda (orientativo)

Además de la marca y la vitrina, cada tienda guarda los datos necesarios para que el orden del listado sea flexible: **categoría**, **fecha de alta**, **si es destacada**, **puntaje de orden**, **estado de aprobación** y **si es demo**.

### 4.4 Seguridad

- El permiso de acceso a la tienda del comerciante (token de Admin API) se guarda **solo en el backend**, nunca en el celular.
- Las apps piden lo que necesitan a las Lambdas.

### 4.5 Estructura del monorepo

```
mallnest/
├── apps/
│   ├── mallnest/      # App cliente          (@mallnest/app, com.imagostack.mallnest)
│   └── business/      # App comerciante      (@mallnest/business, com.imagostack.mallnestbusiness)
├── packages/
│   ├── core/          # Tipos del dominio, formato y la cadena de fallback de la IA
│   ├── ui/            # Sistema de temas y componentes compartidos
│   └── shopify/       # Cliente de la Storefront API (GraphQL)
├── backend/           # Lambdas, DynamoDB, S3, Cognito (SST o CDK) — todavía no existe
└── docs/              # Este documento
```

- **npm workspaces**, sin herramientas extra. Expo detecta el monorepo solo (SDK 52 en adelante): no hay configuración de Metro a mano.
- Los paquetes no se compilan: exponen su código TypeScript (`main: src/index.ts`) y Metro lo empaqueta dentro de cada app.
- Cada app define su propio `platformTheme` (la marca) y lo pone en la raíz con `ThemeProvider`; el resto del sistema de temas vive en `@mallnest/ui`.
- La vista previa de Mallnest Business reutiliza la pantalla de tienda de la app cliente (`StoreHome` en `@mallnest/ui`).
- El backend va en el mismo repo para compartir los tipos de `@mallnest/core` con las apps.

### 4.6 Inteligencia artificial

**Proveedor:** Gemini (Google), llamado **solo desde el backend** (Lambda). La clave de la API nunca está en las apps.

**Cadena de fallback** (una sola función `ai` en el backend):

1. Modelo principal de Gemini.
2. Si responde "sin cuota" o falla: modelo más liviano de Gemini (suele tener cuota separada). Opcional: otro proveedor como respaldo.
3. Si todo falla: la app sigue funcionando **sin IA** (búsqueda común, textos manuales).

Además: límite de usos por usuario y por día, y alerta de consumo.

**Funciones de la primera versión**

| App | Función | Cómo funciona |
|-----|---------|---------------|
| Mallnest Business | **Sugerir con IA** los textos del local: frase de la tienda y textos de banners | Gemini propone opciones a partir del nombre, rubro y catálogo; el comerciante elige o edita. |
| Mallnest | **Búsqueda en lenguaje natural** dentro de cada tienda ("algo para regalar hasta 20.000") | Se envía la consulta y el catálogo de esa tienda (chico) a Gemini, que devuelve los productos que coinciden. Si la IA no está disponible, se usa la búsqueda común. |

**Regla:** la IA responde solo con datos reales del catálogo; nunca inventa productos ni características.

**Para etapas siguientes** (de la evaluación de ideas de IA):

- Descripciones de productos con IA (requiere permiso de escritura de productos en Shopify).
- Alta asistida: la IA arma el local completo a partir del catálogo.
- **Índice de productos de todas las tiendas** (sincronizado con webhooks de Shopify) → búsqueda en todo Mallnest y **personal shopper** (con modo "dentro de una tienda").
- Moderación asistida de tiendas nuevas, traducción automática, promociones, analista de ventas, recomendaciones personalizadas, búsqueda visual.

---

## 5. Costos

**Objetivo: $0.**

| Servicio | Situación |
|----------|-----------|
| Shopify Partner + tiendas de desarrollo | Gratis. Los comerciantes reales pagan su propio plan de Shopify. |
| AWS Lambda | Siempre gratis: 1 millón de peticiones y 400.000 GB-segundos por mes. |
| DynamoDB | Siempre gratis: 25 GB de almacenamiento y capacidad mensual de lectura/escritura. |
| Cognito | Siempre gratis hasta un volumen alto de usuarios activos mensuales. |
| S3 | Límites gratis menores; posible costo mínimo si crecen las imágenes. |
| API Gateway | No es siempre gratis; se evita con Function URLs o se usa HTTP API (centavos). |
| Google Play | Cuenta propia ya existente. |
| Gemini | Se usa dentro de su cuota gratuita mientras sea posible; con límites por usuario y fallback. Puede generar costos mínimos si crece el uso. |

**Cuidados en AWS**
- Elegir el plan **Free** al registrarse (créditos de USD 100, hasta USD 200 completando actividades).
- Configurar **alerta de presupuesto** (por ejemplo, USD 1).
- En el plan Free, no activar AWS Organizations, Control Tower ni IAM Identity Center (convierte la cuenta a Paid).
- Evitar servicios "siempre encendidos": EC2, RDS, NAT Gateway.
- Pasar a plan **Paid** antes de los 6 meses o al publicar, para que la cuenta no se cierre.

---

## 6. Políticas de Google Play

- Está prohibido publicar desde la propia cuenta apps hechas con plantillas en nombre de otros, y publicar varias apps casi idénticas. Por eso **una sola app cliente** con todas las tiendas.
- Dos apps con propósitos distintos (cliente y comerciante) desde la misma cuenta: permitido.
- Al ser dueña de la app, ImagoStack es responsable del contenido de las tiendas → aprobación previa de tiendas nuevas.

---

## 7. Nombre y presencia en Play Store

- Marca única internacional: **Mallnest** / **Mallnest Business**.
- **Título traducido por idioma** para aparecer en búsquedas, por ejemplo:
  - "Mallnest: Tiendas online" / "Mallnest: Online Stores" / "Mallnest: Lojas online"
  - "Mallnest Business: Tu tienda" / "Mallnest Business: Your Store"
- Nombres descartados por estar ocupados: Vitrina, Vitrin, Vitrio, Storely, Vendora.
- **Shopnest** fue el nombre anterior: se reemplazó por Mallnest porque "mall" representa mejor el producto y evita competir en búsquedas con "Shop" (la app Shop de Shopify, Shopney, Shoppy).
- A tener en cuenta: en español y portugués puede leerse "mal-nest" ("mal" = malo); en inglés se pronuncia "mol". Cuidarlo en el logo y la presentación.
- En las tiendas de apps, "mall" aparece mucho en apps de mapas de shoppings físicos. Concepto vecino a seguir: la app "The Mall" (feed unificado de compras online).

---

## 8. Plan de trabajo

1. **Preparar cuentas**: Shopify Partner, 3 tiendas de desarrollo con productos de prueba, cuenta AWS (plan Free + alerta).
2. **Backend base**: tabla de tiendas y Lambdas para leer y guardar la configuración.
3. **Mallnest (cliente)** con las 3 tiendas cargadas manualmente: validar el flujo completo de compra.
4. **Mallnest Business**: conexión con Shopify, personalización, vista previa y aprobación.
5. **Publicación** de las dos apps en Play Store.

---

## 9. Pendientes

- [ ] Verificar "Mallnest" en Play Store, disponibilidad de dominio (`mallnest.app`, `mallnest.com`, `getmallnest.com`) y búsqueda de marca (OMPI / INPI).
- [ ] Definir rubros, nombres y productos de las 3 tiendas ficticias.
- [ ] Elegir herramienta de infraestructura: SST o CDK.
- [ ] Elegir Function URLs o API Gateway HTTP API.
- [ ] Definir el modelo de datos de la tabla de tiendas.
- [ ] Definir el modelo de monetización (a futuro): tiendas destacadas, porcentaje por transacción u otro.
- [ ] Dominio para los links de tienda.
- [ ] Definir los modelos concretos de Gemini para la cadena de fallback y si se suma un segundo proveedor.

---

## 10. Alternativas descartadas

| Alternativa | Por qué se descartó |
|-------------|---------------------|
| Una app por comerciante (white label clásico), publicada en la cuenta de cada comerciante | Contradice la decisión de publicar siempre desde la cuenta propia. |
| Varias apps por comerciante en la cuenta propia | Prohibido por las políticas de Play Store (spam / plantillas). |
| Panel web del comerciante (Next.js o plantilla de Shopify) | Reemplazado por la app Mallnest Business. |
| Tienda web instalable (PWA) | Se priorizó estar en Play Store. |
| Firebase / Supabase como backend | Más simples, pero el objetivo incluye sumar experiencia en AWS. |
| IA de AWS (Bedrock) | Se eligió Gemini, ya conocido. |
