const express = require('express')
const productosController = require('../controller/productosController.js')


const app = express()

app.use(express.static('public'))

app.use('/graphql', new productosController())

const PORT = 8080

app.listen(PORT, () => {
    console.log(`Servidor encendido en el puerto ${PORT}`)
})