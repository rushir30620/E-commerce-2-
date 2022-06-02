import { Order } from "../models/order";
import { Request, Response } from "express";
import { OrderService } from "../services/order.service";
import { UserAddress } from "../models/useraddress";
import db from "../models";

export class OrderController {

    public constructor(private readonly orderService: OrderService) {
        this.orderService = orderService;
    }

    public createOrder = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.id && req.body.user.userTypeId === 2) {
            let productsArray:any = [];
            const convertedDate = new Date();
            req.body.orderDate = convertedDate;
            req.body.user_Id = req.body.user.id;
            req.body.OrderAddress.email = req.body.user.email;
            req.body.status = "Order Placed";
            return this.orderService.getProduct(req.params.prodId)
                .then((product) => {
                    req.body.product_Id = product?.product_Id;
                    req.body.amount = product?.price! * req.body.quantity;

                    let prodDetailObj = {
                        newProdId : req.body.product_Id,
                        quant : req.body.quantity,
                        price : product?.price,
                        title : product?.title,
                        description : product?.description,
                    }

                    productsArray.push({prodDetailObj});
                    req.body.products = productsArray;
                    console.log(req.body.products);
                    return this.orderService.createOrder(req.body)
                        .then((order: Order) => {
                            if (order) {
                                return res.status(200).json({ success: true, order, error: {} });
                            }
                            else {
                                return res.status(402).json({ success: false, order: {}, message: "Order not found..." });
                            }
                        })
                        .catch((error: Error) => {
                            console.log(error);
                            return res.status(501).json({ success: false, order: {}, error: { error: error } });
                        });
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(501).json({ success: false, order: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, message: "Invalid User" });
        }
    };

    public createOrderFromCart = async(req: Request, res: Response): Promise<Response> => {
        if(req.body.user.userTypeId === 2){
            const ID = req.body.user.id;
            let productsArray:any = [];
            const convertedDate = new Date();
            req.body.orderDate = convertedDate;
            req.body.user_Id = req.body.user.id;
            req.body.OrderAddress.email = req.body.user.email;
            req.body.status = "Order Placed";
            return this.orderService.getProductsFromCart(req.body.user.id)
            .then(async (products) => {
                if(products){
                    let Total = 0;
                    let TotalQuant = 0, newProdId;
                    const getProducts = await db.Product.findAll();
                    if(getProducts){
                        for(let product in getProducts){
                            for(let prod in products){
                                if(getProducts[product].product_Id === products[prod].product_Id){
                                    let prodDetailObj = {
                                        newProdId : products[prod].product_Id,
                                        quant : products[prod].quantity,
                                        price : getProducts[product].price,
                                        title : getProducts[product].title,
                                        description : getProducts[product].description,
                                    }
                                    Total = Total + (products[prod].price);
                                    TotalQuant = TotalQuant + products[prod].quantity;
                                    newProdId = products[prod].product_Id,
                                    productsArray.push({prodDetailObj});
                                }
                            }
                        }
                    }
                    console.log(newProdId);
                    req.body.quantity = TotalQuant;
                    req.body.amount = Total;
                    req.body.product_Id = newProdId;
                    req.body.products = productsArray;
                    return this.orderService.createOrderFromCart(req.body)
                    .then((order: Order) => {
                        if(order){
                            let timer = setTimeout(async () => {
                                const removeFromCart = await db.Cart.destroy({where: {user_Id:ID}});
                                return removeFromCart;
                            }, 5000);
                            return res.status(200).json({ success: true, order, error: {} });
                        }
                        else {
                            return res.status(401).json({ success: false, order: {}, message: "Order not found..." });
                        }
                    })
                    .catch((error: Error) => {
                        console.log(error);
                        return res.status(501).json({ success: false, order: {}, error: { error: error } });
                    });
                }
                else {
                    return res.status(402).json({ success: false, message: "Products not found" });
                }
            })
            .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({ success: false, order: {}, error: { error: error } });
            });
        }
        else {
            return res.status(404).json({ success: false, message: "Invalid User" });
        }
    }

    public orderSummary = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            return this.orderService.orderSummary(req.params.orderId)
                .then((order) => {
                    if (order){
                        return this.orderService.getOrderAddress(order.order_Id)
                        .then((address) => {
                            return this.orderService.getProduct(order.product_Id.toString())
                            .then((product) => {
                                return res.status(200).json({ success: true, order, address, product, error: {} });
                            })
                            .catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({ success: false, order: {}, error: { error: error } });
                            });
                        })
                        .catch((error: Error) => {
                            console.log(error);
                            return res.status(500).json({ success: false, order: {}, error: { error: error } });
                        });
                    }
                    else{
                        return res.status(402).json({ success: false, order: {}, message: "Order not found..." });
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

    public getExistingAddress = async(req:Request, res:Response): Promise<Response> => {
        let existingAddress : UserAddress[] = [];
        if(req.body.user.userTypeId === 2){
            return this.orderService.getUserWithAddress(req.body.user.id)
            .then((userAddress) => {
                if(userAddress.length > 0){
                    for(let address in userAddress){
                        if(userAddress[address].user_Id === req.body.user.id){
                            existingAddress.push(userAddress[address]);
                        }
                    }
                    if(existingAddress.length > 0){
                        return res.status(200).json({ success: true, existingAddress, error: {} });
                    }
                    else{
                        return res.status(404).json({success: false, existingAddress: {}, msg: "Address Not Found" });
                    }
                }
                else{
                    return res.status(301).json({success: false, existingAddress: {}, msg: "Address Not Available!! Please add new address" });
                }
            })
            .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({ success: false, existingAddress: {}, error: { error: error } });
            });
        }
        else {
            return res.status(404).json({success: false, existingAddress: {}, message: "Invalid User" });
        }
    }

    public addNewAddress = async(req: Request, res: Response): Promise<Response> => {
        if(req.body.user.userTypeId === 2){
            req.body.user_Id = req.body.user.id;
            req.body.email = req.body.user.email;
            return this.orderService.addNewAddress(req.body)
            .then((address) => {
                return res.status(200).json({ success: true, address, error: {} });
            })
            .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({ success: false, address: {}, error: { error: error } });
            });
        }
        else{
            return res.status(404).json({success: false, existingAddress: {}, message: "Invalid User" });
        }
    }

    public cancelOrder = async(req: Request, res: Response): Promise<Response> => {
        if(req.body.user.userTypeId === 2){
            const orderId = req.params.orderId;
            return this.orderService.getOrderById(req.params.orderId)
            .then(async (order) => {
                if(order){
                    const orderObj = {
                        orderId : order.order_Id,
                        userId : order.user_Id,
                        productId : order.product_Id,
                        orderDate : order.orderDate,
                        status : "Order Cancelled"
                    }
                    const updateOrder = await db.Order.update(orderObj, { where: {order_Id:orderId}});
                    if(updateOrder){
                        return res.status(200).json({ success: true, orderObj, message: "Order Cancelled successfully!! Your order amount will be refunded within 7 working days. Thank you"})
                    }
                    else{
                        return res.status(401).json({success: false, existingAddress: {}, message: "Order is not cancelled!!" });
                    }
                }
                else{
                    return res.status(402).json({success: false, existingAddress: {}, message: "Order not found!!" });
                }
            })
        }
        else{
            return res.status(404).json({success: false, existingAddress: {}, message: "Invalid User" });
        }
    }
}