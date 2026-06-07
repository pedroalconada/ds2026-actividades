import BookCard from "../componentes/BookCard";

export default function Catalogo() {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Nuestro Catálogo</h2>
       
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
                
                <BookCard
                  id = "1"
                  title="Harry Potter"
                  author="J.K. Rowling"
                  image="/img/harryPotter1.jpg"
                />
        
                <BookCard
                  id = "2"
                  title="Nexus"
                  author="Yuval Noah Harari"
                  image="/img/nexus.jpg"
                />
        
                <BookCard
                  id = "3"
                  title="El Principito"
                  author="Antoine de Saint-Exupery"
                  image="/img/elPrincipito.jpg"
                />
        
                <BookCard
                  id = "4"
                  title="Rayuela"
                  author="Julio Cortazar"
                  image="/img/rayuela.jpg"
                />
        
                <BookCard
                  id = "5"
                  title="El Hobbit"
                  author="Tolkien"
                  image="/img/elHobbit.jpg"
                />
        
                <BookCard
                  id = "6"
                  title="Fahrenheit 451"
                  author="Ray Bradbury"
                  image="/img/farenheit451.jpg"
                />
        
              </div>
    </div>
  );
}