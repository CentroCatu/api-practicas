const { Usuario } = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const autconfig = require('../../config/auth')

module.exports = {
    SignIn(req, res){

        let { email, password } = req.body

        Usuario.findOne({
            where: {
                email: email
            }
        })
        .then(usuario => {
            if(!usuario){
                res.status(404).json({ status: 404, msg: 'Credenciales incorrectas'} )
            } else {
                if(bcrypt.compareSync(password, usuario.password)){
                    // devolvemos token
                    let token = jwt.sign({ usuario: usuario }, autconfig.secret, {
                        expiresIn: autconfig.expires
                    })
                    const { id, nombre, email } = usuario

                    res.status(200).json({
                        status: 300,
                        usuario: { id, nombre, email },
                        token: token
                    })

                } else {
                    res.status(404).json({ status: 404, msg: 'Contraseña incorrecta'} )
                }
            }
        })
        .catch(error => res.status(500).json({error}))
    },

    SignUp(req, res) {
        
        // encriptamos la contraseña
        let password = bcrypt.hashSync(req.body.password, Number.parseInt(autconfig.rounds))
        
        // creamos el usuario
        Usuario.create({
            nombre: req.body.nombre,
            email: req.body.email,
            password: password
        })
        .then(usuario => {

            // Excluimos la contraseña antes de devolver los datos
            const { id, nombre, email } = usuario
            // creamos el token
            let token = jwt.sign({ usuario: usuario }, autconfig.secret, {
                expiresIn: autconfig.expires
            })
            res.status(201).json({
                usuario: usuario, //{ id, nombre, email },
                token: token
            })
        })
        .catch(error => res.status(500).json(error))
    }
}