interface Libro {
    isbn: string;
    titulo: string;
    autor: string;
    genero?: string;
    precio: number;
    disponible: boolean;
}

const catalogo: Libro [] = [
    {isbn:"123", titulo: "Libro 1", autor: "Juan", genero: "", precio: 200, disponible: true},    
    {isbn:"456", titulo: "Libro 2", autor: "Pedro", genero: "", precio: 500, disponible: false},
    {isbn:"789", titulo: "Libro 3", autor: "Simon", genero: "", precio: 1000, disponible: true},
]