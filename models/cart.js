'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
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
  Cart.init({
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: null,
      min: 0
    },

  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};