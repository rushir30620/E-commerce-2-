import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { sequelize } from './models';
import multer from 'multer';

//Routes import
// import contactRouter from "./routes/contact.route";
// import userRouter from "./routes/user.routes";
// import addProductRouter from "./routes/product.routes";
// import cartRouter from "./routes/cart.routes";
// import orderRouter from "./routes/order.routes";
import paymentRouter from "./routes/payment.routes";
// import customerRouter from "./routes/customer.routes";
import indexRouter from "./routes/index.routes";

dotenv.config();

const hostname = 'localhost';
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);

app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', 'view');

//Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({dest: 'images'}).single('file'));

app.use('/', indexRouter);
// app.use('/', userRouter);
// app.use('/', addProductRouter);
// app.use('/', cartRouter);
// app.use('/', orderRouter);
app.use('/', paymentRouter);
// app.use('/', customerRouter);

server.listen(port, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
    sequelize.authenticate().then(async() => {
        console.log("Database connected");
    })
    .catch((e:any) => {
        console.log(e.message);
    })
})