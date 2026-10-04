import { Container } from 'react-bootstrap';

export default function TodosReportes({ onReport }) {
  return (
    <section className="py-5 bg-white">
      <Container>
        <div
          className="position-relative overflow-hidden text-center px-4 py-5 px-md-5 shadow-sm"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0369a1 100%)',
            borderRadius: '28px'
          }}
        >
          {/* Orbe decorativo de fondo */}
          <div
            className="position-absolute pe-none"
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              background: 'rgba(249,115,22,0.1)',
              filter: 'blur(60px)',
              top: '-30%',
              right: '10%'
            }}
          />

          {/* Contenido del Banner */}
          <div className="position-relative z-1">
            <p
              className="text-uppercase mb-3 fw-bold"
              style={{ color: '#f97316', fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', letterSpacing: '0.08em' }}
            >
              Unite a la comunidad
            </p>
            <h2
              className="text-white mb-4 fw-bolder"
              style={{ fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', letterSpacing: '-0.03em' }}
            >
              Vos ves el problema,<br />nosotros lo llevamos al municipio.
            </h2>
            <p
              className="mx-auto mb-4 text-white opacity-75"
              style={{ fontFamily: 'Inter, sans-serif', fontSize: '1rem', maxWidth: '480px' }}
            >
              Más de 1.500 vecinos ya reportaron incidencias en Tucumán. Sumá tu voz.
            </p>

            <button
              onClick={onReport} 
              className="btn rounded-pill fw-bold text-white shadow border-0 px-5 py-3"
              style={{
                backgroundColor: '#f97316',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              Ver todos los reportes
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}