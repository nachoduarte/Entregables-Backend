const {Router} = require('express')
const controller = require('../controller/ejercicio.js')

const router = Router()

//RUTA DE LA INFORMACION 

router.get('/info', controller.informacion)

//RUTA DE LA API RANDOM

router.get('/api/randoms/:cant?', controller.numerosRandom)

module.exports = router;