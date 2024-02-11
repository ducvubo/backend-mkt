"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Allcode, {
        foreignKey: "gioitinhId",
        targetKey: "idNoi",
        as: "gioitinh",
      });
      User.belongsTo(models.Allcode, {
        foreignKey: "quyenId",
        targetKey: "idNoi",
        as: "quyen",
      });
      User.belongsTo(models.Allcode, {
        foreignKey: "trangthaiId",
        targetKey: "idNoi",
        as: "trangthai",
      });
      User.hasOne(models.Giohang, { foreignKey: "idnguoidung", as: "giohang" });
      User.hasMany(models.Nhaphoa, {
        foreignKey: "idnhanvien",
        as: "nhanvien",
      });
      User.hasMany(models.Donhang, {
        foreignKey: "idnguoidung",
        as: "khachhang",
      });
      User.hasMany(models.Binhluan, {
        foreignKey: "idnguoidung",
        as: "nguoidungbinhluan",
      });
      User.hasMany(models.Traloibinhluan, {
        foreignKey: "idnguoidung",
        as: "nguoidungtraloibinhluan",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      ho: DataTypes.STRING,
      ten: DataTypes.STRING,
      sdt: DataTypes.STRING,
      diachinha: DataTypes.STRING,
      gioitinhId: DataTypes.STRING,
      quyenId: DataTypes.STRING,
      trangthaiId: DataTypes.STRING,
      linkxacnhan: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      idchat: DataTypes.STRING,
      anhdaidien:DataTypes.BLOB("long")
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
