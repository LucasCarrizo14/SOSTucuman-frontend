# SosTucumán - Plataforma Ciudadana Colaborativa

Es una aplicación web interactiva que conecta las necesidades de los vecinos con la gestión urbana municipal. Permite a los ciudadanos identificar problemas en la vía pública, categorizarlos, consultar los pasos de resolución, visualizar reclamos activos de otros vecinos y votar sobre la urgencia de los mismos.

**Desarrollada por:** 
-Carrizo Lucas
-Geronimo Sol

---

## Tecnologías Utilizadas

- **Frontend:** React 19 (Vite), JavaScript.
- **Estilos y UI:** React Bootstrap, Bootstrap 5, CSS.
- **Íconos:** React Bootstrap Icons.
- **Enrutamiento:** React Router DOM.
- **Peticiones HTTP:** Axios.
- **Alertas Interactivas:** SweetAlert2.
- **Backend Simulado:** JSON Server.

---

## Instalación y Ejecución Local

Para correr este proyecto en tu entorno local, es necesario levantar tanto el servidor frontend como la base de datos simulada.

**1. Clonar el repositorio:**

```bash
git clone [url-del-repositorio]

```

**2. Instalar las dependencias:**

```bash
npm install
```

**3. Configurar Variables de Entorno:**

Crea un archivo .env en la raíz del proyecto e incluye la ruta de la API:
VITE_API_URL=http://localhost:3001

**4. Levantar la Base de Datos (JSON Server):**
Abre una terminal y ejecuta JSON Server apuntando al archivo db.json en el puerto especificado en tu .env:

```bash
npx json-server --watch db.json --port 3001
```

**5. Ejecutar el Servidor de Desarrollo (Frontend):**

```bash
npm run dev
```
---
###  Metadatos y SEO On-Page

- **Título (`<title>`):** Conciso y representativo (`SosTucumán`).
- **Descripción (`<meta name="description">`):** Resume el objetivo del sitio orientándose a intenciones de búsqueda locales (_"Plataforma ciudadana para reportar baches, luminarias rotas y microbasurales en Tucumán."_).
- **Palabras Clave (`<meta name="keywords">`):** Términos relevantes de búsqueda geolocalizada (`SosTucumán`, `reclamos Tucumán`, `reporte de baches`, `luminarias rotas`, `bacheo San Miguel de Tucumán`, `gestión urbana`).
- **Social Media / Open Graph:** Metadatos preparados para la generación de tarjetas enriquecidas al compartir en redes sociales y mensajería (`og:title`, `og:description`, `og:image`, `og:url`).

---
## Documentación Técnica y Arquitectura

La plataforma fue diseñada aplicando el principio de Separación de Responsabilidades (_Separation of Concerns_), dividiendo el flujo de datos, el enrutamiento y la renderización visual.

### Comunicación entre Componentes (Props y Eventos)

- **Uso de Props (Flujo Unidireccional):** Los datos y funciones viajan de componentes padres a hijos. Por ejemplo, `App.jsx` controla el estado de los modales y pasa las funciones `onReport` y `onAuth` hacia el componente `<Rutas/>`, que a su vez las distribuye a páginas como `<Home/>` y componentes como `<CarruselReportes/>`.
- **Eventos Globales (Custom Events):** Para evitar el _prop drilling_ (pasar props por múltiples niveles innecesarios), implementamos `window.dispatchEvent`. Esto permite que un botón anidado en `Reportes.jsx` dispare el evento `abrirModalReporte`, el cual es escuchado directamente por `App.jsx` en la raíz del proyecto para renderizar el modal. También se utiliza el evento `usuarioActualizado` para sincronizar el `Navbar` con el `localStorage` al iniciar sesión.

### Interacción con la Base de Datos (Axios)

Utilizamos Axios como cliente HTTP para interactuar de forma asíncrona con nuestro `db.json`.

- **GET (Lectura):** Se utiliza en `Reportes-activos.jsx` y `Reportes.jsx` para traer el arreglo completo de reclamos y mostrarlos en pantalla. También se usa en `Modal-login.jsx` para verificar credenciales o comprobar si un email ya existe antes de registrar.
- **POST (Creación):** Se utiliza en `Modal-reporte.jsx` para enviar el objeto completo de un nuevo reclamo (incluyendo la foto convertida a Base64 y coordenadas). También guarda los nuevos usuarios en el registro.

### Implementación de Hooks

El motor lógico de SosTucumán se basa en el uso estratégico de React Hooks para gestionar estados, ciclos de vida y referencias al DOM.

**1. `useState` (Gestión de Estado Local)**
Almacena datos dinámicos que fuerzan un re-renderizado de la interfaz cuando cambian.

- **Manejo de Modales:** En `App.jsx` controla la visibilidad (`true`/`false`) de `AuthModal` y `ReportModal`.
- **Formularios Controlados:** En `Modal-login.jsx` y `Modal-reporte.jsx` almacena en tiempo real lo que el usuario tipea (`email`, `password`, `titulo`, `descripcion`) para su posterior validación.
- **Filtros Interactivos:** En `Reportes.jsx` guarda los parámetros seleccionados por el usuario (`categoriaActiva`, `busqueda`, `estado`) para procesar el arreglo de datos.

**2. `useEffect` (Sincronización y Efectos Secundarios)**
Ejecuta lógica en respuesta a la renderización o cambios de estado.

- **Escuchas Globales (Listeners):** En `App.jsx` configura los `addEventListener` al montar la aplicación para escuchar peticiones de apertura de modales. En `Navbar.jsx` detecta el evento de scroll de la ventana para cambiar los estilos y aplicar un fondo opaco.
- **Carga Inicial de Datos:** En `Reportes.jsx` y `Reportes-activos.jsx`, se ejecuta una sola vez al montar el componente (`[]`) para realizar la petición `axios.get` y popular la interfaz con los reclamos de la base de datos.

**3. `useRef` (Manipulación Directa del DOM)**
Permite acceder a elementos del DOM sin provocar re-renderizados.

- **Scroll Programático:** En `Reportes-activos.jsx`, engancha el contenedor del carrusel y utiliza el método nativo `scrollBy` para desplazar las tarjetas horizontalmente al presionar las flechas de navegación.
- **Intersection Observer:** En `Como-funciona.jsx` observa cuándo la sección entra en el viewport del usuario para disparar las animaciones en cascada de la línea de tiempo.

**4. `useLocation` y `useNavigate` (Enrutamiento)**
Hooks importados de React Router DOM para el control de la navegación.

- **Redirección Programática:** En `Todos-los-reportes.jsx`, `useNavigate` redirige al usuario a la vista de `/reportes` tras hacer clic en el botón de llamado a la acción.
- **Paso de Estado en URL:** `useLocation` se utiliza en `Reportes.jsx` para leer parámetros ocultos pasados desde el `Navbar` (`state: { tabActiva: "mis-reportes" }`), permitiendo que la página se inicialice automáticamente filtrada por los reclamos del usuario.
