const Message = require('../DAO/Mensajes.js')
const {normalize, schema} = require('normalizr')
const dotenv = require('dotenv').config()
const logger = require('../services/logger.js')


const urlMensajes = process.env.URL_MENSAJES_DB

const messages = new Message(urlMensajes)

/* ESQUEMAS A NORMALIZAR */

const author = new schema.Entity('author' , {} , {idAttribute: 'email'})
const mensajeria = new schema.Entity('messages', {authores: author}, {idAttribute: 'id'})
const schemaChat = new schema.Entity('mensajes', {mensajes: [mensajeria]} , {idAttribute: 'id'})

//funcion de mensajeria

const msn = async (socket) => {
    logger.info('Hay conexión para enviar mensajes!')
try {
    const chat = await messages.getAll()
    const formatoChat = {id:'mensajes' , mensajes: chat}
    const chatNormalizado = normalize(formatoChat , schemaChat)
    io.sockets.emit('messages', chatNormalizado)

    socket.on('new-message', async (dat) => {
        await messages.saveMessage(dat)
        const chat = await messages.getAll()
        logger.info('Se agregó el nuevo mensaje correctamente')
        const formatoChat = {id:'mensajes' , mensajes: chat}
        const chatNormalizado = normalize(formatoChat , schemaChat)
        io.sockets.emit('messages', chatNormalizado)
        
    })
} catch (err) {
    logger.error(err)
} 
}

module.exports = msn