/* La persistencia de este proyecto se vale de un metodo distinto por cada tipo de dato,
 es decir, los mensajes se manejan con File System, los productos se almacenan en memoria y los usuarios en MongoDB.
 Por lo que este codigo sirve a modo de practica de implementacion de factory. */



const ClassUser = require('./ClaseUsuariosMDB.js')
const Contenedor = require('./Contenedor.js')
const Message = require('./Mensajes.js')

const opcion = process.argv[2] || 'Memoria'

const urlUsuarios = process.env.URL_USUARIOS_FS

let dao
switch (opcion) {
    case 'MongoDB':
        dao = new ClassUserMDB()
        await dao.init()
        break
    case 'FileSystem':
        dao = new ClassUserFS(urlUsuarios)
        await dao.init()
        break
    default:
        dao = new ClassUserMem()
        dao.init()
}

module.exports =  class ClassUserFactory {
    static getDao() {
        return dao
    }
}