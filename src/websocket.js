// import server from './server'

// let severr = server.server123
// console.log(severr)
// const wss = new ws.WebSocketServer({ severr });

// wss.on("connection", (connection, req) => {
//   const token = req.headers.cookie;
//   const regex = /refresh_token=([^;]+)/;
//   const match = token.match(regex);
//   const refreshToken = match && match[1];
//   jwt.verify(
//     refreshToken,
//     process.env.JWT_KEY_REFRESH_TOKEN,
//     {},
//     (err, datanguoidung) => {
//       console.log(datanguoidung);
//       if (err) throw err;
//       const id = datanguoidung.id;
//       const ten = datanguoidung.ten;
//       const idchat = datanguoidung.idchat;
//       connection.id = id;
//       connection.ten = ten;
//       connection.idchat = idchat;
//     }
//   );

//   connection.on("message", (message) => {
//     const tinnhandata = JSON.parse(message.toString());
//     const { nguoinhan, noidung } = tinnhandata;
//     const nguoigui = connection.idchat;
//     console.log({ nguoinhan, noidung, nguoigui });
//     if (nguoinhan && noidung) {
//       [...wss.clients]
//         .filter((item) => item.idchat === nguoinhan)
//         .forEach((item) =>
//           item.send(
//             JSON.stringify({ noidung, nguoigui: connection.idchat, nguoinhan })
//           )
//         );
//     }
//     if(nguoigui === "nhanvien" && noidung) {
//       [...wss.clients]
//         .filter((item) => item.idchat === "nhanvien")
//         .forEach((item) =>
//           item.send(
//             JSON.stringify({ noidung, nguoigui: connection.idchat, nguoinhan })
//           )
//         );
//     }
//   });

//   [...wss.clients].forEach((clients) => {
//     clients.send(
//       JSON.stringify({
//         online: [...wss.clients].map((item) => ({
//           id: item.id,
//           ten: item.ten,
//           idchat: item.idchat,
//         })),
//       })
//     );
//   });
// });