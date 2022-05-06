"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var contact_service_1 = require("../services/contact.service");
var contact_1 = require("../controller/contact");
var contact_validation_1 = require("../Validation/contact.validation");
var get = contact_validation_1.ContactUserSchema.get, add = contact_validation_1.ContactUserSchema.add;
var router = express_1.default.Router();
var service = new contact_service_1.ContactUserService();
var controller = new contact_1.ContactUserController(service);
router.post('/contactUser', (0, celebrate_1.celebrate)(add), controller.createContactUser);
router.get('/allContactUser', controller.getAllContactUsers);
router.get('/getContactUser/:id', (0, celebrate_1.celebrate)(get), controller.getContactUserById);
module.exports = router;
