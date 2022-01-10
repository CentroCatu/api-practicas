'use strict';
module.exports = (sequelize, DataTypes) => {
  const PasoASeguir = sequelize.define('PasoASeguir', {
    descripcion: {
      type: DataTypes.STRING(120),
      allowNull: false
  },

  numero: {
      type: DataTypes.INTEGER(2),
      allowNull: false
  }

  }, {
    tableName: 'Paso_a_seguir'
  });
  PasoASeguir.associate = function(models) {
    // associations can be defined here
    PasoASeguir.belongsTo(models.CasoDePrueba, {as: 'caso_de_prueba', foreignKey: 'caso_de_prueba_id'})
  };
  return PasoASeguir;
};