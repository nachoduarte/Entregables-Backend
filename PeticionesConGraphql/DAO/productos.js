class productosDAO {
    constructor (){
        this.productos = [];
    }

    guardarProducto(producto) {
            this.productos.push(producto)
            return this.getProductos()
    }

    actualizarProducto(id, {title, price, thumbnail}) {
        const pos = this.productos.findIndex(prod => prod.id == id)
        if (pos < 0){
            return undefined
        }
        const nuevoProducto = {id: parseInt(id) , title , price , thumbnail}
        this.productos.splice(pos, 1 , nuevoProducto)
        return(nuevoProducto)
    }

    getProdutoID(id) {
        const findProductos = this.productos.find(prod => prod.id == id)
        if (findProductos == undefined){
            throw new Error ('Producto no encontrado')
        }
        return findProductos  
    }

    getProductos() {
        return this.productos
    }

    deleteProducto(id){
        const pos = this.productos.findIndex(prod => prod.id == id)
        const filterProductos = this.productos.splice(pos, 1)
        if (pos < 0){
            throw new Error ('Producto no encontrado')
        }
        return this.productos
    }
    }


module.exports = productosDAO;