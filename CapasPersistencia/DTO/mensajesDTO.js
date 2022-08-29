class mensajesDTO {
    constructor({author, date, hour, message}){
        this.email = author.email, 
        this.avatar = author.avatar, 
        this.date = date, 
        this.hour = hour, 
        this.message = message
    }
}

const tranfMsnDTO = (msn) => {
    if (Array.isArray(msn)){
        return productos.map(prod => new mensajesDTO(msn))
    } else {
        return new mensajesDTO(msn)
    }
}

module.exports = tranfMsnDTO;