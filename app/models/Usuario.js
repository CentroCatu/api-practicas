'use strict';
module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define('Usuario', {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'Usuario'
  });
  Usuario.associate = function(models) {
    // associations can be defined here
  };
  return Usuario;
};