import db from "../models/index";

let themHoa = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.hoa.create({
        iddanhmuchoachitiet: data.iddanhmuchoachitiet,
        tenhoaVi: data.tenhoaVi,
        tenhoaEn: data.tenhoaEn,
        tieudehoaVi: data.tieudehoaVi,
        tieudehoaEn: data.tieudehoaEn,
        anhnoibat: data.anhnoibat,
        anh2: data.anh2,
        anh3: data.anh3,
        anh4: data.anh4,
        soluongcon: data.soluongcon,
        soluongnhap: data.soluongnhap,
        soluongban: data.soluongban,
        giathucVND: data.giathucVND,
        giathucUSD: data.giathucUSD,
        phantramgiam: data.phantramgiam,
        giasaukhigiamVND: data.giasaukhigiamVND,
        giasaukhigiamUSD: data.giasaukhigiamUSD,
        motaspVi: data.motaspVi,
        motaspEn: data.motaspEn,
        motasphtmlVi: data.motasphtmlVi,
        motasphtmlEn: data.motasphtmlEn,
        donoibat: data.donoibat,
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

let tatCaHoa = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.hoa.findAll({
        include: [
          {
            model: db.Danhmuchoachitiet,
            as: "danhmuchoachitiet",
            attributes: ["tendanhmucchitietVi", "tendanhmucchitietEn", "id"],
          },
        ],
        raw: false,
        nest: true,
      });
      // if(data && data.anhnoibat){
      //   data.anhnoibat = new Buffer(data.anhnoibat, "base64").toString("binary");
      // }
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let suaHoa = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hoadata = await db.hoa.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (hoadata) {
        hoadata.iddanhmuchoachitiet = data.iddanhmuchoachitiet;
        hoadata.tenhoaVi = data.tenhoaVi;
        hoadata.tenhoaEn = data.tenhoaEn;
        hoadata.tieudehoaVi = data.tieudehoaVi;
        hoadata.tieudehoaEn = data.tieudehoaEn;
        hoadata.anhnoibat = data.anhnoibat;
        hoadata.anh2 = data.anh2;
        hoadata.anh3 = data.anh3;
        hoadata.anh4 = data.anh4;
        hoadata.soluongcon = data.soluongcon;
        hoadata.soluongnhap = data.soluongnhap;
        hoadata.soluongban = data.soluongban;
        hoadata.giathucVND = data.giathucVND;
        hoadata.giathucUSD = data.giathucUSD;
        hoadata.phantramgiam = data.phantramgiam;
        hoadata.giasaukhigiamVND = data.giasaukhigiamVND;
        hoadata.giasaukhigiamUSD = data.giasaukhigiamUSD;
        hoadata.motaspVi = data.motaspVi;
        hoadata.motaspEn = data.motaspEn;
        hoadata.motasphtmlVi = data.motasphtmlVi;
        hoadata.motasphtmlEn = data.motasphtmlEn;
        hoadata.donoibat = data.donoibat;
        await hoadata.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa danh mục thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy danh mục",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xoaHoa = (id) => {
  return new Promise(async (resolve, reject) => {
    let hoadata = await db.hoa.findOne({
      where: { id: id },
    });
    if (!hoadata) {
      resolve({
        maCode: 1,
        thongDiep: "Hoa không tồn tại",
      });
    }
    await db.hoa.destroy({
      where: { id: id },
    });
    resolve({
      maCode: 0,
      thongDiep: "Xóa hoa thành công",
    });
  });
};


module.exports = {
  themHoa,
  tatCaHoa,
  suaHoa,
  xoaHoa
};
