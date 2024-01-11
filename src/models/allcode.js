'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Allcode.hasMany(models.User, {foreignKey: 'gioitinhId', as: 'gioitinh'})
      Allcode.hasMany(models.User, {foreignKey: 'quyenId', as: 'quyen'})
      Allcode.hasMany(models.User, {foreignKey: 'trangthaiId', as: 'trangthai'})

    }
  };
  Allcode.init({
    idNoi: DataTypes.STRING,
    kieu: DataTypes.STRING,
    tiengViet: DataTypes.STRING,
    tiengAnh: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Allcode',
  });
  return Allcode;
};