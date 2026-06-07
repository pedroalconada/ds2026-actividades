import Hero from "../componentes/Layout/Hero";
import BookCard from "../componentes/BookCard";

export default function Home() {
  return (
    <>
      <Hero />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        
        <BookCard
          title="Harry Potter"
          author="J.K. Rowling"
          image="/img/harryPotter1.jpg"
        />

        <BookCard
          title="Nexus"
          author="Yuval Noah Harari"
          image="/img/nexus.jpg"
        />

        <BookCard
          title="El Principito"
          author="Antoine de Saint-Exupery"
          image="/img/elPrincipito.jpg"
        />

        <BookCard
          title="Rayuela"
          author="Julio Cortazar"
          image="/img/rayuela.jpg"
        />

        <BookCard
          title="El Hobbit"
          author="Tolkien"
          image="/img/elHobbit.jpg"
        />

        <BookCard
          title="Fahrenheit 451"
          author="Ray Bradbury"
          image="/img/farenheit451.jpg"
        />

      </div>
    </>
  );
}