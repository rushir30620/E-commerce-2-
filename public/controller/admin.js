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
exports.AdminController = void 0;
var models_1 = __importDefault(require("../models"));
var moment_1 = __importDefault(require("moment"));
var nodemailer_1 = __importDefault(require("nodemailer"));
require('dotenv').config();
var transporter = nodemailer_1.default.createTransport({
    service: process.env.SERVICE,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
});
var AdminController = /** @class */ (function () {
    function AdminController(adminService) {
        var _this = this;
        this.adminService = adminService;
        this.getAllOrderRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 1) {
                    return [2 /*return*/, this.displayData()
                            .then(function (orders) {
                            if (orders) {
                                return res.status(200).json({ success: true, orders: orders, error: {} });
                            }
                            else {
                                return res.status(400).json({ success: false, orders: {}, message: "Orders not available" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, orders: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, user: {}, message: " Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.acceptOrderRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 1) {
                    return [2 /*return*/, this.adminService.getOrderById(req.params.orderId)
                            .then(function (order) { return __awaiter(_this, void 0, void 0, function () {
                            var date, time, newDate, orderObj, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!order) return [3 /*break*/, 4];
                                        if (!(order.status === "Order Placed")) return [3 /*break*/, 2];
                                        date = req.body.orderDeliveryDate;
                                        time = req.body.orderDeliveryTime;
                                        newDate = (0, moment_1.default)("".concat(date, " ").concat(time), 'YYYY-MM-DD HH:mm:ss').format();
                                        console.log(newDate);
                                        orderObj = {
                                            orderId: order.order_Id,
                                            amount: order.amount,
                                            quantity: order.quantity,
                                            orderDate: order.orderDate,
                                            orderAcceptedDate: new Date(),
                                            status: "Order Accepted",
                                            orderDeliveryDate: newDate
                                        };
                                        return [4 /*yield*/, models_1.default.Order.update(orderObj, { where: { order_Id: req.params.orderId } })];
                                    case 1:
                                        result = _a.sent();
                                        if (result) {
                                            return [2 /*return*/, res.status(200).json({ success: true, orderObj: orderObj, error: {} })];
                                        }
                                        else {
                                            return [2 /*return*/, res.status(400).json({ success: false, orderObj: {}, message: "Error!! Please try again later" })];
                                        }
                                        return [3 /*break*/, 3];
                                    case 2: return [2 /*return*/, res.status(401).json({ success: false, order: {}, message: "Order already accepted or cancelled or completed" })];
                                    case 3: return [3 /*break*/, 5];
                                    case 4: return [2 /*return*/, res.status(404).json({ msg: "Order not available or order not found" })];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, orders: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, user: {}, message: " Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.rescheduleOrderDate = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var orderId, isAvailable, orderDeliveryDate, currentDate;
            var _this = this;
            return __generator(this, function (_a) {
                orderId = req.params.orderId;
                isAvailable = false;
                orderDeliveryDate = new Date(req.body.orderDeliveryDate);
                currentDate = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
                if (orderDeliveryDate > currentDate) {
                    isAvailable = true;
                }
                else {
                    isAvailable = false;
                }
                if (isAvailable) {
                    if (req.body.user.userTypeId === 1) {
                        return [2 /*return*/, this.adminService.getOrderById(orderId)
                                .then(function (order) {
                                if (order && order.status === "Order Accepted") {
                                    var reason_1 = req.body.reason;
                                    var date_1 = req.body.orderDeliveryDate;
                                    var time_1 = req.body.orderDeliveryTime;
                                    var newDate = (0, moment_1.default)("".concat(date_1, " ").concat(time_1), 'YYYY-MM-DD HH:mm:ss').format();
                                    return _this.adminService.rescheduleOrderDate(new Date(newDate), orderId)
                                        .then(function (rescheduleOrder) {
                                        if (rescheduleOrder.length > 0) {
                                            return _this.adminService.getUserById(order.user_Id)
                                                .then(function (user) {
                                                var mailOptions = {
                                                    from: process.env.USER,
                                                    to: user === null || user === void 0 ? void 0 : user.email,
                                                    subject: "Your order delivery date is rescheduled",
                                                    html: "<h2>Your order delivery date changed or rescheduled due to ".concat(reason_1, ". New Date: ").concat(date_1, " and New Time: ").concat(time_1, "</h2>")
                                                };
                                                transporter.sendMail(mailOptions, function (error, info) {
                                                    if (error) {
                                                        console.log(error);
                                                    }
                                                    else {
                                                        if (info.response.includes("OK")) {
                                                            console.log("email sent");
                                                        }
                                                    }
                                                });
                                                return res.status(200).json({ success: true, rescheduleOrder: rescheduleOrder, message: "Order date rescheduled successfully" });
                                            })
                                                .catch(function (error) {
                                                console.log(error);
                                                return res.status(500).json({ success: false, user: {}, error: { error: error } });
                                            });
                                        }
                                        else {
                                            return res.status(400).json({ success: false, rescheduleOrder: {}, message: "Cannot update order. Please try again later..." });
                                        }
                                    })
                                        .catch(function (error) {
                                        console.log(error);
                                        return res.status(500).json({ success: false, rescheduleOrder: {}, error: { error: error } });
                                    });
                                }
                                else {
                                    return res.status(401).json({ success: false, order: {}, message: "Order not accepted. Please accept this order first.." });
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
                }
                else {
                    return [2 /*return*/, res.status(402).json({ success: false, isAvailable: {}, message: "Order already delivered or cancelled.." })];
                }
                return [2 /*return*/];
            });
        }); };
        this.cancelOrder = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var orderId_1;
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 1) {
                    orderId_1 = req.params.orderId;
                    return [2 /*return*/, this.adminService.getOrderById(req.params.orderId)
                            .then(function (order) { return __awaiter(_this, void 0, void 0, function () {
                            var orderObj_1, updateOrder, reason_2, amount_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!order) return [3 /*break*/, 2];
                                        orderObj_1 = {
                                            orderId: order.order_Id,
                                            userId: order.user_Id,
                                            productId: order.product_Id,
                                            orderDate: order.orderDate,
                                            status: "Order Cancelled"
                                        };
                                        return [4 /*yield*/, models_1.default.Order.update(orderObj_1, { where: { order_Id: orderId_1 } })];
                                    case 1:
                                        updateOrder = _a.sent();
                                        if (updateOrder) {
                                            reason_2 = req.body.reason;
                                            amount_1 = order.amount;
                                            return [2 /*return*/, this.adminService.getUserById(order.user_Id)
                                                    .then(function (user) {
                                                    var mailOptions = {
                                                        from: process.env.USER,
                                                        to: user === null || user === void 0 ? void 0 : user.email,
                                                        subject: "Your order has been cancelled",
                                                        html: "<h2>Your order has been cancelled due to ".concat(reason_2, ". Your order amount ").concat(amount_1, " will be refunded within 7 working days. Thank you for your order.</h2>")
                                                    };
                                                    transporter.sendMail(mailOptions, function (error, info) {
                                                        if (error) {
                                                            console.log(error);
                                                        }
                                                        else {
                                                            if (info.response.includes("OK")) {
                                                                console.log("email sent");
                                                            }
                                                        }
                                                    });
                                                    return res.status(200).json({ success: true, orderObj: orderObj_1, message: "Order Cancelled successfully!! Your order amount will be refunded within 7 working days. Thank you" });
                                                })
                                                    .catch(function (error) {
                                                    console.log(error);
                                                    return res.status(500).json({ success: false, user: {}, error: { error: error } });
                                                })];
                                        }
                                        else {
                                            return [2 /*return*/, res.status(401).json({ success: false, updateOrder: {}, message: "Order is not cancelled!!" })];
                                        }
                                        return [3 /*break*/, 3];
                                    case 2: return [2 /*return*/, res.status(402).json({ success: false, order: {}, message: "Order not found!!" })];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, order: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, user: {}, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.filters = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var filters;
            var _this = this;
            return __generator(this, function (_a) {
                filters = req.body;
                if (req.body.user.userTypeId === 1) {
                    return [2 /*return*/, this.displayData()
                            .then(function (orderdata) { return __awaiter(_this, void 0, void 0, function () {
                            var filterArray;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!orderdata) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.allFilters(orderdata, filters)];
                                    case 1:
                                        filterArray = _a.sent();
                                        if (filterArray.length > 0) {
                                            return [2 /*return*/, res.status(200).json({ success: true, filterArray: filterArray, error: {} })];
                                        }
                                        else {
                                            return [2 /*return*/, res.status(400).json({ success: false, filterArray: {}, message: "Data not found" })];
                                        }
                                        return [3 /*break*/, 3];
                                    case 2: return [2 /*return*/, res.status(400).json({ success: false, filterArray: {}, message: "Data not found" })];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, orderdata: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, user: {}, message: "Invalid user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.displayData = function () { return __awaiter(_this, void 0, void 0, function () {
            var orderDetails, allOrders, _a, _b, _i, order, user, product, address, date, newDate, time;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        orderDetails = [];
                        return [4 /*yield*/, this.adminService.getAllOrderRequest()];
                    case 1:
                        allOrders = _c.sent();
                        _a = [];
                        for (_b in allOrders)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        order = _a[_i];
                        return [4 /*yield*/, this.adminService.getUserById(allOrders[order].user_Id)];
                    case 3:
                        user = _c.sent();
                        return [4 /*yield*/, this.adminService.getProductById(allOrders[order].product_Id)];
                    case 4:
                        product = _c.sent();
                        return [4 /*yield*/, this.adminService.getOrderAddress(allOrders[order].order_Id)];
                    case 5:
                        address = _c.sent();
                        date = allOrders[order].orderDate;
                        newDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
                        time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                        if (user && product && address) {
                            orderDetails.push({
                                OrderId: allOrders[order].order_Id,
                                Quantity: allOrders[order].quantity,
                                Amount: allOrders[order].amount,
                                OrderStatus: allOrders[order].status,
                                OrderDate: newDate,
                                OrderTime: time,
                                ProductDetails: {
                                    ProductName: product.title,
                                    Description: product.description,
                                    ProductColor: product.color,
                                    ProductSize: product.size
                                },
                                CustomerDetails: {
                                    Name: user.firstName + " " + user.lastName,
                                    Mobile: user.mobile,
                                    Email: user.email
                                },
                                OrderAddress: {
                                    Street: address.addressLine1,
                                    HouseNumber: address.addressLine2,
                                    City: address.city + "," + address.state,
                                    PostalCode: address.postalCode
                                },
                                PaymentStatus: allOrders[order].paymentStatus
                            });
                        }
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: 
                    // console.log(orderDetails);
                    return [2 /*return*/, orderDetails];
                }
            });
        }); };
        this.allFilters = function (orderdata, filters) { return __awaiter(_this, void 0, void 0, function () {
            var data;
            return __generator(this, function (_a) {
                if (filters.Email) {
                    data = orderdata.filter(function (item) {
                        return item.CustomerDetails.Email === filters.Email; //         return item.CustomerDetails.Email === user.email                                                                                                   //     });                                                                                      // }
                    });
                }
                if (filters.Name) {
                    if (data) {
                        data = data.filter(function (item) {
                            return item.CustomerDetails.Name === filters.Name;
                        });
                    }
                    else {
                        data = orderdata.filter(function (item) {
                            return item.CustomerDetails.Name === filters.Name;
                        });
                    }
                }
                if (filters.Mobile) {
                    if (data) {
                        data = data.filter(function (item) {
                            return item.CustomerDetails.Mobile === filters.Mobile;
                        });
                    }
                    else {
                        data = orderdata.filter(function (item) {
                            return item.CustomerDetails.Mobile === filters.Mobile;
                        });
                    }
                }
                if (filters.ProductName) {
                    if (data) {
                        data = data.filter(function (item) {
                            return item.ProductDetails.ProductName === filters.ProductName;
                        });
                    }
                    else {
                        data = orderdata.filter(function (item) {
                            return item.ProductDetails.ProductName === filters.ProductName;
                        });
                    }
                }
                if (filters.ProductColor) {
                    if (data) {
                        data = data.filter(function (item) {
                            return item.ProductDetails.ProductColor === filters.ProductColor;
                        });
                    }
                    else {
                        data = orderdata.filter(function (item) {
                            return item.ProductDetails.ProductColor === filters.ProductColor;
                        });
                    }
                }
                if (filters.ProductSize) {
                    if (data) {
                        data = data.filter(function (item) {
                            return item.ProductDetails.ProductSize === filters.ProductSize;
                        });
                    }
                    else {
                        data = orderdata.filter(function (item) {
                            return item.ProductDetails.ProductSize === filters.ProductSize;
                        });
                    }
                }
                if (filters.OrderStatus) {
                    if (data) {
                        data = data.filter(function (item) {
                            return item.OrderStatus === filters.OrderStatus;
                        });
                    }
                    else {
                        data = orderdata.filter(function (item) {
                            return item.OrderStatus === filters.OrderStatus;
                        });
                    }
                }
                if (filters.OrderDate) {
                    if (data) {
                        data = data.filter(function (item) {
                            return item.OrderDate === filters.OrderDate;
                        });
                    }
                    else {
                        data = orderdata.filter(function (item) {
                            return item.OrderDate === filters.OrderDate;
                        });
                    }
                }
                if (filters.PaymentStatus) {
                    if (data) {
                        data = data.filter(function (item) {
                            return item.PaymentStatus === filters.PaymentStatus;
                        });
                    }
                    else {
                        data = orderdata.filter(function (item) {
                            return item.PaymentStatus === filters.PaymentStatus;
                        });
                    }
                }
                return [2 /*return*/, data];
            });
        }); };
        this.refundAmount = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var RefundArray, orderId, inValid, flag;
            var _this = this;
            return __generator(this, function (_a) {
                RefundArray = [];
                orderId = req.params.orderId;
                if (req.body.user.id && req.body.user.userTypeId === 1) {
                    return [2 /*return*/, this.adminService.getOrderById(orderId)
                            .then(function (order) { return __awaiter(_this, void 0, void 0, function () {
                            var refund, refundObj, result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!order) return [3 /*break*/, 4];
                                        req.body.amount = order.amount;
                                        req.body.InBalanceAmount = order.amount - order.refundedAmount;
                                        if (order.refundedAmount === null) {
                                            order.refundedAmount = 0;
                                        }
                                        RefundArray.push(req.body.amount);
                                        for (refund in RefundArray) {
                                            if (req.body.Amount && req.body.Mode && order.status != "Order Placed" && order.paymentStatus === "Done") {
                                                if (req.body.Mode === "Fixed") {
                                                    req.body.calculate = req.body.Amount;
                                                    order.refundedAmount = +order.refundedAmount + req.body.calculate;
                                                    req.body.InBalanceAmount = req.body.amount - order.refundedAmount;
                                                    RefundArray.push(req.body.InBalanceAmount);
                                                }
                                                else if (req.body.Mode === "Percentage") {
                                                    req.body.calculate = (req.body.InBalanceAmount * req.body.Amount) / 100;
                                                    order.refundedAmount = req.body.calculate + +order.refundedAmount;
                                                    req.body.InBalanceAmount = req.body.amount - order.refundedAmount;
                                                    RefundArray.push(req.body.InBalanceAmount);
                                                }
                                                else {
                                                    inValid = true;
                                                    break;
                                                }
                                                if (RefundArray[refund] >= order.refundedAmount) {
                                                    flag = true;
                                                }
                                                else {
                                                    flag = false;
                                                    break;
                                                }
                                            }
                                        }
                                        console.log(order.refundedAmount);
                                        refundObj = {
                                            PaidAmount: order.amount,
                                            refundedAmount: order.refundedAmount,
                                            InBalancedAmount: req.body.InBalanceAmount,
                                            Amount: req.body.Amount,
                                            Mode: req.body.Mode,
                                            comment: order.comment + " " + req.body.comment,
                                            status: "Order Payment Refunded"
                                        };
                                        if (!flag) return [3 /*break*/, 2];
                                        return [4 /*yield*/, models_1.default.Order.update(refundObj, { where: { order_Id: orderId } })];
                                    case 1:
                                        result = _a.sent();
                                        console.log(result);
                                        if (result) {
                                            return [2 /*return*/, res.status(200).json({ success: true, refundObj: refundObj, message: "Your order amount refunded successfully" })];
                                        }
                                        else {
                                            return [2 /*return*/, res.status(402).json({ success: false, refundObj: {}, message: "Error!! While refund your order amount" })];
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        if (inValid) {
                                            return [2 /*return*/, res.status(422).json({ success: false, order: {}, message: "Invalid input" })];
                                        }
                                        else {
                                            return [2 /*return*/, res.status(403).json({ success: false, order: {}, message: "Refund amount cannot greater than total order amount" })];
                                        }
                                        _a.label = 3;
                                    case 3: return [3 /*break*/, 5];
                                    case 4: return [2 /*return*/, res.status(404).json({ success: false, order: {}, message: "Order not found" })];
                                    case 5: return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(401).json({ success: false, user: {}, message: "Admin not found" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.getProductRatings = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 1) {
                    return [2 /*return*/, this.adminService.getProductRatings(req.params.orderId)
                            .then(function (rating) {
                            if (rating) {
                                return res.status(200).json({ success: true, rating: rating, error: {} });
                            }
                            else {
                                return res.status(400).json({ success: false, rating: {}, message: "No ratings found for this order" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, rating: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, user: {}, message: "Admin not found" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.adminService = adminService;
    }
    return AdminController;
}());
exports.AdminController = AdminController;
//# sourceMappingURL=admin.js.map