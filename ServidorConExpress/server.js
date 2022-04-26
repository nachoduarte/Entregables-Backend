const express = require('express')

const Contenedor = require('./Contenedor.js')

const PORT = 8080

const app = express()

const contenedor = new Contenedor('productos.txt')

console.log(contenedor)

app.get('/', (req, res) => {
    res.send('<h1 style="color: blue;">Ejercicio de servidor con Express</h1> <h2 style="color: blue;">visite /productos para una lista de productos y /productoRandom para un producto aleatorio</h2>')
})

app.get('/productos', async (req, res) => {
    res.send(`<h1>${JSON.stringify(await contenedor.getAll())}</h1>`)
})

app.get('/productoRandom', async (req, res) => {
    let data = await contenedor.getAll();
    const random = data[Math.floor(Math.random() * data.length)];
    res.send(`<h1>Producto random: ${JSON.stringify(random)}</h1>`)
})

const server = app.listen(PORT, () => {
    console.log('listening on port' + PORT)
})