import express from "express";
import nguoidungController from "../controllers/nguoidungController";
import danhMucHoaController from "../controllers/danhMucHoaController";
import danhMucHoaChiTietController from "../controllers/danhMucHoaChiTietController";
import hoaController from "../controllers/hoaController";
let router = express.Router();

let initWebRoute = (app) => {
  router.get("/api/allcode", nguoidungController.getAllCode);
  router.post("/api/themnguoidung", nguoidungController.themNguoiDung);
  router.get("/api/allnguoidung", nguoidungController.tatCaNguoiDung);
  router.get("/api/all1nguoidung", nguoidungController.Get1NguoiDung);
  router.delete("/api/xoanguoidung", nguoidungController.xoaNguoiDung);
  router.put("/api/suanguoidung", nguoidungController.suaNguoiDung);
  router.post("/api/dangnhap", nguoidungController.dangNhap);
  router.post("/api/dangky", nguoidungController.dangKy);
  router.post("/api/xacnhandangky", nguoidungController.xacNhanDangKy);

  router.post("/api/themdanhmuc", danhMucHoaController.themDanhMuc);
  router.get("/api/alldanhmuc", danhMucHoaController.tatCaDanhMuc);
  router.delete("/api/xoadanhmuc", danhMucHoaController.xoaDanhMuc);
  router.put("/api/suadanhmuc", danhMucHoaController.suaDanhMuc);

  router.post(
    "/api/themdanhmuchoachitiet",
    danhMucHoaChiTietController.themDanhMucHoaChiTiet
  );
  router.get(
    "/api/alldanhmuchoachitiet",
    danhMucHoaChiTietController.tatCaDanhMucHoaChiTiet
  );
  router.delete(
    "/api/xoadanhmucchitet",
    danhMucHoaChiTietController.xoaDanhMucHoaChiTiet
  );
  router.put(
    "/api/suadanhmuchoachitiet",
    danhMucHoaChiTietController.suaDanhMucHoaChiTiet
  );
  router.get("/api/danhmuchoanoibat", danhMucHoaController.danhMucHoaNoiBat);
  router.get(
    "/api/danhmuchoachitiettheodanhmuc",
    danhMucHoaChiTietController.danhMucHoaChiTietTheoDanhMuc
  );

  router.post("/api/themhoa", hoaController.themHoa);
  router.get("/api/tatcahoa", hoaController.tatCaHoa);
  router.put("/api/suahoa", hoaController.suaHoa);
  router.delete("/api/xoahoa", hoaController.xoaHoa);
  router.get("/api/hoagiamgia", hoaController.hoaGiamGia);
  router.get("/api/hoatet", hoaController.hoaTet);
  router.get("/api/hoasinhnhat", hoaController.hoaSinhNhat);
  router.get("/api/hoakhaitruong", hoaController.hoaKhaiTruong);
  router.get("/api/lanhodiep", hoaController.lanHoDiep);
  router.get("/api/thongtinhoa", hoaController.thongTinHoa);

  return app.use("/", router);
};

module.exports = initWebRoute;
