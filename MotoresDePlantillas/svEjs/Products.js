module.exports = class Products {
    constructor() {
        this.setId = 0;
        this.products = [];
    }

    getAll() {
        return this.products;
    }

    getById(id) {
        return this.products.find((obj) => obj.id === parseInt(id));
    }

    postProduct({ name, price, thumbnail }) {
        this.setId++
        const newObj = { id: this.setId, name: name, price: price, thumbnail: thumbnail };
        this.products.push(newObj);
        return newObj;
    }

    putProduct({ id, name, price, thumbnail }) {
        const index = this.products.findIndex((obj) => obj.id === parseInt(id));
        if (index < 0) return null;
        const updateObj = { id: parseInt(id), name: name, price: price, thumbnail: thumbnail };
        this.products.splice(index, 1, updateObj)
        return updateObj
    }

    deleteById(id) {
        const index = this.products.findIndex((obj) => obj.id === parseInt(id))
        if (index < 0) return null;
        this.products.splice(index, 1)
        return id
    }
}