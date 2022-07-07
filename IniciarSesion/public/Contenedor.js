//const knex = require('knex')

//const productos = []

class Contenedor {
    constructor (optionproducto) {
        //this.knex = knex(optionproducto);
        this.productos = [];
    }

    //crearTabla() {
    //    return this.knex.schema.dropTableIfExists('productos')
    //        .finally(()=> {
    //            return this.knex.schema.createTable('productos' , table => {
    //                table.increments('id').primary()
    //                table.string('title' , 50).notNullable()
    //                table.float('price')
    //                table.string('thumbnail', 100).notNullable()
    //            })
    //        })
    //    }
    //    
    //saveProducto(prod) {
    //        return this.knex('productos').insert(prod)
    //    }
    //    
    //getAll() {
    //        return this.knex('productos').select('*')
    //    }
//
    //close() {
    //    this.knex.destroy()
    //}
//
    getAllTest() {
        return [...this.productos]
    }

    SaveProductoTest(prod) {
        let newId
        if (this.productos.length == 0) {
            newId = 1
        } else {
            newId = this.productos[this.productos.length - 1].id + 1
        }

        const newProd = {...prod , id: newId}
        this.productos.push(newProd)
        return newProd
    }
    
    //saveProductoById(id, {title, price, thumbnail}) {
    //    const pos = this.productos.findIndex(prod => prod.id === parseInt(id))
    //    if (pos < 0){
    //        return undefined
    //    }
    //    const nuevoProducto = {id: parseInt(id) , title , price , thumbnail}
    //    this.productos.splice(pos, 1 , nuevoProducto)
    //    return(this.productos)
    //}

    //getById(id) {
    //    const findProductos = this.productos.find(prod => prod.id === parseInt(id))
    //    return findProductos  
    //}


    //deleteByIdNumber(id){
    //    const filterProductos = this.productos.filter(prod => prod.id !== parseInt(id))
    //    const pos = this.productos.findIndex(prod => prod.id === parseInt(id))
    //    if (pos < 0){
    //        return undefined
    //    }
    //    this.productos = filterProductos
    //    return this.productos
    //}
}


module.exports = Contenedor;