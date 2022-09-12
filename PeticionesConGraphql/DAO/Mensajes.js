const fs = require("fs");
const tranfMsnDTO = require('../DTO/mensajesDTO.js')
const logger = require('../services/logger.js')

class Message {
    constructor (file){
        this.file = file;
    }

    saveMessage(dat) {
        const content = fs.readFileSync(this.file, 'utf-8')
        let datoID = JSON.parse(content);
        let newId
        if (datoID.length ==0) {
            newId = 1
        } else {
            newId = Number(datoID[datoID.length - 1].id) +1
        }
            let dato = JSON.parse(content);
            dato.push({author: {email: dat.author.email,
                                nombre: dat.author.nombre,
                                apellido: dat.author.apellido,
                                edad: dat.author.edad,
                                alias: dat.author.alias,
                                avatar: dat.author.avatar}, 
                        date: dat.date, 
                        hour: dat.hour , 
                        message: dat.message,
                        id: newId})
            fs.writeFileSync(this.file , JSON.stringify(dato, null, 2), error => {
                if (error) {
                    logger.error("hubo un error al escribir")
                } else {
                    logger.info("se pudo usar el SaveObject correctamente")
                }
            }
            )
            }

    getAll() {
        const arrayProductos = fs.readFileSync(this.file, 'utf-8')
            let dato =  JSON.parse(arrayProductos);
            return tranfMsnDTO(dato) 
    }
}

module.exports = Message;