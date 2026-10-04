import { useState } from "react";
import Navbar from "./componentes/Navbar";
import AuthModal from "./componentes/Modal-login";
import Hero from "./componentes/Inicio";
import ReportModal from "./componentes/Modal-reporte";
import Categorias from "./componentes/Categorias";
import ComoFunciona from "./componentes/Como-funciona";
import CarruselReportes from "./componentes/Reportes-activos";
import TodosLosReportes from "./componentes/Todos-los-reportes"
import Footer from "./componentes/Footer";
function App() {
  //MODAL LOGIN
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleOpenAuth = () => setShowAuthModal(true);
  const handleCloseAuth = () => setShowAuthModal(false);

  // MODAL REPORTE
  const [showReportModal, setShowReportModal] = useState(false);
  const handleOpenReport = () => setShowReportModal(true);
  const handleCloseReport = () => setShowReportModal(false);

  const [activeCategory, setActiveCategory] = useState(null);

  // FUNCIÓN TEMPORAL PARA LA NUEVA PÁGINA
  const nuevaPagina = () => {
    alert("Este botón te llevará a la nueva página.");
    
  };
  return (
    <>
      <Navbar onAuth={handleOpenAuth} onReport={handleOpenReport} />
      <AuthModal show={showAuthModal} onHide={handleCloseAuth} />
      <ReportModal show={showReportModal} onHide={handleCloseReport} />
      <Hero onReport={handleOpenReport} />
      <Categorias
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}/>
      <ComoFunciona/>
      <CarruselReportes onReport={handleOpenReport} />
      <TodosLosReportes onReport={nuevaPagina} />
      <Footer/>
    </>
  );
}

export default App;
