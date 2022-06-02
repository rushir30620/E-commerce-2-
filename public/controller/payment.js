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
exports.PaymentController = void 0;
var models_1 = __importDefault(require("../models"));
require('dotenv').config();
var stripe = require('stripe')(process.env.SECRET_KEY);
var PaymentController = /** @class */ (function () {
    function PaymentController(paymentService) {
        var _this = this;
        this.paymentService = paymentService;
        this.makePayment = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var productList, products;
            var _this = this;
            return __generator(this, function (_a) {
                productList = [];
                products = [];
                return [2 /*return*/, this.paymentService.getOrder(req.params.orderId)
                        .then(function (order) { return __awaiter(_this, void 0, void 0, function () {
                        var status_1, result, prod;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!order) return [3 /*break*/, 2];
                                    productList = order.products;
                                    status_1 = order.paymentStatus;
                                    status_1 = "Done";
                                    return [4 /*yield*/, models_1.default.Order.update({ status: status_1 }, { where: { order_Id: req.params.orderId } })];
                                case 1:
                                    result = _a.sent();
                                    for (prod in productList) {
                                        products.push(JSON.parse(productList[prod]));
                                    }
                                    return [2 /*return*/, stripe.checkout.sessions.create({
                                            payment_method_types: ['card'],
                                            line_items: products.map(function (p) {
                                                return {
                                                    name: p.title,
                                                    description: p.description,
                                                    amount: p.price * 100,
                                                    currency: 'inr',
                                                    quantity: p.quant
                                                };
                                            }),
                                            success_url: req.protocol + '://' + req.get('host') + '/paymentDone',
                                            cancel_url: req.protocol + '://' + req.get('host') + '/cancel'
                                        })
                                            .then(function (session) {
                                            res.render('checkout', {
                                                path: '/checkout',
                                                sessionId: session.id
                                            });
                                        })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({ success: false, product: {}, error: { error: error } });
                                        })];
                                case 2:
                                    console.log("No order found");
                                    return [2 /*return*/, res.status(500).json({ success: false, product: {}, message: "Nothing in cart" })];
                            }
                        });
                    }); })
                        .catch(function (error) {
                        console.log(error);
                        return res.status(500).json({ success: false, product: {}, error: { error: error } });
                    })];
            });
        }); };
        this.paymentSuccess = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                res.render('paymentSuccess', {
                    path: 'paymentDone'
                });
                return [2 /*return*/];
            });
        }); };
        this.paymentService = paymentService;
    }
    return PaymentController;
}());
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.js.map