# Descripción Detallada de Proyectos

Este documento ofrece un análisis en profundidad de los proyectos alojados en este repositorio, describiendo su propósito, arquitectura, tecnologías y características clave.

---

## 1. Advantage Scrapping Ads

### Resumen
**Advantage Scrapping Ads** es un sistema autónomo de inteligencia de mercado y análisis competitivo. Su función principal es extraer (scrapear) de forma automática y periódica anuncios de múltiples plataformas (Google, Meta, LinkedIn), centralizar los datos en una base de datos y ofrecer una interfaz visual para su análisis.

### Tecnologías Clave
- **Backend**: FastAPI (Python)
- **Frontend**: Streamlit (Python)
- **Base de Datos**: PostgreSQL
- **Scraping**: Scrapy, Playwright
- **Orquestación**: Docker, Docker Compose
- **CI/CD**: Google Cloud Build

### Características Principales
- **Scraping Multiplataforma**: Capaz de extraer datos de anuncios de Google, Meta (Facebook, Instagram) y LinkedIn.
- **Dashboard Interactivo**: Una interfaz web construida con Streamlit que permite visualizar, filtrar y analizar los anuncios recopilados.
- **Programador de Tareas (Job Scheduler)**: Permite a los usuarios crear, ver y eliminar tareas de scraping directamente desde el dashboard, especificando plataforma, palabras clave y frecuencia (cron).
- **Rotación de Proxies**: Integra un sistema de rotación de proxies para garantizar la fiabilidad y evitar bloqueos durante el scraping.
- **Persistencia de Datos**: Utiliza un volumen de Docker para asegurar que la base de datos PostgreSQL persista entre reinicios.

### Arquitectura y Flujo de Trabajo
1.  **Orquestación con Docker**: `docker-compose` levanta tres servicios principales: el backend de FastAPI, el dashboard de Streamlit y la base de datos PostgreSQL.
2.  **Programación de Tareas**: El usuario interactúa con el dashboard de Streamlit para programar una tarea (ej. "buscar anuncios de 'zapatos deportivos' en Meta todos los lunes a las 3 AM").
3.  **Ejecución del Scraper**: El backend de FastAPI, que contiene un planificador (scheduler), activa los spiders de Scrapy según la programación.
4.  **Extracción de Datos**: Los spiders, utilizando `scrapy-playwright` para manejar contenido dinámico, navegan por las plataformas de anuncios, extraen la información y la estructuran.
5.  **Almacenamiento**: Los datos extraídos se guardan de forma estructurada en la base de datos PostgreSQL.
6.  **Visualización**: El dashboard de Streamlit consulta la base de datos para mostrar al usuario final los datos actualizados, permitiendo un análisis en tiempo real.

---

## 2. GMDScriptsAFC - Sistema de Automatización de Documentos

### Resumen
**GMDScriptsAFC** es una aplicación de escritorio con interfaz gráfica (GUI) que automatiza la generación masiva de documentos legales y administrativos. Moderniza un conjunto de scripts de línea de comandos, encapsulando su complejidad en un flujo de trabajo visual e intuitivo para el usuario final.

### Tecnologías Clave
- **Lenguaje**: Python
- **Interfaz Gráfica (GUI)**: PyQt5
- **Manipulación de Datos**: Pandas
- **Generación de Documentos**: `python-docx` (para plantillas Word), `docx2pdf` (para previsualización)
- **Empaquetado**: PyInstaller

### Características Principales
- **Generación Masiva**: Procesa miles de registros desde archivos Excel para generar documentos personalizados a partir de plantillas de Word.
- **Interfaz Visual**: Permite a usuarios no técnicos ejecutar procesos complejos sin necesidad de usar la línea de comandos.
- **Gestión de Impresión Nativa (Windows)**: Integra `pywin32` para detectar impresoras del sistema, previsualizar documentos y enviarlos a imprimir en lotes.
- **Organización por Lotes**: Guarda los documentos generados en carpetas estructuradas por fecha y hora para una fácil gestión.
- **Visor de Base de Datos**: Incluye una herramienta de solo lectura para que los usuarios puedan consultar los datos maestros de forma segura.

