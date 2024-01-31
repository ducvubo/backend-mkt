"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Chat.init(
    {
      tennguoigui: DataTypes.STRING,
      tennguoinhan: DataTypes.STRING,
      nguoigui: DataTypes.STRING,
      nguoinhan: DataTypes.STRING,
      noidung: DataTypes.STRING,
      anh:DataTypes.BLOB("long"),
      thoigian: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Chat",
    }
  );
  return Chat;
};
