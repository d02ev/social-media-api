'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      Post.hasMany(models.Comment, {
        foreignKey: 'postId',
        as: 'comments',
        onDelete: 'CASCADE',
      });
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'createdBy',
        onDelete: 'CASCADE',
      });
    }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};