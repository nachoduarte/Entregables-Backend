const logger = require ('../services/logger.js')
//const ApiProductosTets = require('../utils/pruebas/productos-tes.js')
require('../services/passport/auth.js')
const passport = require('passport')
const ApiProductos = require('../DAO/Contenedor.js')

//const productosTest = new ApiProductosTets();
const productos = new ApiProductos();


//MIDELWARE DE AUTENTICACION

const autenticacion = async (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/api/login')
    }
}

//REGISTRO 

const passportRegistro = passport.authenticate('register', {failureRedirect: '/api/errorRegistro', successRedirect: '/api/login'})

const errorRegistro = async (req, res) => {
    logger.error('Error en el registro')
    res.render('errorRegistro' , {username : req.username})
}

const registroGet = async (req, res) => {
    logger.info('Ingresando al registro')
    res.render('registro' , {})
}

//LOGOUT

const logout = async (req, res) => {
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
}

// LOGIN 

const passportLogin = passport.authenticate('login', {failureRedirect: '/api/errorLogin', successRedirect: '/api/productos'})

const loginGet = async (req , res) => {
    logger.info('Accediendo al loggin')
    res.render('login' , {})
}

const errorLogin = async (req, res) => {
    logger.error('Error en el login')
    res.render('errorLogin' , {})
}

// productos-test


/* const productosGet = async (req , res) => {
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
} */

//PRODUCTOS 

const productosGet = async (req , res) => {
    let prod = await productos.getAll()
    logger.info('Se cargaron los productos correctamente')
    res.render('plantilla', {
        producto : prod,
        productoTrue: prod.length})
}

const productosGetId = async (req , res) => {
    const {id} = req.params
    let producto = await productos.getById(id)
    if (producto === undefined) {
        logger.error(`Producto con el ID: ${id} no encontrado`)
        return res.send(JSON.stringify({error:'Producto no encontrado'}))
    }
    logger.info('Se cargo el producto con el id enviado')
    res.render('plantilla', {
        producto : producto,
        productoTrue: producto.length})
}

const productosPost = async (req , res) => {
    let prod = req.body 
    await productos.saveProducto(prod)
    res.redirect('/api/productos')
}

const productosPut = async (req , res) => {
    let prod = req.body
    let {id} = req.params
    let producto = await productos.saveProductoById(id, prod)
    if (producto === undefined) {
        logger.error(`Producto con el ID: ${id} no encontrado`)
        return res.send(JSON.stringify({error:'Producto no encontrado'}))
    }
    res.redirect('/api/productos')
}

const productosDelete = async (req , res) => {
    let {id} = req.params
    const producto = await productos.deleteByIdNumber(id)
    if (producto === undefined) {
        logger.error(`Producto con el ID: ${id} no encontrado`)
        const error = (JSON.stringify({error:'Producto no encontrado'}))
        return res.send(error)
    }
    res.redirect('/api/producto')
}


//INICIO

const rutaInicio = async (req, res) => {
    res.redirect('/api/productos')
}

const rutaError = (req, res) => {
    const { url, method } = req
    res.send(`Ruta ${method} ${url} no implementada`)
}

module.exports = {
    passportRegistro,
    errorRegistro,
    registroGet,
    autenticacion,
    logout,
    passportLogin,
    loginGet,
    errorLogin, 
    productosGet,
    productosGetId,
    productosPost,
    productosPut,
    productosDelete,
    rutaInicio,
    rutaError
}