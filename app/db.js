const { Sequelize, DataTypes } = require('sequelize')
const config = require('../config/database')
const db = {}

db.connection = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
    )

db.CasoDePrueba = require('./models/Casodeprueba')(db.connection, DataTypes)
db.Pasoaseguir = require('./models/Pasoaseguir')(db.connection, DataTypes)
db.Suite = require('./models/Suite')(db.connection, DataTypes)
db.Estado = require('./models/Estado')(db.connection, DataTypes)
db.Usuario = require('./models/Usuario')(db.connection, DataTypes)
db.Usuario_suite = require('./models/Usuario_suite')(db.connection, DataTypes)

// ASOCIACIONES
db.CasoDePrueba.associate(db)
db.Pasoaseguir.associate(db)
db.Suite.associate(db)
db.Estado.associate(db)
db.Usuario.associate(db)
db.Usuario_suite.associate(db)

module.exports = db