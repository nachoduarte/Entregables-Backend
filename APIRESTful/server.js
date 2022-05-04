const express = require('express');
const routes = require('./rutas.js');
const router = express();

const PORT = 8080

const app = express();

app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', routes)
app.use('/productos', router)

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', (err) => console.log(`Error en el servidor ${err}`))