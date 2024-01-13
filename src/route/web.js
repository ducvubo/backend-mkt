import express from "express";
import nguoidungController from "../controllers/nguoidungController";
import danhMucHoaController from "../controllers/danhMucHoaController";
import danhMucHoaChiTietController from "../controllers/danhMucHoaChiTietController";
import hoaController from "../controllers/hoaController";
import {verifiToken} from '../middleware/verify_token'
import {checkChuCuaHang,checkNhanVien} from '../middleware/checkQuyen'
let router = express.Router();


let initWebRoute = (app) => {
  router.get("/api/allcode", nguoidungController.getAllCode);
  router.post("/api/themnguoidung",verifiToken,checkChuCuaHang, nguoidungController.themNguoiDung);
  router.get("/api/allnguoidung",verifiToken,checkChuCuaHang ,nguoidungController.tatCaNguoiDung);
  router.get("/api/all1nguoidung",verifiToken,checkChuCuaHang, nguoidungController.Get1NguoiDung);
  router.delete("/api/xoanguoidung",verifiToken,checkChuCuaHang, nguoidungController.xoaNguoiDung);
  router.put("/api/suanguoidung",verifiToken,checkChuCuaHang, nguoidungController.suaNguoiDung);
  router.post("/api/dangnhap", nguoidungController.dangNhap);
  router.post("/api/dangky", nguoidungController.dangKy);
  router.post("/api/xacnhandangky", nguoidungController.xacNhanDangKy);
  router.post("/api/quenmk", nguoidungController.quenMK);
  router.post("/api/doimk", nguoidungController.doiMK);

  router.post("/api/themdanhmuc",verifiToken, checkNhanVien,danhMucHoaController.themDanhMuc);
  router.get("/api/alldanhmuc",verifiToken, checkNhanVien,danhMucHoaController.tatCaDanhMuc);
  router.delete("/api/xoadanhmuc",checkNhanVien, danhMucHoaController.xoaDanhMuc);
  router.put("/api/suadanhmuc", checkNhanVien,danhMucHoaController.suaDanhMuc);

  router.post("/api/themdanhmuchoachitiet",verifiToken,checkNhanVien,danhMucHoaChiTietController.themDanhMucHoaChiTiet);
  router.get("/api/alldanhmuchoachitiet",verifiToken,checkNhanVien,danhMucHoaChiTietController.tatCaDanhMucHoaChiTiet);
  router.delete("/api/xoadanhmucchitet",verifiToken,checkNhanVien,danhMucHoaChiTietController.xoaDanhMucHoaChiTiet);
  router.put("/api/suadanhmuchoachitiet",verifiToken,checkNhanVien,danhMucHoaChiTietController.suaDanhMucHoaChiTiet);
  router.get("/api/danhmuchoanoibat",danhMucHoaController.danhMucHoaNoiBat);
  router.get("/api/danhmuchoachitiettheodanhmuc",danhMucHoaChiTietController.danhMucHoaChiTietTheoDanhMuc);

  router.post("/api/themhoa",verifiToken, checkNhanVien,hoaController.themHoa);
  router.get("/api/tatcahoa",verifiToken,checkNhanVien, hoaController.tatCaHoa);
  router.put("/api/suahoa",verifiToken, checkNhanVien,hoaController.suaHoa);
  router.delete("/api/xoahoa",verifiToken, checkNhanVien,hoaController.xoaHoa);
  router.get("/api/hoagiamgia", hoaController.hoaGiamGia);
  router.get("/api/hoatet", hoaController.hoaTet);
  router.get("/api/hoasinhnhat", hoaController.hoaSinhNhat);
  router.get("/api/hoakhaitruong", hoaController.hoaKhaiTruong);
  router.get("/api/lanhodiep", hoaController.lanHoDiep);
  router.get("/api/thongtinhoa", hoaController.thongTinHoa);

  return app.use("/", router);
};

module.exports = initWebRoute;
