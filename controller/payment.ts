import { Request, Response } from "express";
import db from "../models";
import { PaymentService } from "../services/payment.service";

require('dotenv').config();
const stripe = require('stripe')(process.env.SECRET_KEY);

export class PaymentController {

    public constructor(private readonly paymentService: PaymentService) {
        this.paymentService = paymentService;
    }

    public makePayment = async (req: Request, res: Response): Promise<Response> => {
        let productList : any = [];
        let products: any = [];
        return this.paymentService.getOrder(req.params.orderId)
            .then(async (order) => {
                if (order) {
                    productList = order.products;
                    let status = order.paymentStatus;
                    status = "Done";
                    const result = await db.Order.update({status}, { where: {order_Id:req.params.orderId}})
                    for(let prod in productList){
                        products.push(JSON.parse(productList[prod]));
                    }
                    return stripe.checkout.sessions.create({
                        payment_method_types: ['card'],
                        line_items: products.map((p: { title: any; description: any; price: number; quant: number; }) => {
                            return {
                                name: p.title,
                                description: p.description,
                                amount: p.price * 100,
                                currency: 'inr',
                                quantity: p.quant
                            };
                        }),
                        success_url: req.protocol + '://' + req.get('host') + '/paymentDone', // => http://localhost:3000
                        cancel_url: req.protocol + '://' + req.get('host') + '/cancel'
                    })
                    .then((session: { id: any; }) => {
                        res.render('checkout', {
                            path: '/checkout',
                            sessionId: session.id
                        });
                    })
                    .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ success: false, product: {}, error: { error: error } });
                    });
                }
                else {
                    console.log("No order found");
                    return res.status(500).json({ success: false, product: {}, message: "Nothing in cart" });
                }
            })
            .catch ((error: Error) => {
                console.log(error);
                return res.status(500).json({ success: false, product: {}, error: { error: error } });
            });
    }

    public paymentSuccess = async (req: Request, res: Response) => {
        res.render('paymentSuccess', {
            path: 'paymentDone'
        });
    };
}
