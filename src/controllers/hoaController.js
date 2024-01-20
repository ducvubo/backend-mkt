import hoaService from "../services/hoaService";

let themHoa = async (req, res) => {
  try {
    let data = await hoaService.themHoa(req.body);
    return res.status(200).json(data);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server...",
    });
  }
};

let tatCaHoa = async (req, res) => {
  try {
    let data = await hoaService.tatCaHoa();
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

let suaHoa = async (req, res) => {
  let hoa = req.body;
  try {
    if (!hoa.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await hoaService.suaHoa(hoa);
    return res.status(200).json(data);
  } catch (e) {
    console.log("Sửa hoa thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let xoaHoa = async (req, res) => {
  try {
    if (!req.query.id) {
      return res.status(200).json({
        maCode: -2,
        thongDiep: "Thiếu tham số truyền lên server",
      });
    }
    let data = await hoaService.xoaHoa(req.query.id);
    return res.status(200).json(data);
  } catch {
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi cuả server",
    });
  }
};

let hoaGiamGia = async (req, res) => {
  try {
    let data = await hoaService.hoaGiamGia();
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

let hoaTet = async (req, res) => {
  try {
    let data = await hoaService.hoaTet();
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

let hoaSinhNhat = async (req, res) => {
  try {
    let data = await hoaService.hoaSinhNhat();
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

let hoaKhaiTruong = async (req, res) => {
  try {
    let data = await hoaService.hoaKhaiTruong();
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

let lanHoDiep = async (req, res) => {
  try {
    let data = await hoaService.lanHoDiep();
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

let thongTinHoa = async (req, res) => {
  try {
    let data = await hoaService.thongTinHoa(req.query.id);
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

let sanPhamLienQuan = async (req, res) => {
  try {
    let data = await hoaService.sanPhamLienQuan(req.query.iddanhmuchoachitiet,req.query.id); //param
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let hoaTheoDanhMucChiTiet = async (req, res) => {
  try {
    let data = await hoaService.hoaTheoDanhMucChiTiet(req.query.iddanhmuchoachitiet); //param
    return res.status(200).json(data);
  } catch (e) {
    console.log("Lấy nguoi dung thất bại: ", e);
    return res.status(200).json({
      maCode: -1,
      thongDiep: "Lỗi của server",
    });
  }
};

let hoaTheoDanhMuc = async (req, res) => {
  try {
    let data = await hoaService.hoaTheoDanhMuc(req.query.iddanhmuchoa); //param
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

module.exports = {
  themHoa,
  tatCaHoa,
  suaHoa,
  xoaHoa,
  hoaGiamGia,
  hoaTet,
  hoaSinhNhat,
  hoaKhaiTruong,
  lanHoDiep,
  thongTinHoa,
  sanPhamLienQuan,
  hoaTheoDanhMucChiTiet,
  hoaTheoDanhMuc
};
