import express from "express";
import nguoidungController from "../controllers/nguoidungController";
import danhMucHoaController from "../controllers/danhMucHoaController";
import danhMucHoaChiTietController from "../controllers/danhMucHoaChiTietController";
import hoaController from "../controllers/hoaController";
import { verifiToken } from "../middleware/verify_token";
import { checkChuCuaHang, checkNhanVien } from "../middleware/checkQuyen";
import gioHangController from "../controllers/gioHangController";
import nhapHoaController from "../controllers/nhapHoaController";
import nhapHoaChiTietController from "../controllers/nhapHoaChiTietController";
import donHangController from "../controllers/donHangController";
import chatController from '../controllers/chatController'
import danhGiaController from '../controllers/danhGiaController'
let router = express.Router();

let initWebRoute = (app) => {
  router.get("/api/allcode", nguoidungController.getAllCode);
  router.post("/api/themnguoidung",verifiToken,checkChuCuaHang,nguoidungController.themNguoiDung);
  router.get("/api/allnguoidung",verifiToken,checkChuCuaHang,nguoidungController.tatCaNguoiDung);
  router.get("/api/all1nguoidung",verifiToken,checkChuCuaHang,nguoidungController.Get1NguoiDung);
  router.delete("/api/xoanguoidung",verifiToken,checkChuCuaHang,nguoidungController.xoaNguoiDung);
  router.put("/api/suanguoidung",verifiToken,checkChuCuaHang,nguoidungController.suaNguoiDung);
  router.post("/api/dangnhap", nguoidungController.dangNhap);
  router.get("/api/dangxuat", nguoidungController.dangXuat);
  router.post("/api/dangky", nguoidungController.dangKy);
  router.post("/api/xacnhandangky", nguoidungController.xacNhanDangKy);
  router.post("/api/quenmk", nguoidungController.quenMK);
  router.post("/api/doimk", nguoidungController.doiMK);
  router.post("/api/refresh-token", nguoidungController.reFresh_token);
  router.get("/api/laytatcanhanvien", nguoidungController.layTatCaNhanVien);

  router.post("/api/themdanhmuc",verifiToken,checkNhanVien,danhMucHoaController.themDanhMuc);
  router.get("/api/alldanhmuc",verifiToken,checkNhanVien,danhMucHoaController.tatCaDanhMuc);
  router.delete("/api/xoadanhmuc",verifiToken,checkNhanVien,danhMucHoaController.xoaDanhMuc);
  router.put("/api/suadanhmuc",verifiToken, checkNhanVien, danhMucHoaController.suaDanhMuc);

  router.post("/api/themdanhmuchoachitiet",verifiToken,checkNhanVien,danhMucHoaChiTietController.themDanhMucHoaChiTiet);
  router.get("/api/alldanhmuchoachitiet",verifiToken,checkNhanVien,danhMucHoaChiTietController.tatCaDanhMucHoaChiTiet);
  router.delete("/api/xoadanhmucchitet",verifiToken,checkNhanVien,danhMucHoaChiTietController.xoaDanhMucHoaChiTiet);
  router.put("/api/suadanhmuchoachitiet",verifiToken,checkNhanVien,danhMucHoaChiTietController.suaDanhMucHoaChiTiet);
  router.get("/api/danhmuchoanoibat", danhMucHoaController.danhMucHoaNoiBat);
  router.get("/api/danhmuchoachitiettheodanhmuc",danhMucHoaChiTietController.danhMucHoaChiTietTheoDanhMuc );

  router.post("/api/themhoa",verifiToken,checkNhanVien,hoaController.themHoa);
  router.get("/api/tatcahoa",verifiToken,checkNhanVien,hoaController.tatCaHoa );
  router.put("/api/suahoa", verifiToken, checkNhanVien, hoaController.suaHoa);
  router.delete("/api/xoahoa",verifiToken,checkChuCuaHang,hoaController.xoaHoa);
  router.get("/api/hoagiamgia", hoaController.hoaGiamGia);
  router.get("/api/hoatet", hoaController.hoaTet);
  router.get("/api/hoasinhnhat", hoaController.hoaSinhNhat);
  router.get("/api/hoakhaitruong", hoaController.hoaKhaiTruong);
  router.get("/api/lanhodiep", hoaController.lanHoDiep);
  router.get("/api/thongtinhoa", hoaController.thongTinHoa);
  router.get("/api/sanphamlienquan", hoaController.sanPhamLienQuan);
  router.get("/api/hoatheodanhmucchitiet", hoaController.hoaTheoDanhMucChiTiet);
  router.get("/api/hoatheodanhmuc", hoaController.hoaTheoDanhMuc);
  router.put("/api/timhoanguoidung", hoaController.timHoaNguoiDung)

  router.get("/api/giohang", verifiToken, gioHangController.gioHangNguoiDung);
  router.post("/api/suagiohang",verifiToken,gioHangController.suaGioHangNguoiDung);
  router.post("/api/themgiohang", verifiToken, gioHangController.themGioHang);

  router.post("/api/themhoadon",verifiToken,checkNhanVien,nhapHoaController.themHoaDon);
  router.get("/api/tatcahoadon",verifiToken,checkNhanVien,nhapHoaController.tatCaHoaDon);
  router.put("/api/suahoadon",verifiToken,checkNhanVien,nhapHoaController.suaHoaDon);
  router.delete("/api/xoahoadon",verifiToken,checkNhanVien,nhapHoaController.xoaHoaDon);
  router.put("/api/thongkenhaphoa",verifiToken,checkNhanVien, nhapHoaController.thongKeNhapHoa)

  router.post("/api/themhoamoi",verifiToken,checkNhanVien,nhapHoaChiTietController.themHoaMoi);
  router.post("/api/capnhathoacu",verifiToken,checkNhanVien,nhapHoaChiTietController.capNhatHoaCu);
  router.get("/api/tatcanhaphoachitiet",verifiToken,checkNhanVien,nhapHoaChiTietController.tatCaNhapHoaChiTiet);
  router.put("/api/suanhaphoachitiet",verifiToken,checkNhanVien,nhapHoaChiTietController.suaNhapHoaChiTiet);
  router.delete("/api/xoanhaphoachitiet",verifiToken,checkNhanVien,nhapHoaChiTietController.xoaNhapHoaChiTiet);

  router.get("/api/laytatcaphuongthucvanchuyen",donHangController.layTatCaPhuongThucVanChuyen);
  router.post("/api/dathang", verifiToken,donHangController.datHang);
  router.post("/api/dathangtrangchu", verifiToken,donHangController.datHangTrangChu);
  router.get("/api/donhang",verifiToken,checkNhanVien, donHangController.tatCaDonHangTheoTrangThai);
  router.put("/api/xacnhandonhang",verifiToken,checkNhanVien, donHangController.xacNhanDonHang);
  router.put("/api/huydonhang",verifiToken,checkNhanVien, donHangController.huyDonHang);
  router.put("/api/xacnhandondagiaochodonvivanchuyen",verifiToken,checkNhanVien, donHangController.xacNhanDonHangGiaoDonViVanChuyen)
  router.put("/api/xacnhandonhangdagiaochokhachhang", verifiToken,checkNhanVien,donHangController.xacNhanDonHangDaGiaoChoKhachHang)
  router.put("/api/xacnhandaxulyyeucauhoanhanghoantien", verifiToken,checkNhanVien,donHangController.xacNhanDaXuLyYeuCauHoanHangHoanTien)
  router.put("/api/thongkebanhoa",verifiToken,checkNhanVien, donHangController.thongKeBanHoa);
  router.get("/api/tatcadonhang",verifiToken,checkNhanVien, donHangController.tatCaDonHang);
  router.get("/api/donhangnguoidung",verifiToken,donHangController.layDonHangNguoiDung)
  router.put("/api/huydonhangnguoidung",verifiToken, donHangController.huyDonHangNguoiDung);
  router.put("/api/xacnhandanhanduochang",verifiToken, donHangController.xacNhanDaNhanDuocHang)
  router.put("/api/yeucauhoanhanghoantien",verifiToken, donHangController.yeuCauHoanHangHoanTien)

  router.get("/api/tatcacuoctrochuyen", chatController.tatCaCuocTroChuyen)
  router.get("/api/tatcakhachhang",chatController.tatCaKhachHang)
  router.get("/api/doanchatkhachhang", chatController.doanChatKhachHang)

  router.post("/api/themdanhgia",verifiToken, danhGiaController.themDanhGia)
  router.get("/api/laybinhluantheohoa", danhGiaController.binhLuanTheoHoa)
  router.post("/api/themtraloibinhluan",verifiToken, danhGiaController.themTraLoiBinhLuan)
  router.get("/api/laytatcabinhluan",verifiToken,checkNhanVien, danhGiaController.layTatCaBinhLuan)
  router.post("/api/duyethuyduyetdanhgia",verifiToken,checkNhanVien, danhGiaController.duyetHuyDuyetDanhGia)

  return app.use("/", router);
};

module.exports = initWebRoute;
