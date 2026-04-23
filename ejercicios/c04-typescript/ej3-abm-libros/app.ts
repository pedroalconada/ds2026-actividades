interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    genero?: string;
    precio: number;
    disponible: boolean;
}

const catalogo: Libro [] = [
    {isbn:"123", titulo: "Libro1", autor: "Juan", genero: "", precio: 200, disponible: true},    
    {isbn:"456", titulo: "Libro2", autor: "Pedro", genero: "", precio: 500, disponible: false},
    {isbn:"789", titulo: "Libro3", autor: "Simon", genero: "", precio: 1000, disponible: true},
]