### Arquitectura y Flujo de Trabajo
1.  **Carga de Datos**: El usuario inicia la aplicación. La lógica de `core` lee los archivos de configuración y las bases de datos de Excel (`BASE_DE_DATOS.xlsx`) ubicadas en las carpetas del proyecto (`MULTAS` o `PREDIAL - AFC`).
2.  **Interacción del Usuario**: A través de la GUI construida con PyQt5, el usuario selecciona el tipo de documento a generar y la cantidad.
3.  **Procesamiento con Pandas**: La lógica de `core` utiliza Pandas para iterar sobre los registros del archivo Excel.
4.  **Generación con `python-docx`**: Para cada registro, el sistema carga la plantilla de Word (`PLANTILLA.docx`), reemplaza los placeholders (ej. `[[NOMBRE]]`, `[[MONTO]]`) con los datos del registro actual y guarda un nuevo archivo `.docx`.
5.  **Previsualización e Impresión**: En el panel de impresión, los archivos `.docx` generados se convierten temporalmente a PDF para ser mostrados en la GUI. El usuario puede seleccionar uno o varios archivos y enviarlos a la impresora de su elección a través de la integración con el sistema de impresión de Windows.

---

## 3. Allianz Portfolio Intelligence

### Resumen
Una aplicación web full-stack que actúa como un asesor de inversiones personal. Ayuda a los usuarios a determinar su perfil de riesgo y, en base a ello, recomienda un portafolio de inversión optimizado utilizando modelos financieros y análisis de IA.

### Tecnologías Clave
- **Backend**: FastAPI (Python), NumPy, Pandas, SciPy, `yfinance`
- **Frontend**: React, TypeScript, Material-UI (MUI), Plotly.js
- **IA Generativa**: Google Gemini
- **Generación de Reportes**: ReportLab

### Características Principales
- **Perfil de Riesgo Interactivo**: Un cuestionario guía al usuario para definir su tolerancia al riesgo.
- **Optimización de Markowitz**: Calcula la distribución óptima de activos (ETFs) para maximizar el retorno para un nivel de riesgo dado.
- **Análisis por IA**: Utiliza Google Gemini para "traducir" los resultados numéricos del modelo de Markowitz a explicaciones claras y personalizadas.
- **Generación de PDF**: Crea y permite descargar un informe profesional con el perfil del usuario, el portafolio recomendado y el análisis de la IA.

### Arquitectura y Flujo de Trabajo
1.  **Interacción Frontend**: El usuario completa el cuestionario en la interfaz de React.
2.  **Llamada al Backend**: El frontend envía las respuestas del usuario al backend de FastAPI.
3.  **Cálculo del Portafolio**: El backend utiliza `yfinance` para obtener datos históricos de los activos, `SciPy` para ejecutar la optimización de Markowitz y `NumPy/Pandas` para los cálculos matemáticos.
4.  **Análisis con IA**: El portafolio optimizado (distribución de activos, retorno esperado, volatilidad) se envía a la API de Google Gemini con un prompt específico para generar un análisis cualitativo.
5.  **Respuesta al Frontend**: El backend devuelve tanto los datos numéricos como el texto generado por la IA al frontend, que los muestra en gráficos de Plotly.js y texto claro.
6.  **Generación de PDF**: Si el usuario lo solicita, el backend utiliza `ReportLab` para componer un informe PDF estructurado con toda la información y lo devuelve para su descarga.

---

## 4. WallyUp - Asistente Financiero Móvil

### Resumen
**WallyUp** es una aplicación móvil multiplataforma (iOS/Android) para la gestión de finanzas personales. Su principal innovación es un asistente de IA conversacional que permite a los usuarios interactuar con sus finanzas mediante lenguaje natural.

### Tecnologías Clave
- **Framework Móvil**: Flutter (Dart)
- **Gestión de Estado**: Riverpod
- **Backend como Servicio (BaaS)**: Supabase (PostgreSQL, Auth)
- **IA Conversacional**: Google Gemini

