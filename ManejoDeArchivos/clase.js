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


let archivo1 = new Contenedor(`./productos.txt`)

let productos = [{name:"gabinete", price: 2000, thumbnail: "Placeholder"}, {name:"mouse", price: 800, thumbnail: "Placeholder"}]

async function createProductos(prods) {
    for (const prod of prods) {
        await archivo1.save(prod)
    } 
}

//createProductos(productos);  //Ejecutar funcion con el archivo txt vacío.

//console.log(archivo1.getById(2)); //Ejecutar funcion con el archivo txt con contenido y la funcion createProductos comentada.

//archivo1.deleteById(2); //Ejecutar con el archivo txt con contenido y las funciones previas comentadas.

//archivo1.deleteAll(); //Ejecutar con el archivo txt con contenido y las funciones previas comentadas.

