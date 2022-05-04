const { promises: fs} = require('fs');

class Contenedor {
    constructor(archivo){
        this.archivo = archivo;
    }

    async getAll() {
       try {
            const objs = await fs.readFile(this.archivo, "utf-8")
            return JSON.parse(objs)
         
        } catch (err) {
            return err
        } 
            
    }
    
    async postNew({ name, price, thumbnail }) {
        const objs = await this.getAll();
        let newId = 1;
        if(objs.length > 0){
            newId = objs[objs.length - 1].id + 1;
        }
        const newObj = { name: name, price: Number(price), thumbnail: thumbnail, id: newId };
        objs.push(newObj);
        fs.writeFile(this.archivo, JSON.stringify(objs, null, 2))
        console.log(`Creado exitosamente el producto ${newId}`);
        return newObj        
    }

    async putUpdate({ id, name, price, thumbnail }) {
        const jsonData = await this.getAll()
        const index = await jsonData.findIndex(e => e.id === parseInt(id))
        if (index < 0) return null
        const updated = { id: parseInt(id), name: name, price: price, thumbnail: thumbnail }
        return updated
    }

    async getById(idProducto) {
        try {
            const jsonData = await this.getAll()
            const seleccionado = await jsonData.filter(e => e.id == idProducto)
            return seleccionado 
        } catch (error) {
            return error
        }
    }

    async deleteById(idProducto) {
        try {
            const productos = await this.getAll()
            const nuevoArr = await productos.filter(e => e.id != idProducto)
            fs.writeFile(this.archivo, JSON.stringify(nuevoArr, null, 2))
            console.log(`Se borro correctamente el producto con el id: ${idProducto}`);
        } catch (error) {
            return error
        }
        
    }


}

const archivo1 = new Contenedor("./productos.txt")

module.exports = archivo1;
