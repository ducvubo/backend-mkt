// const { wss } = require('./server.js')

// const wss = new ws.WebSocketServer({ server });
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
//       if (err) throw err;
//       const id = datanguoidung.id;
//       const ten = datanguoidung.ten;
//       connection.id = id;
//       connection.ten = ten;
//     }
//   );

//   connection.on("message", (message) => {
//     const tinnhandata = JSON.parse(message.toString());
//     const { nguoinhan, noidung } = tinnhandata;
//     const nguoigui = connection.id;
//     console.log({ nguoinhan, noidung, nguoigui });
//     if (nguoinhan && noidung) {
//       [...wss.clients]
//         .filter((item) => +item.id === +nguoinhan)
//         .forEach((item) =>
//           item.send(
//             JSON.stringify({ noidung, nguoigui: connection.id, nguoinhan })
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
//         })),
//       })
//     );
//   });
// });
