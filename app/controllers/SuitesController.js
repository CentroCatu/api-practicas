'use strict'

const express = require('express')
const router = express.Router()
const { Suite, sequelize } = require('../models/index')

// GET ALL
router.get('/', (req, res) => {
    Suite.findAll()
        .then(suites => res.status(200).json({ status: 200, suites }))
        .catch(error => res.status(500).json({ status: 500, error }))
})

// CREATE
router.post('/', (req, res) => {
    Suite.create({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion
    })
    // .then(suites => res.json(suites))
    .then(async (Suite) => {
        const idUsuario = req.body.idUsuario
        await sequelize.query(`INSERT INTO Usuario_suite(usuario_id, suite_id) VALUES (${idUsuario}, ${Suite.id});`)
        .then(([results, metadata]) => res.status(201).json({ status: 201, msg: "Creado correctamente", Suite, suite_usuario_id: results}))
        // res.status(201).json({ msg: "Creado correctamente", status: 201, Suite }))
        .catch(error => res.status(500).json({ Error: error }))
    })
    .catch(error => res.status(500).json({ Error: error }))
})

// READ POR USUARIO
router.get('/usuario/:id', async (req, res) => {
    // const [results, metadata] = await sequelize.query(`SELECT * FROM Suite WHERE Suite.id IN (SELECT suite_id FROM Usuario_suite WHERE usuario_id = ${req.params.id})`)

    //validación para id por body
    // if (typeof req.params.id !== "number") {
    //     res.status(404).json({ msg: 'Error' })
    // } else {
        const id = parseInt(req.params.id)
        await sequelize.query(`SELECT * FROM Suite WHERE Suite.id IN (SELECT suite_id FROM Usuario_suite WHERE usuario_id = ${id})`)
        // Results will be an empty array and metadata will contain the number of affected rows.    
        // Suite.findByPk(req.params.id)
        .then(([results, metadata]) => res.status(200).json(results))
        .catch(error => res.status(500).json({ status:500, msg: 'Error en el servidor' }))
    // }
})

// READ
router.get('/:id', (req, res) => {
    Suite.findByPk(req.params.id)
        .then(Suite => res.status(200).json(Suite))
        .catch(error => res.status(500).json({ msg: 'Error en el servidor', error: error }))
})

router.put('/:suiteId', (req, res) => {
    Suite.update(
      { title: req.body.title },
      { returning: true, where: { id: req.params.suiteId } }
    )
    .then(([ registrosAfectados, [suiteActualizado] ]) =>{
      res.status(200).json(suiteActualizado)
    })
    .catch(error => res.status(500).json({ msg: 'Error en el servidor', error: error }))
})

// DELETE
router.delete('/:id', (req, res) => {
    Suite.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(result => res.json(result))
    .catch(error => res.json({ msg: 'Hubo un error al borrar esta Suite', error: error }))

})

module.exports = router