import { Container, Row, Col } from "react-bootstrap";
import imgAlumbrado from "../assets/imagenes/Alumbrado.jpeg";
import imgBaches from "../assets/imagenes/Bache.jpeg";
import imgHigiene from "../assets/imagenes/Higiene.jpeg";
import imgSemaforo from "../assets/imagenes/Semaforo.jpeg";

const CATEGORIAS_DATA = [
  {
    id: "Alumbrado Público",
    title: "Alumbrado Público",
    desc: "Focos apagados, cables caídos o luminarias rotas en la vía pública.",
    img: imgAlumbrado,
  },
  {
    id: "Baches y Calles",
    title: "Baches y Calles",
    desc: "Roturas de calzada, hundimientos de pavimento y veredas en mal estado.",
    img: imgBaches,
  },
  {
    id: "Higiene Urbana",
    title: "Higiene Urbana",
    desc: "Microbasurales, contenedores desbordados o restos de poda sin retirar.",
    img: imgHigiene,
  },
  {
    id: "Semáforos y Tránsito",
    title: "Tránsito",
    desc: "Semáforos intermitentes, apagados o desincronizados en la ciudad.",
    img: imgSemaforo,
  },
];

export default function Categories({ activeCategory, setActiveCategory }) {
  return (
    <section
      id="categorias"
      className="py-5"
      style={{ backgroundColor: "#f8fafc" }}
    >
      <Container className="py-4">
        <Row className="align-items-center">
          {/* Columna Izquierda: Título Principal */}
          <Col lg={3} className="mb-4 mb-lg-0 pe-lg-4">
            <h2
              className="fw-bold"
              style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                color: "#082f49",
                lineHeight: 1.1,
              }}
            >
              ¿Qué queres
              <br />
              reportar
              <br />
              hoy?
            </h2>
          </Col>

          {/* Columna Derecha: Grilla de Tarjetas */}
          <Col lg={9}>
            <Row className="g-3">
              {CATEGORIAS_DATA.map((cat) => {
                const isActive = activeCategory === cat.id;

                return (
                  <Col xs={12} sm={6} md={3} key={cat.id}>
                    {/* Tarjeta con animación hover */}
                    <div
                      className="cat-video-card"
                      onClick={() =>
                        setActiveCategory &&
                        setActiveCategory(isActive ? null : cat.id)
                      }
                      style={{
                        border: isActive ? "3px solid #0ea5e9" : "none",
                      }}
                    >
                      {/* Imagen de fondo */}
                      <img
                        src={cat.img}
                        alt={cat.title}
                        className="cat-video-img"
                      />

                      {/* Filtro oscuro y línea decorativa */}
                      <div className="cat-video-overlay"></div>

                      {/* Contenido de texto */}
                      <div className="cat-video-content">
                        <h3 className="cat-video-title">{cat.title}</h3>

                        <div className="cat-video-details">
                          <p>{cat.desc}</p>
                          <span className="cat-video-link">Reporta &rarr;</span>
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
