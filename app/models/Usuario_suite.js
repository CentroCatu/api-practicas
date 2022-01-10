'use strict';

module.exports = (sequelize, DataTypes) => {
  const Usuario_suite = sequelize.define('Usuario_suite', {
  }, {
    tableName: 'Usuario_suite'
  });
  Usuario_suite.associate = function(models) {
    // associations can be defined here
    Usuario_suite.belongsTo(models.Usuario)
    Usuario_suite.belongsTo(models.Suite)
  };
  return Usuario_suite;
};