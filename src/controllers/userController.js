import userService from "../services/userService";

let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeServiec(req.query.kieu); //param
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
    let infor = await userService.themNguoiDung(req.body);
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
    let data = await userService.tatCaNguoiDung();
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
    let data = await userService.Get1NguoiDung(req.query.id); //param
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
    let data = await userService.xoaNguoiDung(req.query.id);
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
    let data = await userService.suaNguoiDung(datatruyenle);
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
  getAllCode: getAllCode,
  themNguoiDung: themNguoiDung,
  tatCaNguoiDung: tatCaNguoiDung,
  Get1NguoiDung: Get1NguoiDung,
  xoaNguoiDung: xoaNguoiDung,
  suaNguoiDung: suaNguoiDung,
};
