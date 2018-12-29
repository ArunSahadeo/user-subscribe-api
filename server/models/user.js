'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      first_name: {
        type: DataTypes.STRING,
        field: 'first_name'
      },
      last_name: {
        type: DataTypes.STRING,
        field: 'last_name'
      },
      email: {
        type: DataTypes.STRING,
        field: 'email'
      },
      opt_in: {
        type: DataTypes.BOOLEAN,
        field: 'opt_in'
      }
  }, {
    freezeTableName: true,
    tableName: 'users',
    underscored: true
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
