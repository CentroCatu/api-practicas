'use strict'

const express = require('express')
const router = express.Router()
const { Estado } = require('../models/index')

// GET ALL
router.get('/', (req, res) => {
    Estado.findAll().then(suites => {
        res.json(suites)
    })
})

// CREATE
router.post('/', (req, res) => {
    Estado.create({
        descripcion: req.body.descripcion
    })
    .then(Estado => res.status(500).json({message: "Creado correctamente", status: 201, Estado}))
    // express deprecated res.json(status, obj): Use res.status(status).json(obj) instead routers\suites.js:21:26
    .catch(error => {res.status(400).json({Error: error})})
})
// READ
router.get('/:id', (req, res) => {
    Estado.findByPk(req.params.id)
        .then(Estado => res.status(200).json(Estado))
        .catch(error => res.status(404).json({msg: 'No se encontró una Estado con este id', error: error}))
})

// DELETE
router.delete('/:id', (req, res) => {
    Estado.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => res.json(result))
    .catch(error => res.json({msg: 'Hubo un error al borrar esta Estado', error: error}))

})

module.exports = router