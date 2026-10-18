# CONTEXT & SPEC: Prototipo Web E-Commerce Retail XXX (PMV Abandono de Carrito)

## 1. Propósito del Proyecto

Crear un prototipo web interactivo y responsive (desktop y móvil) para demostrar las soluciones del PMV frente a la problemática de tasa de abandono de carrito en Retail XXX.
El enfoque es exclusivamente demostrativo/simulado (sin backend real ni pasarelas externas).

---

## 2. Stack Tecnológico

- **Framework:** React 18+ con Vite
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS + Lucide React (iconografía)
- **Persistencia de estado mock:** `localStorage` del navegador

---

## 3. Identidad y Datos del Caso (Mock Data)

- **Marca:** Retail XXX
- **Colores sugeridos:**
  - Primario: Azul corporativo retail (`#1e3a8a` / `#2563eb`)
  - Acento / Llamados a la acción: Verde esmeralda o naranja conversión (`#10b981` / `#f97316`)
  - Neutros: Slate/Gray para fondos, bordes y modales
- **Producto de prueba:**
  - Nombre: _Chaqueta Urban Waterproof_
  - Precio Base: `$49.990 CLP`
  - Flete calculado: `$2.990 CLP`
  - Descuento aplicado: `-$5.000 CLP`
  - Total regular: `$47.980 CLP`
  - Total con cupón WhatsApp (Envío gratis): `$44.990 CLP`
- **Sucursal de despacho (Micro-fulfillment):** Tienda Providencia (Santiago, Chile)
- **Promesa horaria:** "Mañana entre 11:00 y 13:00 hrs (Ventana 2 hrs)"
- **Puntos Club a acumular:** `+480 Puntos Club Retail`

---

## 4. Arquitectura de Pantallas y Flujos a Simular

### Pantalla 1: Carrito de Compras Transparente (`/cart`)

- **Desglose de Costos Inmediato:**
  - Mostrar precio del producto, flete geolocalizado calculado automáticamente y cupón promocional activo.
  - Cero costos ocultos: el total `$47.980 CLP` es visible antes de cualquier formulario.
- **Promesa de Entrega Exacta:**
  - Banner dinámico: _"Despacho desde Tienda Providencia: Mañana 11:00 - 13:00 hrs"_.
- **Acciones interactivas:**
  - Botón principal: `Continuar a Pago Rápido 1-Click`.
  - Botón de prueba/simulación: _"Simular abandono de carrito"_ (dispara el flujo de recuperación de la Pantalla 4).
  - Floating action button: Icono de WhatsApp para soporte inmediato.

### Pantalla 2: Modal de Checkout 1-Click con Autenticación Híbrida

- **Simulación de Pago Ultrarrápido:**
  - Muestra tarjeta de crédito tokenizada guardada (`•••• 4821 - Visa / Banco`).
  - Botón `Autorizar con Touch ID / Passkey`.
  - Cronómetro visual en pantalla que ilustre el tiempo completado (< 28 segundos).
- **Simulación de Falla y Respaldo OTP:**
  - Toggle / Botón de demo: _"Simular error de sensor / biometría"_.
  - Al fallar, muestra inmediatamente el modal alternativo: _"Enviar código SMS (OTP)"_.
  - Input para 4 dígitos (con auto-relleno mock `4 8 2 1`) y botón `Validar y Pagar`.
  - Ningún bloqueo detiene la compra.

### Pantalla 3: Confirmación y Tracking Logístico (`/order-success`)

- **Resumen de Pedido:**
  - Número de orden ficticio (ej. `#RXX-92841`).
  - Detalle de puntos acumulados: `+480 Puntos Club Retail agregados a tu cuenta`.
- **Mapa Interactivo Simulado (GPS Live Tracking):**
  - Componente visual simulando un mapa (SVG/Canvas o mockup CSS interactivo) que muestre la ruta desde _Tienda Providencia_ hasta la dirección de entrega.
  - Indicador de estado por fases: _Preparando pedido en tienda -> Repartidor en ruta -> Entregado_.

### Pantalla 4: Vista de Simulación WhatsApp API (Reenganche Omnicanal)

- **Interfaz Mock de WhatsApp Web / Chat móvil:**
  - Cabecera oficial verificada: _Retail XXX Oficial_ (con insignia verde de verificación).
  - Mensaje automatizado (trigger a los 15 min mockeados):
    > _"¡Hola! Guardamos tu Chaqueta Urban Waterproof en Tienda Providencia por 24 horas. Completa tu compra hoy y el envío es totalmente GRATIS. Paga en 1 toque aquí: [Link Directo al Checkout]"_
  - Botón interactivo: `Recuperar Carrito con Envío Gratis ($44.990 CLP)`.
  - Al hacer clic, redirige al carrito con el flete en `$0 CLP` y el nuevo total calculado.

---

## 5. Estructura del Estado en LocalStorage

El estado global se sincroniza bajo la clave `retail_xxx_cart_state`:

```typescript
interface CartState {
  item: {
    id: string;
    name: string;
    price: number;
    shipping: number;
    discount: number;
    image: string;
  };
  hasAbandoned: boolean;
  freeShippingApplied: boolean;
  orderCompleted: boolean;
  currentStep: "cart" | "checkout" | "success" | "whatsapp-mock";
}
```
