const btnBuscar = document.querySelector("#btnBuscar") as HTMLButtonElement;
const input = document.querySelector("#input") as HTMLInputElement;
const mensajeError = document.querySelector("#mensajeError") as HTMLParagraphElement;
const resultados = document.querySelector("#resultados") as HTMLDivElement;


interface LibroOL {
    title: string;
    author_name?: string;
    first_publish_year?: number;
}

async function busqueda(q: string): Promise<LibroOL[]> {
    try{
        const response = await fetch (`https://openlibrary.org/search.json?q=${q}`);
        if (!response.ok) throw new Error (`HTTP ${response.status}`);
        const libros: LibroOL[] = (await response.json()).docs;
        return libros;
    } catch (error) {
        console.error(`Error al realizar la busqueda.`);
        return [];
    }
}

btnBuscar.addEventListener("click", async function mostrarLibros(): Promise<void> {
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
        for (const l of libros10){
            const tarjeta = document.createElement("div");
            tarjeta.innerHTML = `
            <h3>Titulo: ${l.title}</h3>
            <p>Autor: ${l.author_name}</p>
            <p>Lanzamiento: ${l.first_publish_year}</p>`;
            resultados.appendChild(tarjeta);
        }

    } catch(error) {

    }

});