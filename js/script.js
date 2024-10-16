let motos = [];

document.addEventListener('DOMContentLoaded', () => {
    cargarMotos();
});

let resultado = document.getElementById("resultado"), search = document.getElementById("search");

function cargarMotos() {
    fetch('/js/motos.json')
        .then(response => response.json())
        .then(data => {
            motos = data.motos;
            mostrarMotos(motos);
            buscarMotos();
        })
        .catch(error => console.error('Error:', error));
}

function mostrarMotos(motos){
    motos.forEach(moto => {
        const elements = document.createElement("P");
        elements.innerHTML = `Marca: <strong>${moto.marca}</strong>  |  Modelo: <strong>${moto.modelo}</strong>  |  Año: <strong>${moto.year}</strong>  |  Color: <strong>${moto.color}</strong>`;
        resultado.appendChild(elements);
    });
}

function buscarMotos(){
    search.addEventListener("input", e => {
        limpiarHTML()
        const inputText = e.target.value.toUpperCase().trim();
        const mostrarFiltrado = motos.filter(moto => 
            moto.marca.toUpperCase().startsWith(inputText) || 
            moto.modelo.toUpperCase().startsWith(inputText) || 
            moto.year.toString().startsWith(inputText) || 
            moto.color.toUpperCase().startsWith(inputText)
        );
        
        if (mostrarFiltrado.length){
            mostrarMotos(mostrarFiltrado)
        } else {
            noResultado()
        }
    })
}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild)
    }
}

function noResultado(){
    const noResultado = document.createElement("DIV");
    noResultado.textContent = "No hay resultados de búsqueda.";
    resultado.appendChild(noResultado);
}