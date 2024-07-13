const express = require('express');
const redis = require('@redis/client');

const app = express();
const port = 3000;

// Crear cliente Redis
const client = redis.createClient({
  url: 'redis://127.0.0.1:6379' // Cambia el protocolo a 'redis://'
});

// Manejar errores de Redis
client.on('error', (err) => {
  console.error('Error en Redis:', err);
});

client.connect().catch(console.error); // Asegúrate de conectar al cliente

// Middleware para parsear JSON
app.use(express.json());

// Ruta para servir la página
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Ruta para recibir datos y almacenarlos en Redis
app.post('/data', async (req, res) => {
  const { key, value } = req.body;
  try {
    await client.rPush( "turnos", value ); // Usa `await` para manejar el comando de Redis
    res.send('Datos guardados en Redis');
  } catch (err) {
    res.status(500).send('Error al guardar en Redis');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
