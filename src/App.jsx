import { useState } from "react";
import Navbar from "./componentes/Navbar";
import AuthModal from "./componentes/Modal-login";
import Hero from "./componentes/Inicio";
import ReportModal from "./componentes/Modal-reporte";
import Categorias from "./componentes/Categorias";
import ComoFunciona from "./componentes/Como-funciona";
import CarruselReportes from "./componentes/Reportes-activos";

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
  return (
    <>
      <Navbar onAuth={handleOpenAuth} onReport={handleOpenReport} />
      <AuthModal show={showAuthModal} onHide={handleCloseAuth} />
      <ReportModal show={showReportModal} onHide={handleCloseReport} />
      <Hero onReport={handleOpenReport} />
      <Categorias
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <ComoFunciona />
      <CarruselReportes onReport={handleOpenReport} />
    </>
  );
}

export default App;
