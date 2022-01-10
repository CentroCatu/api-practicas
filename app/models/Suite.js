'use strict';
module.exports = (sequelize, DataTypes) => {
  const Suite = sequelize.define('Suite', {
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    tableName: 'Suite'
  });
  Suite.associate = function(models) {
    // associations can be defined here
    Suite.belongsTo(Suite, { as: Suite.id, foreignKey: "suite_padre" })
    Suite.belongsTo(Suite, { as: Suite.id, foreignKey: "suite_hijo" })
  };
  return Suite;
};