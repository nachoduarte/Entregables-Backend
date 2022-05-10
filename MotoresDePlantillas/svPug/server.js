const express = require('express')
const Products = require('./Products')
const PORT = 8080
const products = new Products()

const app = express()
app.use(express.urlencoded({ extended: true }))
app.set('views', './views')
app.set('view engine', 'pug')


app.get('/', viewProductList)
app.get('/crearProducto', viewCreateProduct)
app.post('/', postProduct)
app.listen(PORT, () => console.log(`listening on port ${PORT}`))

function viewProductList(req, res) {
    const productList = products.getAll()
    res.render('productList.pug', { productList });
}

function viewCreateProduct(req, res) {
    const { error, name, price, thumbnail } = req.query
    return res.render('productForm.pug', { error, name, price, thumbnail });
}

function postProduct(req, res) {
    const { error } = req
    if (error && error.length > 0) {
        return res.redirect(`/crearProducto/?error=${error}&name=${req.name}&price=${req.price}&thumbnail=${req.thumbnail}`)
    }
    const { name, price, thumbnail } = req.body
    products.postProduct({ name, price, thumbnail })
    return res.redirect('/')
}
