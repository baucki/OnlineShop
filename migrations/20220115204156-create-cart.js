'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 0
      },
      userID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER
      },
      productID: {
        allowNull: false,
        foreignKey: true,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Carts');
  }
};