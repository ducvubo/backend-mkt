"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class hoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hoa.belongsTo(models.Danhmuchoachitiet, {foreignKey: 'iddanhmuchoachitiet', targetKey:'id', as: 'danhmuchoachitiet'})

    }
  }
  hoa.init(
    {
      iddanhmuchoachitiet: DataTypes.INTEGER,
      tenhoaVi: DataTypes.STRING,
      tenhoaEn: DataTypes.STRING,
      tieudehoaVi: DataTypes.TEXT("long"),
      tieudehoaEn: DataTypes.TEXT("long"),
      anhnoibat: DataTypes.BLOB("long"),
      anh2: DataTypes.BLOB("long"),
      anh3: DataTypes.BLOB("long"),
      anh4: DataTypes.BLOB("long"),
      soluongcon: DataTypes.INTEGER,
      soluongnhap: DataTypes.INTEGER,
      soluongban: DataTypes.INTEGER,
      giathucVND: DataTypes.INTEGER,
      giathucUSD: DataTypes.INTEGER,
      phantramgiam: DataTypes.INTEGER,
      giasaukhigiamVND: DataTypes.INTEGER,
      giasaukhigiamUSD: DataTypes.INTEGER,
      motaspVi: DataTypes.TEXT("long"),
      motaspEn: DataTypes.TEXT("long"),
      motasphtmlVi: DataTypes.TEXT("long"),
      motasphtmlEn: DataTypes.TEXT("long"),
      donoibat: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "hoa",
    }
  );
  return hoa;
};
