import nguoiDungService from "../services/nguoiDungService";

let getAllCode = async (req, res) => {
  try {
    let data = await nguoiDungService.getAllCodeServiec(req.query.kieu); //param
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy allcode thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let themNguoiDung = async (req, res) => {
  try {
    let infor = await nguoiDungService.themNguoiDung(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let tatCaNguoiDung = async (req, res) => {
  try {
    let data = await nguoiDungService.tatCaNguoiDung();
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

let Get1NguoiDung = async (req, res) => {
  try {
    let data = await nguoiDungService.Get1NguoiDung(req.query.id); //param
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let xoaNguoiDung = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await nguoiDungService.xoaNguoiDung(req.query.id);
    return res.status(200).json(data);
  } catch {
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let suaNguoiDung = async (req, res) => {
  let datatruyenle = req.body;
  try {
    if (!datatruyenle.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await nguoiDungService.suaNguoiDung(datatruyenle);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let dangNhap = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(200).json({
      maCode: 1,
      thongDiep: "Vui lòng nhập đầy đủ email và mật khẩu!",
    });
  }
  let datanguoidung = await nguoiDungService.dangNhap(email, password);
  return res.status(200).json({
    maCode: datanguoidung.maCode,
    thongDiep: datanguoidung.thongDiep,
    nguoidung: datanguoidung.nguoidung ? datanguoidung.nguoidung : {},
  });
};

module.exports = {
  getAllCode,
  themNguoiDung,
  tatCaNguoiDung,
  Get1NguoiDung,
  xoaNguoiDung,
  suaNguoiDung,
  dangNhap,
};
