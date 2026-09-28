import { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';

export default function ReportModal({ show, onHide }) {
  // Estados para los campos del formulario
  const [categoria, setCategoria] = useState('');
  const [titulo, setTitulo] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [descripcion, setDescripcion] = useState('');

  // Estados para la foto y el mapa
  const [fotoBase64, setFotoBase64] = useState('');
  const [mapaSrc, setMapaSrc] = useState('');
  const [loadingUbicacion, setLoadingUbicacion] = useState(false);

  // Estado para mensajes de error
  const [error, setError] = useState('');

  // 1. Lógica para obtener Geolocalización
  const obtenerUbicacion = () => {
    if (!navigator.geolocation) {
      setError("Tu navegador no soporta la geolocalización.");
      return;
    }

    setLoadingUbicacion(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = `${position.coords.latitude},${position.coords.longitude}`;
        setUbicacion(coords);
        actualizarMapa(coords);
        setLoadingUbicacion(false);
      },
      () => {
        setError("No se pudo obtener la ubicación automáticamente.");
        setLoadingUbicacion(false);
      }
    );
  };

  // 2. Lógica para mostrar el mapa de Google
  const actualizarMapa = (query) => {
    if (!query || query.trim() === "") {
      setMapaSrc("");
      return;
    }
    const ubicacionEncoded = encodeURIComponent(query.trim());
    setMapaSrc(`https://maps.google.com/maps?q=${ubicacionEncoded}&t=&z=15&ie=UTF8&iwloc=&output=embed`);
  };

  // 3. Lógica para leer la foto y mostrar vista previa
  const handleCargarFoto = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFotoBase64(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 4. Lógica para enviar el formulario y guardar en localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validar que el usuario esté logueado
    const nombreUsuario = localStorage.getItem("sostucumanNombre");
    const emailUsuario = localStorage.getItem("sostucumanEmail");

    if (!nombreUsuario) {
      setError("Debes iniciar sesión para publicar un reporte.");
      return;
    }

    if (!categoria || !titulo || !ubicacion || !descripcion) {
      setError("Por favor, completa todos los campos obligatorios.");
      return;
    }

    // Armar el objeto del reporte
    const nuevoReporte = {
      id: "REP-" + Date.now(),
      categoria,
      titulo,
      ubicacion,
      descripcion,
      foto: fotoBase64,
      usuario: nombreUsuario,
      usuarioEmail: emailUsuario,
      fecha: new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }),
      estado: "Pendiente"
    };

    // Guardar en localStorage
    const reportesExistentes = JSON.parse(localStorage.getItem("reportes_sos") || "[]");
    reportesExistentes.unshift(nuevoReporte);
    localStorage.setItem("reportes_sos", JSON.stringify(reportesExistentes));

    // Avisar a la app que hay un reporte nuevo (para que se actualice la lista después)
    window.dispatchEvent(new Event("reporteCreado"));

    // Cerrar y limpiar
    handleClose();
  };

  const handleClose = () => {
    setCategoria('');
    setTitulo('');
    setUbicacion('');
    setDescripcion('');
    setFotoBase64('');
    setMapaSrc('');
    setError('');
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton className="bg-primary text-white border-0">
        <Modal.Title className="fw-bold fs-5 d-flex align-items-center gap-2">
          Crear Nuevo Reporte
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-4 bg-light">
        {error && <Alert variant="danger">{error}</Alert>}

        <Form onSubmit={handleSubmit}>
          <div className="row g-3">

            {/* Categoría */}
            <div className="col-12 col-md-6">
              <Form.Label className="fw-semibold small">Categoría *</Form.Label>
              <Form.Select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="">Seleccioná una categoría...</option>
                <option value="Baches y Calles">Baches y Calles</option>
                <option value="Alumbrado Público">Alumbrado Público</option>
                <option value="Higiene Urbana">Higiene Urbana</option>
                <option value="Semáforos y Tránsito">Semáforos y Tránsito</option>
              </Form.Select>
            </div>

            {/* Título */}
            <div className="col-12 col-md-6">
              <Form.Label className="fw-semibold small">Título breve *</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Bache en Av. Mate de Luna"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </div>

            {/* Ubicación con botón de Geolocalización */}
            <div className="col-12">
              <Form.Label className="fw-semibold small">Ubicación / Dirección *</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Ej: San Martín 500"
                  value={ubicacion}
                  onChange={(e) => {
                    setUbicacion(e.target.value);
                    actualizarMapa(e.target.value);
                  }}
                />
                <Button variant="outline-secondary" onClick={obtenerUbicacion} disabled={loadingUbicacion}>
                  {loadingUbicacion ? 'Ubicando...' : '📍 Mi ubicación'}
                </Button>
              </div>

              {/* Mapa de Google */}
              {mapaSrc && (
                <div className="mt-2 rounded-3 overflow-hidden border shadow-sm" style={{ height: '180px' }}>
                  <iframe src={mapaSrc} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                </div>
              )}
            </div>

            {/* Descripción */}
            <div className="col-12">
              <Form.Label className="fw-semibold small">Descripción del problema *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Detallá lo que sucede..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </div>

            {/* Subir Foto */}
            <div className="col-12">
              <Form.Label className="fw-semibold small">Foto del problema (Opcional)</Form.Label>
              <Form.Control type="file" accept="image/jpeg,image/png,image/webp" onChange={handleCargarFoto} />

              {fotoBase64 && (
                <div className="mt-3 text-center position-relative">
                  <img src={fotoBase64} alt="Previsualización" className="img-fluid rounded-3 shadow-sm" style={{ maxHeight: '180px', objectFit: 'cover' }} />
                  <Button
                    variant="danger"
                    size="sm"
                    className="rounded-circle position-absolute top-0 end-0 m-2"
                    onClick={() => setFotoBase64('')}
                  >
                    ×
                  </Button>
                </div>
              )}
            </div>

          </div>

          {/* Botones de acción */}
          <div className="d-flex justify-content-end gap-2 mt-4 pt-3 border-top">
            <Button variant="light" className="border fw-semibold" onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="primary" className="fw-semibold px-4" style={{ backgroundColor: '#f97316', border: 'none' }}>
              Publicar Reporte
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}