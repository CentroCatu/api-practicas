const express = require('express')
const router = express.Router()
const { CasoDePrueba } = require('../models/index')

// OBTENER TODOS
router.get('/', (req, res) => {
    CasoDePrueba.findAll({//aca se puede declarar que campos traer: attributes: ['descripcion']
        include: [
            {
                association: 'suite',
                attributes: ['id','titulo']
            },
            {
                association: 'pasos',
                attributes: ['numero', 'descripcion']
            },
            {
                association: 'estado',
                attributes: ['descripcion']
            }
        ]
    })
    .then(casoDePruebas => res.status(200).json({ status: 200, casoDePruebas }))
    .catch(error => res.status(500).json({ status: 500, error }))
})

// OBTENER TODOS LOS DE UNA SUITE
router.get('/suite/:id', (req, res) => {
    CasoDePrueba.findAll({//aca se puede declarar que campos traer: attributes: ['descripcion']
        where: {
            suite_id: req.params.id
        },
        include: [
            {
                association: 'suite',
                attributes: ['id','titulo']
            },
            {
                association: 'pasos',
                attributes: ['numero', 'descripcion']
            },
            {
                association: 'estado',
                attributes: ['descripcion']
            }
        ]
    })
    .then(casoDePruebas => res.status(200).json({ status: 200, casoDePruebas }))
    .catch(error => res.status(500).json({ status: 500, error }))
})

// OBTENER UNO (SE PUEDE USAR findByPk)
router.get('/', (req, res) => {
    CasoDePrueba.findAll({
        where: {
            id: req.body.id
        },
        include: [
            {
                association: 'suite',
                attributes: ['id','titulo']
            },
            {
                association: 'pasos',
                attributes: ['numero', 'descripcion']
            },
            {
                association: 'estado',
                attributes: ['descripcion']
            }
        ]
    })
    .then(casoDePrueba => res.status(200).json({ status: 200, casoDePrueba }))
    .catch(error => res.status(500).json({ status: 500, error }))
})

// CREAR UNO
router.post('/', (req, res) => {
    CasoDePrueba.create({
        suite_id: req.body.suite_id,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        precondicion: req.body.precondicion,
        datosDePrueba: req.body.datosDePrueba,
        casoDePruebaPrecondicion: req.body.casoDePruebaPrecondicion,
        resultadoEsperado: req.body.resultadoEsperado,
        resultadoObtenido: req.body.resultadoObtenido,
        estado_id: req.body.estado_id,
        tiempoDeEjecucion: req.body.estimacion,
        responsable: req.body.responsable
    })
    .then((CasoDePrueba) => res.status(201).json({ message: "Creado correctamente", status: 201, CasoDePrueba }))
    .catch(error => res.json({ status: 500, error }))
})

module.exports = router