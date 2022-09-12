const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const ClassUserMDB = require('../../DAO/ClaseUsuariosMDB.js')

const user = new ClassUserMDB()

//SERIALIZAR Y DESERIALIZAR

passport.serializeUser(function(user, done) {
    done(null, user.username)
  })
  
  passport.deserializeUser(async function(username, done) {
    const usuarios = await user.getAll()
    const usuario = usuarios.find(usuario => usuario.username == username)
    done(null, usuario)
  })

//PASSPORT REGISTRO


passport.use('register', new LocalStrategy({
    passReqToCallback: true,
}, async (req, username, password, done) => {

    const users = await user.getAll()
    const usuario = users.find(usuario => usuario.username == username)
    if (usuario) {
        return done ()
    }
    

    const newUser = {
        username, 
        password: await user.encryptPassword(password)
    }
    
    await user.saveUser(newUser)

    return done(null, newUser)
}))

// PASSPORT LOGIN 

passport.use('login', new LocalStrategy(async (username, password, done) => {

    const usuarios = await user.getAll()
    const userLog = usuarios.find(usuario => usuario.username == username)
    if (!userLog) {
        return done(null, false)
    }

    const match = await user.matchPassword(password, userLog.password)

    if (!match) {
        return done(null, false)
    }

    user.contador = 0 
    return done(null,userLog)
}))