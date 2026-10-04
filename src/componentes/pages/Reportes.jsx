import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import {
  Search,
  GridFill,
  PersonFill,
  GeoAltFill,
} from "react-bootstrap-icons";
import fondoreportes from "../../assets/imagenes/FotoFondoReportes.jpg";

export default function ReportesPage() {
  const [reportes, setReportes] = useState([]);
  const [usuario, setUsuario] = useState(null);

  // Estados para Pestañas y Filtros
  const [tabActiva, setTabActiva] = useState("todos"); // "todos" o "mis-reportes"
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [estado, setEstado] = useState("Todos");

  const categoriasDisponibles = [
    "Todas",
    "Alumbrado Público",
    "Baches y Calles",
    "Higiene Urbana",
    "Semáforos y Tránsito",
  ];

  const estadosDisponibles = [
    "Todos",
    "Pendiente",
    "En proceso",
    "En revisión",
    "Resuelto",
    "Urgente",
  ];

  const cargarDatos = () => {
    const nombreGuardado = localStorage.getItem("sostucumanNombre");
    const emailGuardado = localStorage.getItem("sostucumanEmail");

    if (nombreGuardado && emailGuardado) {
      setUsuario({ nombre: nombreGuardado, email: emailGuardado });
    } else {
      setUsuario(null);
    }

    const reportesGuardados = JSON.parse(
      localStorage.getItem("reportes_sos") || "[]",
    );
    setReportes(reportesGuardados);
  };

  useEffect(() => {
    cargarDatos();
    window.addEventListener("usuarioActualizado", cargarDatos);
    window.addEventListener("reporteCreado", cargarDatos);
    return () => {
      window.removeEventListener("usuarioActualizado", cargarDatos);
      window.removeEventListener("reporteCreado", cargarDatos);
    };
  }, []);

  // Lógica de filtrado combinada
  let reportesFiltrados = reportes;

  // 1. Filtrar por pestaña (Todos vs Mis reportes)
  if (tabActiva === "mis-reportes" && usuario) {
    reportesFiltrados = reportesFiltrados.filter(
      (r) => r.usuarioEmail === usuario.email,
    );
  }

  // 2. Filtrar por búsqueda de texto (Título, Ubicación o Descripción)
  if (busqueda.trim() !== "") {
    const q = busqueda.toLowerCase();
    reportesFiltrados = reportesFiltrados.filter(
      (r) =>
        (r.titulo && r.titulo.toLowerCase().includes(q)) ||
        (r.ubicacion && r.ubicacion.toLowerCase().includes(q)) ||
        (r.descripcion && r.descripcion.toLowerCase().includes(q)),
    );
  }

  // 3. Filtrar por Categoría
  if (categoria !== "Todas") {
    reportesFiltrados = reportesFiltrados.filter(
      (r) => r.categoria === categoria,
    );
  }

  // 4. Filtrar por Estado
  if (estado !== "Todos") {
    reportesFiltrados = reportesFiltrados.filter((r) => r.estado === estado);
  }

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoria("Todas");
    setEstado("Todos");
  };

  const obtenerColorEstado = (est) => {
    if (!est) return "#6c757d";
    switch (est.toLowerCase()) {
      case "urgente":
        return "#dc3545";
      case "pendiente":
        return "#fd7e14";
      case "en proceso":
        return "#0d6efd";
      case "en revisión":
        return "#6f42c1";
      case "resuelto":
        return "#198754";
      default:
        return "#6c757d";
    }
  };

  const misReportesCount = usuario
    ? reportes.filter((r) => r.usuarioEmail === usuario.email).length
    : 0;

  return (
    <div
      className="bg-light pb-5"
      style={{ minHeight: "100vh", fontFamily: "Inter, sans-serif" }}
    >
      <div
        className="text-white position-relative"
        style={{
          background: `linear-gradient(90deg, rgba(8, 47, 73, 0.94) 0%, rgba(3, 105, 161, 0.78) 48%, rgba(8, 47, 73, 0.38) 100%), url(${fondoreportes}) center / cover no-repeat`,
          paddingTop: "120px",
          paddingBottom: "80px",
        }}
      >
        <Container>
          <div
            className="mb-3 d-inline-block px-3 py-1 rounded-pill"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              fontSize: "0.85rem",
              fontWeight: "bold",
              letterSpacing: "1px",
            }}
          >
            COMUNIDAD EN ACCIÓN
          </div>
          <h1
            className="fw-bolder mb-3"
            style={{
              fontFamily: "Outfit, sans-serif",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              letterSpacing: "-1px",
            }}
          >
            Reportes de la ciudad
          </h1>
          <p className="fs-5 opacity-75 mb-5" style={{ maxWidth: "700px" }}>
            Conocé qué está pasando en Tucumán, apoyá reclamos de otros vecinos
            y seguí el estado de los tuyos.
          </p>
        </Container>
      </div>

      <Container
        className="position-relative"
        style={{ marginTop: "-25px", zIndex: 10 }}
      >
        {/* PESTAÑAS FLOTANTES */}
        <div
          className="d-flex bg-white rounded-top-4 w-100 shadow-sm px-1 px-md-2 pt-2"
          style={{ borderBottom: "1px solid #dee2e6" }}
        >
          <Button
            variant={tabActiva === "todos" ? "info" : "light"}
            className={`flex-fill rounded-top-3 rounded-bottom-0 border-0 fw-bold px-2 px-md-4 py-2 py-md-3 d-flex align-items-center justify-content-center gap-1 gap-md-2 text-nowrap ${tabActiva === "todos" ? "text-white" : "text-muted bg-white"}`}
            style={{
              backgroundColor:
                tabActiva === "todos" ? "#0ea5e9" : "transparent",
              fontSize: "clamp(0.75rem, 2.5vw, 1rem)", // Fuente dinámica
            }}
            onClick={() => {
              setTabActiva("todos");
              limpiarFiltros();
            }}
          >
            <GridFill className="flex-shrink-0" />
            <span className="d-none d-sm-inline">Todos los reportes</span>
            <span className="d-inline d-sm-none">Todos</span>
            <Badge
              bg={tabActiva === "todos" ? "white" : "secondary"}
              text={tabActiva === "todos" ? "info" : "white"}
              className="rounded-pill ms-1"
            >
              {reportes.length}
            </Badge>
          </Button>

          <Button
            variant={tabActiva === "mis-reportes" ? "info" : "light"}
            className={`flex-fill rounded-top-3 rounded-bottom-0 border-0 fw-bold px-2 px-md-4 py-2 py-md-3 d-flex align-items-center justify-content-center gap-1 gap-md-2 text-nowrap ${tabActiva === "mis-reportes" ? "text-white" : "text-muted bg-white"}`}
            style={{
              backgroundColor:
                tabActiva === "mis-reportes" ? "#0ea5e9" : "transparent",
              fontSize: "clamp(0.75rem, 2.5vw, 1rem)",
            }}
            onClick={() => {
              setTabActiva("mis-reportes");
              limpiarFiltros();
            }}
          >
            <PersonFill className="flex-shrink-0" />
            <span>Mis reportes</span>
            <Badge
              bg={tabActiva === "mis-reportes" ? "white" : "secondary"}
              text={tabActiva === "mis-reportes" ? "info" : "white"}
              className="rounded-pill ms-1"
            >
              {misReportesCount}
            </Badge>
          </Button>
        </div>

        {/* CUERPO DE FILTROS BLANCO */}
        <div className="bg-white p-4 p-md-5 rounded-bottom-4 rounded-end-4 shadow-sm mb-5">
          {/* BANNER MIS REPORTES (Solo visible en pestaña mis reportes) */}
          {tabActiva === "mis-reportes" && usuario && (
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center bg-light p-4 rounded-4 mb-4 border">
              <div className="d-flex align-items-center gap-3 mb-3 mb-md-0">
                <div
                  className="bg-info text-white rounded-circle d-flex align-items-center justify-content-center fw-bold fs-4 shadow-sm flex-shrink-0"
                  style={{ width: "60px", height: "60px" }}
                >
                  <PersonFill />
                </div>
                <div>
                  <h4 className="fw-bolder mb-1 text-dark">Mis reportes</h4>
                  <p className="text-muted mb-0 small">
                    Revisá avances, respuestas y cambios de estado de los
                    problemas que informaste.
                  </p>
                </div>
              </div>
              <Button
                onClick={() =>
                  window.dispatchEvent(new Event("abrirModalReporte"))
                }
                className="rounded-pill fw-bold px-4 py-2 border-0 shadow-sm"
                style={{ backgroundColor: "#f97316" }}
              >
                Crear otro reporte
              </Button>
            </div>
          )}

          {tabActiva === "mis-reportes" && !usuario && (
            <div className="text-center py-5">
              <h4 className="fw-bold text-dark mb-3">
                Iniciá sesión para ver tus reportes
              </h4>
              <Button
                onClick={() =>
                  window.dispatchEvent(new Event("abrirModalAuth"))
                }
                className="rounded-pill fw-bold px-4 py-2"
                variant="info"
              >
                Iniciar sesión
              </Button>
            </div>
          )}

          {/* SECCIÓN DE FILTROS (Visible en ambas si hay usuario) */}
          {(tabActiva === "todos" ||
            (tabActiva === "mis-reportes" && usuario)) && (
            <>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold small text-dark">
                  Buscar por problema o ubicación
                </Form.Label>
                <InputGroup className="shadow-sm">
                  <InputGroup.Text className="bg-white border-end-0 text-muted px-3">
                    <Search />
                  </InputGroup.Text>
                  <Form.Control
                    className="border-start-0 py-2 bg-white"
                    placeholder="Ej: bache en Av. Mate de Luna"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    style={{ boxShadow: "none" }}
                  />
                </InputGroup>
              </Form.Group>

              <Row className="g-3 mb-4">
                <Col md={6}>
                  <Form.Label className="fw-bold small text-dark">
                    Categoría
                  </Form.Label>
                  <Form.Select
                    className="py-2 shadow-sm"
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                  >
                    {categoriasDisponibles.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={6}>
                  <Form.Label className="fw-bold small text-dark">
                    Estado
                  </Form.Label>
                  <Form.Select
                    className="py-2 shadow-sm"
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    {estadosDisponibles.map((est) => (
                      <option key={est} value={est}>
                        {est}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <div className="d-grid mb-4">
                <Button
                  variant="light"
                  className="fw-bold text-muted border py-2 rounded-3"
                  onClick={limpiarFiltros}
                >
                  Limpiar filtros
                </Button>
              </div>

              {/* PILLS DE CATEGORÍAS RÁPIDAS (Solo afecta al filtro de categoría) */}
              <div
                className="d-flex gap-2 overflow-x-auto pb-2"
                style={{ scrollbarWidth: "none" }}
              >
                {categoriasDisponibles.map((cat) => (
                  <Button
                    key={cat}
                    variant={categoria === cat ? "info" : "white"}
                    className={`rounded-pill px-4 py-2 border d-flex align-items-center gap-2 flex-shrink-0 fw-medium shadow-sm`}
                    style={{
                      backgroundColor: categoria === cat ? "#0ea5e9" : "white",
                      color: categoria === cat ? "white" : "#495057",
                    }}
                    onClick={() => setCategoria(cat)}
                  >
                    {cat === "Todas" && <GridFill />}
                    {cat}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* TÍTULO RESULTADOS */}
        {(tabActiva === "todos" ||
          (tabActiva === "mis-reportes" && usuario)) && (
          <div className="d-flex justify-content-between align-items-end mb-4 px-2">
            <div>
              <p
                className="text-uppercase fw-bold text-info mb-1"
                style={{ fontSize: "0.8rem", letterSpacing: "1px" }}
              >
                ACTIVIDAD CIUDADANA
              </p>
              <h3
                className="fw-bolder text-dark mb-0"
                style={{ fontFamily: "Outfit, sans-serif" }}
              >
                {tabActiva === "todos" ? "Todos los reportes" : "Tus reportes"}
              </h3>
            </div>
            <p className="fw-bold text-muted mb-0">
              {reportesFiltrados.length} resultados
            </p>
          </div>
        )}

        {/* GRILLA DE TARJETAS */}
        <Row className="g-4">
          {reportesFiltrados.map((reporte) => (
            <Col xs={12} md={6} lg={4} key={reporte.id}>
              <Card className="h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                {/* Contenedor de Imagen y Badges Superiores */}
                <div
                  className="position-relative bg-dark"
                  style={{ height: "200px" }}
                >
                  {reporte.foto ? (
                    <img
                      src={reporte.foto}
                      alt="Reporte"
                      className="w-100 h-100 object-fit-cover opacity-75"
                    />
                  ) : (
                    <div className="w-100 h-100 d-flex justify-content-center align-items-center text-white opacity-50 bg-secondary">
                      Sin foto
                    </div>
                  )}

                  {/* Badges Flotantes sobre la imagen */}
                  <div className="position-absolute top-0 start-0 p-3 w-100 d-flex justify-content-between align-items-start">
                    <Badge
                      bg="white"
                      text="dark"
                      className="rounded-pill d-flex align-items-center px-2 py-1 shadow-sm border fw-bold"
                    >
                      <div
                        className="rounded-circle me-2"
                        style={{
                          width: "10px",
                          height: "10px",
                          backgroundColor: obtenerColorEstado(reporte.estado),
                        }}
                      ></div>
                      {reporte.estado || "Pendiente"}
                    </Badge>

                    {/* Badge Si es del usuario logueado */}
                    {usuario && reporte.usuarioEmail === usuario.email && (
                      <Badge
                        className="rounded-pill px-3 py-1 shadow-sm text-white"
                        style={{ backgroundColor: "#082f49" }}
                      >
                        Mi reporte
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <Card.Body className="d-flex flex-column p-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <small className="fw-bold" style={{ color: "#0ea5e9" }}>
                      {reporte.categoria}
                    </small>
                    <small className="text-muted fw-medium">
                      {reporte.fecha}
                    </small>
                  </div>

                  <Card.Title className="fw-bold text-dark fs-5 mb-2">
                    {reporte.titulo}
                  </Card.Title>
                  <Card.Text
                    className="text-muted small mb-4"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {reporte.descripcion}
                  </Card.Text>

                  <div className="d-flex align-items-start text-muted small fw-medium mt-auto mb-4">
                    <GeoAltFill className="text-danger me-2 mt-1 fs-6 flex-shrink-0" />
                    <span className="text-truncate">{reporte.ubicacion}</span>
                  </div>

                  {/* Footer de la Tarjeta: Votos y Link */}
                  <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-success"
                        size="sm"
                        className="rounded-pill px-3 fw-bold d-flex align-items-center gap-1 bg-success bg-opacity-10 border-success border-opacity-25 text-success"
                      >
                        ↑ 16
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="rounded-pill px-3 fw-bold d-flex align-items-center gap-1 bg-danger bg-opacity-10 border-danger border-opacity-25 text-danger"
                      >
                        ↓ 0
                      </Button>
                    </div>
                    <span
                      className="text-decoration-none fw-bold small"
                      style={{ color: "#082f49", cursor: "pointer" }}
                    >
                      Ver detalle &gt;
                    </span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {/* Mensaje si no hay resultados */}
          {reportesFiltrados.length === 0 &&
            (tabActiva === "todos" || usuario) && (
              <Col xs={12}>
                <div className="text-center py-5 bg-white rounded-4 shadow-sm border">
                  <h4 className="fw-bold text-dark">
                    No se encontraron reportes
                  </h4>
                  <p className="text-muted">
                    Prueba limpiando los filtros o realizando otra búsqueda.
                  </p>
                  <Button
                    variant="outline-info"
                    className="rounded-pill px-4 mt-2 fw-bold"
                    onClick={limpiarFiltros}
                  >
                    Limpiar filtros
                  </Button>
                </div>
              </Col>
            )}
        </Row>
      </Container>
    </div>
  );
}
