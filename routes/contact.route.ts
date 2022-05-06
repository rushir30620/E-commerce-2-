import express from "express";
import { celebrate } from "celebrate";
import { ContactUserService } from "../services/contact.service";
import { ContactUserController } from "../controller/contact";
import { ContactUserSchema } from "../Validation/contact.validation";

const { get, add } = ContactUserSchema;
const router: express.Router = express.Router();

const service: ContactUserService = new ContactUserService();
const controller: ContactUserController = new ContactUserController(service);

router.post('/contactUser', celebrate(add), controller.createContactUser);
router.get('/allContactUser', controller.getAllContactUsers);
router.get('/getContactUser/:id', celebrate(get), controller.getContactUserById);

export = router;