const express = require('express')
const router = express.Router()
const { Usuario } = require('../models/index')

    router.get('/', (req, res) => {
        Usuario.findAll({//aca se puede declarar que campos traer: attributes: ['descripcion']

        })
        .then(usuarios => res.status(200).json({ status: 200, usuarios}))
        .catch(error => res.json(error))
    })

    router.get('/validar/:id/:email', async (req, res) => {
        Usuario.findOne({//aca se puede declarar que campos traer: attributes: ['descripcion']
            where: {
                id: req.params.id,
                email: req.params.email
            }
        })
        .then(usuario => {
            if (!usuario) {
                res.status(404).json({ msg: 'Datos inválidos' })
            } else {
                res.status(200).json({ msg: 'Datos validados' })
            }
        })
        .catch(error => res.status(404).json({error}))
    })

module.exports = router