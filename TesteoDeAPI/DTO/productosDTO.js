class productosDTO {
    constructor({title, price, thumbnail}){
        this.title = title, 
        this.price = price, 
        this.thumbnail = thumbnail
    }
}

const tranfProdDTO = (productos) => {
    if (Array.isArray(productos)){
        return productos.map(prod => new productosDTO(prod))
    } else {
        return new productosDTO(productos)
    }
}

module.exports = tranfProdDTO;