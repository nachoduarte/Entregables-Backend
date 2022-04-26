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
    
    async deleteAll(){
        try {
            fs.writeFile(this.archivo, '[]')
            console.log('Se borró correctamente')
        } catch (error) {
            return error
        }
    }

    async save(obj) {
        try {
            const objs = await this.getAll();
            //console.log(objs)
            let newId = 1;
            if(objs.length > 0){
                newId = objs[objs.length - 1].id + 1;
            }
            const newObj = {...obj, id: newId}
            objs.push(newObj)

            fs.writeFile(this.archivo, JSON.stringify(objs, null, 2))
            console.log(`Creado exitosamente el producto ${newId}`);
            
        } catch (error) {
            console.log('Error al crear', error);
        }
    };

    async getById(idProducto) {
        const jsonData = await this.getAll()
        const seleccionado = await jsonData.find((item) => item.id === idProducto)
        console.log(seleccionado)
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


module.exports = Contenedor;
