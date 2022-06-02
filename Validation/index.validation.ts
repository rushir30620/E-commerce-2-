// contact validation //
import { ContactUserSchema } from "./contact.validation";
const { getContactId, addContact } = ContactUserSchema;

// user validation //
import { UserSchema } from "./user.validation";
const { add, addLogin, addForgotPass, addNewPassword } = UserSchema;

// product validation //
import { ProductSchema } from "./product.validation";
const { getProductId, addProduct } = ProductSchema;

// order validation //
import { OrderSchema } from "./order.validation";
const { getOrderId, order, userAddress } = OrderSchema;

// cart validation //
import { CartSchema } from "./cart.validation";
const { get, addCart } = CartSchema;

export class IndexValidation {
    contactValidation = { getContactId, addContact };
    userValidation = { add, addLogin, addForgotPass, addNewPassword };
    productValidation = { getProductId, addProduct };
    orderValidation = { getOrderId, order, userAddress };
    cartValidation = { get, addCart };
}
