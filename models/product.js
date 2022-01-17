'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Comment, Cart}) {
      this.hasMany(Comment, {
        foreignKey: 'productID',
        as: 'comments',
        onDelete: 'cascade',
        hooks: true
      });
      this.hasMany(Cart, {
        foreignKey: 'productID',
        as: 'carts',
        onDelete: 'cascade',
        hooks: true
      });
    }
  };
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};