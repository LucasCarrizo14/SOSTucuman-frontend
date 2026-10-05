import { useState } from "react";
import { BrowserRouter } from "react-router-dom"; // Envolvemos todo aquí
import Navbar from "./componentes/Navbar";
import AuthModal from "./componentes/Modal-login";
import ReportModal from "./componentes/Modal-reporte";
import Rutas from "./componentes/routes/Rutas";


function App() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const handleOpenAuth = () => setShowAuthModal(true);
  const handleCloseAuth = () => setShowAuthModal(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const handleOpenReport = () => setShowReportModal(true);
  const handleCloseReport = () => setShowReportModal(false);

  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <BrowserRouter>
      <Navbar onAuth={handleOpenAuth} onReport={handleOpenReport} />
      <AuthModal show={showAuthModal} onHide={handleCloseAuth} />
      <ReportModal show={showReportModal} onHide={handleCloseReport} />

      {/* Las rutas se encargan de cambiar el contenido principal */}
      <Rutas
        onReport={handleOpenReport}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      
    </BrowserRouter>
  );
}

export default App;
