"use strict";
const listado = (document.querySelector("#listado"));
const parrafo = (document.querySelector("#stats"));
const btnFiltrar = (document.querySelector("#filtrar"));
const btnDisponibles = (document.querySelector("#mostrarDisponibles"));
const btnTodos = (document.querySelector("#mostrarTodos"));
const input = (document.querySelector("#filtroAutor"));
const btnAgregar = (document.querySelector("#agregar"));
const errorForm = (document.querySelector("#errorForm"));
const inputTitulo = document.querySelector("#titulo");
const inputAutor = document.querySelector("#autor");
const inputGenero = document.querySelector("#genero");
const inputPrecio = document.querySelector("#precio");
const disponible = document.querySelector('input[name=disponible]:checked');
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
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        li.textContent = `isbn: ${l.isbn}, titulo: ${l.titulo}, autor: ${l.autor}, genero: ${l.genero}, precio: ${l.precio}`;
        listado.appendChild(li);
        li.appendChild(btnEliminar);
        btnEliminar.addEventListener("click", function () {
            eliminarLibro(l.isbn);
        });
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
function eliminarLibro(isbn) {
    const indice = catalogo.findIndex(i => i.isbn === isbn);
    if (indice !== -1) {
        catalogo.splice(indice, 1);
    }
    ;
    renderizar(catalogo);
}
function agregarLibro(libro) {
    catalogo.push(libro);
    renderizar(catalogo);
}
function validarFormulario() {
    const titulo = inputTitulo.value.trim();
    const autor = inputAutor.value.trim();
    const genero = inputGenero.value.trim();
    const precio = Number(inputPrecio.value);
    const disponible = document.querySelector('input[name=disponible]:checked');
    if (titulo === "" || autor === "" || precio <= 0 || !disponible) {
        return null;
    }
    const libro = {
        isbn: Date.now().toString(),
        titulo: titulo,
        autor: autor,
        genero: genero,
        precio: precio,
        disponible: disponible.value === "true",
    };
    return libro;
}
btnAgregar.addEventListener("click", function () {
    const resultado = validarFormulario();
    errorForm.textContent = "";
    if (resultado === null) {
        errorForm.textContent = "Alguno de los datos es invalido.";
        return;
    }
    agregarLibro(resultado);
    inputTitulo.value = "";
    inputAutor.value = "";
    inputGenero.value = "";
    inputPrecio.value = "";
});
