const listado = (document.querySelector("#listado")) as HTMLUListElement;
const parrafo = ((document.querySelector("#stats")) as HTMLParagraphElement);
const btnFiltrar = ((document.querySelector("#filtrar")) as HTMLButtonElement);
const btnDisponibles = ((document.querySelector("#mostrarDisponibles")) as HTMLButtonElement);
const btnTodos = ((document.querySelector("#mostrarTodos")) as HTMLButtonElement);
const input = ((document.querySelector("#filtroAutor")) as HTMLInputElement);
const btnAgregar = ((document.querySelector("#agregar")) as HTMLButtonElement);
const errorForm = ((document.querySelector("#errorForm")) as HTMLDivElement);

const inputTitulo = (document.querySelector("#titulo") as HTMLInputElement);
const inputAutor = (document.querySelector("#autor") as HTMLInputElement);    
const inputGenero = (document.querySelector("#genero") as HTMLInputElement);
const inputPrecio = (document.querySelector("#precio") as HTMLInputElement);
const disponible = document.querySelector('input[name=disponible]:checked') as HTMLInputElement;

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
        const li = (document.createElement("li") as HTMLLIElement);
        const btnEliminar = (document.createElement("button") as HTMLButtonElement);
        btnEliminar.textContent = "Eliminar"
        li.textContent = `isbn: ${l.isbn}, titulo: ${l.titulo}, autor: ${l.autor}, genero: ${l.genero}, precio: ${l.precio}`;
        listado.appendChild(li);
        li.appendChild(btnEliminar);

        btnEliminar.addEventListener("click", function() {
            eliminarLibro(l.isbn);
        });
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

function eliminarLibro(isbn: string): void {
        const indice = catalogo.findIndex(i => i.isbn === isbn);
        if (indice !== -1) {
            catalogo.splice(indice, 1);
        };
        renderizar(catalogo);
}

function agregarLibro(libro: Libro): void {
    catalogo.push(libro);
    renderizar(catalogo);
}

function validarFormulario(): Libro | null {
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const genero = inputGenero.value.trim();
    const precio = Number(inputPrecio.value);
    const disponible = document.querySelector('input[name=disponible]:checked') as HTMLInputElement | null;

    if (titulo === "" || autor === "" || precio <= 0 || !disponible) {
        return null;
    }

    const libro: Libro = {
        isbn: Date.now().toString(),
        titulo: titulo,
        autor: autor,
        genero: genero,
        precio: precio,
        disponible: disponible.value === "true",
    };

    return libro;
}

btnAgregar.addEventListener("click", function() {
    const resultado = validarFormulario();
    errorForm.textContent = "";
    if (resultado === null) {
        errorForm.textContent = "Alguno de los datos es invalido."
        return;
    }
    agregarLibro(resultado);
    inputTitulo.value = "";
    inputAutor.value = "";
    inputGenero.value = "";
    inputPrecio.value = "";
});