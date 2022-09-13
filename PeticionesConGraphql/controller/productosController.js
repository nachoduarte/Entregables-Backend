const productosApi = require('../services/productosApi.js')

const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const schema = buildSchema(`
    type Producto {
        id: ID!
        title: String,
        price: Float,
        thumbnail: String
    }
    input ProductoInput {
        title: String,
        price: Float,
        thumbnail: String
    }
    type Query {
        getProductos: [Producto],
        getProductoId(id: ID!): Producto
    }
    type Mutation {
        guardarProducto(dat: ProductoInput): Producto,
        actualizarProducto(dat: ProductoInput, id: ID!): Producto,
        deleteProducto(id: ID!): [Producto]
    }
`)


//PRODUCTOS 

class productosController {
    constructor(){
        const api = new productosApi()
        return graphqlHTTP({
            schema: schema,
            rootValue: {
                getProductos: api.getProductos,
                getProductoId: api.getProductoID,
                guardarProducto: api.guardarProducto,
                actualizarProducto: api.actualizarProducto,
                deleteProducto: api.deleteProducto,
            },
            graphiql: true
        })
    }
}


module.exports = productosController