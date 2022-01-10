'use strict'

const express = require('express')
const router = express.Router()
const { sequelize } = require('../models/index')
const { Suite, CasoDePrueba } = require('../models/index')

// GET ALL
router.get('/', (req, res) => {
    Suite.findAll().then(suites => {
        res.json(suites)
    })
})

// CREATE
router.post('/', (req, res) => {
    Suite.create({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    })
    .then(Suite => res.status(201).json({message: "Creado correctamente", status: 201, Suite}))
    // express deprecated res.json(status, obj): Use res.status(status).json(obj) instead routers\suites.js:21:26
    .catch(error => {res.status(400).json({Error: error})})
})
// READ
router.get('/:id', async (req, res) => {
    // Devuelve todos las suites que coincidan con el id del usuario enviado
    const [results, metadata] = await sequelize.query(`SELECT * FROM Suite WHERE Suite.id IN (SELECT suite_id FROM Usuario_suite WHERE usuario_id = ${req.params.id})`)
    // Results will be an empty array and metadata will contain the number of affected rows.    
    // Suite.findByPk(req.params.id)
        // .then(Suite => 
        // if (condition) {
            
        // }
        res.status(200).json(results)
        .catch(error => res.status(404).json({msg: 'No se encontró una Suite con este id', error: error}))
})

// DELETE
router.delete('/:id', (req, res) => {
    Suite.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => res.json(result))
    .catch(error => res.json({msg: 'Hubo un error al borrar esta Suite', error: error}))

})

module.exports = router