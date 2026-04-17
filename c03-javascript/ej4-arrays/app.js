const numeros = [1, 2, 3, 4, 10, 20, 30, 40];
let suma = 0;
let mayor = numeros[0];
let menor = numeros[0];

for (const num of numeros) {
    suma += num;

    if (num > mayor) {
        mayor = num;
    }

    if (num < menor) {
        menor = num;
    }
}

let promedio = suma / numeros.length;

console.log("Suma: ", suma);
console.log("Numero mayor: ", mayor);
console.log("Numero menor: ", menor);
console.log("Promedio: ", promedio);

const generarAsteriscos = (n) => {
    let asteriscos = "";
    for ( i = 0; i < n; i++) {
        asteriscos += "*";
    };
    return asteriscos;
}

console.log(generarAsteriscos(4));
console.log(generarAsteriscos(2));
console.log(generarAsteriscos(0));