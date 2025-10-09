# Portafolio Profesional de José Garza

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)

Este repositorio contiene el código fuente de mi portafolio personal, una página web estática diseñada para ser limpia, profesional e interactiva. El objetivo es centralizar y demostrar mis habilidades como Especialista en Automatización de Procesos e IA Conversacional a través de demos interactivas de mis proyectos más destacados.

## Sobre Mí

Soy un profesional de TI con más de 5 años de experiencia en automatización inteligente, integración de agentes conversacionales y administración de sistemas empresariales. Mi especialidad es diseñar soluciones escalables (WhatsApp, voz, CRMs) y procesos ETL que reducen drásticamente los tiempos operativos y los errores humanos.

Tengo un profundo conocimiento en herramientas como **n8n, Make y Flowise**, así como en el manejo de LLMs (**OpenAI, Gemini, Llama local**) y su aplicación en arquitecturas RAG para crear soluciones de IA con memoria y personalidad corporativa.

## 🚀 Proyectos Destacados y Demos Interactivas

La sección más importante de mi portafolio es el carrusel de demos. A diferencia de las imágenes estáticas, he creado simulaciones interactivas para que puedas experimentar de primera mano una versión simplificada de la funcionalidad de cada proyecto.

A continuación se detalla qué es cada proyecto y qué intenta mostrar cada demo.

---

### 1. WallyUp - Asistente Financiero Móvil con IA

* **Descripción del Proyecto:** `WallyUp` es una aplicación móvil de finanzas personales desarrollada en **Flutter**. Su característica principal es un asistente de IA conversacional (integrado con **Google Gemini**) que permite a los usuarios registrar transacciones, crear presupuestos y analizar patrones de gasto usando lenguaje natural (voz o texto). La aplicación se conecta a un backend de **Supabase** para la gestión de datos y autenticación. La arquitectura está diseñada por capas, orientada a funcionalidades para garantizar escalabilidad y mantenibilidad.

* **¿Qué Muestra la Demo?**
    * **Objetivo:** La demo simula la experiencia de usuario dentro de la app móvil.
    * **Interactividad:** Se presenta un mockup de teléfono que muestra una animación de la interfaz, como el desplazamiento entre pantallas o la adición de una transacción.
    * **Habilidades Demostradas:** Desarrollo móvil multiplataforma con **Flutter**, diseño de interfaces de usuario modernas y la integración de asistentes de IA en aplicaciones móviles para una experiencia de usuario innovadora.

---

### 2. Sistema de Automatización de Documentos Gubernamentales

* **Descripción del Proyecto:** Este es un sistema de escritorio (con interfaz gráfica en **PyQt5**) desarrollado en **Python** para automatizar la generación de miles de documentos fiscales y legales (+10,000/mes). El sistema lee datos masivos desde archivos Excel (`.xlsx`), los procesa con **Pandas**, y los inserta en plantillas de Word (`.docx`) para generar documentos finales, reduciendo errores en un 65% y mejorando la velocidad en un 80%.

* **¿Qué Muestra la Demo?**
    * **Objetivo:** Visualizar de forma simple el complejo proceso ETL (Extracción, Transformación y Carga) que realiza el sistema.
    * **Interactividad:** La demo muestra una animación donde un ícono de Excel y un ícono de Word pasan a través de un "procesador" y se convierten en un documento PDF final.
    * **Habilidades Demostradas:** Automatización de procesos de back-office, scripting avanzado en **Python** para manipulación de datos (Pandas) y archivos (python-docx), y la capacidad de crear soluciones que ahorran cientos de horas de trabajo manual.

---

### 3. Asesor Financiero con IA (Allianz Portfolio Intelligence)

* **Descripción del Proyecto:** Es una aplicación web full-stack con un frontend en **React** y un backend en **FastAPI (Python)**. La herramienta ayuda a los usuarios a definir su perfil de riesgo de inversión a través de un cuestionario. Utilizando el modelo de optimización de Markowitz y datos financieros en tiempo real (vía `yfinance`), calcula y recomienda un portafolio de inversión óptimo. Además, integra **Google Gemini** para generar análisis y explicaciones personalizadas del portafolio en un lenguaje fácil de entender.

