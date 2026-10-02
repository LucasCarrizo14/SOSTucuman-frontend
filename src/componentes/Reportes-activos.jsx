import React, { useState, useRef } from "react";
import { Card, Button, Badge, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import imgAlumbrado1 from "../assets/imagenes/AlumbradoPublico1.jpeg";
import imgAlumbrado4 from "../assets/imagenes/AlumbradoPublico4.jpeg";
import imgBache from "../assets/imagenes/Bache3.jpeg";
import imgBasural from "../assets/imagenes/Basural3.jpeg";
import imgSemaforo from "../assets/imagenes/Semaforo3.jpeg";

// 1. COMPONENTE TARJETA
const ReporteTarjeta = ({ reporte }) => {
  const [cantidadAfectados, setCantidadAfectados] = useState(
    reporte.afectadosIniciales || 0,
  );
  const [haVotado, setHaVotado] = useState(false);

  const manejarVoto = () => {
    if (!haVotado) {
      setCantidadAfectados((prev) => prev + 1);
      setHaVotado(true);
    } else {
      setCantidadAfectados((prev) => prev - 1);
      setHaVotado(false);
    }
  };

  const obtenerColorEstado = (estado) => {
    switch (estado.toLowerCase()) {
      case "urgente":
        return "danger";
      case "pendiente":
        return "warning";
      case "en proceso":
        return "primary";
      case "resuelto":
        return "success";
      default:
        return "secondary";
    }
  };

  const colorEstado = obtenerColorEstado(reporte.estado);

  return (
    <Card
      className="shadow-sm border-0 h-100 flex-shrink-0 rounded-4"
      // Se usa un min-width para responsividad, evitando que se aplasten en celulares
      style={{ width: "300px", maxWidth: "85vw" }}
    >
      {/* Se añade un div gris como placeholder de la imagen rota en tu captura */}
      <div
        className="bg-light rounded-top-4 d-flex justify-content-center align-items-center"
        style={{ height: "160px" }}
      >
        <img
          src={reporte.imagen}
          alt="Reporte"
          className="object-fit-cover w-100 h-100 rounded-top-4"
          onError={(e) => (e.target.style.display = "none")} // Oculta la imagen si está rota
        />
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Badge
            bg="white"
            text="dark"
            className="d-flex align-items-center px-2 py-1 rounded-pill border fw-normal shadow-sm"
          >
            <span
              className={`bg-${colorEstado} rounded-circle me-2 p-1`}
            ></span>
            <span className={`text-${colorEstado} fw-semibold`}>
              {reporte.estado}
            </span>
          </Badge>
          <small className="text-muted">{reporte.tiempo}</small>
        </div>

        <Card.Text className="flex-grow-1 text-dark fw-medium">
          {reporte.descripcion}
        </Card.Text>

        <div className="text-muted mb-4 d-flex align-items-start small">
          <span className="me-2 text-danger">📍</span>
          <span>{reporte.ubicacion}</span>
        </div>

        <Button
          variant={haVotado ? "success" : "outline-secondary"}
          className="w-100 rounded-pill fw-semibold mt-auto p-2 d-flex justify-content-center align-items-center gap-2"
          onClick={manejarVoto}
        >
          <span>✋ A mí también me afecta</span>
          <span className="badge bg-light text-dark rounded-pill border">
            +{cantidadAfectados}
          </span>
        </Button>
      </Card.Body>
    </Card>
  );
};

// 2. COMPONENTE PRINCIPAL (CARRUSEL + FILTROS)
const CarruselReportes = ({ onReport }) => {
  const carruselRef = useRef(null);

  // Estado para la categoría activa
  const [categoriaActiva, setCategoriaActiva] = useState("Alumbrado Público");

  const categorias = [
    { nombre: "Alumbrado Público", icono: "💡" },
    { nombre: "Baches y Calles", icono: "🛣️" },
    { nombre: "Higiene Urbana", icono: "🗑️" },
    { nombre: "Semáforos y Tránsito", icono: "🚦" },
  ];

  const desplazar = (direccion) => {
    if (carruselRef.current) {
      const cantidadDesplazamiento = 320;
      carruselRef.current.scrollBy({
        left:
          direccion === "izquierda"
            ? -cantidadDesplazamiento
            : cantidadDesplazamiento,
        behavior: "smooth",
      });
    }
  };

  // Datos actualizados incluyendo la propiedad "categoria"
  const datosPrueba = [
    {
      id: 1,
      imagen: imgAlumbrado1,
      estado: "Urgente",
      tiempo: "Hace 1 día",
      descripcion: "Poste de luz roto y expuesto a inclemencias o vandalismo. ",
      ubicacion: "Senderos del Parque 9 de Julio.",
      afectadosIniciales: 14,
      categoria: "Alumbrado Público",
    },
    {
      id: 2,
      imagen: imgAlumbrado4,
      estado: "En proceso",
      tiempo: "Hace 3 días",
      descripcion:
        "Cableado de alumbrado al descubierto sobre la vereda con riesgo para peatones. ",
      ubicacion: "Bulnes 1450",
      afectadosIniciales: 11,
      categoria: "Alumbrado Público",
    },
    {
      id: 3,
      imagen: imgBache,
      estado: "Pendiente",
      tiempo: "Hace 2 días",
      descripcion:
        "Rotura de pavimento asociada a filtraciones o colapso de la red de agua/cloacas con agua estancada.",
      ubicacion: "Av. Kirchner y Pellegrini.",
      afectadosIniciales: 32,
      categoria: "Baches y Calles",
    },
    {
      id: 4,
      imagen: imgSemaforo,
      estado: "En revisión",
      tiempo: "Hace 2 días",
      descripcion:
        "Interrupción del servicio por mantenimiento preventivo o reparación de plaqueta electrónica.",
      ubicacion: "frente a Plaza Independencia",
      afectadosIniciales: 5,
      categoria: "Semáforos y Tránsito",
    },
    {
      id: 5,
      imagen: imgBasural,
      estado: "Pendiente",
      tiempo: "Hace 1 día",
      descripcion:
        "Reincidencia de vertederos ilegales en zonas señalizadas como prohibidas.",
      ubicacion: "en Av. Roca 1500.",
      afectadosIniciales: 8,
      categoria: "Higiene Urbana",
    },
  ];

  // Filtramos los reportes basándonos en la categoría seleccionada
  const reportesFiltrados = datosPrueba.filter(
    (reporte) => reporte.categoria === categoriaActiva,
  );

  return (
    <Container className="py-5">
      {/* ENCABEZADO: Título y Botón Nuevo Reporte */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
        <h2
          className="fw-bolder mb-0"
          style={{ color: "#0F172A", fontSize: "2.5rem" }}
        >
          Reportes activos
        </h2>
        <Button
          onClick={onReport}
          className="rounded-pill px-4 py-2 fw-bold border-0"
          style={{ backgroundColor: "#F97316", color: "white" }}
        >
          + Nuevo reporte
        </Button>
      </div>

      {/* BARRA DE FILTROS */}
      <div
        className="d-flex gap-2 mb-4 overflow-x-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {categorias.map((cat) => (
          <Button
            key={cat.nombre}
            variant={categoriaActiva === cat.nombre ? "info" : "white"}
            className={`rounded-pill px-4 py-2 border d-flex align-items-center gap-2 flex-shrink-0 transition-all ${
              categoriaActiva === cat.nombre
                ? "text-white border-info shadow-sm"
                : "text-secondary border-light-subtle"
            }`}
            style={{
              backgroundColor:
                categoriaActiva === cat.nombre ? "#0EA5E9" : "transparent",
            }}
            onClick={() => setCategoriaActiva(cat.nombre)}
          >
            <span>{cat.icono}</span>
            <span className="fw-medium">{cat.nombre}</span>
          </Button>
        ))}
      </div>

      {/* CONTENEDOR DEL CARRUSEL Y FLECHAS */}
      <div className="position-relative">
        {/* Flecha Izquierda - Se oculta en móviles para no tapar contenido */}
        <Button
          variant="light"
          className="position-absolute top-50 start-0 translate-middle rounded-circle shadow border-0 z-3 p-0 d-none d-md-flex justify-content-center align-items-center"
          style={{ width: "45px", height: "45px", left: "-20px" }}
          onClick={() => desplazar("izquierda")}
        >
          &#10094;
        </Button>

        {/* Carrusel Deslizable */}
        <div
          ref={carruselRef}
          className="d-flex gap-4 py-3 overflow-x-auto px-2"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none", // Oculta la barra nativa en Firefox
            msOverflowStyle: "none", // Oculta la barra nativa en Edge
          }}
        >
          {/* Estilo en línea para ocultar la barra en Chrome/Safari y evitar el diseño roto */}
          <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>

          {reportesFiltrados.length > 0 ? (
            reportesFiltrados.map((reporte) => (
              <div key={reporte.id} style={{ scrollSnapAlign: "start" }}>
                <ReporteTarjeta reporte={reporte} />
              </div>
            ))
          ) : (
            <div className="text-muted p-4 border rounded-4 w-100 text-center">
              No hay reportes activos en esta categoría por el momento.
            </div>
          )}
        </div>

        {/* Flecha Derecha - Se oculta en móviles */}
        <Button
          variant="light"
          className="position-absolute top-50 start-100 translate-middle rounded-circle shadow border-0 z-3 p-0 d-none d-md-flex justify-content-center align-items-center"
          style={{ width: "45px", height: "45px" }}
          onClick={() => desplazar("derecha")}
        >
          &#10095;
        </Button>
      </div>

      {/* TEXTO DE PIE DE PÁGINA */}
      <div className="mt-4 text-muted">
        Mostrando{" "}
        <span className="fw-bold text-dark">{reportesFiltrados.length}</span>{" "}
        reportes en{" "}
        <span className="fw-bold" style={{ color: "#0EA5E9" }}>
          {categoriaActiva}
        </span>
      </div>
    </Container>
  );
};

export default CarruselReportes;
