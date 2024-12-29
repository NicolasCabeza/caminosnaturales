// Seleccionar el contenedor
const weatherContainer = document.querySelector('.weather-container');

// Función para obtener los datos del clima desde el servidor
async function obtenerClima() {
    const respuesta = await fetch('https://caminosnaturales.onrender.com/clima');
    const datos = await respuesta.json();
    return datos;
}

// Función para mostrar el clima
async function mostrarClima() {
    const climaDatos = await obtenerClima();

    // Recorro los datos y muestro el clima
    for (const datos of climaDatos) {
        // Creo elemento para el clima
        const climaElemento = document.createElement('div');
        climaElemento.classList.add('weather-icon');

        // Agrego icono e información
        const icono = datos.icono;
        climaElemento.innerHTML = `
            <img src="${icono}" alt="Icono de clima">
            <span>${datos.nombre}: ${datos.temperatura}°C</span>
            <p>${datos.descripcion}</p>
        `;

        // Agrego al contenedor
        weatherContainer.appendChild(climaElemento);
    }
}
mostrarClima();