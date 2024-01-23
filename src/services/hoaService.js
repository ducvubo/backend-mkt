import db from "../models/index";
const { Op } = require("sequelize");

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
        ghichuVi: data.ghichuVi,
        ghichuEn: data.ghichuEn,
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
        attributes: {
          exclude: ["anhnoibat"],
        },
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
        hoadata.ghichuVi = data.ghichuVi;
        hoadata.ghichuEn = data.ghichuEn;
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
   

    let donhangchitietdata = await db.Donhangchitiet.findAll({
      where: { idhoa: id },
    });
    if (donhangchitietdata) {
      await db.Donhangchitiet.destroy({
        where: { idhoa: id },
      });
    }

    let giohangdata = await db.Giohanghoa.findAll ({
      where : {idhoa : id}
    })

    if(giohangdata) {
      await db.Giohanghoa.destroy({
        where: { idhoa: id },
      });
    }
   
    let nhaphoadata = await db.Nhaphoachitiet.findAll({
      where : {idhoa : id}
    })
    if(nhaphoadata){
      await db.Nhaphoachitiet.destroy({
        where: { idhoa: id },
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

let hoaGiamGia = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.hoa.findAll({
        where: {
          soluongcon: {
            [Op.gt]: 0,
          },
        },
        limit: 4,
        order: [["phantramgiam", "DESC"]],
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let hoaTet = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.Danhmuchoa.findAll({
        where: { id: 35 },
        attributes: {
          exclude: [
            "tendanhmucVi",
            "tendanhmucEn",
            "donoibat",
            "createdAt",
            "updatedAt",
            "id",
          ],
        },
        include: [
          {
            model: db.Danhmuchoachitiet,
            as: "danhmuc",
            attributes: {
              exclude: [
                "iddanhmuchoa",
                "tendanhmucchitietVi",
                "createdAt",
                "updatedAt",
                "tendanhmucchitietEn",
              ],
            },
            include: [
              {
                model: db.hoa,
                as: "danhmuchoachitiet",
                where: {
                  soluongcon: {
                    [Op.gt]: 0,
                  },
                },
                attributes: [
                  "id",
                  "tenhoaVi",
                  "tenhoaEn",
                  "giathucVND",
                  "giathucUSD",
                  "phantramgiam",
                  "giasaukhigiamVND",
                  "giasaukhigiamUSD",
                  "anhnoibat",
                  "donoibat",
                  "soluongban",
                ],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let hoaSinhNhat = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.Danhmuchoa.findAll({
        where: { id: 15 },
        attributes: {
          exclude: [
            "tendanhmucVi",
            "tendanhmucEn",
            "donoibat",
            "createdAt",
            "updatedAt",
            "id",
          ],
        },
        include: [
          {
            model: db.Danhmuchoachitiet,
            as: "danhmuc",
            attributes: {
              exclude: [
                "iddanhmuchoa",
                "tendanhmucchitietVi",
                "createdAt",
                "updatedAt",
                "tendanhmucchitietEn",
              ],
            },
            include: [
              {
                model: db.hoa,
                as: "danhmuchoachitiet",
                where: {
                  soluongcon: {
                    [Op.gt]: 0,
                  },
                },
                attributes: [
                  "id",
                  "tenhoaVi",
                  "tenhoaEn",
                  "giathucVND",
                  "giathucUSD",
                  "phantramgiam",
                  "giasaukhigiamVND",
                  "giasaukhigiamUSD",
                  "anhnoibat",
                  "donoibat",
                ],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let hoaKhaiTruong = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.Danhmuchoa.findAll({
        where: { id: 16 },
        attributes: {
          exclude: [
            "tendanhmucVi",
            "tendanhmucEn",
            "donoibat",
            "createdAt",
            "updatedAt",
            "id",
          ],
        },
        include: [
          {
            model: db.Danhmuchoachitiet,
            as: "danhmuc",
            attributes: {
              exclude: [
                "iddanhmuchoa",
                "tendanhmucchitietVi",
                "createdAt",
                "updatedAt",
                "tendanhmucchitietEn",
              ],
            },
            include: [
              {
                model: db.hoa,
                as: "danhmuchoachitiet",
                where: {
                  soluongcon: {
                    [Op.gt]: 0,
                  },
                },
                attributes: [
                  "id",
                  "tenhoaVi",
                  "tenhoaEn",
                  "giathucVND",
                  "giathucUSD",
                  "phantramgiam",
                  "giasaukhigiamVND",
                  "giasaukhigiamUSD",
                  "anhnoibat",
                  "donoibat",
                ],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let lanHoDiep = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.Danhmuchoa.findAll({
        where: { id: 17 },
        attributes: {
          exclude: [
            "tendanhmucVi",
            "tendanhmucEn",
            "donoibat",
            "createdAt",
            "updatedAt",
            "id",
          ], //khong lay ra password
        },
        include: [
          {
            model: db.Danhmuchoachitiet,
            as: "danhmuc",
            attributes: {
              exclude: [
                "iddanhmuchoa",
                "tendanhmucchitietVi",
                "createdAt",
                "updatedAt",
                "tendanhmucchitietEn",
              ], //khong lay ra password
            },
            include: [
              {
                model: db.hoa,
                as: "danhmuchoachitiet",
                where: {
                  soluongcon: {
                    [Op.gt]: 0,
                  },
                },
                attributes: [
                  "id",
                  "tenhoaVi",
                  "tenhoaEn",
                  "giathucVND",
                  "giathucUSD",
                  "phantramgiam",
                  "giasaukhigiamVND",
                  "giasaukhigiamUSD",
                  "anhnoibat",
                  "donoibat",
                ],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
      });

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let thongTinHoa = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền vào",
        });
      } else {
        let thongtinhoa = "";
        thongtinhoa = await db.hoa.findOne({
          where: { id: id },
        });

        resolve(thongtinhoa);
      }
    } catch {
      reject(e);
    }
  });
};

let sanPhamLienQuan = (iddanhmuchoachitiet, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.hoa.findAll({
        where: {
          soluongcon: {
            [Op.gt]: 0,
          },
          iddanhmuchoachitiet: iddanhmuchoachitiet,
          id: {
            [Op.ne]: id, // Loại bỏ hoa có ID bằng idHoaCanBoQua
          },
        },
        limit: 4,
        order: [["phantramgiam", "DESC"]],
      });
      resolve({
        data: data,
        maCode: 0,
        thongDiep: "ok ok ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let hoaTheoDanhMucChiTiet = (iddanhmuchoachitiet) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.hoa.findAll({
        where: {
          soluongcon: {
            [Op.gt]: 0,
          },
          iddanhmuchoachitiet: iddanhmuchoachitiet,
        },
        order: [["phantramgiam", "DESC"]],
      });
      resolve({
        data: data,
        maCode: 0,
        thongDiep: "ok ok ok",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let hoaTheoDanhMuc = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = "";
      data = await db.Danhmuchoa.findAll({
        where: { id: id },
        attributes: {
          exclude: [
            "tendanhmucVi",
            "tendanhmucEn",
            "donoibat",
            "createdAt",
            "updatedAt",
            "id",
          ],
        },
        include: [
          {
            model: db.Danhmuchoachitiet,
            as: "danhmuc",
            attributes: {
              exclude: [
                "iddanhmuchoa",
                "tendanhmucchitietVi",
                "createdAt",
                "updatedAt",
                "tendanhmucchitietEn",
              ],
            },
            include: [
              {
                model: db.hoa,
                as: "danhmuchoachitiet",
                where: {
                  soluongcon: {
                    [Op.gt]: 0,
                  },
                },
                attributes: [
                  "id",
                  "tenhoaVi",
                  "tenhoaEn",
                  "giathucVND",
                  "giathucUSD",
                  "phantramgiam",
                  "giasaukhigiamVND",
                  "giasaukhigiamUSD",
                  "anhnoibat",
                  "donoibat",
                ],
              },
            ],
          },
        ],
        raw: false,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  themHoa,
  tatCaHoa,
  suaHoa,
  xoaHoa,
  hoaGiamGia,
  hoaTet,
  hoaKhaiTruong,
  hoaSinhNhat,
  lanHoDiep,
  thongTinHoa,
  sanPhamLienQuan,
  hoaTheoDanhMucChiTiet,
  hoaTheoDanhMuc,
};
