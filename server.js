import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const app = express();
const PORT = process.env.PORT || 3002;
app.use(cors());
app.use(express.static('public'));

// Ciudades para mostrar el clima
const ciudades = ['Buenos Aires','Mendoza','Salta','Rio negro','San luis'];

// Ruta para obtener el clima de las ciudades
app.get('/clima', async (req, res) => {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const climaDatos = [];

    for (let ciudad of ciudades) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

        try {
            const respuesta = await fetch(url);
            const datos = await respuesta.json();

            // Si la ciudad es válida, agregamos los datos al array
            if (datos.cod === 200) {
                climaDatos.push({
                    nombre: datos.name,
                    descripcion: datos.weather[0].description,
                    icono: `https://openweathermap.org/img/wn/${datos.weather[0].icon}@2x.png`,
                    temperatura: Math.round(datos.main.temp)
                });
            }
        } catch (error) {
            console.error('Error al obtener el clima de la ciudad:', ciudad);
        }
    }

    res.json(climaDatos);  // Enviar los datos al frontend
});

// Servir index.html como página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});