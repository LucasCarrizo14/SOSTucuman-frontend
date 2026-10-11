import React, { useState, useRef, useEffect } from "react";
import { Card, Button, Badge, Container } from "react-bootstrap";
import {
  LightbulbFill,
  ConeStriped,
  TrashFill,
  Stoplights,
} from "react-bootstrap-icons";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

// Variable de entorno para tu JSON Server
const API_URL = import.meta.env.VITE_API_URL;

// 1. COMPONENTE TARJETA
const ReporteTarjeta = ({ reporte }) => {
  const [cantidadAfectados, setCantidadAfectados] = useState(
    reporte.afectadosIniciales || 0,
  );
  const [haVotado, setHaVotado] = useState(false);

  const manejarVoto = () => {
    // Verificamos si el usuario está logueado para poder votar
    const usuarioLogueado = localStorage.getItem("sostucumanNombre");

    if (!usuarioLogueado) {
      Swal.fire({
        icon: 'warning',
        title: 'Iniciá sesión',
        text: 'Necesitás estar registrado para apoyar un reporte.'
      });
      return;
    }

    if (!haVotado) {
      setCantidadAfectados((prev) => prev + 1);
      setHaVotado(true);
      
      // Notificación tipo "Toast" para que no interrumpa la navegación
      Swal.fire({
        icon: 'success',
        title: '¡Gracias por apoyar!',
        text: 'Tu voto ayuda a darle prioridad a este problema.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } else {
      setCantidadAfectados((prev) => prev - 1);
      setHaVotado(false);
    }
  };

  const obtenerColorEstado = (estado) => {
    switch (estado?.toLowerCase()) {
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
      style={{ width: "300px", maxWidth: "85vw" }}
    >
      <div
        className="bg-light rounded-top-4 d-flex justify-content-center align-items-center"
        style={{ height: "160px" }}
      >
        <img
          src={reporte.imagen}
          alt={reporte.titulo || "Reporte"}
          className="object-fit-cover w-100 h-100 rounded-top-4"
          onError={(e) => (e.target.style.display = "none")}
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
  const [categoriaActiva, setCategoriaActiva] = useState("Alumbrado Público");
  const [reportes, setReportes] = useState([]);

  const categorias = [
    { nombre: "Alumbrado Público", icono: <LightbulbFill /> },
    { nombre: "Baches y Calles", icono: <ConeStriped /> },
    { nombre: "Higiene Urbana", icono: <TrashFill /> },
    { nombre: "Semáforos y Tránsito", icono: <Stoplights /> },
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

  useEffect(() => {
    const obtenerReportes = async () => {
      try {
        const respuesta = await axios.get(`${API_URL}/reportes`);
        setReportes(respuesta.data.reverse());
      } catch (error) {
        console.error("Error al cargar los reportes:", error);
        Swal.fire({
          icon: 'error',
          title: 'Problemas de conexión',
          text: 'No pudimos cargar los reportes de SosTucumán en este momento. Por favor, recargá la página más tarde.'
        });
      }
    };

    obtenerReportes();

    const actualizarLista = () => obtenerReportes();
    window.addEventListener("reporteCreado", actualizarLista);

    return () => {
      window.removeEventListener("reporteCreado", actualizarLista);
    };
  }, []);

  const reportesFiltrados = reportes.filter(
    (reporte) => reporte.categoria === categoriaActiva,
  );

  return (
    <Container className="py-5">
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

      <div className="position-relative">
        <Button
          variant="light"
          className="position-absolute top-50 start-0 translate-middle rounded-circle shadow border-0 z-3 p-0 d-none d-md-flex justify-content-center align-items-center"
          style={{ width: "45px", height: "45px", left: "-20px" }}
          onClick={() => desplazar("izquierda")}
        >
          &#10094;
        </Button>

        <div
          ref={carruselRef}
          className="d-flex gap-4 py-3 overflow-x-auto px-2"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
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

        <Button
          variant="light"
          className="position-absolute top-50 start-100 translate-middle rounded-circle shadow border-0 z-3 p-0 d-none d-md-flex justify-content-center align-items-center"
          style={{ width: "45px", height: "45px" }}
          onClick={() => desplazar("derecha")}
        >
          &#10095;
        </Button>
      </div>

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