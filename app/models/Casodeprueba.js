'use strict';
module.exports = (sequelize, DataTypes) => {
  const CasoDePrueba = sequelize.define('CasoDePrueba', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          notNull: {
              msg: 'El campo nombre no puede estar vacío'
          },
          len: {
              args: [3, 50],
              msg: 'El nombre debe contener entre 3 y 200 caracteres'
          }
      }
  },

  descripcion: {
      type: DataTypes.STRING(200),
      allowNull: true
  },

  precondicion: {
      type: DataTypes.STRING(60),
      allowNull: true
  },

  datosDePrueba: {
      type: DataTypes.STRING(150),
      allowNull: true
  },

  resultadoEsperado: {
      type: DataTypes.STRING,
      allowNull: false
  },

  resultadoObtenido: {
      type: DataTypes.STRING,
      allowNull: true
  },

  tiempoDeEjecucion: {
      type: DataTypes.INTEGER(3),
      allowNull: false
  }
  
  }, {
    tableName: 'Caso_de_prueba'
  });
  CasoDePrueba.associate = function(models) {
    // associations can be defined here
    // User.hasOne(models.Address, { as: "domicilio", foreignKey: "user_id" });

    CasoDePrueba.belongsTo(models.Suite, {as: 'suite', foreignKey: 'suite_id'})
    CasoDePrueba.belongsTo(models.Estado, {as: 'estado', foreignKey: 'estado_id'})
    CasoDePrueba.hasMany(models.PasoASeguir, {as: 'pasos', foreignKey: 'caso_de_prueba_id'})
    // CasoDePrueba.hasMany(models.PasoASeguir)
  };
  return CasoDePrueba;
};