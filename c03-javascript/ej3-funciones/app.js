const calcularPrecioFinal = (monto, medioPago) => {
    if (monto < 200) return monto;
    if (monto >= 200 && monto <= 400) {
        if (medioPago === "E") return monto * 0.7;
        if (medioPago === "D") return monto * 0.8;
        if (medioPago === "C") return monto * 0.9;
     }
    if (monto > 400) return monto * 0.6;
    return monto;
}

console.log(`Monto: $100 | Pago: E | Final: $${calcularPrecioFinal(100, "E")}`);
console.log(`Monto: $300 | Pago: E | Final: $${calcularPrecioFinal(300, "E")}`);
console.log(`Monto: $350 | Pago: D | Final: $${calcularPrecioFinal(350, "D")}`);
console.log(`Monto: $400 | Pago: C | Final: $${calcularPrecioFinal(400, "C")}`);
console.log(`Monto: $500 | Pago: E | Final: $${calcularPrecioFinal(500, "E")}`);
console.log(`Monto: $600 | Pago: C | Final: $${calcularPrecioFinal(600, "C")}`);