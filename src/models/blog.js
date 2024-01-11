"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  blog.init(
    {
      tieudeVi: DataTypes.TEXT("long"),
      tieudeEn: DataTypes.TEXT("long"),
      anhblog: DataTypes.BLOB("long"),
      noidungVi: DataTypes.TEXT("long"),
      noidunghtmlVi: DataTypes.TEXT("long"),
      noidungEn: DataTypes.TEXT("long"),
      noidunghtmlEn: DataTypes.TEXT("long"),
      donoibat: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: " blog",
    }
  );
  return blog;
};
