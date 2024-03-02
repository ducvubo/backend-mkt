"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Giohanghoa extends Model {
    static associate(models) {
      
    }
  }
  Giohanghoa.init(
    {
      idgiohang: DataTypes.INTEGER,
      idhoa: DataTypes.INTEGER,
      soluong: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Giohanghoa",
    //   freezeTableName: true,
    }
  );
  return Giohanghoa;
};
