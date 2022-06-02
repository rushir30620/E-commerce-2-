import express from 'express';

import contactRouter from "./contact.route";
import userRouter from "./user.routes";
import addProductRouter from "./product.routes";
import cartRouter from "./cart.routes";
import orderRouter from "./order.routes";
// import paymentRouter from "./payment.routes";
import customerRouter from "./customer.routes";
import adminrouter from './admin.routes';

const app = express();

app.use('/', contactRouter);
app.use('/', userRouter);
app.use('/', addProductRouter);
app.use('/', cartRouter);
app.use('/', orderRouter);
// app.use('/', paymentRouter);
app.use('/', customerRouter);
app.use('/admin', adminrouter);

export = app