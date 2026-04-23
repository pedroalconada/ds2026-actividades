"use strict";
const medioArbol = () => {
    const inputAltura = document.querySelector("#numeroAltura");
    const numAltura = parseInt(inputAltura.value);
    const resultado = document.querySelector("pre");
    if (Number(numAltura) < 1) {
        resultado.textContent = "Error: ingrese un numero mayor a 1";
        return;
    }
    let arbol = "";
    for (let i = 1; i <= numAltura; i++) {
        arbol += "*".repeat(i) + "\n";
    }
    resultado.textContent = arbol;
};
