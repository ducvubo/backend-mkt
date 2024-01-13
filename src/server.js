import express from 'express';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB'
import cors from 'cors'
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();

let app = express();

  




app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//  app.use(cors());
app.use(bodyParser.json({ limit:'100mb'}));
app.use(bodyParser.urlencoded({ limit: '100mb', extended:true}))



app.use(cookieParser())

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;

app.listen(port, ()=> {
    console.log('Cổng: '+port)
})


