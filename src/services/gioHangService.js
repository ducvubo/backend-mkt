import db, { sequelize } from "../models/index";
const { Sequelize, DataTypes } = require("sequelize");
let gioHangNguoiDung = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.Giohang.findOne({
        where: { idnguoidung: id },
        include: [
          {
            model: db.hoa,
            as: "hoas",
            through: { attributes: ['id',"soluong", "idgiohang"] },
            attributes: {
              exclude: [
                "iddanhmuchoachitiet",
                "tieudehoaVi",
                "tieudehoaEn",
                "soluongnhap",
                "soluongban",
                "motaspVi",
                "motaspEn",
                "motasphtmlVi",
                "motasphtmlEn",
                "ghichuVi",
                "ghichuEn",
                "donoibat",
              ],
            },
          },
        ],
        raw: false,
        nest: true,
      });

      resolve({
        maCode: 0,
        thongDiep: "ok ok ok",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let suaGioHangNguoiDung = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Giohanghoa.destroy({
        where: { idgiohang: data.idgiohang },
      });
      await db.Giohanghoa.bulkCreate(data.Giohanghoa);
      resolve({
        maCode: 0,
        thongDiep: "ok ok ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let themGioHang = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let idgiohang = await db.Giohang.findOne({
        where: { idnguoidung: data.idnguoidung },
      });

      let giohang = await db.Giohanghoa.findOne({
        where: { idgiohang: idgiohang.id, idhoa: data.idhoa },
        raw: false,
      });

      if (giohang) {
        (giohang.idgiohang = idgiohang.id), (giohang.idhoa = data.idhoa);
        giohang.soluong = giohang.soluong + data.soluong;
        await giohang.save();
      } else {
        await db.Giohanghoa.create({
          idgiohang: idgiohang.id,
          idhoa: data.idhoa,
          soluong: data.soluong,
        });
      }

      resolve({
        maCode: 0,
        thongDiep: "ok ok ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  gioHangNguoiDung,
  suaGioHangNguoiDung,
  themGioHang,
};