### Características Principales
- **Asistente de IA**: Permite registrar gastos ("gasté 500 en el supermercado"), crear presupuestos y consultar saldos mediante comandos de voz o texto.
- **Arquitectura por Capas**: El código está estructurado por funcionalidades (autenticación, chat, dashboard), siguiendo principios de código limpio para facilitar la escalabilidad.
- **Backend en Supabase**: Utiliza Supabase para la autenticación de usuarios y como base de datos PostgreSQL para almacenar transacciones, cuentas, presupuestos, etc.
- **Diseño Moderno**: Interfaz pulida con un sistema de temas dinámicos y animaciones.

### Arquitectura y Flujo de Trabajo
1.  **Interfaz de Usuario (Flutter)**: El usuario interactúa con la aplicación. Al usar el asistente de IA, la entrada de texto/voz se envía al proveedor de estado (Riverpod).
2.  **Lógica de Negocio (Riverpod Providers)**: El proveedor correspondiente gestiona el estado de la conversación y se comunica con la capa de servicios.
3.  **Capa de Servicios**:
    - **Llamada a Gemini**: La consulta del usuario se envía a la API de Google Gemini, que está configurada con un conjunto de "herramientas" (funciones) que puede decidir llamar (ej. `add_transaction`, `create_budget`).
    - **Respuesta de Gemini**: La IA responde con la intención de llamar a una herramienta y los parámetros necesarios (ej. `tool: add_transaction`, `parameters: {amount: 500, description: "supermercado"}`).
4.  **Ejecución de Herramienta**: La aplicación interpreta la respuesta de Gemini y ejecuta la función correspondiente.
5.  **Interacción con Supabase**: La función (ej. `add_transaction`) realiza una operación (INSERT, UPDATE, SELECT) en la base de datos PostgreSQL de Supabase.
6.  **Actualización de Estado**: Una vez completada la operación, el estado en Riverpod se actualiza, y la interfaz de usuario reacciona para mostrar la información nueva (ej. la transacción aparece en la lista).

---

## 5. Hu-master - Sistema de Gestión Empresarial

### Resumen
**Hu-master** es un sistema de gestión empresarial monolítico desarrollado principalmente en PHP con el framework Laravel. Por su estructura, parece incluir un CRM (`crmhuego`), un panel de administración (`huego-admin`) y una API de soporte construida con Node.js.

### Tecnologías Clave (Inferidas)
- **Backend Principal**: PHP, Laravel
- **Backend Secundario (API)**: Node.js, Express.js
- **Base de Datos**: MySQL (típico en stacks LAMP/LEMP con Laravel)
- **Frontend**: Vistas de Blade (motor de plantillas de Laravel), jQuery, Bootstrap.

### Características Principales (Inferidas)
- **Gestión de Clientes (CRM)**: Funcionalidades para el seguimiento de clientes, ventas y oportunidades.
- **Panel de Administración**: Una interfaz para gestionar usuarios, configuraciones y otros aspectos del sistema.
- **API Externa**: Un servicio de API en Node.js que probablemente se comunica con el backend de Laravel y sirve a clientes externos o al propio frontend.

### Arquitectura y Flujo de Trabajo (Inferido)
1.  **Monolito Laravel**: La aplicación principal (`huego-admin`, `crmhuego`) sigue una arquitectura MVC (Modelo-Vista-Controlador) estándar de Laravel.
    - **Modelos**: Definen la estructura de la base de datos a través del ORM Eloquent.
    - **Vistas**: Renderizan el HTML utilizando plantillas Blade.
    - **Controladores**: Orquestan la lógica de negocio, procesan las solicitudes HTTP y se comunican con los modelos.
2.  **API en Node.js**: El directorio `api/` contiene un servicio independiente en Node.js que probablemente maneja tareas en tiempo real (websockets) o sirve como un BFF (Backend for Frontend) para desacoplar la lógica.
3.  **Base de Datos Central**: Ambos sistemas (PHP y Node.js) probablemente se comunican con la misma base de datos MySQL para mantener la consistencia de los datos.

---

## 6. Portafolio (Este Proyecto)

### Resumen
Es el sitio web estático que estás viendo, diseñado para ser mi carta de presentación profesional. Su principal característica son las demos interactivas que simulan la funcionalidad de mis otros proyectos.

### Tecnologías Clave
- **Lenguajes**: HTML, CSS, JavaScript
- **Framework CSS**: TailwindCSS
- **Despliegue**: GitHub Pages, GitHub Actions

