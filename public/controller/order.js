"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
var models_1 = __importDefault(require("../models"));
var OrderController = /** @class */ (function () {
    function OrderController(orderService) {
        var _this = this;
        this.orderService = orderService;
        this.createOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var productsArray_1, convertedDate;
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.id && req.body.user.userTypeId === 2) {
                    productsArray_1 = [];
                    convertedDate = new Date();
                    req.body.orderDate = convertedDate;
                    req.body.user_Id = req.body.user.id;
                    req.body.OrderAddress.email = req.body.user.email;
                    req.body.status = "Order Placed";
                    return [2 /*return*/, this.orderService.getProduct(req.params.prodId)
                            .then(function (product) {
                            req.body.product_Id = product === null || product === void 0 ? void 0 : product.product_Id;
                            req.body.amount = (product === null || product === void 0 ? void 0 : product.price) * req.body.quantity;
                            var prodDetailObj = {
                                newProdId: req.body.product_Id,
                                quant: req.body.quantity,
                                price: product === null || product === void 0 ? void 0 : product.price,
                                title: product === null || product === void 0 ? void 0 : product.title,
                                description: product === null || product === void 0 ? void 0 : product.description,
                            };
                            productsArray_1.push({ prodDetailObj: prodDetailObj });
                            req.body.products = productsArray_1;
                            console.log(req.body.products);
                            return _this.orderService.createOrder(req.body)
                                .then(function (order) {
                                if (order) {
                                    return res.status(200).json({ success: true, order: order, error: {} });
                                }
                                else {
                                    return res.status(402).json({ success: false, order: {}, message: "Order not found..." });
                                }
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(501).json({ success: false, order: {}, error: { error: error } });
                            });
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(501).json({ success: false, order: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.createOrderFromCart = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var ID_1, productsArray_2, convertedDate;
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    ID_1 = req.body.user.id;
                    productsArray_2 = [];
                    convertedDate = new Date();
                    req.body.orderDate = convertedDate;
                    req.body.user_Id = req.body.user.id;
                    req.body.OrderAddress.email = req.body.user.email;
                    req.body.status = "Order Placed";
                    return [2 /*return*/, this.orderService.getProductsFromCart(req.body.user.id)
                            .then(function (products) { return __awaiter(_this, void 0, void 0, function () {
                            var Total, TotalQuant, newProdId, getProducts, product, prod, prodDetailObj;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!products) return [3 /*break*/, 2];
                                        Total = 0;
                                        TotalQuant = 0, newProdId = void 0;
                                        return [4 /*yield*/, models_1.default.Product.findAll()];
                                    case 1:
                                        getProducts = _a.sent();
                                        if (getProducts) {
                                            for (product in getProducts) {
                                                for (prod in products) {
                                                    if (getProducts[product].product_Id === products[prod].product_Id) {
                                                        prodDetailObj = {
                                                            newProdId: products[prod].product_Id,
                                                            quant: products[prod].quantity,
                                                            price: getProducts[product].price,
                                                            title: getProducts[product].title,
                                                            description: getProducts[product].description,
                                                        };
                                                        Total = Total + (products[prod].price);
                                                        TotalQuant = TotalQuant + products[prod].quantity;
                                                        newProdId = products[prod].product_Id,
                                                            productsArray_2.push({ prodDetailObj: prodDetailObj });
                                                    }
                                                }
                                            }
                                        }
                                        console.log(newProdId);
                                        req.body.quantity = TotalQuant;
                                        req.body.amount = Total;
                                        req.body.product_Id = newProdId;
                                        req.body.products = productsArray_2;
                                        return [2 /*return*/, this.orderService.createOrderFromCart(req.body)
                                                .then(function (order) {
                                                if (order) {
                                                    var timer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                                        var removeFromCart;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, models_1.default.Cart.destroy({ where: { user_Id: ID_1 } })];
                                                                case 1:
                                                                    removeFromCart = _a.sent();
                                                                    return [2 /*return*/, removeFromCart];
                                                            }
                                                        });
                                                    }); }, 5000);
                                                    return res.status(200).json({ success: true, order: order, error: {} });
                                                }
                                                else {
                                                    return res.status(401).json({ success: false, order: {}, message: "Order not found..." });
                                                }
                                            })
                                                .catch(function (error) {
                                                console.log(error);
                                                return res.status(501).json({ success: false, order: {}, error: { error: error } });
                                            })];
                                    case 2: return [2 /*return*/, res.status(402).json({ success: false, message: "Products not found" })];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, order: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.orderSummary = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    return [2 /*return*/, this.orderService.orderSummary(req.params.orderId)
                            .then(function (order) {
                            if (order) {
                                return _this.orderService.getOrderAddress(order.order_Id)
                                    .then(function (address) {
                                    return _this.orderService.getProduct(order.product_Id.toString())
                                        .then(function (product) {
                                        return res.status(200).json({ success: true, order: order, address: address, product: product, error: {} });
                                    })
                                        .catch(function (error) {
                                        console.log(error);
                                        return res.status(500).json({ success: false, order: {}, error: { error: error } });
                                    });
                                })
                                    .catch(function (error) {
                                    console.log(error);
                                    return res.status(500).json({ success: false, order: {}, error: { error: error } });
                                });
                            }
                            else {
                                return res.status(402).json({ success: false, order: {}, message: "Order not found..." });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, order: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, order: {}, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.getExistingAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var existingAddress;
            return __generator(this, function (_a) {
                existingAddress = [];
                if (req.body.user.userTypeId === 2) {
                    return [2 /*return*/, this.orderService.getUserWithAddress(req.body.user.id)
                            .then(function (userAddress) {
                            if (userAddress.length > 0) {
                                for (var address in userAddress) {
                                    if (userAddress[address].user_Id === req.body.user.id) {
                                        existingAddress.push(userAddress[address]);
                                    }
                                }
                                if (existingAddress.length > 0) {
                                    return res.status(200).json({ success: true, existingAddress: existingAddress, error: {} });
                                }
                                else {
                                    return res.status(404).json({ success: false, existingAddress: {}, msg: "Address Not Found" });
                                }
                            }
                            else {
                                return res.status(301).json({ success: false, existingAddress: {}, msg: "Address Not Available!! Please add new address" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, existingAddress: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, existingAddress: {}, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.addNewAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    req.body.user_Id = req.body.user.id;
                    req.body.email = req.body.user.email;
                    return [2 /*return*/, this.orderService.addNewAddress(req.body)
                            .then(function (address) {
                            return res.status(200).json({ success: true, address: address, error: {} });
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, address: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, existingAddress: {}, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.cancelOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var orderId_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    orderId_1 = req.params.orderId;
                    return [2 /*return*/, this.orderService.getOrderById(req.params.orderId)
                            .then(function (order) { return __awaiter(_this, void 0, void 0, function () {
                            var orderObj, updateOrder;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!order) return [3 /*break*/, 2];
                                        orderObj = {
                                            orderId: order.order_Id,
                                            userId: order.user_Id,
                                            productId: order.product_Id,
                                            orderDate: order.orderDate,
                                            status: "Order Cancelled"
                                        };
                                        return [4 /*yield*/, models_1.default.Order.update(orderObj, { where: { order_Id: orderId_1 } })];
                                    case 1:
                                        updateOrder = _a.sent();
                                        if (updateOrder) {
                                            return [2 /*return*/, res.status(200).json({ success: true, orderObj: orderObj, message: "Order Cancelled successfully!! Your order amount will be refunded within 7 working days. Thank you" })];
                                        }
                                        else {
                                            return [2 /*return*/, res.status(401).json({ success: false, existingAddress: {}, message: "Order is not cancelled!!" })];
                                        }
                                        return [3 /*break*/, 3];
                                    case 2: return [2 /*return*/, res.status(402).json({ success: false, existingAddress: {}, message: "Order not found!!" })];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, existingAddress: {}, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.orderService = orderService;
    }
    return OrderController;
}());
exports.OrderController = OrderController;
//# sourceMappingURL=order.js.map