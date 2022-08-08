const {Router} = require('express')
const router = Router()
const passport = require('passport')
const ApiProductosTets = require('../api/productos-tes.js')

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
    res.render('errorRegistro' , {username : req.username})
})

router.get('/api/registro', (req, res) => {
    res.render('registro' , {})
})

//lOGOUT

router.post('/api/logout' , async (req, res) => {
    await req.session.destroy(err => {
        if (err) {
            res.json({error: 'olvidar', descripcion: err})
        } else {
            res.render('logout' , {
                username : req.username
            })
        }
    })
})

//LOGIN

router.post('/api/login' , passport.authenticate('login', {failureRedirect: '/api/errorLogin', successRedirect: '/api/productos-test'}))

router.get('/api/login', (req , res) => {
    res.render('login' , {})
})

router.get('/api/errorLogin',(req, res) => {
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
        res.render('plantilla' , {
            producto : prod,
            productoTrue: prod.length,
            username: req.username})
    } catch (err) {
         console.log(err); throw err
    }
})

//INICIO 

router.get('/' , autenticacion, (req, res) => {
    res.redirect('/api/productos-test')
})


module.exports = router;