### Características Principales
- **Demos Interactivas**: Simulaciones en JavaScript que recrean la experiencia de usuario de proyectos complejos.
- **Diseño Moderno y Responsivo**: Interfaz limpia con efectos visuales (glassmorphism, animaciones) que se adapta a dispositivos móviles y de escritorio.
- **Despliegue Automatizado**: Integración con GitHub Actions para un flujo de CI/CD que despliega automáticamente cada cambio en la rama `main`.

---

## 7. Linnia - E-Commerce Conversacional End-to-End

### Resumen
Este proyecto es el motor detrás de la demo de "E-Commerce Conversacional". Es un sistema complejo que opera a través de WhatsApp y orquesta un flujo de venta completo sin intervención humana, utilizando una combinación de **Flowise** para la inteligencia conversacional y **n8n** para la orquestación de tareas de backend.

### Tecnologías Clave
- **Orquestación**: n8n
- **IA Conversacional**: Flowise
- **Modelos de Lenguaje**: GPT-4.1 / GPT-4o-mini
- **Base de Datos**: Supabase (PostgreSQL)
- **Memoria de Chat**: Upstash (Redis)
- **API de Mensajería**: GOWA, Whapi

### Detalles de Implementación

Un análisis de los archivos de configuración (`AGENTE LINNIA Chatflow.json` y `LINNIA DEMO.json`) revela una arquitectura de backend robusta y detallada:

#### Flowise - El Cerebro Conversacional (`AGENTE LINNIA Chatflow.json`)

*   **Agente de Herramientas**: El núcleo es un `Tool Agent` que utiliza un modelo `gpt-4o-mini` o `gpt-4.1` para orquestar la conversación.
*   **Personalidad Definida**: Se utiliza un system prompt muy detallado para dar vida a "Linnia", definiendo su rol, misión ("ayudar a elegir el tratamiento correcto y cerrar la compra"), y un estilo de comunicación humano y eficiente, con reglas estrictas sobre la longitud de las respuestas y el uso de emojis.
*   **Herramientas Conectadas**: El agente tiene acceso a un conjunto de herramientas para interactuar con el backend:
    *   `get_payment_methods`: Consulta los métodos de pago activos desde Supabase.
    *   `get_promotions`: Obtiene proactivamente las promociones vigentes.
    *   `product_search`: Busca productos en la base de datos.
    *   `update_cart`: Añade o elimina productos del carrito del usuario.
*   **Memoria a Largo Plazo**: Utiliza `UpstashRedisBackedChatMemory` para que el agente recuerde conversaciones pasadas con el mismo usuario, permitiendo un seguimiento contextual y personalizado.

#### n8n - La Orquestación del Backend (`LINNIA DEMO.json`)

*   **Arquitectura Multi-Webhook**: El flujo de n8n actúa como el centro neurálgico, exponiendo múltiples webhooks para diferentes tareas:
    *   `/whapi` y `/linnia`: Reciben los mensajes entrantes de WhatsApp.
    *   `/product-search`, `/UpdateCart`, `/updateProfile`: Endpoints llamados por Flowise cuando el agente decide usar una de sus herramientas.
    *   `/productodoo`: Sincroniza productos desde un sistema Odoo a la base de datos de Supabase, incluyendo la generación de embeddings para búsqueda semántica.
*   **Estrategia de Buffering**: Implementa una ingeniosa estrategia de "buffer" de mensajes. Al recibir un mensaje, espera 3 segundos antes de procesarlo. Si llegan más mensajes del mismo usuario en ese lapso, los agrupa en uno solo antes de enviarlo a Flowise. Esto reduce costos de API y le da a la IA un contexto más completo.
*   **Integración con Base de Datos (Supabase)**: El flujo interactúa constantemente con una base de datos en Supabase para gestionar tablas como `user_profiles`, `products`, `user_cart_items` y `message_buffer`.
*   **Procesamiento de Respuestas**: Contiene lógica para analizar la respuesta de Flowise. Es capaz de diferenciar entre una respuesta de texto simple y una lista de productos (identificada con etiquetas `<lista_productos>`), permitiendo enviar múltiples mensajes con imágenes de producto si es necesario.
