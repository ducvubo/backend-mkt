import jwt from "jsonwebtoken";
require("dotenv").config();

const verifiToken = (req, res, next) => {
  const token = req.cookies.jwt
  if (!token)
    return res.status(200).json({
      maCode: 10,
      thongDiep: "Ban chua dang nhap vui long dang nhap",
    });
  jwt.verify(token, process.env.JWT_KEY, (err, nguoidung) => {
    if (err) {
      return res.status(200).json({
        maCode: 9,
        thongDiep: "Token đã hết hạn hoặc không hợp lệ",
      });
    } else {
      console.log("check: ", nguoidung);

      req.nguoidung = nguoidung;

      next();
    }
  });
};

module.exports = {
  verifiToken,
};
