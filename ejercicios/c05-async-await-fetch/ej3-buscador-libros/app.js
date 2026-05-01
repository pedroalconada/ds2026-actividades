"use strict";
const btnBuscar = document.querySelector("#btnBuscar");
const input = document.querySelector("#input");
const mensajeError = document.querySelector("#mensajeError");
const resultados = document.querySelector("#resultados");
async function busqueda(q) {
    try {
        const response = await fetch(`https://openlibrary.org/search.json?q=${q}`);
        if (!response.ok)
            throw new Error(`HTTP ${response.status}`);
        const libros = (await response.json()).docs;
        return libros;
    }
    catch (error) {
        console.error(`Error al realizar la busqueda.`);
        return [];
    }
}
btnBuscar.addEventListener("click", async function mostrarLibros() {
    const texto = input.value.trim();
    mensajeError.textContent = "";
    if (texto === "") {
        mensajeError.textContent = "Debe ingresar un libro";
        return;
    }
    try {
        const libros = await busqueda(texto);
        const libros10 = libros.slice(0, 10);
        resultados.innerHTML = "";
        input.value = "";
        for (const l of libros10) {
            const tarjeta = document.createElement("div");
            tarjeta.innerHTML = `
            <h3>Titulo: ${l.title}</h3>
            <p>Autor: ${l.author_name}</p>
            <p>Lanzamiento: ${l.first_publish_year}</p>`;
            resultados.appendChild(tarjeta);
        }
    }
    catch (error) {
    }
});
