import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { UserLoginService } from "../services/user.service";
import jwt from "jsonwebtoken";
require('dotenv').config();

export class AuthMiddleware {

    public constructor(private readonly userLoginService: UserLoginService) {
        this.userLoginService = userLoginService;
    };

    public validateTokenMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
        // const authHeader = req.get("authorization");
        const token = req.headers.authorization || req.header('auth');

        if (token == null) {
            return res.status(401).json({ message: "Invalid login credentials" });
        }
        jwt.verify(token, process.env.JWT_KEY!, (err, user: any) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid login credentials' });
            } else {
                //   console.log(user);
                req.body.user = user;
                return this.userLoginService.loginUser(user.email)
                    .then(user => {
                        if (user === null) {
                            return res.status(401).json({ message: 'user not found' });
                        } else {
                            next();
                        }
                    })
                    .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({
                            error: error,
                        });
                    });

            }
        });
    };
};