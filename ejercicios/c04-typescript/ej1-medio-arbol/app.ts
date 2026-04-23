const medioArbol = (): number | void => {
    const inputAltura = (document.querySelector("#numeroAltura") as HTMLInputElement);
    const numAltura = parseInt(inputAltura.value);
    const resultado = document.querySelector("pre") as HTMLPreElement;

    if (Number(numAltura) < 1) {
        resultado.textContent = "Error: ingrese un numero mayor a 1";
        return;
    }

    let arbol: string = "";

    for (let i: number = 1; i <= numAltura; i++){
        arbol += "*".repeat(i) + "\n";
    }

    resultado.textContent = arbol;
}