const {Router} = require('express')
const router = Router()
const controller = require('../controller/index.js')
const passport = require('passport')


//REGISTER

router.post('/api/registro' , controller.passportRegistro)
router.get('/api/errorRegistro', controller.errorRegistro)
router.get('/api/registro', controller.registroGet)

//lOGOUT

router.post('/api/logout' , controller.logout)

//LOGIN

router.post('/api/login' , controller.passportLogin)
router.get('/api/login', controller.loginGet)
router.get('/api/errorLogin', controller.errorLogin)

//PRODUCTOS

router.get('/api/productos', /* controller.autenticacion, */ controller.productosGet)
router.get('/api/productos/:id', /* controller.autenticacion, */ controller.productosGetId)
router.post('/api/productos', /* controller.autenticacion, */ controller.productosPost)
router.put('/api/productos/:id',/*  controller.autenticacion, */ controller.productosPut)
router.delete('/api/productos/:id',/*  controller.autenticacion, */ controller.productosDelete)

//INICIO 

router.get('/' , controller.autenticacion, controller.rutaInicio)
router.all('*', controller.rutaError)


module.exports = router;