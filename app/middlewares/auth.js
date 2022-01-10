const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

module.exports = (req, res, next) => {
    console.log(req.headers)

    // Comprobar que exista el token
    if(!req.headers.authorization) {
        res.status(401).json({ msg: 'Acceso no autorizado' })
    } else {

        // Comprobar la validez del token
        let token = req.headers.authorization.split(" ")[1]
        console.log(req.headers.authorization)
        jwt.verify(token, authConfig.secret, (error, decoded) => {

            if(error) {
                res.status(500).json({ msg: 'Ha ocurrido un problema con el token', error })
            } else {
                req.usuario = decoded
                next()
            }
        })
    }
    
}