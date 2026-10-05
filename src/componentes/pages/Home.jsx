import Hero from "../Inicio";
import Categorias from "../Categorias";
import ComoFunciona from "../Como-funciona";
import CarruselReportes from "../Reportes-activos";
import TodosLosReportes from "../Todos-los-reportes";
import Footer from "../Footer";

export default function Home({ onReport, activeCategory, setActiveCategory }) {
  return (
    <>
      <Hero onReport={onReport} />
      <Categorias
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ComoFunciona />
      <CarruselReportes onReport={onReport} />
      <TodosLosReportes />
      <Footer />
    </>
  );
}
