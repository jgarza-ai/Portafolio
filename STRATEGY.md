# Estrategia de Diseño y Animación para Portafolio 2025

Este documento describe la estrategia para modernizar el portafolio de José Garza, enfocándose en un diseño de vanguardia, animaciones avanzadas y una experiencia de usuario memorable para 2025.

## 1. Tendencias de Diseño y Concepto General

El rediseño se basará en las siguientes tendencias, adaptadas para un perfil de desarrollador y especialista en automatización:

- **Glassmorphism / Aurora Background:** Se utilizará un fondo dinámico y etéreo tipo "Aurora" para crear una sensación de profundidad y modernidad. Esto reemplazará el fondo estático actual y se combinará con el efecto *glass* existente en las tarjetas para mantener la legibilidad.
- **Micro-interacciones Avanzadas:** Las interacciones del usuario (hover, scroll, clicks) serán respondidas con animaciones fluidas y significativas que guíen la atención y mejoren la experiencia.
- **Narrativa Visual:** La estructura del portafolio contará una historia, llevando al usuario desde una introducción impactante (héroe) hasta la prueba social (proyectos), la demostración de habilidades (stack) y la acción (demos y contacto).

## 2. Bibliotecas de Animación Recomendadas

Para lograr un nivel superior de animación y interactividad, se integrarán las siguientes bibliotecas:

- **GSAP (GreenSock Animation Platform):** Ideal para animaciones complejas, secuenciadas y de alto rendimiento. Se usará para *scroll-triggered animations*, efectos de texto y coreografías de UI.
  - **CDN:** `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`
  - **Plugin ScrollTrigger:** `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js`

- **Three.js:** Para la creación de un fondo de partículas 3D interactivo que reaccione al movimiento del mouse, añadiendo una capa de sofisticación y engagement visual.
  - **CDN:** `https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js`

## 3. Paleta de Colores Mejorada

La paleta de colores se refinará para ser más vibrante y alineada con las tendencias tecnológicas, manteniendo un modo oscuro predominante.

- **--dark:** `#0D1117` (Un azul oscuro profundo, inspirado en GitHub Dark Mode)
- **--dark-card:** `#161B22` (Un tono ligeramente más claro para las tarjetas)
- **--primary:** `#58A6FF` (Un azul brillante y accesible para llamadas a la acción)
- **--secondary:** `#E06C75` (Un rojo coral suave como color de acento secundario)
- **--accent:** `#6A737D` (Un gris neutro para texto secundario y bordes)
- **--gradient-start:** `#58A6FF`
- **--gradient-end:** `#C9D1D9` (Un gris claro para los gradientes de texto)

## 4. Lista de Micro-animaciones a Implementar

- **Hero Section:**
  - **Efecto Parallax:** El texto y los elementos de la sección del héroe se moverán a diferentes velocidades al hacer scroll para crear profundidad.
  - **Animación de Título:** Las letras del título principal aparecerán de forma escalonada al cargar la página.
- **Scroll-Triggered Animations (GSAP):**
  - Cada sección (`Proyectos`, `Stack`, `Demos`) aparecerá con una animación de *fade-in* y *slide-up* a medida que el usuario se desplaza hacia ella.
  - Las tarjetas de proyecto y stack tendrán una animación de aparición escalonada.
- **Hover Effects:**
  - **Botones:** Al pasar el mouse, los botones tendrán un sutil brillo y un ligero desplazamiento.
  - **Tarjetas de Proyecto:** El efecto de brillo existente se refinará para ser más suave y se añadirá un ligero efecto de inclinación 3D.
- **Fondo Interactivo (Three.js):**
  - Un campo de partículas 3D en el fondo que se mueve sutilmente y reacciona a la posición del cursor del mouse, creando un efecto de "nebulosa".

## 5. Wireframes en Texto para Demos Interactivas

Se rediseñarán las demos para ser más visuales e interactivas, mostrando claramente el valor de cada proyecto.

### Demo 1: E-Commerce Chatbot

```
+--------------------------------------------------+
| [Header: E-Commerce Chatbot]                     |
|                                                  |
|  +---------------------------------------------+ |
|  | [Bot Bubble: ¡Hola! ¿En qué puedo ayudarte?] | |
|  +---------------------------------------------+ |
|                                                  |
|  +---------------------------------------------+ |
|  | [User Bubble: Busco zapatillas para correr.] | |
|  +---------------------------------------------+ |
|                                                  |
|  +---------------------------------------------+ |
|  | [Bot Bubble: ¡Claro! Aquí tienes...]        | |
|  | [Product Card: Zapatilla 1] [Product Card 2] | |
|  +---------------------------------------------+ |
|                                                  |
|  [Input: Escribe tu mensaje...] [Enviar]         |
+--------------------------------------------------+
```
- **Mejora:** Simulación de una conversación real con tarjetas de producto interactivas.

### Demo 2: Document Automation Flow

```
+--------------------------------------------------+
| [Header: Flujo de Automatización de Documentos]  |
|                                                  |
|  [Icono: Excel] ---> [Icono: N8N] ---> [Icono: IA] |
|      |                  |                 |      |
|  [Texto: Datos]  [Texto: Proceso] [Texto: Análisis] |
|      |                  |                 |      |
|      V                  V                 V      |
|  [Icono: Word] ---> [Icono: PDF] ---> [Icono: Email]|
|  [Texto: Plantilla] [Texto: Reporte] [Texto: Envío] |
|                                                  |
|  [Botón: Iniciar Simulación]                     |
+--------------------------------------------------+
```
- **Mejora:** Una visualización animada del flujo de datos, donde cada paso se ilumina secuencialmente.

### Demo 3: Financial Advisor Dashboard

```
+--------------------------------------------------+
| [Header: Dashboard de Asesor Financiero IA]      |
|                                                  |
| [Dropdown: Perfil de Riesgo (Agresivo)]          |
|                                                  |
|  +-----------------+  +------------------------+ |
|  | [Gráfico Dona]  |  | [Texto: Recomendación] | |
|  |  - Acciones 70% |  | El modelo sugiere...   | |
|  |  - Bonos 20%   |  |                        | |
|  |  - Crypto 10%  |  |                        | |
|  +-----------------+  +------------------------+ |
|                                                  |
+--------------------------------------------------+
```
- **Mejora:** El gráfico de dona se animará al cambiar el perfil de riesgo, mostrando la nueva distribución de activos de forma fluida.