import { reject } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
import { createJWT } from "../middleware/JWTAction";
const salt = bcrypt.genSaltSync(10);

let buillinkxacnhan = (email, linkxacnhan) => {
  let result = `${process.env.URL_REACT}/xacnhantaikhoan?linkxacnhan=${linkxacnhan}&email=${email}`;
  return result;
};

let buillinkdoimk = (email, linkxacnhan) => {
  let result = `${process.env.URL_REACT}/doimk?linkxacnhan=${linkxacnhan}&email=${email}`;
  return result;
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

let ktEmail = (emailNguoiDung) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nguoidung = await db.User.findOne({
        //tim nguoidung
        where: { email: emailNguoiDung },
      });
      if (nguoidung) {
        //nguoidung khac undefine thi chay vao day
        resolve(true);
      } else {
        //nguoidung undefine chay vao day
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let ktTrangThaiTaiKhoan = (emailNguoiDung) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nguoidung = await db.User.findOne({
        //tim nguoidung
        where: {
          email: emailNguoiDung,
          trangthaiId: "S2",
        },
      });
      if (nguoidung) {
        //nguoidung khac undefine thi chay vao day
        resolve(true);
      } else {
        //nguoidung undefine chay vao day
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let dangNhap = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let datanguoidung = {};
      let ktemail = await ktEmail(email); //lay gia tri true and false
      let ktTrangThai = await ktTrangThaiTaiKhoan(email);
      if (ktemail === false) {
        //neu tra ve false
        datanguoidung.maCode = 4;
        datanguoidung.thongDiep =
          "Email của bạn không tồn tại trong hệ thống, vui lòng nhập lại email!!!";
      } else if (ktTrangThai === false) {
        datanguoidung.maCode = 5;
        datanguoidung.thongDiep =
          "Tài khoản của bạn chưa được xác nhận vui lòng kiểm tra hộp thư của email để xác nhận!!!";
      }
      if (ktemail === true && ktTrangThai === true) {
        //neu tra ve true
        let nguoidung = await db.User.findOne({
          attributes: ["email", "quyenId", "password", "ho", "ten"],
          where: { email: email },
          raw: true, //chi tra ra dung object nhu trong database
        });
        if (nguoidung) {
          let ktmk = await bcrypt.compareSync(password, nguoidung.password);
          if (ktmk) {
            // true

            let payload = {
              email: nguoidung.email,
              quyenId: nguoidung.quyenId,
              ho: nguoidung.ho,
              ten: nguoidung.ten,
            };

            let token = createJWT(payload);

            datanguoidung.access_token = token
            datanguoidung.maCode = 0;
            datanguoidung.thongDiep = "Ok";
            delete nguoidung.password; //xoa cot password truoc khi gan
            datanguoidung.nguoidung = nguoidung;
          } else {
            datanguoidung.maCode = 3;
            datanguoidung.thongDiep = "Vui lòng nhập đúng password";
          }
        } else {
          datanguoidung.maCode = 2;
          datanguoidung.thongDiep = "Email này chưa được đăng ký!!!";
        }
      }

      resolve(datanguoidung);
    } catch (e) {
      reject(e);
    }
  });
};

let getAllCodeServiec = (kieu) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!kieu) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền vào",
        });
      } else {
        let data = {};
        data = await db.Allcode.findAll({
          where: { kieu: kieu },
        });
        resolve({
          data: data,
          maCode: 0,
          thongDiep: "ok ok",
        });
      }
    } catch {
      reject(e);
    }
  });
};

let themNguoiDung = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await ktEmail(data.email);
      if (check === true) {
        resolve({
          maCode: 1,
          thongDiep: "Email đã được sử dụng vui lòng dùng email khác!!!",
          thongDiepen: "Email has been used, please use another email",
        });
      } else {
        let mahoamk = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: mahoamk,
          ho: data.ho,
          ten: data.ten,
          sdt: data.sodienthoai,
          diachinha: data.diachinha,
          diachicuahang: data.diachicuahang,
          quyenId: data.quyen,
          gioitinhId: data.gioitinh,
          trangthaiId: "S2",
          linkxacnhan: "",
        });

        resolve({
          maCode: 0,
          thongDiep: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let tatCaNguoiDung = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let all = "";
      all = await db.User.findAll({
        attributes: {
          exclude: ["password"], //khong lay ra password
        },
      });
      resolve(all);
    } catch (e) {
      reject(e);
    }
  });
};

let Get1NguoiDung = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền vào",
        });
      } else {
        let nguoidung = "";
        nguoidung = await db.User.findOne({
          where: { id: id },
          attributes: {
            exclude: ["password"], //khong lay ra password
          },
          include: [
            {
              model: db.Allcode,
              as: "gioitinh",
              attributes: ["tiengViet", "tiengAnh"],
            },
            {
              model: db.Allcode,
              as: "quyen",
              attributes: ["tiengViet", "tiengAnh"],
            },
          ],
          raw: false,
          nest: true,
        });

        resolve(nguoidung);
      }
    } catch {
      reject(e);
    }
  });
};

