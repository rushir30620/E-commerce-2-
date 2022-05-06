import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { sequelize } from './models';
import multer from 'multer';

//Routes import
import contactRouter from "./routes/contact.route";
import userRouter from "./routes/user.routes";
import addProductRouter from "./routes/add-product.routes";

dotenv.config();

const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());

app.use('/', contactRouter);
app.use('/', userRouter);
app.use('/', addProductRouter);

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({dest: 'images'}).single('file'));

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    sequelize.authenticate().then(async() => {
        console.log("Database connected");
    })
    .catch((e:any) => {
        console.log(e.message);
    })
})