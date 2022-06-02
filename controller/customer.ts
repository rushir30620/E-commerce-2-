import { Request, Response } from "express";
import { Order } from "../models/order";
import { CustomerService } from "../services/customer.service";
import bcrypt from "bcryptjs";
import { Rating } from "../models/rating";
import db from "../models";

export class CustomerController {

    public constructor(private readonly customerService: CustomerService) {
        this.customerService = customerService;
    }

    public getOrders = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            const userId = req.body.user.id;
            return this.customerService.getOrders(userId)
                .then((order: Order[]) => {
                    if (order.length > 0) {
                        return res.status(200).json({ success: true, order, error: {} });
                    }
                    else {
                        return res.status(401).json({ success: false, order: {}, message: "Orders not found" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, order: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, order: {}, message: "Invalid user" });
        }
    }

    public getOrderDetail = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            const orderId = req.params.orderId;
            return this.customerService.getOrderDetail(orderId)
                .then((order) => {
                    if (order) {
                        return this.customerService.getOrderAddress(order.order_Id.toString())
                            .then((address) => {
                                if (address) {
                                    return res.status(200).json({ success: true, order, address, error: {} });
                                }
                                else {
                                    return res.status(401).json({ success: false, address, message: "Address Details not found" });
                                }
                            })
                            .catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({ success: false, address: {}, error: { error: error } });
                            });
                    }
                    else {
                        return res.status(402).json({ success: false, order: {}, message: "Order Details not found" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, order: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, order: {}, message: "Invalid user" });
        }
    }

