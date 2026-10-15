import { useState , useEffect} from "react";
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
  // Boton "crear nuevo reporte"- pagina mi MIS REPORTES
  useEffect(() => {
    window.addEventListener("abrirModalAuth", handleOpenAuth);
    window.addEventListener("abrirModalReporte", handleOpenReport);
    return () => {
      window.removeEventListener("abrirModalAuth", handleOpenAuth);
      window.removeEventListener("abrirModalReporte", handleOpenReport);
    };
  }, []); 

  return (
    <>
      <AuthModal show={showAuthModal} onHide={handleCloseAuth} />
      <ReportModal show={showReportModal} onHide={handleCloseReport} />

      {/* Las rutas se encargan de cambiar el contenido principal */}
      <Rutas
        onAuth={handleOpenAuth}
        onReport={handleOpenReport}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
    </>
  );
}

export default App;
