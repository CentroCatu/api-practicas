'use strict';
module.exports = (sequelize, DataTypes) => {
  const Estado = sequelize.define('Estado', {
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Estado'
  });
  Estado.associate = function(models) {
    // associations can be defined here
  };
  return Estado;
};