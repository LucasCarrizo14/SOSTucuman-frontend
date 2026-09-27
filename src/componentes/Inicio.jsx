import { Container, Row, Col, Button } from 'react-bootstrap';
import bgImg from '../assets/imagenes/lapacho.jpg'; 

export default function Hero({ onReport }) {
  return (
    <section 
      id="inicio" 
      className="d-flex align-items-center position-relative overflow-hidden" 
      style={{ 
        minHeight: '100vh', 
        paddingTop: '80px',
        // Inyectamos el gradiente oscuro y la imagen
        background: `linear-gradient(90deg, rgba(8, 47, 73, 0.94) 0%, rgba(3, 105, 161, 0.78) 48%, rgba(8, 47, 73, 0.38) 100%), url(${bgImg}) center / cover no-repeat`
      }}
    >
      <Container className="position-relative z-1 py-5">
        <Row>
          {/* text-start fuerza la alineación a la izquierda en Bootstrap */}
          <Col xs={12} md={10} lg={8} xl={7} className="text-start">
        
            {/* Título Principal */}
            <h1 
              className="fw-bold text-white mb-3" 
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: 1.05, letterSpacing: '-0.03em' }}
            >
              Mejoremos<br />
              <span style={{ color: '#f97316' }}>nuestra ciudad</span><br />
              juntos.
            </h1>

            {/* Subtítulo */}
            <p 
              className="mb-4" 
              style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', lineHeight: 1.65, maxWidth: '520px', fontFamily: 'Inter, sans-serif' }}
            >
              Reportá baches, luminarias rotas o basurales en tiempo real y seguí el estado de tu reclamo. Tu voz llega al municipio.
            </p>

            {/* Botones de Acción */}
            <div className="d-flex flex-wrap gap-3 mb-5">
              <Button 
                onClick={onReport} 
                className="d-inline-flex align-items-center gap-2 rounded-pill fw-bold border-0 shadow" 
                style={{ fontSize: '1rem', padding: '0.875rem 2rem', backgroundColor: '#f97316', color: 'white' }}
              >
                <span>+</span> Hacer un reporte
              </Button>
              
              <Button 
                href="#reportes" 
                variant="outline-light"
                className="d-inline-flex align-items-center rounded-pill fw-bold" 
                style={{ fontSize: '1rem', padding: '0.875rem 2rem', borderWidth: '2px' }}
              >
                Ver reclamos activos &rarr;
              </Button>
            </div>

          </Col>
        </Row>
      </Container>

      {/* Ola decorativa en la parte inferior */}
      <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0 }}>
        <svg viewBox="0 0 1440 72" fill="none" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '72px' }}>
          <path d="M0,72 L0,36 Q360,0 720,36 Q1080,72 1440,36 L1440,72 Z" fill="#f0f9ff" />
        </svg>
      </div>
    </section>
  );
}