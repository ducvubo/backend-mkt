"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("donhangchitiets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      iddonhang: {
        type: Sequelize.INTEGER,
      },
      madonhang123: {
        type: Sequelize.STRING,
      },
      idhoa: {
        type: Sequelize.INTEGER,
      },
      soluongmua: {
        type: Sequelize.INTEGER,
      },
      tongtien: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("donhangchitiets");
  },
};
