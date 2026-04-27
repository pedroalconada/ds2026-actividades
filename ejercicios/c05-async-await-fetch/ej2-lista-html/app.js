"use strict";
const lista = document.querySelector("#ul");
async function obtenerUsuarios() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }
    const usuarios = await response.json();
    return usuarios;
}
async function mostrarUsuarios() {
    const p = document.createElement("p");
    document.body.appendChild(p);
    p.textContent = "Cargando...";
    try {
        const usuarios = await obtenerUsuarios();
        p.textContent = "";
        for (const u of usuarios) {
            const li = document.createElement("li");
            lista.appendChild(li);
            li.textContent = `Nombre: ${u.name} | Email: ${u.email}`;
        }
    }
    catch (error) {
        p.textContent = "";
        const mensajeError = document.createElement("p");
        document.body.appendChild(mensajeError);
        mensajeError.textContent = "Error al cargar usuarios.";
        mensajeError.style.color = "red";
    }
}
mostrarUsuarios();