    public orderHistory = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            const userId = req.body.user.id;
            return this.customerService.orderHistory(userId)
                .then((order) => {
                    if (order.length > 0) {
                        return res.status(200).json({ success: true, order, error: {} });
                    }
                    else {
                        return res.status(401).json({ success: false, order: {}, message: "Order not found" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, order: {}, error: { error: error } });
                })
        }
        else {
            return res.status(404).json({ success: false, order: {}, message: "Invalid user" });
        }
    }

    public getUserDetails = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            return this.customerService.getUserDetails(req.body.user.id)
                .then((user) => {
                    if (user) {
                        return res.status(200).json({ success: true, user, error: {} });
                    }
                    else {
                        return res.status(401).json({ success: false, user: {}, message: "No user found for this id" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, user: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, user: {}, message: "Invalid user" });
        }
    }

    public updateDetails = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            return this.customerService.updateDetails(req.body, req.body.user.id)
                .then((updatedUser) => {
                    if (updatedUser) {
                        return res.status(200).json({ success: true, updatedUser, error: {} });
                    }
                    else {
                        return res.status(401).json({ success: false, updatedUser: {}, message: "Cannot update your details" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, updatedUser: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, updatedUser: {}, message: "Invalid user" });
        }
    }

    public getUserAddressByUserId = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            return this.customerService.getUserAddressByUserId(req.body.user.id)
                .then((userAddress) => {
                    if (userAddress) {
                        return res.status(200).json({ success: true, userAddress, error: {} });
                    }
                    else {
                        return res.status(401).json({ success: false, userAddress: {}, message: "No user address found. Please add your user address" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, userAddress: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, userAddress: {}, message: "Invalid user" });
        }
    }

    public updateUserAddress = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            return this.customerService.updateUserAddress(req.body, req.params.addressId)
                .then((updatedUserAddress) => {
                    if (updatedUserAddress) {
                        return res.status(200).json({ success: true, updatedUserAddress, error: {} });
                    }
                    else {
                        return res.status(401).json({ success: false, updatedUserAddress: {}, message: "Cannot update your address details" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, updatedUserAddress: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, updatedUserAddress: {}, message: "Invalid user" });
        }
    }

    public deleteAddress = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            return this.customerService.deleteAddress(req.params.addressId, req.body.user.id)
                .then((address) => {
                    if (address[0] === 1) {
                        return res.status(200).json({ success: true, address, error: {} });
                    }
                    else {
                        return res.status(401).json({ success: false, address: {}, message: "Address cannot be deleted" });
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, address: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, address: {}, message: "Invalid user" });
        }
    }

    public addNewAddress = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            req.body.user_Id = req.body.user.id;
            req.body.email = req.body.user.email;
            return this.customerService.addNewAddress(req.body)
                .then((address) => {
                    return res.status(200).json({ success: true, address, error: {} });
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, address: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, address: {}, message: "Invalid User" });
        }
    }

    public changePassword = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            return this.customerService.getPassById(req.body.user.id)
                .then(async (user) => {
                    if (!user) {
                        return res.status(400).json({ success: false, user: {}, message: "User password not found" });
                    }
                    const passMatch = await bcrypt.compare(req.body.oldPassword, user.password!);
                    if (!passMatch) {
                        return res.status(401).json({ success: false, user: {}, message: "Incorrect Password" });
                    }
                    else {
                        const newPassword = req.body.newPassword;
                        const cpassword = req.body.cpassword;
                        let userPass = user.password;
                        if (!(newPassword === cpassword)) {
                            return res.status(402).json({ success: false, user: {}, message: "Please enter same password" });
                        }
                        else {
                            userPass = await bcrypt.hash(req.body.newPassword, 10);
                            return this.customerService.changePassword(userPass, req.body.user.id)
                                .then((user) => {
                                    return res.status(200).json({ success: true, user, message: "Password changed successfully" });
                                })
                        }
                    }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, user: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, user: {}, message: "Invalid User" });
        }
    }

    public productRating = async (req: Request, res: Response): Promise<Response> => {
        if (req.body.user.userTypeId === 2) {
            req.body.Ratings = (req.body.OnTimeArrival + req.body.QualityOfProduct) / 2;
            req.body.RatingFrom = req.body.user.id;
            req.body.RatingDate = new Date();
            return this.customerService.getOrderDetail(req.params.orderId)
                .then((order) => {
                    if (order) {
                        req.body.order_Id = req.params.orderId;
                        req.body.RatingTo = order.product_Id;
                    }
                    else {
                        return res.status(400).json({ success: false, order: {}, message: "Order not found" });
                    }
                    return this.customerService.alreadyRatingGivenOrNot(req.params.orderId)
                        .then(async (rating) => {
                            if (rating?.RatingFrom === req.body.user.id && rating?.RatingTo === order.product_Id) {
                                let ratingObj = {
                                    OnTimeArrival: req.body.OnTimeArrival,
                                    QualityOfProduct: req.body.QualityOfProduct,
                                    Ratings: (req.body.OnTimeArrival + req.body.QualityOfProduct) / 2,
                                    RatingsDate: new Date()
                                }
                                const ratingUpdate = await db.Rating.update(ratingObj, { where: { order_Id: req.params.orderId } });
                                if (ratingUpdate) {
                                    return res.status(201).json({ success: true, ratingUpdate, error: {} });
                                }
                                else {
                                    return res.status(401).json({ success: false, ratingUpdate: {}, message: "Rating has been not given" });
                                }
                            }
                            else {
                                return this.customerService.productRating(req.body)
                                    .then((rating: Rating) => {
                                        if (rating) {
                                            return res.status(200).json({ success: true, rating, error: {} });
                                        }
                                        else {
                                            return res.status(402).json({ success: false, rating: {}, message: "Cannot able to give rating!! please try again later" });
                                        }
                                    })
                                    .catch((error: Error) => {
                                        console.log(error);
                                        return res.status(500).json({ success: false, rating: {}, error: { error: error } });
                                    });
                            }
                        })
                        .catch((error: Error) => {
                            console.log(error);
                            return res.status(500).json({ success: false, rating: {}, error: { error: error } });
                        });

                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, rating: {}, error: { error: error } });
                });
        }
        else {
            return res.status(404).json({ success: false, user: {}, message: "Invalid User" });
        }
    }
}