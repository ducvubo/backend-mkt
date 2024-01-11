'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsTo(models.Allcode, {foreignKey: 'gioitinhId', targetKey:'idNoi', as: 'gioitinh'})
      User.belongsTo(models.Allcode, {foreignKey: 'quyenId', targetKey: 'idNoi', as:'quyen'})
      User.belongsTo(models.Allcode, {foreignKey: 'trangthaiId', targetKey: 'idNoi', as:'trangthai'})

    }
  };
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    ho: DataTypes.STRING,
    ten: DataTypes.STRING,
    sdt: DataTypes.STRING,
    diachinha: DataTypes.STRING,
    diachicuahang: DataTypes.STRING,
    gioitinhId: DataTypes.STRING,
    quyenId: DataTypes.STRING,
    trangthaiId:DataTypes.STRING,
    linkxacnhan:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};