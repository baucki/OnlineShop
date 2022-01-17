'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Product}) {
      this.belongsTo(User, {foreignKey: 'userID', as: 'user'});
      this.belongsTo(Product, {foreignKey: 'productID', as: 'product'});
    }
  };
  Comment.init({
    content: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};