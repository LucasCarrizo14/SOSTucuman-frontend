import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import logoImg from "../assets/imagenes/LOGOO.png";

export default function NavigationBar({ onAuth, onReport }) {
  const [scrolled, setScrolled] = useState(false);
  // Nuevo estado para guardar los datos del usuario
  const [usuario, setUsuario] = useState(null);

  // Efecto para el cambio de color al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Efecto para verificar si hay un usuario guardado en localStorage
  useEffect(() => {
    const chequearUsuario = () => {
      const nombreGuardado = localStorage.getItem("sostucumanNombre");
      const emailGuardado = localStorage.getItem("sostucumanEmail");

      if (nombreGuardado && emailGuardado) {
        setUsuario({ nombre: nombreGuardado, email: emailGuardado });
      } else {
        setUsuario(null);
      }
    };

    // Chequeamos al cargar la página
    chequearUsuario();

    // Escuchamos un evento personalizado por si el usuario se loguea desde otro componente
    window.addEventListener("usuarioActualizado", chequearUsuario);
    return () =>
      window.removeEventListener("usuarioActualizado", chequearUsuario);
  }, []);

  // Función para cerrar sesión
  const cerrarSesion = () => {
    localStorage.removeItem("sostucumanNombre");
    localStorage.removeItem("sostucumanEmail");
    setUsuario(null);
    // Avisamos al resto de la app que la sesión se cerró
    window.dispatchEvent(new Event("usuarioActualizado"));
  };

  return (
    <Navbar
      expand="md"
      fixed="top"
      variant="dark"
      style={{
        transition: "all 0.4s ease",
        padding: scrolled ? "0.75rem 0" : "1.25rem 0",
        background: scrolled ? "rgba(8, 47, 73, 0.98)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
      }}
    >
      <Container>
        {/* LOGO */}
        <Navbar.Brand
          href="#inicio"
          className="d-flex align-items-center gap-2"
        >
          <img
            src={logoImg}
            alt="Logo SosTucumán"
            height="36"
            className="d-inline-block align-top rounded-3"
          />
          <span
            style={{
              fontFamily: "Outfit, sans-serif",
              fontWeight: 800,
              fontSize: "1.2rem",
              color: "white",
            }}
          >
            Sos<span style={{ color: "#f97316" }}>Tucumán</span>
          </span>
        </Navbar.Brand>

        {/* BOTÓN HAMBURGUESA */}
        <Navbar.Toggle
          aria-controls="menu-navegacion"
          className="border-0 shadow-none"
        />

        {/* CONTENIDO DEL NAVBAR */}
        <Navbar.Collapse id="menu-navegacion">
          <Nav className="mx-auto gap-2 gap-md-4 text-center my-3 my-md-0"></Nav>

          <div className="d-flex flex-column flex-md-row align-items-center gap-2">
            {/* RENDERIZADO CONDICIONAL: Si NO hay usuario, mostramos botones de Auth */}
            {!usuario ? (
              <>
                <Button
                  onClick={onAuth}
                  variant="outline-light"
                  style={{
                    borderRadius: "50px",
                    fontFamily: "Outfit",
                    fontWeight: 600,
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  Iniciar sesión
                </Button>
                <Button
                  onClick={onAuth}
                  className="text-white"
                  style={{
                    borderRadius: "50px",
                    fontFamily: "Outfit",
                    fontWeight: 600,
                    background: "#f97316",
                    border: "none",
                  }}
                >
                  Registrarse
                </Button>
              </>
            ) : (
              /* RENDERIZADO CONDICIONAL: Si SÍ hay usuario, mostramos el Dropdown con su Avatar */
              <NavDropdown
                align="end"
                title={
                  <div className="d-flex align-items-center gap-2 d-inline-flex">
                    <span
                      className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold shadow-sm"
                      style={{
                        width: "35px",
                        height: "35px",
                        fontSize: "0.95rem",
                      }}
                    >
                      {usuario.nombre.charAt(0).toUpperCase()}
                    </span>
                    <span
                      className="d-none d-sm-inline-block text-truncate"
                      style={{
                        maxWidth: "120px",
                        color: "white",
                        fontFamily: "Outfit",
                        fontWeight: 500,
                      }}
                    >
                      {usuario.nombre.split(" ")[0]}
                    </span>
                  </div>
                }
                id="user-dropdown"
              >
                <div className="px-3 py-2 border-bottom bg-light">
                  <p
                    className="mb-0 fw-bold text-dark text-truncate"
                    style={{ fontSize: "0.95rem" }}
                  >
                    {usuario.nombre}
                  </p>
                  <small
                    className="text-muted text-truncate d-block"
                    style={{ fontSize: "0.8rem" }}
                  >
                    {usuario.email}
                  </small>
                </div>
                <NavDropdown.Item href="#reportes" className="py-2 fw-medium">
                  Mis reportes
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={cerrarSesion}
                  className="text-danger py-2 fw-medium"
                >
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
