import { useState } from 'react';
import Navbar from './componentes/Navbar';
import AuthModal from './componentes/Modal-login'; 

function App() {
  // Estado para controlar si el modal está visible o no
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Funciones que abren y cierran el modal
  const handleOpenAuth = () => setShowAuthModal(true);
  const handleCloseAuth = () => setShowAuthModal(false);

  const handleOpenReport = () => console.log("Abrir modal de reporte (próximamente)");

  return (
    <>
      <Navbar onAuth={handleOpenAuth} onReport={handleOpenReport} />
      
      {/* Nuestro nuevo modal. Le pasamos si debe mostrarse y la función para cerrarse */}
      <AuthModal show={showAuthModal} onHide={handleCloseAuth} />
      
      <main style={{ paddingTop: '80px', minHeight: '100vh', backgroundColor: '#082f49', color: 'white' }}>
      </main>  {/* borrar proximamente , nos sirve para guia */}
    </>
  )
}

export default App;