* **¿Qué Muestra la Demo?**
    * **Objetivo:** Demostrar la interactividad y la capacidad de análisis dinámico de la aplicación.
    * **Interactividad:** La demo presenta un pequeño formulario donde el usuario puede seleccionar un "perfil de riesgo" (Conservador, Moderado, Agresivo). Al cambiar la selección, un gráfico de dona se actualiza dinámicamente para reflejar la nueva distribución de activos recomendada.
    * **Habilidades Demostradas:** Desarrollo web full-stack (**React + FastAPI**), conocimientos de modelos financieros, integración de servicios de IA para análisis de datos y creación de herramientas interactivas y personalizadas.

---

### 4. Dashboard de Inteligencia de Anuncios (Advantage Scrapping Ads)

* **Descripción del Proyecto:** Es un sistema autónomo de inteligencia de mercado que realiza web scraping en plataformas como Google, Meta (Facebook/Instagram) y LinkedIn. Utiliza **Scrapy** y **Playwright/Selenium** para extraer datos de anuncios de la competencia, los procesa y los almacena en una base de datos **PostgreSQL**. Finalmente, la información se presenta en un dashboard interactivo construido con **Streamlit**.

* **¿Qué Muestra la Demo?**
    * **Objetivo:** Simular el producto final del sistema: la visualización de datos complejos de forma clara.
    * **Interactividad:** La demo consiste en un "falso" dashboard con gráficos que se animan al cargarse, simulando la presentación de datos de anuncios recién scrapeados.
    * **Habilidades Demostradas:** Web scraping avanzado en sitios dinámicos, diseño de arquitecturas de datos (pipelines ETL), manejo de bases de datos y creación de dashboards para la visualización de inteligencia de negocio.

---

### 5. E-Commerce Conversacional End-to-End

* **Descripción del Proyecto:** Es un sistema conversacional completo para e-commerce que opera a través de **WhatsApp**. Utiliza un stack de herramientas de automatización como **n8n, Flowise y las APIs de WhatsApp (Whapi)** para orquestar un flujo de venta completo. El bot puede mostrar un catálogo de productos, gestionar el carrito de compras, calcular envíos y procesar pagos sin intervención humana, logrando un aumento de más del 60% en ventas automatizadas.

* **¿Qué Muestra la Demo?**
    * **Objetivo:** Recrear la experiencia de interactuar con el bot de ventas.
    * **Interactividad:** La demo presenta una ventana de chat de WhatsApp simulada donde aparecen mensajes de forma secuencial y animada, mostrando un flujo de conversación típico entre un cliente y el bot.
    * **Habilidades Demostradas:** Orquestación de flujos de trabajo complejos (iPaaS), desarrollo de agentes de IA conversacionales, integración de múltiples APIs y creación de soluciones de automatización end-to-end orientadas a resultados comerciales.

## 🛠️ Tecnologías y Habilidades

* **Automatización y Orquestación:** n8n, Make, Flowise, Activepieces
* **Desarrollo Backend:** Python (Pandas, NumPy, FastAPI), JavaScript (Next.js)
* **Desarrollo Frontend y Móvil:** Flutter, React, HTML, CSS
* **IA y LLMs:** OpenAI API, Gemini API, Llama (local), Prompt Engineering, RAG
* **Bases de Datos:** PostgreSQL, MySQL, SQLite
* **Cloud y Sistemas:** Linux (Debian/RedHat), Azure, GCP, Docker

## 🚀 Despliegue del Portafolio

Este sitio web se despliega automáticamente en GitHub Pages cada vez que se realiza un `push` a la rama `main`. El flujo de trabajo está definido en el archivo `.github/workflows/deploy.yml` y utiliza las siguientes acciones:

1.  **`actions/checkout@v4`**: Descarga el código del repositorio.
2.  **`actions/configure-pages@v5`**: Configura el entorno para GitHub Pages.
3.  **`actions/upload-pages-artifact@v3`**: Empaqueta los archivos del sitio en un artefacto.
4.  **`actions/deploy-pages@v4`**: Despliega el artefacto en la URL pública.
