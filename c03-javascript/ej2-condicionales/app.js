function clasificarNota(nota) {
    if (nota < 4) {
        return "Desaprobado";
    } else if (nota >= 4 && nota <= 7) {
        return "Aprobado";
    } else {
        return "Promocionado";
    }
}

function diaDeLaSemana(numero) {
    switch(numero) {
        case 1: return "Lunes"; break;
        case 2: return "Martes"; break;
        case 3: return "Miercoles"; break;
        case 4: return "Jueves"; break;
        case 5: return "Viernes"; break;
        case 6: return "Sabado (fin de semana)"; break;
        case 7: return "Domingo (fin de semana)"; break;
        default: return "Dia invalido";
    }
}

console.log(clasificarNota(5));
console.log(clasificarNota(9));
console.log(clasificarNota(2));

console.log(diaDeLaSemana(4));
console.log(diaDeLaSemana(6));
console.log(diaDeLaSemana(9));