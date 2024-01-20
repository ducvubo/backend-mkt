"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("nhaphoachitiets", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      idnhaphoa: {
        type: Sequelize.INTEGER,
      },
      idhoa: {
        type: Sequelize.INTEGER,
      },
      donvitinh: {
        type: Sequelize.STRING,
      },
      soluongnhaptrenphieu: {
        type: Sequelize.INTEGER,
      },
      soluongnhapthucte: {
        type: Sequelize.INTEGER,
      },
      gianhap: {
        type: Sequelize.INTEGER,
      },
      giatong: {
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
    await queryInterface.dropTable("nhaphoachitiets");
  },
};
