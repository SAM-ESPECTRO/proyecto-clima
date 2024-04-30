require('dotenv').config()

// Obtener referencia a los elementos HTML
const searchBar = document.querySelector('.barra-de-busqueda');
const searchInput = searchBar.querySelector('input');
const searchResults = document.getElementById('tarjeta-resultado');

// Agregar evento de clic al ícono de búsqueda
searchBar.addEventListener('click', () => {
  searchBar.classList.add('active');
  searchInput.focus();
});

// Agregar evento de tecla presionada al campo de búsqueda
searchInput.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    searchWeather(searchInput.value);
    // No se remueve la clase 'active' para mantener la barra de búsqueda visible
  }
});

// Función para buscar el clima
function searchWeather(country) {
    const apiKey = process.env.API_KEY;
    const apiUrl = process.env.API_URL;
    const urlCompleta = `${apiUrl}?q=${country}&appid=${apiKey}`
  
    // Realizar la llamada a la API
    fetch(urlCompleta)
    .then(response => response.json())
    .then(data => {
      // Extraer los datos necesarios y convertir a grados centígrados
      const countryName = data.name;
      const weatherDescription = data.weather[0].description;
      const temperature = (data.main.temp - 273.15).toFixed(1); // Convertir de Kelvin a °C
      const feelsLike = (data.main.feels_like - 273.15).toFixed(1); // Convertir de Kelvin a °C
      const windSpeed = data.wind.speed;
      const latitude = data.coord.lat;
      const longitude = data.coord.lon;
  
      // Crear la tarjeta de resultados
      const resultCardHTML = `
      <div class="result-card">
      <h2>${countryName}</h2>
      <div class="weather-info">
      <p><i class="fas fa-circle"></i> <span>${weatherDescription}</span></p>
      <p><i class="fas fa-thermometer-half"></i> <span>Temperatura: ${temperature} °C</span></p>
      <p><i class="fas fa-thermometer-quarter"></i> <span>Sensación Térmica: ${feelsLike} °C</span></p>
      <p><i class="fas fa-wind"></i> <span>Velocidad del Viento: ${windSpeed} m/s</span></p>
      <p><i class="fas fa-globe-americas"></i> <span>Latitud: ${latitude}</span></p>
      <p><i class="fas fa-globe-americas"></i> <span>Longitud: ${longitude}</span></p>
      </div>
      </div>
      `;
  
      // Mostrar la tarjeta de resultados en el contenedor
      searchResults.innerHTML = resultCardHTML;
    })
    .catch(error => {
      console.log('Error al obtener el clima:', error);
      searchResults.innerHTML = `<p>Error al obtener el clima: ${error.message}</p>`;
    });
  }

//Cerrar sesion

const botonCerrarSesion = document.getElementById('cerrarSesion');

botonCerrarSesion.addEventListener('click', function(){
  //borrar un elemento especifico del local storage
  localStorage.removeItem('username');
  localStorage.removeItem('password');

  //verificar si se borro correctamente
  if(localStorage.getItem('username') === null){
    console.log('Username borrado correctamente');
  } else{
    console.error('Error al borrar username')
  }
  if(localStorage.getItem('password') === null){
    console.log('Password borrada correctamente');
  } else{
    console.error('Error al borrar password')
  }
  //devolver a la main page
  window.location.href = 'index.html';
})