'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: {
        type: DataTypes.STRING,
        field: 'username'
    },
    email: {
        type: DataTypes.STRING,
        field: 'email'
    },
    password: {
        type: DataTypes.STRING,
        field: 'password'      
    }
  }, {
    freezeTableName: true,
    tableName: 'admins',
    underscored: true,
  });

  Admin.associate = function(models) {
    // associations can be defined here
  };

  function generateHash(admin) {
      const salt = bcrypt.genSaltSync();
      return admin.password = bcrypt.hashSync(admin.password, salt);
  }
    
  Admin.beforeCreate(generateHash);


  return Admin;
};
