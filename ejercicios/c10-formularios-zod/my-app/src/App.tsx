import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./componentes/Layout/Layout";
import Catalogo from "./pages/Catalogo";
import LibroDetalle from "./pages/LibroDetalle";
import LibroNuevo from "./pages/LibroNuevo";
import { Libro } from "./types/libro";

// Traemos los libros que tenías para que sean el estado inicial
const librosIniciales: Libro[] = [
  { id: "1", title: "Harry Potter", author: "J.K. Rowling", image: "/img/harryPotter1.jpg" },
  { id: "2", title: "Nexus", author: "Yuval Noah Harari", image: "/img/nexus.jpg" },
  { id: "3", title: "El Principito", author: "Antoine de Saint-Exupery", image: "/img/elPrincipito.jpg" },
  { id: "4", title: "Rayuela", author: "Julio Cortazar", image: "/img/rayuela.jpg" },
  { id: "5", title: "El Hobbit", author: "Tolkien", image: "/img/elHobbit.jpg" },
  { id: "6", title: "Fahrenheit 451", author: "Ray Bradbury", image: "/img/farenheit451.jpg" }
];

function App() {
  // El estado vive en el ancestro común (App)
  const [libros, setLibros] = useState<Libro[]>(librosIniciales);

  // Función para agregar un libro nuevo sin modificar el array original
  const agregarLibro = (nuevo: Libro) => {
    setLibros([...libros, nuevo]);
  };

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          <Route path="/catalogo" element={<Catalogo libros={libros} />} />
          
          <Route path="/libros/:id" element={<LibroDetalle />} />
          
          <Route path="/libros/nuevo" element={<LibroNuevo onAgregar={agregarLibro} />} /> 
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;