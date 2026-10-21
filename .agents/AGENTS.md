# AGENTS.md — Retail XXX (prototipo PMV abandono de carrito)

Prototipo **frontend puro** (sin backend, sin pasarela de pago, sin API real de WhatsApp) que demuestra
4 soluciones a la tasa de abandono de carrito de "Retail XXX". Todo el estado es mock en React y se
persiste en `localStorage`.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor Vite con HMR |
| `npm run lint` | Oxlint (este repo **no** usa ESLint ni Prettier) |
| `npm run build` | `tsc -b && vite build` — **es el único typecheck**; no hay script `typecheck` |
| `npm run preview` | Sirve `dist/` |

No hay framework de tests, ni CI, ni hooks pre-commit, ni formatter. Verifica cambios con
`npm run lint` + `npm run build`.

## Arquitectura

- **Una sola pantalla, sin router.** `docs/CONTEXT.md` menciona rutas `/cart` y `/order-success` que
  **no existen**. La navegación es `state.currentStep`
  (`'cart' | 'checkout' | 'success' | 'whatsapp-mock'`), conmutado en `src/App.tsx:29`.
- **`src/context/CartContext.tsx` es la única fuente de verdad**: producto mock, precios, totales
  (`calculateTotal`), acciones de demo (`simulateAbandonment`, `recoverFromWhatsApp`, `completeOrder`,
  `toggleFreeShipping`, `resetDemo`) y persistencia en la clave `retail_xxx_cart_state`.
- `src/components/` = las 4 pantallas + `GpsMapTracker` (mapa SVG falso) + `StateInspectorModal`
  (**código muerto**: no se importa en ningún lado).
- Importa el hook como `import { useCart } from '../context/CartContext'` (ahí se re-exporta desde
  `useCart.ts`), no desde `useCart.ts` directamente.

## Convenciones y trampas

- `tsconfig.app.json`: `verbatimModuleSyntax` → imports solo-tipo **deben** ser `import type { X }`.
  `erasableSyntaxOnly` → sin `enum` ni parameter properties. `noUnusedLocals`/`noUnusedParameters` →
  **el build falla** con variables sin usar.
- `src/context/CartContext.tsx` lleva `/* oxlint-disable react/only-export-components */` en la línea 1
  porque exporta cosas que no son componentes. Consérvalo si agregas exports ahí.
- Todo el copy de UI es **español (Chile)**: montos en CLP con `toLocaleString('es-CL')`. Escribe el
  copy nuevo en español.
- **Tailwind v4 sin `tailwind.config.js`**: los tokens y keyframes custom van en `src/index.css`
  (`@import "tailwindcss"` + `@layer base`). Ahí están `animate-scan`, `animate-pulse-ring`,
  `animate-route-dash`.
- `animate-in`, `fade-in`, `slide-in-from-top-*` y `animate-shake` vienen de `tailwindcss-animate`,
  que **no está instalado** → son no-ops silenciosos. No asumas que animan; define el keyframe en
  `index.css` o usa utilidades core (`animate-ping`, `animate-pulse`, que sí funcionan).
- `src/App.css` está vacío y **nunca se importa**. Pon estilos en `src/index.css` o en clases Tailwind.
- Fuentes: Plus Jakarta Sans / JetBrains Mono llegan por `<link>` de Google Fonts en `index.html`;
  `--font-sans`/`--font-mono` se sobreescriben en `src/index.css`.
- Imagen del producto: `public/jacket_waterproof.jpg`, referenciada como `/jacket_waterproof.jpg`
  (ruta absoluta de `public/`).

## Trampas de los datos mock

- Los precios están **duplicados**: en `INITIAL_STATE`/`INITIAL_ORDER_DETAILS` (CartContext) y como
  strings literales en `CartView.tsx`, `WhatsAppMockView.tsx` y `DemoHeader.tsx`
  (`"$47.980"`, `"$44.990"`, `"+480 puntos"`). Cambiar un monto exige editar todos esos archivos.
- `toggleFreeShipping` (`src/context/CartContext.tsx:160`) restaura el flete con el literal `2990`, no
  con `INITIAL_STATE.item.shipping`.
- `calculateTotal` (`src/context/CartContext.tsx:100`) resta un descuento **plano** (no por unidad)
  mientras multiplica el precio por cantidad → subir la cantidad no escala el descuento.
- `src/components/SuccessView.tsx:172` muestra la línea del producto como `price - discount`
  ignorando la cantidad, mientras el total usa `calculateTotal()`: divergen con cantidad > 1.
- El estado mock **persiste entre recargas**. Para volver al inicial usa el botón "Reiniciar" del
  `DemoHeader` (o `resetDemo()`), no borres el localStorage a mano esperando que se actualice.

## Referencias

- `docs/CONTEXT.md` — spec del PMV, datos del caso y flujo de las 4 pantallas. Autoritativo para el
  *qué*, pero está escrito contra React 18 y contra rutas que no existen: para lo técnico, confía en
  el código.
- `.agents/skills/ui-ux-pro-max/` — skill de diseño (paletas, tipografía, UX guidelines) disponible
  local para trabajo visual. No está versionada en git.
