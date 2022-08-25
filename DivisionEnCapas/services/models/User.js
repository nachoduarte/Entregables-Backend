const mongoose = require('mongoose')

const userCollection = 'usersCollection'

const UsersSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model(userCollection, UsersSchema)