import db from "../models/index";

let themHoaDon = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Nhaphoa.create({
        idnhanvien: data.idnhanvien,
        maphieunhap: data.maphieunhap,
        tennhacungcap: data.tennhacungcap,
        diachinhacungcap: data.diachinhacungcap,
        sodienthoainhacungcap: data.sodienthoainhacungcap,
        nguoicungcap: data.nguoicungcap,
        sodienthoainguoicungcap: data.sodienthoainguoicungcap,
        ngaynhap: data.ngaynhap,
        // tonghoadon: data.tonghoadon,
      });

      resolve({
        maCode: 0,
        thongDiep: "OK",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let tatCaHoaDon = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Nhaphoa.findAll({
        include: [
          {
            model: db.User,
            as: "nhanvien",
            attributes: ["ho", "ten"],
          },
        ],
        raw: false,
        nest: true,
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let suaHoaDon = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hoadon = await db.Nhaphoa.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (hoadon) {
        hoadon.idnhanvien = data.idnhanvien;
        hoadon.maphieunhap = data.maphieunhap;
        hoadon.tennhacungcap = data.tennhacungcap;
        hoadon.diachinhacungcap = data.diachinhacungcap;
        hoadon.sodienthoainhacungcap = data.sodienthoainhacungcap;
        hoadon.nguoicungcap = data.nguoicungcap;
        hoadon.sodienthoainguoicungcap = data.sodienthoainguoicungcap;
        hoadon.ngaynhap = data.ngaynhap;

        await hoadon.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa hóa đơn thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy hóa đơn",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xoaHoaDon = (id) => {
  return new Promise(async (resolve, reject) => {
    let hoadon = await db.Nhaphoa.findOne({
      where: { id: id },
    });
    if (!hoadon) {
      resolve({
        maCode: 1,
        thongDiep: "Hóa đơn không tồn tại",
      });
    } else {
      await db.Nhaphoa.destroy({
        where: { id: id },
      });
      await db.Nhaphoachitiet.destroy({
        where: { idnhaphoa: id },
      });
      resolve({
        maCode: 0,
        thongDiep: "Xóa hóa đơn thành công",
      });
    }
  });
};

module.exports = {
  themHoaDon,
  tatCaHoaDon,
  suaHoaDon,
  xoaHoaDon,
};
