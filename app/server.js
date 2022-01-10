const express = require('express')
const app = express()
const { sequelize } = require('./models/index')
const cors = require('cors')
// IMPORTAR CONTROLADORES
const auth = require('./middlewares/auth')
const CasoDePrueba = require('./controllers/CasosDePruebaController')
const PasosASeguir = require('./controllers/PasosASeguirController')
const Suite = require('./controllers/SuitesController')
// const usuariosSuites = require('./controllers/UsuariosSuitesController')
const Estado = require('./controllers/EstadoController')
const Usuario = require('./controllers/UsuariosController')
const AuthController = require('./controllers/AuthController')
// Setting
const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

// Rutas
app.use('/casosdeprueba', CasoDePrueba)
app.use('/pasosaseguir', auth, PasosASeguir)
app.use('/suites', Suite)
app.use('/estados', auth, Estado)
app.use('/usuarios', auth, Usuario)
app.post('/signup', AuthController.SignUp)
app.post('/signin', AuthController.SignIn)

app.listen(PORT, () => {
    console.log(`Al aire en http://localhost:${PORT}`)

    sequelize.sync({ force: false }).then(() => {
        console.log('DB conectada')
        console.log(`http://localhost:${PORT}`)
    })
})

