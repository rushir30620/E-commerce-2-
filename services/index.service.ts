import { ContactUserService } from "./contact.service";
import { UserLoginService } from "./user.service";
import { ProductService } from "./product.service";
import { CartService } from "./cart.service";
import { OrderService } from "./order.service";
import { PaymentService } from "./payment.service";
import { CustomerService } from "./customer.service";
import { AdminService } from "./admin.service";

export class IndexService {
    ContactUserService = new ContactUserService();
    UserLoginService = new UserLoginService();
    ProductService = new ProductService();
    CartService = new CartService();
    OrderService = new OrderService();
    PaymentService = new PaymentService();
    CustomerService = new CustomerService();
    AdminService = new AdminService();
}