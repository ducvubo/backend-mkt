"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("traloibinhluans", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idbinhluan: {
        type: Sequelize.INTEGER,
      },
      idnguoidung: {
        type: Sequelize.INTEGER,
      },
      noidung: {
        type: Sequelize.STRING,
      },
      hinhanh: {
        type: Sequelize.BLOB("long"),
      },
      video: {
        type: Sequelize.BLOB("long"),
      },
      thoigian: {
        type: Sequelize.DATE,
      },
      trangthaitraloidanhgiaid: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("traloibinhluans");
  },
};
