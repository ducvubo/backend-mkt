import express from "express";
import userController from "../controllers/userController";
import danhMucHoaController from "../controllers/danhMucHoaController";
import danhMucHoaChiTietController from '../controllers/danhMucHoaChiTietController'
import hoaController from '../controllers/hoaController'
let router = express.Router();

let initWebRoute = (app) => {
  router.get("/api/allcode", userController.getAllCode);
  router.post("/api/themnguoidung", userController.themNguoiDung);
  router.get("/api/allnguoidung", userController.tatCaNguoiDung);
  router.get("/api/all1nguoidung", userController.Get1NguoiDung);
  router.delete("/api/xoanguoidung", userController.xoaNguoiDung);
  router.put("/api/suanguoidung", userController.suaNguoiDung);

  router.post("/api/themdanhmuc", danhMucHoaController.themDanhMuc);
  router.get("/api/alldanhmuc", danhMucHoaController.tatCaDanhMuc);
  router.delete("/api/xoadanhmuc", danhMucHoaController.xoaDanhMuc);
  router.put("/api/suadanhmuc", danhMucHoaController.suaDanhMuc);

  router.post("/api/themdanhmuchoachitiet", danhMucHoaChiTietController.themDanhMucHoaChiTiet);
  router.get("/api/alldanhmuchoachitiet", danhMucHoaChiTietController.tatCaDanhMucHoaChiTiet);
  router.delete("/api/xoadanhmucchitet", danhMucHoaChiTietController.xoaDanhMucHoaChiTiet);
  router.put("/api/suadanhmuchoachitiet", danhMucHoaChiTietController.suaDanhMucHoaChiTiet);

  router.get("/api/danhmuchoanoibat",danhMucHoaController.danhMucHoaNoiBat)
  router.get("/api/danhmuchoachitiettheodanhmuc",danhMucHoaChiTietController.danhMucHoaChiTietTheoDanhMuc)

  router.post('/api/themhoa',hoaController.themHoa)
  router.get("/api/tatcahoa", hoaController.tatCaHoa)
  router.put("/api/suahoa", hoaController.suaHoa);
  router.delete("/api/xoahoa", hoaController.xoaHoa);



  
  return app.use("/", router);
};

module.exports = initWebRoute;