let xoaNguoiDung = (id) => {
  return new Promise(async (resolve, reject) => {
    let nguoidung = await db.User.findOne({
      where: { id: id },
    });
    if (!nguoidung) {
      resolve({
        maCode: 1,
        thongDiep: "Người dùng không tồn tại",
      });
    }
    await db.User.destroy({
      where: { id: id },
    });
    resolve({
      maCode: 0,
      thongDiep: "Xóa người dùng thành công",
    });
  });
};

let suaNguoiDung = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nguoidung = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (nguoidung) {
        nguoidung.ho = data.ho;
        nguoidung.ten = data.ten;
        nguoidung.sdt = data.sodienthoai;
        nguoidung.diachinha = data.diachinha;
        nguoidung.diachicuahang = data.diachicuahang;
        nguoidung.gioitinhId = data.gioitinhId;
        nguoidung.quyenId = data.quyenId;
        nguoidung.trangthaiId = "S2";
        nguoidung.linkxacnhan = "";
        await nguoidung.save();

        resolve({
          maCode: 0,
          thongDiep: "Sửa người dùng thành công",
        });
      } else {
        resolve({
          maCode: 1,
          thongDiep: "Không tìm thấy người dùng",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let dangKy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await ktEmail(data.email);
      if (check === true) {
        resolve({
          maCode: 1,
          thongDiep: "Email đã được sử dụng vui lòng dùng email khác!!!",
          thongDiepen: "Email has been used, please use another email",
        });
      } else {
        let linkxacnhan = uuidv4();

        await emailService.guiEmailDangKy({
          emailxacnhan: data.email,
          ho: data.ho,
          ten: data.ten,
          sodienthoai: data.sodienthoai,
          diachinha: data.diachinha,
          linkxacnhan: buillinkxacnhan(data.email, linkxacnhan),
        });

        let mahoamk = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: mahoamk,
          ho: data.ho,
          ten: data.ten,
          sdt: data.sodienthoai,
          diachinha: data.diachinha,
          diachicuahang: "",
          quyenId: "R4",
          gioitinhId: data.gioitinh,
          trangthaiId: "S1",
          linkxacnhan: linkxacnhan,
        });

        resolve({
          maCode: 0,
          thongDiep: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let xacNhanDangKy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.linkxacnhan || !data.email) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền lên server",
        });
      } else {
        let kt = await db.User.findOne({
          where: {
            email: data.email,
            linkxacnhan: data.linkxacnhan,
            trangthaiId: "S1",
          },
          raw: false,
        });
        if (kt) {
          kt.trangthaiId = "S2";
          await kt.save();
          resolve({
            maCode: 0,
            thongDiep: "Xác nhận tài khoản thành công",
          });
        } else {
          resolve({
            maCode: 2,
            thongDiep: "Tài khoản đã được kích hoạt",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let quenMK = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkemail = await ktEmail(data.email);
      if (checkemail === false) {
        resolve({
          maCode: 1,
          thongDiep: "Email này chưa đăng ký tài khoản!!!",
          thongDiepen: "This email has not been registered yet!!!",
        });
      } else {
        let updatelinkmoi = await db.User.findOne({
          where: { email: data.email },
          raw: false,
        });

        let checktrangthai = await ktTrangThaiTaiKhoan(data.email);
        if (checktrangthai === false) {
          resolve({
            maCode: 2,
            thongDiep:
              "Tài khoản chưa được kích hoạt vui lòng kích hoạt trước!!!",
          });
        } else {
          let linkxacnhan = uuidv4();

          await emailService.guiEmaiQuenMk({
            emailxacnhan: data.email,
            linkxacnhan: buillinkdoimk(data.email, linkxacnhan),
          });
          updatelinkmoi.linkxacnhan = linkxacnhan;
          await updatelinkmoi.save();

          resolve({
            maCode: 0,
            thongDiep: "OK",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

let doiMK = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.linkxacnhan || !data.email) {
        resolve({
          maCode: 1,
          thongDiep: "Thiếu tham số truyền lên server",
        });
      } else {
        let kt = await db.User.findOne({
          where: {
            email: data.email,
            linkxacnhan: data.linkxacnhan,
          },
          raw: false,
        });

        if (kt) {
          let mahoamk = await hashUserPassword(data.password);
          kt.password = mahoamk;
          await kt.save();
          resolve({
            maCode: 0,
            thongDiep: "Đổi mật khẩu thành công",
          });
        } else {
          resolve({
            maCode: 2,
            thongDiep: "Không tìm thấy email của bạn",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getAllCodeServiec,
  themNguoiDung,
  tatCaNguoiDung,
  Get1NguoiDung,
  xoaNguoiDung,
  suaNguoiDung,
  dangNhap,
  dangKy,
  xacNhanDangKy,
  quenMK,
  doiMK,
};
