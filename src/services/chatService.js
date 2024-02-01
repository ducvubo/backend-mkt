import db from "../models/index";
const { Op } = require("sequelize");
let tatCaCuocTroChuyen = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Chat.findAll({
        attributes: {
          exclude: ["thoigian"],
        },
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let tatCaKhachHang = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.User.findAll({
        where: { quyenId: "R4" },
        attributes: {
          exclude: [
            "email",
            "id",
            "password",
            "ho",
            "sdt",
            "diachinha",
            "diachicuahang",
            "gioitinhId",
            "quyenId",
            "trangthaiId",
            "linkxacnhan",
            "refresh_token",
            "createdAt",
            "updatedAt",
          ],
        },
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let doanChatKhachHang = (idchat) => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Chat.findAll({
        where: {
          [Op.or]: [{ nguoinhan: idchat }, { nguoigui: idchat }],
        },
        attributes: {
          exclude: ["thoigian"],
        },
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  tatCaCuocTroChuyen,
  tatCaKhachHang,
  doanChatKhachHang,
};