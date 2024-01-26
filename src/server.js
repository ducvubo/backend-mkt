import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import ws from "ws";
import jwt, { TokenExpiredError } from "jsonwebtoken";
dotenv.config();

let app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.URL_REACT);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//  app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(cookieParser());

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

const server = app.listen(port, () => {
  console.log("Cổng: " + port);
});

const wss = new ws.WebSocketServer({ server });

wss.on("connection", (connection, req) => {
  const token = req.headers.cookie;
  const regex = /refresh_token=([^;]+)/;
  const match = token.match(regex);
  const refreshToken = match && match[1];
  jwt.verify(
    refreshToken,
    process.env.JWT_KEY_REFRESH_TOKEN,
    {},
    (err, datanguoidung) => {
      if (err) throw err;
      const id = datanguoidung.id;
      const ten = datanguoidung.ten;
      connection.id = id;
      connection.ten = ten;
    }
  );

  connection.on("message", (message) => {
    const tinnhandata = JSON.parse(message.toString());
    const { nguoinhan, noidung } = tinnhandata;
    const nguoigui = connection.id
    console.log({ nguoinhan, noidung,nguoigui });

    if (nguoinhan && noidung) {
      [...wss.clients]
        .filter((item) => +item.id === +nguoinhan)
        .forEach((item) =>
          item.send(
            JSON.stringify({ noidung, nguoigui: connection.id, nguoinhan })
          )
        );
    }
  });

  [...wss.clients].forEach((clients) => {
    clients.send(
      JSON.stringify({
        online: [...wss.clients].map((item) => ({
          id: item.id,
          ten: item.ten,
        })),
      })
    );
  });
});
