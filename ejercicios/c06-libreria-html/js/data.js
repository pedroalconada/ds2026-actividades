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
        if (libros10.length === 0) {
            resultados.innerHTML = "<div class='col-12 text-center text-danger><p>No se encontraron resultados</p></div>";
            return;
        }

        for (const l of libros10) {
            const portada = l.cover_i 
                ? `https://covers.openlibrary.org/b/id/${l.cover_i}-M.jpg` 
                : 'https://via.placeholder.com/150x200?text=Sin+Portada';
            const tarjeta = document.createElement("div");
            tarjeta.className = "col-md-4";
            tarjeta.innerHTML = `
            <div class="card h-100">
                <img src="${portada}" class="card-img-top" alt="portada" style="height: 250px; object-fit: contain; padding: 10px;">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${l.title}</h5>
                    <p class="card-text">Autor: ${l.author_name}</p>
                    <p class="card-text">Año: ${l.first_publish_year}</p>
                    <a href="libro.html" class="btn btn-primary">Ver más</a>
                </div>
            </div>
            `;

            resultados.appendChild(tarjeta);
        }
    }
    catch (error) {
    }
});