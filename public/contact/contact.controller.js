"use strict";
// import { Contact } from "../models/contact";
// import { Request, Response } from "express";
// import { ContactUserService } from "./contact.service";
// export class ContactUserController{
//     public constructor(private readonly contactUserService: ContactUserService){
//         this.contactUserService = contactUserService;
//     };
//     public createContactUser = async(req: Request, res: Response): Promise<Response> => {
//         return this.contactUserService.createContactUser(req.body)
//         .then((contactUser: Contact) => {
//             return res.status(200).json({success: true, contactUser, error: {}});
//         })
//         .catch((error: Error) => {
//             console.log(error);
//             return res.status(500).json({success: false, contactUser: {}, error: { error:error }});
//         });
//     };
//     public getAllContactUsers = async(req: Request, res: Response): Promise<Response> => {
//         return this.contactUserService.getAllContactUsers()
//         .then((contactUser: Contact[]) => {
//             if(contactUser){
//                 return res.status(200).json({success: true, contactUser, error: {}});
//             }
//             return res.status(404).json({success: false, contactUser: {}, error: {error: 'No Contact User'}});
//         })
//         .catch((error: Error) => {
//             return res.status(500).json({success: false, contactUser: {}, error: { error:error }});
//         });
//     };
//     public getContactUserById = async (req: Request, res: Response): Promise<Response> => {
//         return this.contactUserService
//             .getContactUserById(+req.params.id)
//             .then((contactUser) => {
//                 if(contactUser){
//                     return res.status(200).json({success: true, contactUser, error: {}});
//                 }
//                 return res.status(404).json({success: false, contactUser: {}, error: {error: 'No Contact User'}});
//             })
//             .catch((error: Error) => {
//                 return res.status(500).json({success: false, contactUser: {}, error: { error:error }});
//             });
//     };
// }
