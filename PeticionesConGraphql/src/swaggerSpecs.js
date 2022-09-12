const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: 'API usando Express',
            description: 'Haciendo CRUD de productos en swagger'
        }
    },
    apis: ['../docs/**/*.yaml']
}

const swaggerSpecs = swaggerJsdoc(options)

module.exports = { swaggerSpecs }