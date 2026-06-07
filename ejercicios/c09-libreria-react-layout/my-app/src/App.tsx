import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./componentes/Layout/Layout";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/libros/:id" element={<LibroDetalle />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;