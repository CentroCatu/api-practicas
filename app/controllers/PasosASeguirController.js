'use strict'

const express = require('express')
const router = express.Router()
const { PasoASeguir } = require('../models/index')

// GET ALL
router.get('/', (req, res) => {
    PasoASeguir.findAll().then(pasos => res.json({status: 200, pasos}))
})

// CREATE
router.post('/', (req, res) => {
    PasoASeguir.create({
        caso_de_prueba_id: req.body.caso_de_prueba_id,
        descripcion: req.body.descripcion,
        numero: req.body.numero
    })
    .then(PasoASeguir => res.status(201).json({message: "Creado correctamente", status: 201, PasoASeguir}))
    // express deprecated res.json(status, obj): Use res.status(status).json(obj) instead routers\suites.js:21:26
    .catch(error => {
        res.status(404).json({ status: 404, Error: error })
    })
})

// READ
router.get('/:id', (req, res) => {
    PasoASeguir.findByPk(req.params.id)
        .then(PasoASeguir => res.status(200).json(PasoASeguir))
        .catch(error => res.status(404).json({ status: 404, msg: 'No se encontró una PasoASeguir con este id', error: error }))
})

// DELETE
router.delete('/:id', (req, res) => {
    PasoASeguir.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => res.status(200).json({ status: 200, result }))
    .catch(error => res.status(500).json({ status: 500, msg: 'Hubo un error al borrar esta PasoASeguir', error: error}))
})

module.exports = router