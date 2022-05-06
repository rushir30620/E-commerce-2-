import { User } from "../models/user";
import { Request, Response, NextFunction } from "express";
import { UserLoginService } from "../services/user.service";
import { db } from "../models/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
require('dotenv').config();

const userTypeID: number = 1;

const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});

export class UserController {

    public constructor(private readonly userLoginService: UserLoginService) {
        this.userLoginService = userLoginService;
    };

    public createUser = async (req: Request, res: Response): Promise<Response> => {
        req.body.userTypeId = userTypeID;
        req.body.isRegisteredUser = false;
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (!(password === cpassword)) {
            return res.status(401).json({ success: false, user: {}, error: { error: 'Please enter same password..' } });
        }
        else {
            const exist = await db.User.findOne({ where: { email: req.body.email } });
            if (exist) {
                return res.status(402).json({ success: false, user: {}, error: { error: 'Email already in use..' } });
            }
            req.body.password = await bcrypt.hash(password, 10);
            return this.userLoginService.createUser(req.body)
                .then((user: User) => {
                    const token = jwt.sign({ user }, process.env.JWT_KEY!);
                    const mailOptions = {
                        from: process.env.USER,
                        to: req.body.email,
                        subject: "Account Verification",
                        html: `<h4>Kindly click on the below given link to activate your account</h2>
                                <p>${process.env.URL}/verify/user/${token}`
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            // res.status(404).json({
                            //     error: error,
                            //     message: "Email cannot be sent.."
                            // });
                        }
                        else {
                            if (info.response.includes("OK")) {
                                console.log("email sent");
                            //    return res.status(200).json({
                            //         msg: "Email sent successfully !"
                            //     });
                            }
                        }
                    });
                    return res.status(200).json({ success: true, user, error: {} });
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ success: false, user: {}, error: { error: error } });
                });
        }
    };

    public verifyEmail = async(req: Request, res: Response): Promise<Response | undefined> => {
        const {token} = req.params;
        if(token){
            jwt.verify(token, process.env.JWT_KEY!,async(error:any,decodedToken:any) => {
                if(error){
                    return res.status(400).json({ success: false, user: {}, error: { error: 'Incorrect Link' } })
                }
                const {user} = decodedToken;
                if(user){
                    user.isRegisteredUser = true;
                    const userUpdate = await db.User.update(user, {where: {email:user.email}});
                    if(userUpdate){
                        return res.status(200).json({ success: true, user, error: {} });
                    }
                    else{
                        return res.status(500).json({ success: false, user: {}, error: { error: error } })
                    }
                }
            })
        }
        else{
            return res.status(404).json({ success: false, user: {}, error: { error: "Something went wrong!!" } })
        }
    };

    public loginUser = async(req: Request, res: Response): Promise<Response> => {
        return this.userLoginService.loginUser(req.body.email)
        .then(async(user: User | null) => {
            if(user === null){
                return res.status(403).json({ success: false, user: {}, error: { error: "Invalid Email or Password" } })
            }
            else{
                const isUserRegister = user.isRegisteredUser;
                if(isUserRegister){
                    const passwordMatch = await bcrypt.compare(req.body.password, user.password!);
                    if(passwordMatch){
                        const userObj = {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            mobile: user.mobile,
                            userTypeId: user.userTypeId,
                            zipCode: user.zipCode,
                        };
                        const token = jwt.sign(userObj, process.env.JWT_KEY!);
                        return res.status(200)
                        .cookie("token", token, {httpOnly: true, expires:new Date(Date.now()+600000) })
                        .json({ message: "User login successful "});
                    }
                    return res.status(401).json({ success: false, user: {}, error: { error: "Invalid Email or Password" } });
                }
                return res.status(402).json({ success: false, user: {}, error: { error: "Please active your account through your email" } })
            }
        })
        .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ success: false, user: {}, error: { error: error } });
        })
    };

    public validateTokenMiddleware = async (req: Request, res: Response, next: NextFunction) :Promise<Response|undefined>=> {
        // const authHeader = req.get("authorization");
        const token = req.headers.authorization || req.header('auth') ;
    
        if (token == null) {
          return res.status(401).json({ message: "Invalid login credentials" });
        }
        jwt.verify(token, process.env.JWT_KEY!, (err, user:any) => {
          if (err) {
            return res.status(403).json({message:'Invalid login credentials'});
          } else {
            //   console.log(user);
              req.body.user = user;
            return this.userLoginService.loginUser(user.email)
            .then(user => {
              if(user === null){
                return res.status(401).json({message:'user not found'});
              }else{
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


    public deleteToken = (req: Request, res: Response) => {
        try {
          res.clearCookie('token');
          return res.status(200).json({message:'User Logout successfully'})
        } 
        catch (error) {
          return res.status(401).json({message:'cannot logout'});
        }
    };
}