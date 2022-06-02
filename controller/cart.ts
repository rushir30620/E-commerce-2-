import { Cart } from "../models/cart";
import { Request, Response } from "express";
import { CartService } from "../services/cart.service";
import { Product } from "../models/product";
import db from "../models";


export class CartController {
    public constructor(private readonly cartService: CartService) {
        this.cartService = cartService;
    }

    public addToCart = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            return this.cartService.getUserById(req.body.user.id)
                .then((user) => {
                    req.body.user_Id = req.body.user.id;
                    req.body.userName = user?.firstName! + " " + user?.lastName
                    return this.cartService.getProduct(req.params.prodId)
                        .then((product) => {
                            let prodId = product?.product_Id;
                            return this.cartService.getCartById(req.params.prodId)
                                .then(async (cart_prod) => {
                                    let cart_quant = cart_prod?.quantity;
                                    let cart_price = cart_prod?.price;
                                    if (cart_prod?.product_Id === product?.product_Id) {
                                        cart_quant += req.body.quantity;
                                        cart_price! += (product?.price! * req.body.quantity);
                                        let cartObj = {
                                            cart_Id: cart_prod?.cart_Id,
                                            user_Id: cart_prod?.user_Id,
                                            userName: cart_prod?.userName,
                                            product_Id: cart_prod?.product_Id,
                                            quantity: cart_quant,
                                            price: cart_price
                                        }
                                        const updateCart = await db.Cart.update(cartObj, { where: { product_Id: prodId } });
                                        if (updateCart) {
                                            return res.status(200).json({ success: true, cartObj, error: {} });
                                        }
                                        else {
                                            return res.status(200).json({ success: true, cartObj: {}, message: "Product is not added" });
                                        }
                                    }
                                    else {
                                        req.body.product_Id = product?.product_Id;
                                        req.body.price = product?.price! * req.body.quantity;
                                        return this.cartService.addToCart(req.body)
                                            .then((cart: Cart) => {
                                                return res.status(200).json({ success: true, cart, error: {} });
                                            })
                                            .catch((error: Error) => {
                                                console.log(error);
                                                return res.status(500).json({ success: false, cart: {}, error: { error: error } });
                                            });
                                    }
                                })
                                .catch((error: Error) => {
                                    console.log(error);
                                    return res.status(501).json({ success: false, cart: {}, error: { error: error } });
                                });
                        })
                        .catch((error: Error) => {
                            console.log(error);
                            return res.status(501).json({ success: false, cart: {}, error: { error: error } });
                        });
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(501).json({ success: false, cart: {}, error: { error: error } });
                });
        }
        else {
            return res.status(402).json({ success: false, product: {}, message: "User not found..." });
        }

    }

    public getAllCarts = async (req: Request, res: Response): Promise<Response> => {
        return this.cartService.getAllCart()
            .then((cart: Cart[]) => {
                if (cart) {
                    let Total = 0;
                    for (let i = 0; i < cart.length; i++) {
                        Total = Total + cart[i].price;
                    }
                    return res.status(200).json({ success: true, cart, Total, error: {} });
                }
                else {
                    return res.status(404).json({ success: false, cart: {}, error: { error: 'Nothing in cart' } });
                }
            })
            .catch((error: Error) => {
                return res.status(500).json({ success: false, cart: {}, error: { error: error } });
            });
    };

    // public getCartById = async (req: Request, res: Response): Promise<Response> => {
    //     return this.cartService.getCartById(req.params.prodId)
    //         .then((cart) => {
    //             if (cart) {
    //                 return res.status(200).json({ success: true, cart, error: {} });
    //             }
    //             return res.status(404).json({ success: false, cart: {}, error: { error: 'Nothing in cart' } });
    //         })
    //         .catch((error: Error) => {
    //             return res.status(500).json({ success: false, cart: {}, error: { error: error } });
    //         });
    // }

    public removeFromCart = async (req: Request, res: Response): Promise<Response> => {
        return this.cartService
            .removeFromCart(req.params.cartId)
            .then((cart) => {
                if (cart > 0) {
                    return res.status(200).json({ success: true, cart, error: {} });
                }
                return res.status(404).json({ success: false, cart: {}, error: { error: 'Not Deleted' } });
            })
            .catch((error: Error) => {
                return res.status(500).json({ success: false, cart: {}, error: { error: error } });
            });
    };
}