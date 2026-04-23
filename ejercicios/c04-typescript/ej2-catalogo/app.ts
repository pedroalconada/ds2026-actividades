const listado = (document.querySelector("#listado")) as HTMLUListElement;
const parrafo = ((document.querySelector("#stats")) as HTMLParagraphElement);
const btnFiltrar = ((document.querySelector("#filtrar")) as HTMLButtonElement);
const btnDisponibles = ((document.querySelector("#mostrarDisponibles")) as HTMLButtonElement);
const btnTodos = ((document.querySelector("#mostrarTodos")) as HTMLButtonElement);
const input = ((document.querySelector("#filtroAutor")) as HTMLInputElement);


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

function buscarPorAutor (autor: string): Libro[] {
   let libros: Libro[] = [];
    for (const l of catalogo) {
        if (l.autor === autor) {
            libros.push(l);
        }
    }
    return libros;
}

function librosDisponibles(): Libro[] {
    let libros: Libro [] = [];
    for (const l of catalogo) {
        if (l.disponible === true) {
            libros.push(l);
        }
    }
    return libros;
}

function precioPromedio(libros: Libro[]): number {
    const cantidad: number = libros.length;
    let precios: number = 0;
    for (const l of libros) {
        precios += l.precio;
    }
    return (precios/cantidad);
}

function renderizar(libros: Libro[]): void {
    listado.textContent = "";
    for (const l of libros) {
        const li = document.createElement("li");
        li.textContent = `isbn: ${l.isbn}, titulo: ${l.titulo}, autor: ${l.autor}, genero: ${l.genero}, precio: ${l.precio}`;
        listado.appendChild(li);
    }
    actualizarStats(libros);
}


function actualizarStats (libros: Libro[]): void {
    const cantidad: number = libros.length;
    const promedio: number = precioPromedio(libros);
    parrafo.textContent = `Cantidad de libros: ${cantidad}, Promedio: ${promedio.toFixed(2)}`;
}

btnFiltrar.addEventListener('click', function() {
    const autor = input.value.trim();
    if (autor === "") {
        alert("Ingrese un autor");
        return;
    }
    const libros = buscarPorAutor(autor);
    if (libros.length === 0) {
        alert("No existen libros de este autor.");
        return;
    }
    renderizar(libros);
});

btnTodos.addEventListener('click', function() {
    renderizar(catalogo);
});

btnDisponibles.addEventListener('click', function() {
    const libros = librosDisponibles();
    if (libros.length == 0) {
        alert("No hay libros disponibles.");
        return;
    }
    renderizar(libros);
});