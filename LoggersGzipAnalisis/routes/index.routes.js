const {Router} = require('express')
const router = Router()
const passport = require('passport')
const ApiProductosTets = require('../api/productos-tes.js')
const logger = require('../utils/logger.js')

const productosTest = new ApiProductosTets();

function autenticacion (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/api/login')
    }
}

//REGISTER

router.post('/api/registro' , passport.authenticate('register', {failureRedirect: '/api/errorRegistro', successRedirect: '/api/login'}))

router.get('/api/errorRegistro', async (req, res) => {
    logger.error('Error en el registro')
    res.render('errorRegistro' , {username : req.username})
})

router.get('/api/registro', (req, res) => {
    logger.info('Ingresando al registro')
    res.render('registro' , {})
})

//lOGOUT

router.post('/api/logout' , async (req, res) => {
    await req.session.destroy(err => {
        if (err) {
            logger.error('Ocurrio un error en el logout' + err)
            res.json({error: 'olvidar', descripcion: err})
        } else {
            logger.info('Saliendo de la sesión correctamente')
            res.render('logout' , {
                username : req.username
            })
        }
    })
})

//LOGIN

router.post('/api/login' , passport.authenticate('login', {failureRedirect: '/api/errorLogin', successRedirect: '/api/productos-test'}))

router.get('/api/login', (req , res) => {
    logger.info('Accediendo al loggin')
    res.render('login' , {})
})

router.get('/api/errorLogin',(req, res) => {
    logger.error('Error en el login')
    res.render('errorLogin' , {})
})

//PRODUCTOS

router.get('/api/productos-test', autenticacion, async (req , res) => {
    if (!req.user.contador) {
        req.user.contador = 0
    } 
    req.user.contador++

    try{
        await productosTest.popular()
        let prod = await productosTest.getAllTest();
        logger.info('Se agregaaron los productos correctamente')
        res.render('plantilla' , {
            producto : prod,
            productoTrue: prod.length,
            username: req.username})
    } catch (err) {
         logger.error(err); throw err
    }
})

//INICIO 

router.get('/' , autenticacion, (req, res) => {
    res.redirect('/api/productos-test')
})

//EL RESTO DELAS RUTAS 

router.all('*', (req, res) => {
    const { url, method } = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no implementada`)
})


module.exports = router;