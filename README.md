# SosTucumán - Plataforma Ciudadana Colaborativa 

Es una aplicación web interactiva que conecta las necesidades de los vecinos con la gestión urbana municipal. Permite a los ciudadanos identificar problemas en la vía pública, categorizarlos, consultar los pasos de resolución, visualizar reclamos activos de otros vecinos y votar sobre la urgencia de los mismos.

## Integrantes

- **Carrizo Lucas**
- **Geronimo Sol**


##  Tecnologías Utilizadas
* **Frontend:** React (Vite), JavaScript .
* **Estilos y UI:** React Bootstrap, Bootstrap 5, CSS .
* **Íconos:** React Bootstrap Icons.
* **Enrutamiento:** React Router DOM .

##  Instalación y Ejecución Local
Para correr este proyecto en tu entorno local, sigue estos pasos:
1. Clona este repositorio: `git clone [url-del-repositorio]`
2. Instala las dependencias: `npm install`
3. Ejecuta el servidor de desarrollo: `npm run dev`

---

##  Documentación Técnica 

 la aplicación ha sido refactorizada aplicando las siguientes estrategias:

* **Componentización y Props:** La interfaz está dividida en componentes modulares y reutilizables (ej. `Navbar`, `Hero`, `Categorias`, `Footer`). Utilizamos *props* para pasar información dinámicamente; por ejemplo, el componente `Categorias` recibe `activeCategory` y `setActiveCategory` para gestionar la interacción visual.
* **Uso del método `map()`:** Se eliminó la repetición de código renderizando listas dinámicas. Se implementó `map()` para generar automáticamente las tarjetas en `Categorias.jsx` a partir de un arreglo de datos, así como para renderizar los pasos en `Como-funciona.jsx`, los enlaces de navegación en `Footer.jsx` y los reclamos en el componente `Reportes-activos.jsx`.
* **Estrategias SEO:** Se implementaron etiquetas semánticas (`<section>`, `<footer>`, `<header>`) en lugar de usar únicamente `<div>`, mejorando la accesibilidad y el posicionamiento de la estructura.

---
###  Metadatos y SEO On-Page

- **Título (`<title>`):** Conciso y representativo (`SosTucumán`).
- **Descripción (`<meta name="description">`):** Resume el objetivo del sitio orientándose a intenciones de búsqueda locales (_"Plataforma ciudadana para reportar baches, luminarias rotas y microbasurales en Tucumán."_).
- **Palabras Clave (`<meta name="keywords">`):** Términos relevantes de búsqueda geolocalizada (`SosTucumán`, `reclamos Tucumán`, `reporte de baches`, `luminarias rotas`, `bacheo San Miguel de Tucumán`, `gestión urbana`).
- **Social Media / Open Graph:** Metadatos preparados para la generación de tarjetas enriquecidas al compartir en redes sociales y mensajería (`og:title`, `og:description`, `og:image`, `og:url`).

---

##  Implementación de Hooks 

### 1. `useState` 
Hemos identificado múltiples situaciones que requieren manejar el estado de la interfaz y los datos:

* **¿Qué estado estamos manejando y por qué?** 
  * En `Reportes-activos.jsx`, manejamos el estado `categoriaActiva` para determinar qué tipo de reclamos quiere ver el usuario en el carrusel. También manejamos `haVotado` y `cantidadAfectados` para permitir a los usuarios sumar su apoyo a un reporte específico.
  * En `Modal-login.jsx`, gestionamos el estado de los campos de los formularios (`email`, `password`, `nombre`) para validarlos antes de procesar el acceso.
* **¿Cuándo y por qué cambia?** El estado `categoriaActiva` cambia al hacer clic en los botones de filtro, lo que desencadena un re-renderizado que muestra únicamente las tarjetas correspondientes a esa categoría. El estado `cantidadAfectados` cambia al hacer clic en el botón "A mí también me afecta".

### 2. `useEffect` 
Utilizamos `useEffect` para sincronizar nuestros componentes con sistemas externos (como la ventana del navegador o la API de almacenamiento local).

* **Control de Sesión Global (`Navbar.jsx`):**
  * **¿Por qué se utilizó?** Para leer el `localStorage` y saber si el usuario está logueado, actualizando la barra de navegación para mostrar su avatar o los botones de acceso.
  * **¿Cuándo se ejecuta?** Al montarse el componente (al cargar la página por primera vez), y también configuramos un "Event Listener" que se ejecuta cada vez que ocurre el evento personalizado `usuarioActualizado` (que disparamos desde el modal de login).
  * **Dependencias:** Sus dependencias están vacías `[]` porque solo queremos que configure los *listeners* una sola vez al cargar.
* **Animaciones al hacer Scroll (`Como-funciona.jsx` y `Navbar.jsx`):**
  * **¿Por qué se utilizó?** En el Navbar lo usamos para cambiar el fondo a oscuro cuando el usuario baja por la página. En la sección "Cómo funciona", lo usamos junto con un `IntersectionObserver` para activar las animaciones de la línea de tiempo únicamente cuando esa sección entra en el campo visual de la pantalla.