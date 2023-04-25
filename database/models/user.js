'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, {
        foreignKey: 'userId',
        as: 'posts',
        onDelete: 'CASCADE'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        'as': 'comments',
        onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};