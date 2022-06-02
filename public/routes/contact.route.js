"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var controller_1 = require("../controller");
var contact_validation_1 = require("../Validation/contact.validation");
var getContactId = contact_validation_1.ContactUserSchema.getContactId, addContact = contact_validation_1.ContactUserSchema.addContact;
var router = express_1.default.Router();
var indexController = new controller_1.IndexController();
var contactController = indexController.ContactUserController;
router.post('/contactUser', (0, celebrate_1.celebrate)(addContact), contactController.createContactUser);
router.get('/allContactUser', contactController.getAllContactUsers);
router.get('/getContactUser/:id', (0, celebrate_1.celebrate)(getContactId), contactController.getContactUserById);
module.exports = router;
//# sourceMappingURL=contact.route.js.map