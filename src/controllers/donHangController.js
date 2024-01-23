import donHangService from "../services/donHangService";

let layTatCaPhuongThucVanChuyen = async (req, res) => {
  try {
    let data = await donHangService.layTatCaPhuongThucVanChuyen();
    return res.status(200).json({
      maCode: 0,
      thongDiep: "OK",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let datHang = async (req, res) => {
  try {
    let data = await donHangService.datHang(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let tatCaDonHang = async (req, res) => {
  try {
    if (!req.query.trangthai) {
      return res.status(200).json({
        maCode: 2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.tatCaDonHang(req.query.trangthai);
    return res.status(200).json({
      maCode: 0,
      thongDiep: "OK",
      data,
    });
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let xacNhanDonHang = async (req, res) => {
  let datatruyenle = req.body.dataxacnhandonhang;
  try {
    if (!datatruyenle.madonhang) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await donHangService.xacNhanDonHang(datatruyenle);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

module.exports = {
  layTatCaPhuongThucVanChuyen,
  datHang,
  tatCaDonHang,
  xacNhanDonHang,
};
