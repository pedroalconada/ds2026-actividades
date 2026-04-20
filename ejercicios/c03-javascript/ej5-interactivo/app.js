
const medioArbol = () => {
    const numeroAltura = document.querySelector("#numeroAltura").value;
    const resultado = document.querySelector("pre");
    if (numeroAltura < 1) {
        resultado.textContent = "Error: ingrese un numero mayor a 1";
        return;
    }

    let arbol = "";
    let numero = parseInt(numeroAltura);

    for (let i = 1; i <= numero; i++){
        arbol += "*".repeat(i) + "\n";
    }

    resultado.textContent = arbol;
}