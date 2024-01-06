import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";

const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let ktEmail = (emailNguoiDung) => {
  return new Promise(async (resole, reject) => {
    try {
      let user = await db.User.findOne({
        //tim user
        where: { email: emailNguoiDung },
      });
      if (user) {
        //user khac undefine thi chay vao day
        resole(true);
      } else {
        //user undefine chay vao day
        resole(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeServiec = (kieu) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!kieu) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền vào",
        });
      } else {
        let data = {};
        data = await db.Allcode.findAll({
          where: { kieu: kieu },
        });
        resolve({
          data: data,
          maCode: 0,
          thongDiep: "ok ok",
        });
      }
    } catch {
      reject(e);
    }
  });
};

let themNguoiDung = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await ktEmail(data.email);
      if (check === true) {
        resolve({
          maCode: 1,
          thongDiep: "Email đã được sử dụng vui lòng dùng email khác!!!",
          thongDiepen: "Email has been used, please use another email",
        });
      } else {
        let hashPasswordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPasswordFromBcrypt,
          ho: data.ho,
          ten: data.ten,
          sdt: data.sodienthoai,
          diachinha: data.diachinha,
          diachicuahang: data.diachicuahang,
          quyenId: data.quyen,
          gioitinhId: data.gioitinh,
        });

        resolve({
          maCode: 0,
          thongDiep: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let tatCaNguoiDung = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.User.findAll({
        attributes: {
          exclude: ["password"], //khong lay ra password
        },
        
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let Get1NguoiDung = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền vào",
        });
      } else {
        let nguoidung = "";
        nguoidung = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"], //khong lay ra password
          },
          include: [
            {
              model: db.Allcode,
              as: "gioitinh",
              attributes: ["tiengViet", "tiengAnh"],
            },
            {
              model: db.Allcode,
              as: "quyen",
              attributes: ["tiengViet", "tiengAnh"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve(nguoidung);
      }
    } catch {
      reject(e);
    }
  });
};

let xoaNguoiDung = (id) => {
  return new Promise(async (resolve, reject) => {
    let nguoidung = await db.User.findOne({
      where: { id: id },
    });
    if (!nguoidung) {
      resolve({
        maCode: 1,
        thongDiep: "Người dùng không tồn tại",
      });
    }
    await db.User.destroy({
      where: { id: id },
    });
    resolve({
      maCode: 0,
      thongDiep: "Xóa người dùng thành công",
    });
  });
};

let suaNguoiDung = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nguoidung = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (nguoidung) {
        nguoidung.ho = data.ho;
        nguoidung.ten = data.ten;
        nguoidung.sdt = data.sodienthoai;
        nguoidung.diachinha = data.diachinha;
        nguoidung.diachicuahang = data.diachicuahang;
        nguoidung.gioitinhId = data.gioitinhId;
        nguoidung.quyenId = data.quyenId;

        await nguoidung.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa người dùng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy người dùng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCodeServiec: getAllCodeServiec,
  themNguoiDung: themNguoiDung,
  tatCaNguoiDung: tatCaNguoiDung,
  Get1NguoiDung: Get1NguoiDung,
  xoaNguoiDung: xoaNguoiDung,
  suaNguoiDung: suaNguoiDung,
};
