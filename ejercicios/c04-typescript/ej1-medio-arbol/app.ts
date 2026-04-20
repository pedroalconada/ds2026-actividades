const generarMedioArbol = (): void => {
    const numeroAltura: string = (document.querySelector("#numeroAltura") as HTMLInputElement).value;
    const resultado = document.querySelector("pre") as HTMLPreElement;
    if (parseInt(numeroAltura) < 1) {
        resultado.textContent = "Error: ingrese un numero mayor a 1";
        return;
    }

    let arbol: string = "";
    let numero: number = parseInt(numeroAltura);

    for (let i: number = 1; i <= numero; i++){
        arbol += "*".repeat(i) + "\n";
    }

    resultado.textContent = arbol;
}