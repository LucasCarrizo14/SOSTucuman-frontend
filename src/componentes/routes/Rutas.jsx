import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Reportes from "../pages/Reportes";

const Rutas = ({ onReport, activeCategory, setActiveCategory }) => {
  return (
    <Routes>
      {/* Ruta principal que carga tu Home */}
      <Route
        path="/"
        element={
          <Home
            onReport={onReport}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        }
      />

      {/* La página de todos los reportes */}
      <Route path="/reportes" element={<Reportes />} />
    </Routes>
  );
};

export default Rutas;
