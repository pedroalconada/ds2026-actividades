"use strict";
const listado = (document.querySelector("#listado"));
const parrafo = (document.querySelector("#stats"));
const btnFiltrar = (document.querySelector("#filtrar"));
const btnDisponibles = (document.querySelector("#mostrarDisponibles"));
const btnTodos = (document.querySelector("#mostrarTodos"));
const input = (document.querySelector("#filtroAutor"));
const catalogo = [
    { isbn: "123", titulo: "Libro1", autor: "Juan", genero: "", precio: 200, disponible: true },
    { isbn: "456", titulo: "Libro2", autor: "Pedro", genero: "", precio: 500, disponible: false },
    { isbn: "789", titulo: "Libro3", autor: "Simon", genero: "", precio: 1000, disponible: true },
];
function buscarPorAutor(autor) {
    let libros = [];
    for (const l of catalogo) {
        if (l.autor === autor) {
            libros.push(l);
        }
    }
    return libros;
}
function librosDisponibles() {
    let libros = [];
    for (const l of catalogo) {
        if (l.disponible === true) {
            libros.push(l);
        }
    }
    return libros;
}
function precioPromedio(libros) {
    const cantidad = libros.length;
    let precios = 0;
    for (const l of libros) {
        precios += l.precio;
    }
    return (precios / cantidad);
}
function renderizar(libros) {
    listado.textContent = "";
    for (const l of libros) {
        const li = document.createElement("li");
        li.textContent = `isbn: ${l.isbn}, titulo: ${l.titulo}, autor: ${l.autor}, genero: ${l.genero}, precio: ${l.precio}`;
        listado.appendChild(li);
    }
    actualizarStats(libros);
}
function actualizarStats(libros) {
    const cantidad = libros.length;
    const promedio = precioPromedio(libros);
    parrafo.textContent = `Cantidad de libros: ${cantidad}, Promedio: ${promedio.toFixed(2)}`;
}
btnFiltrar.addEventListener('click', function () {
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
btnTodos.addEventListener('click', function () {
    renderizar(catalogo);
});
btnDisponibles.addEventListener('click', function () {
    const libros = librosDisponibles();
    if (libros.length == 0) {
        alert("No hay libros disponibles.");
        return;
    }
    renderizar(libros);
});
