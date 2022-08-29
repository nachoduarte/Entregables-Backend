const tranfProdDTO = require('../DTO/productosDTO.js')


class Contenedor {
    constructor (){
        this.productos = [];
    }

    getAllTest() {
        const prod = [...this.productos]
        return tranfProdDTO(prod)
    }

    SaveProductoTest(prod){
        let newId
        if (this.productos.length ==0) {
            newId = 1
        } else {
            newId = this.productos[this.productos.length - 1].id +1
        }

        const newProd = {...prod , id: newId}
        this.productos.push(newProd)
        return tranfProdDTO(newProd)
    }
    
}


module.exports = Contenedor;