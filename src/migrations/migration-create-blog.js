"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(" blogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      tieudeVi: {
        type: Sequelize.TEXT("long"),
      },
      tieudeEn: {
        type: Sequelize.TEXT("long"),
      },
      noidungVi: {
        type: Sequelize.TEXT("long"),
      },
      noidunghtmlVi: {
        type: Sequelize.TEXT("long"),
      },
      noidungEn: {
        type: Sequelize.TEXT("long"),
      },
      noidunghtmlEn: {
        type: Sequelize.TEXT("long"),
      },
      donoibat: {
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
    await queryInterface.dropTable(" blogs");
  },
};
