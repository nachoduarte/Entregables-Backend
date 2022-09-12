//const app = require('../src/server.js')
const { strictEqual, deepStrictEqual } = require('assert')
const request = require('supertest')('http://localhost:8080')
const axios = require('axios')
const expect = require('chai').expect

const postProd = producto => axios.post('http://localhost:8080/api/productos', {producto})
const getProd = () => axios.get('http://localhost:8080/api/productos')
const getIdProd = () => axios.get('http://localhost:8080/api/productos/1')
const putProd = producto => axios.put('http://localhost:8080/api/productos/1', {producto})
const deleteProd = () => axios.get('http://localhost:8080/api/productos/1')

describe("Comprobando que el servidor de productos funcione", function() {
    beforeEach(async function(){
        console.log('------Inicio del test------')
    })

    it ("Verificar POST productos", async function (){
        const producto = {
            title: 'producto original',
            price: 1111,
            thumbnail: 'foto de prueba'
        }
        await postProd(producto)
        const res = await request.post('/api/productos').send(producto)
        console.log(res.statusCode)
        //expect(res.body.title).to.eql(producto.title)
        //expect(res.body.price).to.eql(producto.price)
        //expect(res.body.thumbnail).to.eql(producto.thumbnail)
        expect(res.statusCode).to.eql(302)

    })

    it ("Verificar funcion GET productos", async function (){
        await getProd()
        const res = await request.get('/api/productos')
        console.log(res.statusCode)
        expect(res.statusCode).to.eql(200)

    })

    it ("Verificar GET por id", async function (){
        await getIdProd()
        const res = await request.get('/api/productos/1')
        //console.log(res.body)
        console.log(res.statusCode)
        //expect(res.body.title).to.eql(producto.title)
        //expect(res.body.price).to.eql(producto.price)
        //expect(res.body.thumbnail).to.eql(producto.thumbnail)
        expect(res.statusCode).to.eql(200)

    })

    it ("Verificar el PUT de producto", async function (){
        const producto = {
            "title": 'producto cambiado',
            "price": 1234,
            "thumbnail": 'foto de prueba cambiada'
        }
        await putProd(producto)
        const res = await request.put('/api/productos/1').send(producto)
        console.log(res.body)
        console.log(res.statusCode)
        //expect(res.body.title).to.eql(producto.title)
        //expect(res.body.price).to.eql(producto.price)
        //expect(res.body.thumbnail).to.eql(producto.thumbnail)
        expect(res.statusCode).to.eql(302)

    })

    it ("Verificar el DELETE de producto", async function (){
        await deleteProd()
        const res = await request.delete('/api/productos/1')
        console.log(res.body)
        console.log(res.statusCode)
        //expect(res.body.title).to.eql(producto.title)
        //expect(res.body.price).to.eql(producto.price)
        //expect(res.body.thumbnail).to.eql(producto.thumbnail)
        expect(res.statusCode).to.eql(302)

    })

    afterEach(function() {
        console.log('------- Fin de Test -------')
    })
})