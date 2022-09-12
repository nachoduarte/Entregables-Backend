const tranfProdDTO = require('../DTO/productosDTO.js')

class Contenedor {
    constructor () {
        this.productos = [];
        this.id = 0
    }

    saveProducto({title, price, thumbnail}) {
            this.id++
            const newProducto = ({id: this.id, title: title , price: Number(price), thumbnail: thumbnail})
            this.productos.push(newProducto)
            return tranfProdDTO(newProducto)
    }

    saveProductoById(id, {title, price, thumbnail}) {
        const pos = this.productos.findIndex(prod => prod.id === parseInt(id))
        if (pos < 0){
            return undefined
        }
        const nuevoProducto = {id: parseInt(id) , title , price , thumbnail}
        this.productos.splice(pos, 1 , nuevoProducto)
        return(tranfProdDTO(nuevoProducto))
    }

    getById(id) {
        const findProductos = this.productos.find(prod => prod.id === parseInt(id))
        return tranfProdDTO(findProductos)  
    }

    getAll() {
        return tranfProdDTO(this.productos)
    }

    deleteByIdNumber(id) {
        const filterProductos = this.productos.filter(prod => prod.id !== parseInt(id))
        const pos = this.productos.findIndex(prod => prod.id === parseInt(id))
        if (pos < 0){
            return undefined
        }
        this.productos = filterProductos
        return tranfProdDTO(this.productos)
    }
}


module.exports = Contenedor;