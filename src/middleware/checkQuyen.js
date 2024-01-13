const checkChuCuaHang = (req, res, next) => {
  let  {quyenId}  = req.nguoidung;

  if (quyenId !== "R1") {
    return res.status(200).json({
      maCode: 10,
      thongDiep: "Bạn không phải admin vui lòng quay ra",
    });
  }
    

  next();
};

const checkNhanVien = (req, res, next) => {
    let { quyenId } = req.nguoidung;
    if (quyenId !== "R1" && quyenId !== "R2")
      return res.status(200).json({
        maCode: 10,
        thongDiep: "Chỉ có admin với nhân viên được dùng trang này",
      });
  
    next();
  };




module.exports = {
    checkChuCuaHang,checkNhanVien
}
