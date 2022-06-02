import { Request, Response } from "express";
import db from "../models";
import { AdminService } from "../services/admin.service";
import moment from "moment";
import nodemailer from "nodemailer";
import { Order } from "../models/order";
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

type filterData = {
    Email: string | null,
    Name: string | null,
    Mobile: string | null,
    ProductName: string | null,
    ProductColor: string | null,
    ProductSize: string | null,
    OrderStatus: string | null,
    OrderDate: string | null,
    PaymentStatus: string | null
}

type displayData = {
    OrderId: number | null,
    Quantity: number | null,
    Amount: number | null,
    OrderStatus: string | null,
    OrderDate: string | null,
    OrderTime: string | null,
    ProductDetails: {
        ProductName: string | null,
        Description: string | null,
        ProductColor: string | null,
        ProductSize: string | null
    },
    CustomerDetails: {
        Name: string | null,
        Mobile: string | undefined,
        Email: string | undefined
    },
    OrderAddress: {
        Street: string | null,
        HouseNumber: string | null,
        City: string | null,
        PostalCode: string | null
    },
    PaymentStatus: string | null
}

export class AdminController {

    public constructor(private readonly adminService: AdminService) {
        this.adminService = adminService;
    }

    public getAllOrderRequest = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 1) {
            return this.displayData()
                .then((orders) => {
                    if (orders) {
                        return res.status(200).json({ success: true, orders, error: {} });
                    }
                    else {
                        return res.status(400).json({ success: false, orders: {}, message: "Orders not available" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, orders: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, user: {}, message: " Invalid User" });
        }
    }

    public acceptOrderRequest = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 1) {
            return this.adminService.getOrderById(req.params.orderId)
                .then(async (order) => {
                    if (order) {
                        if (order.status === "Order Placed") {
                            let date = req.body.orderDeliveryDate;
                            let time = req.body.orderDeliveryTime;
                            let newDate = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss').format();
                            console.log(newDate);
                            const orderObj = {
                                orderId: order.order_Id,
                                amount: order.amount,
                                quantity: order.quantity,
                                orderDate: order.orderDate,
                                orderAcceptedDate: new Date(),
                                status: "Order Accepted",
                                orderDeliveryDate: newDate
                            }
                            const result = await db.Order.update(orderObj, { where: { order_Id: req.params.orderId } });
                            if (result) {
                                return res.status(200).json({ success: true, orderObj, error: {} });
                            }
                            else {
                                return res.status(400).json({ success: false, orderObj: {}, message: "Error!! Please try again later" });
                            }
                        }
                        else {
                            return res.status(401).json({ success: false, order: {}, message: "Order already accepted or cancelled or completed" });
                        }
                    }
                    else {
                        return res.status(404).json({ msg: "Order not available or order not found" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, orders: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, user: {}, message: " Invalid User" });
        }
    }

    public rescheduleOrderDate = async (req: Request, res: Response): Promise<Response> => {
        const orderId = req.params.orderId;
        let isAvailable = false;
        const orderDeliveryDate = new Date(req.body.orderDeliveryDate);
        const currentDate = new Date(moment(new Date()).format("YYYY-MM-DD"));
        if (orderDeliveryDate > currentDate) {
            isAvailable = true;
        }
        else {
            isAvailable = false;
        }
        if (isAvailable) {
            if (req.body.user.userTypeId === 1) {
                return this.adminService.getOrderById(orderId)
                    .then((order) => {
                        if (order && order.status === "Order Accepted") {
                            let reason = req.body.reason;
                            let date = req.body.orderDeliveryDate;
                            let time = req.body.orderDeliveryTime;
                            let newDate = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm:ss').format();
                            return this.adminService.rescheduleOrderDate(new Date(newDate), orderId)
                                .then((rescheduleOrder) => {
                                    if (rescheduleOrder.length > 0) {
                                        return this.adminService.getUserById(order.user_Id)
                                            .then((user) => {
                                                const mailOptions = {
                                                    from: process.env.USER,
                                                    to: user?.email,
                                                    subject: "Your order delivery date is rescheduled",
                                                    html: `<h2>Your order delivery date changed or rescheduled due to ${reason}. New Date: ${date} and New Time: ${time}</h2>`
                                                };

                                                transporter.sendMail(mailOptions, (error, info) => {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    else {
                                                        if (info.response.includes("OK")) {
                                                            console.log("email sent");
                                                        }
                                                    }
                                                });
                                                return res.status(200).json({ success: true, rescheduleOrder, message: "Order date rescheduled successfully" });
                                            })
                                            .catch((error: Error) => {
                                                console.log(error);
                                                return res.status(500).json({ success: false, user: {}, error: { error: error } });
                                            });
                                    }
                                    else {
                                        return res.status(400).json({ success: false, rescheduleOrder: {}, message: "Cannot update order. Please try again later..." });
                                    }
                                })
                                .catch((error: Error) => {
                                    console.log(error);
                                    return res.status(500).json({ success: false, rescheduleOrder: {}, error: { error: error } });
                                });
                        }
                        else {
                            return res.status(401).json({ success: false, order: {}, message: "Order not accepted. Please accept this order first.." });
                        }
                    })
                    .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ success: false, order: {}, error: { error: error } });
                    });
            }
            else {
                return res.status(404).json({ success: false, order: {}, message: "Invalid User" });
            }
        }
        else {
            return res.status(402).json({ success: false, isAvailable: {}, message: "Order already delivered or cancelled.." });
        }
    }

    public cancelOrder = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 1) {
            const orderId = req.params.orderId;
            return this.adminService.getOrderById(req.params.orderId)
                .then(async (order) => {
                    if (order) {
                        const orderObj = {
                            orderId: order.order_Id,
                            userId: order.user_Id,
                            productId: order.product_Id,
                            orderDate: order.orderDate,
                            status: "Order Cancelled"
                        }
                        const updateOrder = await db.Order.update(orderObj, { where: { order_Id: orderId } });
                        if (updateOrder) {
                            let reason = req.body.reason;
                            let amount = order.amount;
                            return this.adminService.getUserById(order.user_Id)
                                .then((user) => {
                                    const mailOptions = {
                                        from: process.env.USER,
                                        to: user?.email,
                                        subject: "Your order has been cancelled",
                                        html: `<h2>Your order has been cancelled due to ${reason}. Your order amount ${amount} will be refunded within 7 working days. Thank you for your order.</h2>`
                                    };

                                    transporter.sendMail(mailOptions, (error, info) => {
                                        if (error) {
                                            console.log(error);
                                        }
                                        else {
                                            if (info.response.includes("OK")) {
                                                console.log("email sent");
                                            }
                                        }
                                    });
                                    return res.status(200).json({ success: true, orderObj, message: "Order Cancelled successfully!! Your order amount will be refunded within 7 working days. Thank you" })
                                })
                                .catch((error: Error) => {
                                    console.log(error);
                                    return res.status(500).json({ success: false, user: {}, error: { error: error } });
                                });
                        }
                        else {
                            return res.status(401).json({ success: false, updateOrder: {}, message: "Order is not cancelled!!" });
                        }
                    }
                    else {
                        return res.status(402).json({ success: false, order: {}, message: "Order not found!!" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, order: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, user: {}, message: "Invalid User" });
        }
    }

    public filters = async (req: Request, res: Response): Promise<Response> => {
        const filters: filterData = req.body;
        if (req.body.user.userTypeId === 1) {
            return this.displayData()
                .then(async (orderdata) => {
                    if (orderdata) {
                        const filterArray = await this.allFilters(orderdata, filters);
                        if (filterArray!.length > 0) {
                            return res.status(200).json({ success: true, filterArray, error: {} });
                        }
                        else {
                            return res.status(400).json({ success: false, filterArray: {}, message: "Data not found" });
                        }
                    }
                    else {
                        return res.status(400).json({ success: false, filterArray: {}, message: "Data not found" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, orderdata: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, user: {}, message: "Invalid user" });
        }
    }

    public displayData = async (): Promise<displayData[] | null> => {
        let orderDetails: displayData[] = [];
        const allOrders = await this.adminService.getAllOrderRequest();
        for (let order in allOrders) {
            const user = await this.adminService.getUserById(allOrders[order].user_Id);
            const product = await this.adminService.getProductById(allOrders[order].product_Id);
            const address = await this.adminService.getOrderAddress(allOrders[order].order_Id);
            const date = allOrders[order].orderDate;
            let newDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
            let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            if (user && product && address) {
                orderDetails.push({
                    OrderId: allOrders[order].order_Id,
                    Quantity: allOrders[order].quantity,
                    Amount: allOrders[order].amount,
                    OrderStatus: allOrders[order].status,
                    OrderDate: newDate,
                    OrderTime: time,
                    ProductDetails: {
                        ProductName: product.title!,
                        Description: product.description!,
                        ProductColor: product.color!,
                        ProductSize: product.size!
                    },
                    CustomerDetails: {
                        Name: user.firstName + " " + user.lastName,
                        Mobile: user.mobile,
                        Email: user.email
                    },
                    OrderAddress: {
                        Street: address.addressLine1,
                        HouseNumber: address.addressLine2,
                        City: address.city + "," + address.state,
                        PostalCode: address.postalCode
                    },
                    PaymentStatus: allOrders[order].paymentStatus
                });
            }
        }
        // console.log(orderDetails);
        return orderDetails;
    }

    public allFilters = async (orderdata: displayData[], filters: filterData) => {
        let data;

        if (filters.Email) {
            data = orderdata.filter((item) => {
                return item.CustomerDetails.Email === filters.Email;                                                                                                                            //         return item.CustomerDetails.Email === user.email                                                                                                   //     });                                                                                      // }
            });
        }

        if (filters.Name) {
            if (data) {
                data = data.filter((item) => {
                    return item.CustomerDetails.Name === filters.Name;
                });
            }
            else {
                data = orderdata.filter(item => {
                    return item.CustomerDetails.Name === filters.Name;
                });
            }
        }

        if (filters.Mobile) {
            if (data) {
                data = data.filter(item => {
                    return item.CustomerDetails.Mobile === filters.Mobile;
                });
            }
            else {
                data = orderdata.filter(item => {
                    return item.CustomerDetails.Mobile === filters.Mobile;
                });
            }
        }

        if (filters.ProductName) {
            if (data) {
                data = data.filter(item => {
                    return item.ProductDetails.ProductName === filters.ProductName;
                });
            }
            else {
                data = orderdata.filter(item => {
                    return item.ProductDetails.ProductName === filters.ProductName;
                });
            }
        }

        if (filters.ProductColor) {
            if (data) {
                data = data.filter(item => {
                    return item.ProductDetails.ProductColor === filters.ProductColor;
                });
            }
            else {
                data = orderdata.filter(item => {
                    return item.ProductDetails.ProductColor === filters.ProductColor;
                });
            }
        }

        if (filters.ProductSize) {
            if (data) {
                data = data.filter(item => {
                    return item.ProductDetails.ProductSize === filters.ProductSize;
                });
            }
            else {
                data = orderdata.filter(item => {
                    return item.ProductDetails.ProductSize === filters.ProductSize;
                });
            }
        }

        if (filters.OrderStatus) {
            if (data) {
                data = data.filter(item => {
                    return item.OrderStatus === filters.OrderStatus;
                });
            }
            else {
                data = orderdata.filter(item => {
                    return item.OrderStatus === filters.OrderStatus;
                });
            }
        }

        if (filters.OrderDate) {
            if (data) {
                data = data.filter(item => {
                    return item.OrderDate === filters.OrderDate;
                });
            }
            else {
                data = orderdata.filter(item => {
                    return item.OrderDate === filters.OrderDate;
                });
            }
        }

        if (filters.PaymentStatus) {
            if (data) {
                data = data.filter(item => {
                    return item.PaymentStatus === filters.PaymentStatus;
                });
            }
            else {
                data = orderdata.filter(item => {
                    return item.PaymentStatus === filters.PaymentStatus;
                });
            }
        }
        return data;
    }

    public refundAmount = async (req: Request, res: Response): Promise<Response> => {
        let RefundArray: any[] = [];
        const orderId = req.params.orderId;
        let inValid: boolean;
        let flag: boolean;
        if (req.body.user.id && req.body.user.userTypeId === 1) {
            return this.adminService.getOrderById(orderId)
                .then(async (order) => {
                    if (order) {
                        req.body.amount = order.amount;
                        req.body.InBalanceAmount = order.amount - order.refundedAmount;
                        if (order.refundedAmount === null) {
                            order.refundedAmount = 0;
                        }
                        RefundArray.push(req.body.amount);
                        for (let refund in RefundArray) {
                            if (req.body.Amount && req.body.Mode && order.status != "Order Placed" && order.paymentStatus === "Done") {
                                if (req.body.Mode === "Fixed") {
                                    req.body.calculate = req.body.Amount;
                                    order.refundedAmount = +order.refundedAmount + req.body.calculate;
                                    req.body.InBalanceAmount = req.body.amount - order.refundedAmount;
                                    RefundArray.push(req.body.InBalanceAmount);
                                }
                                else if (req.body.Mode === "Percentage") {
                                    req.body.calculate = (req.body.InBalanceAmount * req.body.Amount) / 100;
                                    order.refundedAmount = req.body.calculate + +order.refundedAmount;
                                    req.body.InBalanceAmount = req.body.amount - order.refundedAmount;
                                    RefundArray.push(req.body.InBalanceAmount);
                                }
                                else {
                                    inValid = true;
                                    break;
                                }
                                if (RefundArray[refund] >= order.refundedAmount) {
                                    flag = true;
                                }
                                else {
                                    flag = false;
                                    break;
                                }
                            }
                        }
                        console.log(order.refundedAmount);
                        const refundObj = {
                            PaidAmount: order.amount,
                            refundedAmount: order.refundedAmount,
                            InBalancedAmount: req.body.InBalanceAmount,
                            Amount: req.body.Amount,
                            Mode: req.body.Mode,
                            comment: order.comment + " " + req.body.comment,
                            status: "Order Payment Refunded"
                        }
                        if (flag) {
                            const result = await db.Order.update(refundObj, { where: { order_Id: orderId } });
                            console.log(result);
                            if (result) {
                                return res.status(200).json({success: true, refundObj, message: "Your order amount refunded successfully" });
                            }
                            else {
                                return res.status(402).json({ success: false, refundObj: {}, message: "Error!! While refund your order amount" });
                            }
                        }
                        else if(inValid){
                            return res.status(422).json({ success: false, order: {}, message: "Invalid input"});
                        }
                        else {
                            return res.status(403).json({ success: false, order: {}, message: "Refund amount cannot greater than total order amount" });
                        }
                    }
                    else {
                        return res.status(404).json({ success: false, order: {}, message: "Order not found" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error: error });
                });
        }
        else {
            return res.status(401).json({success: false, user: {}, message: "Admin not found" });
        }
    }

    public getProductRatings = async(req: Request, res: Response): Promise<Response> => {
        if(req.body.user.userTypeId === 1){
            return this.adminService.getProductRatings(req.params.orderId)
            .then((rating) => {
                if(rating){
                    return res.status(200).json({ success: true, rating, error: {}});
                }
                else{
                    return res.status(400).json({ success: false, rating: {}, message: "No ratings found for this order"});
                }
            })
            .catch((error:Error) => {
                console.log(error)
                return res.status(500).json({ success: false, rating: {}, error: {error:error}});
            });
        }
        else{ 
            return res.status(404).json({ success: false, user: {}, message: "Admin not found"});
        }
    }

}