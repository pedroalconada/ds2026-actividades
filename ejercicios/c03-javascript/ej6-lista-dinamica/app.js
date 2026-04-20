function agregarProducto() {
    const input = document.querySelector("#input");
    const lista = document.querySelector("#lista");    
    const producto = input.value.trim();
    
    if (producto === "")  {
        alert("Ingresa un producto valido");
        return;
    }

    const li = document.createElement("li");
    li.textContent = producto + " ";

    const eliminar = document.createElement("button");
    eliminar.textContent = "Eliminar";

    eliminar.addEventListener('click', () => {
        li.remove();
        actualizarContador();
    });
    

    lista.appendChild(li);
    li.appendChild(eliminar);
    actualizarContador();
}

const actualizarContador = () => {
    const contador = document.querySelector("#contador");
    const lista = document.querySelector("#lista");
    const cantidad = lista.children.length;
    contador.textContent = `${cantidad} productos en la lista`
}