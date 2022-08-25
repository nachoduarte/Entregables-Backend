const mongoose = require("mongoose");
const models = require("../services/models/User.js")
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv').config()
const logger = require('../services/logger.js')

ReadFromDB();

async function ReadFromDB() {

    try {
        const URL = process.env.URL_USERS_MONGODB

        let conection = await mongoose.connect(URL)
        logger.info('Conexion a base de datos usuarios OK')

        return
    } catch (error) {
        logger.error(error)
    }
}

class ClassUser {
    constructor() {

    }

    async getAll() {
        const users = await models.find()
        return users
    }

    async saveUser({username , password}) {
        const newUser = await models.create({
            username: username,
            password: password
        })
    logger.info('se pudo guardar el usuario correctamente')
    return newUser
    }

    async encryptPassword (password) {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, salt)
    }
    
    async matchPassword (password , userLog) {
        return await bcrypt.compare(password, userLog)
    }

}

module.exports = ClassUser;