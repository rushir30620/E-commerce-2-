import { Cart } from "../models/cart";
import { CartService } from "../services/cart.service";
import { Request, Response } from "express";

export class CartController{
    public constructor(private readonly cartService: CartService){
        this.cartService = cartService;
    }

    public addToCart = async(req:Request, res: Response): Promise<Response> => {
        return this.cartService.addToCart(req.body)
            .then((cart: Cart) => {
                return res.status(200).json({ success: true, cart, error: {} });
            })
            .catch((error: Error) => {
                console.log(error);
                return res.status(500).json({ success: false, cart: {}, error: { error: error } });
            });
    }

    public getAllContactUsers = async (req: Request, res: Response): Promise<Response> => {
        return this.cartService.getAllCart()
            .then((cart: Cart[]) => {
                if (cart) {
                    return res.status(200).json({ success: true, cart, error: {} });
                }
                return res.status(404).json({ success: false, cart: {}, error: { error: 'Nothing in cart' } });
            })
            .catch((error: Error) => {
                return res.status(500).json({ success: false, cart: {}, error: { error: error } });
            });
    };

    public getContactUserById = async (req: Request, res: Response): Promise<Response> => {
        return this.cartService.getCartById(+req.params.id)
            .then((cart) => {
                if (cart) {
                    return res.status(200).json({ success: true, cart, error: {} });
                }
                return res.status(404).json({ success: false, cart: {}, error: { error: 'Nothing in cart' } });
            })
            .catch((error: Error) => {
                return res.status(500).json({ success: false, cart: {}, error: { error: error } });
            });
    }

    public deleteCart = async (req: Request, res: Response): Promise<Response> => {
        return this.cartService
          .deleteCart(+req.params.id)
          .then((cart) => {
            if (cart > 0) {
              return res.status(200).json({ success: true, cart, error: {} });
            }
            return res.status(404).json({ success: false, cart: {}, error: { error: 'Not Deleted' }});
          })
          .catch((error: Error) => {
            return res.status(500).json({ success: false, cart: {}, error: { error: error } });
          });
      };
}