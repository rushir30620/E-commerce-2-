import express from "express";
import { celebrate } from "celebrate";
import { IndexController } from "../controller";
import { IndexValidation } from "../Validation/index.validation";
import { ContactUserSchema } from "../Validation/contact.validation";

const { getContactId, addContact } = ContactUserSchema;
const router: express.Router = express.Router();

const indexController: IndexController = new IndexController();
const contactController = indexController.ContactUserController;

router.post('/contactUser', celebrate(addContact), contactController.createContactUser);
router.get('/allContactUser', contactController.getAllContactUsers);
router.get('/getContactUser/:id', celebrate(getContactId), contactController.getContactUserById);

export = router;