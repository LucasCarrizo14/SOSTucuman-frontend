import { useState, useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { GeoAlt, Camera, PencilSquare, Bell } from 'react-bootstrap-icons';
import './ComoFunciona.css';

const PASOS = [
  {
    pasos: 1,
    titulo: 'Marcá la ubicación',
    descripcion: 'Indicá la calle, altura o referencia más cercana al problema.',
    icon: <GeoAlt />
  },
  {
    pasos: 2,
    titulo: 'Subí una foto',
    descripcion: 'Una imagen ayuda a identificar el incidente con mayor precisión.',
    icon: <Camera />
  },
  {
    pasos: 3,
    titulo: 'Describí el problema',
    descripcion: 'Contá brevemente qué sucede y si representa un riesgo.',
    icon: <PencilSquare />
  },
  {
    pasos: 4,
    titulo: 'Seguí el reclamo',
    descripcion: 'Consultá los reportes activos y sus actualizaciones de estado.',
    icon: <Bell />
  },
];
export default function ComoFunciona() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(-1);
  const stepRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (lineRef.current) lineRef.current.classList.add('activo');
          PASOS.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), i * 320 + 200);
          });
        }
      },
      { threshold: 0.2 }
    );

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    stepRefs.current.forEach((el, i) => {
      if (el) {
        if (i <= activeStep) {
          setTimeout(() => el.classList.add('visible'), i * 50);
        }
      }
    });
  }, [activeStep]);

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      className="position-relative overflow-hidden"
      style={{ background: '#082f49', paddingTop: '5rem', paddingBottom: '5rem' }}
    >
      {/* Ola decorativa en la parte superior */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, lineHeight: 0, zIndex: 3 }}>
        <svg 
          viewBox="0 0 1440 72" 
          fill="none" 
          preserveAspectRatio="none" 
          style={{ display: 'block', width: '100%', height: '70px', transform: 'rotate(180deg)' }}
        >
          <path 
            d="M0,72 L0,36 Q360,0 720,36 Q1080,72 1440,36 L1440,72 Z" 
            fill="#ffffff" 
          />
        </svg>
      </div>
      <div
        style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(249,115,22,0.05)', filter: 'blur(80px)', top: '50%', right: '5%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
      />

      <Container>
        <div className="mb-5" style={{ maxWidth: '600px' }}>
          <div className="section-chip mb-4" style={{ background: 'rgba(249,115,22,0.15)', color: '#fb923c', display: 'inline-flex', padding: '0.3rem 0.875rem', borderRadius: '50px', fontSize: '0.78rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
            ¿CÓMO FUNCIONA?
          </div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'white', letterSpacing: '-0.03em', marginBottom: '1rem', lineHeight: '1.1' }}>
            Tu reporte llega<br />en cuatro pasos.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', fontSize: '1rem', lineHeight: 1.65 }}>
            En cuatro pasos, tu reporte llega con información clara para facilitar su seguimiento.
          </p>
        </div>

        <div style={{ maxWidth: '700px' }}>
          <div className="position-relative">

            <div className="d-none d-md-block position-absolute" style={{ left: '23px', top: '24px', bottom: '24px', width: '3px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', zIndex: 1 }}>
              <div ref={lineRef} className="paso-linea-relleno" style={{ borderRadius: '3px' }} />
            </div>

            {PASOS.map((step, i) => (
              <div key={step.pasos} className="d-flex gap-4 mb-4 position-relative z-2">
                <div className={`paso-punto flex-shrink-0 ${i < activeStep ? 'completado' : i === activeStep ? 'activo' : ''}`}>
                  {i < activeStep ? '✓' : step.pasos}
                </div>

                <div
                  ref={el => { stepRefs.current[i] = el }}
                  className="paso-contenido pb-2 w-100"
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <span style={{ fontSize: '1.25rem', color: i === activeStep ? '#f97316' : 'white', transition: 'color 0.3s' }}>
                      {step.icon}
                    </span>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: i === activeStep ? '#f97316' : 'white', transition: 'color 0.3s', margin: 0 }}>
                      {step.titulo}
                    </h3>
                  </div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: 0 }}>
                    {step.descripcion}
                  </p>
                </div>

              </div>
            ))}

          </div>
        </div>
      </Container>
    </section>
  );
}