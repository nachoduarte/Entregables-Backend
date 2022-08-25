class Contenedor {
    constructor (){
        this.productos = [];
    }

    getAllTest() {
        return [...this.productos]
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
        return newProd
    }
    
}


module.exports = Contenedor;