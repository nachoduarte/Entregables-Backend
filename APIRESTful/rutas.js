const Router = require('express');
const router = Router();
const Contenedor = require('./Contenedor.js');

router.get('/', (req, res) => {
    res.send('<h1>Bienvenido a la API RESTful</h1>');
})

router.get('/productos', async (req, res) => {
    const obj = await Contenedor.getAll()
    res.send(obj)
})

router.get('/productos/:id', async (req, res) => {
    const obj = await Contenedor.getAll()
    const { id } = req.params
    let object = await Contenedor.getById(id)

    if (isNaN(id)) {
        return res.send({ error: 'El caracter ingresado no es un numero' })
    }

    if (id < 1 || id > obj.length) {
        return res.send({ error: 'El numero ingresado esta fuera de rango' })
    }
    res.json(object)
})


router.post('/productos', async (req, res) => {
    const { name, price, thumbnail } = req.body
    const newObj = await Contenedor.postNew({ name, price, thumbnail })
    res.json(newObj)
})

router.put('/productos/:id', async (req, res) => {
    const { id } = req.params
    const { name, price, thumbnail } = req.body
    const updateObj = await Contenedor.putUpdate({ id, name, price, thumbnail })
    if (!updateObj) return res.json({ error: 'Producto no encontrado' })
    res.json(updateObj)
})

router.delete('/productos/:id', async (req, res) => {
    const obj = await Contenedor.getAll()
    const { id } = req.params
    let deleted = await Contenedor.deleteById(id)

    if (isNaN(id)) {
        return res.send({ error: 'El caracter ingresado no es un numero' })
    }

    if (id < 1 || id > obj.length) {
        return res.send({ error: 'El numero ingresado esta fuera de rango' })
    }
    res.json(deleted)
})

module.exports = router;