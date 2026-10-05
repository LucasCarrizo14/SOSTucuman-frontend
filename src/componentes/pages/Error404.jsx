import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { House, ArrowRight } from 'react-bootstrap-icons';
import pinLogo from '../../assets/imagenes/LOGOO.png';

export default function Error404() {
  return (
    <section className="d-flex align-items-center justify-content-center vh-100" style={{ backgroundColor: '#082f49', color: 'white' }}>
      <Container className="text-center">

        <span className="text-uppercase fw-bold" style={{ color: '#f97316', letterSpacing: '0.1em' }}>
          Error 404 · Ubicación desconocida
        </span>

        <div className="d-flex justify-content-center align-items-center my-4" style={{ fontSize: 'clamp(6rem, 15vw, 12rem)', fontWeight: 900, lineHeight: 1 }}>
          <span>4</span>
          <img
            src={pinLogo}
            alt="0"
            className="mx-2 rounded-4 shadow-lg"
            style={{ width: 'clamp(5rem, 12vw, 9rem)', height: 'clamp(5rem, 12vw, 9rem)', objectFit: 'cover' }}
          />
          <span>4</span>
        </div>

        <h1 className="fw-bolder mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
          Parece que caímos en un bache y perdimos esta página.
        </h1>

        <p className="mx-auto mb-5 opacity-75" style={{ maxWidth: '550px', fontSize: '1.1rem', fontFamily: 'Inter, sans-serif' }}>
          El enlace tomó un desvío inesperado. No hace falta reportarlo ,podemos ayudarte a volver a una zona conocida.
        </p>

        <div className="d-flex flex-wrap justify-content-center gap-3">
          <Link to="/">
            <Button className="rounded-pill px-4 py-3 fw-bold border-0 d-flex align-items-center gap-2 shadow" style={{ backgroundColor: '#f97316' }}>
              <House size={20} /> Volver al inicio
            </Button>
          </Link>

        </div>

        <div className="mt-5 pt-4 border-top border-secondary opacity-50 small" style={{ fontFamily: 'Inter, sans-serif' }}>
          Si llegaste desde un enlace del sitio, escribinos a contacto@sostucuman.com.ar
        </div>

      </Container>
    </section>
  );
}