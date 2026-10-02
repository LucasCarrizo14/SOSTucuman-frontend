import { Container, Row, Col } from 'react-bootstrap';
import { Instagram, Facebook, TwitterX, Whatsapp, GeoAltFill, EnvelopeFill, TelephoneFill } from 'react-bootstrap-icons';
import logoImg from '../assets/imagenes/LOGOO.png'; 

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#082f49', color: 'rgba(255,255,255,0.65)', paddingTop: '4rem', paddingBottom: '2rem' }}>
      <Container>
        <Row className="g-4 justify-content-between mb-4">
          
          {/* Columna 1: Marca y Propósito */}
          <Col xs={12} md={4}>
            <div className="d-flex align-items-center mb-4">
              <img src={logoImg} alt="Logo SosTucumán" height="32" className="me-2 rounded-2" />
              <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'white', letterSpacing: '-0.02em' }}>
                Sos<span style={{ color: '#f97316' }}>Tucumán</span>
              </span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', lineHeight: 1.7, maxWidth: '280px' }}>
              Plataforma ciudadana colaborativa para reportar incidencias
              urbanas y mejorar los barrios de Tucumán. Vos ves el problema,
              nosotros lo llevamos al municipio.
            </p>
            <div className="d-flex gap-2 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                className="btn btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} aria-label="Instagram">
                <Instagram color="white" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="btn btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} aria-label="Facebook">
                <Facebook color="white" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer"
                className="btn btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} aria-label="X Twitter">
                <TwitterX color="white" />
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer"
                className="btn btn-sm rounded-circle d-inline-flex align-items-center justify-content-center"
                style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} aria-label="WhatsApp">
                <Whatsapp color="white" />
              </a>
            </div>
          </Col>

          {/* Columna 2: Navegación Rápida */}
          <Col xs={6} md={3} lg={2}>
            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'white', fontSize: '0.875rem', marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Enlaces
            </h4>
            <div className="d-flex flex-column gap-3">
              {[
                { texto: 'Inicio', id: 'inicio' },
                { texto: 'Categorías', id: 'categorias' },
                { texto: 'Cómo funciona', id: 'como-funciona' },
                { texto: 'Reportes activos', id: 'reportes' }
              ].map(link => (
                <a key={link.id} href={`#${link.id}`}
                  style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
                >
                  {link.texto}
                </a>
              ))}
            </div>
          </Col>

          {/* Columna 3: Información de Contacto */}
          <Col xs={12} md={5} lg={4}>
            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'white', fontSize: '0.875rem', marginBottom: '16px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Contacto
            </h4>
            <div className="d-flex flex-column gap-3" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem' }}>
              <div className="d-flex align-items-center gap-2">
                <GeoAltFill style={{ color: '#f97316', fontSize: '1.1rem' }} />
                <span>San Miguel de Tucumán, Argentina</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <EnvelopeFill style={{ color: '#f97316', fontSize: '1.1rem' }} />
                <a href="mailto:contacto@sostucuman.com.ar" className="text-decoration-none" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  contacto@sostucuman.com.ar
                </a>
              </div>
              <div className="d-flex align-items-center gap-2">
                <TelephoneFill style={{ color: '#f97316', fontSize: '1.1rem' }} />
                <span>+54 (381) 456-7890</span>
              </div>
            </div>
          </Col>
          
        </Row>
        
        {/* Barra Inferior de Copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: '8px', fontSize: '0.78rem', fontFamily: 'Inter, sans-serif' }}>
          <span>©2026 SosTucumán. Todos los derechos reservados.</span>
          <span style={{ color: 'rgba(255,255,255,0.4)' }}>Desarrollado por Carrizo Lucas & Geronimo Sol</span>
        </div>
        
      </Container>
    </footer>
  );
}