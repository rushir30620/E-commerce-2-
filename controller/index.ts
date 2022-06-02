import { ContactUserController } from "./contact";
import { UserController } from "./user.login";
import { ProductController } from "./product";
import { CartController } from "./cart";
import { OrderController } from "./order";
import { PaymentController } from "./payment";
import { CustomerController } from "./customer";
import { AdminController } from "./admin";

import { IndexService } from "../services/index.service";

export class IndexController {
    service: IndexService = new IndexService();

    ContactUserController = new ContactUserController(this.service.ContactUserService);
    UserController = new UserController(this.service.UserLoginService)
    ProductController = new ProductController(this.service.ProductService)
    CartController = new CartController(this.service.CartService)
    OrderController = new OrderController(this.service.OrderService)
    PaymentController = new PaymentController(this.service.PaymentService)
    CustomerController = new CustomerController(this.service.CustomerService)
    AdminController = new AdminController(this.service.AdminService);
}