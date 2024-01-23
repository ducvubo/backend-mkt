import db, { sequelize } from "../models/index";
import { v4 as uuidv4 } from "uuid";

let layTatCaPhuongThucVanChuyen = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Phuongthucvanchuyen.findAll();
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let capNhatGioHangKhiDatHang = (id) => {
  return new Promise(async (resolve, reject) => {
    let timgiohangchitiet = await db.Giohanghoa.findOne({
      where: { id: id },
    });
    if (!timgiohangchitiet) {
      resolve({
        maCode: 1,
        thongDiep: "Giỏ hàng hoa không tồn tại",
      });
    } else {
      await db.Giohanghoa.destroy({
        where: { id: id },
      });
      resolve({
        maCode: 0,
        thongDiep: "Xóa giỏ hàng hoa thành công",
      });
    }
  });
};

let datHang = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let madonhang = uuidv4();
      let donhangchitiet =
        data &&
        data.donhangchitiet &&
        data.donhangchitiet.length > 0 &&
        data.donhangchitiet.map((item) => {
          return { ...item, madonhang123: madonhang };
        });

      await db.Donhang.create({
        idnguoidung: data.idnguoidung,
        madonhang: madonhang,
        tennguoinhan: data.tennguoinhan,
        email: data.email,
        sodienthoai: data.sodienthoai,
        diachi: data.diachi,
        ghichu: data.ghichu,
        trangthaidonhangid: "H1",
        phuongthucvanchuyenid: data.phuongthucvanchuyenid,
        tongtien: data.tongtien,
        ngonngu: data.ngonngu,
      });

      let iddonhang = await db.Donhang.findOne({
        where: { madonhang: madonhang },
      });

      let donhangchitiet1 =
        donhangchitiet &&
        donhangchitiet.length > 0 &&
        donhangchitiet.map((item) => {
          return { ...item, iddonhang: iddonhang.id };
        });

      await db.Donhangchitiet.bulkCreate(donhangchitiet1);

      data &&
        data.idgiohangchitietduocchon &&
        data.idgiohangchitietduocchon.length > 0 &&
        data.idgiohangchitietduocchon.map((item) => {
          return capNhatGioHangKhiDatHang(item.id);
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

let tatCaDonHang = (trangthaidonhang) => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.Donhang.findAll({
        where: { trangthaidonhangid: trangthaidonhang },

        include: [
          {
            model: db.hoa,
            as: "hoas",
            through: {
              attributes: ["idhoa", "soluongmua", "tongtien", "madonhang123"],
            },
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
                "anhnoibat",
                "phantramgiam",
                "createdAt",
                "updatedAt",
              ],
            },
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

let capNhatHoaKhiDatHang = (id, soluongmua) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hoa = await db.hoa.findOne({
        where: { id: id },
        raw: false,
      });
      if (hoa) {
        hoa.soluongcon = hoa.soluongcon - soluongmua;
        hoa.soluongban = hoa.soluongban + soluongmua;
        await hoa.save();

        resolve({
          maCode: 0,
          thongDiep: "Cập nhật hoa thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy hoa",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xacNhanDonHang = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let donhang = await db.Donhang.findOne({
        where: { madonhang: data.madonhang },
        raw: false,
      });
      if (donhang) {
        donhang.trangthaidonhangid = "H2";
        donhang.phanhoicuahang = data.phanhoicuahang;
        await donhang.save();

        data &&
          data.hoa &&
          data.hoa.length > 0 &&
          data.hoa.map((item) => {
            return capNhatHoaKhiDatHang(item.id, item.soluongmua);
          });

        resolve({
          maCode: 0,
          thongDiep: "Xác nhận đơn hàng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy đơn hàng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  layTatCaPhuongThucVanChuyen,
  datHang,
  tatCaDonHang,
  xacNhanDonHang,
};