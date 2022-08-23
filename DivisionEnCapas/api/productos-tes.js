const Contenedor = require('../public/Contenedor.js')
const {generadorProductos} = require('../utils/generadorProductos.js')


class ApiProductosTest extends Contenedor {
    constructor(){
        super()
    }

    popular () {
        const nuevoTest = []
        for (let i = 0; i < 5 ; i++) {
            const nuevoProducto = generadorProductos();
            const saveProducto = this.SaveProductoTest(nuevoProducto)
            nuevoTest.push(saveProducto)
        }
        return nuevoTest;
    }
}

module.exports = ApiProductosTest; 