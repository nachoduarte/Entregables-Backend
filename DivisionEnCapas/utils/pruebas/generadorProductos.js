const {faker} = require('@faker-js/faker')
faker.locale = 'es_MX'

function generadorProductos() {
    return {
        title: faker.commerce.product() ,
        price: faker.commerce.price(400 , 5000 , 0),
        thumbnail: faker.image.food(200 , 200 , true)
    }
}


module.exports = {generadorProductos};