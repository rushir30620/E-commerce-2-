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
exports.CartController = void 0;
var models_1 = __importDefault(require("../models"));
var CartController = /** @class */ (function () {
    function CartController(cartService) {
        var _this = this;
        this.cartService = cartService;
        this.addToCart = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    return [2 /*return*/, this.cartService.getUserById(req.body.user.id)
                            .then(function (user) {
                            req.body.user_Id = req.body.user.id;
                            req.body.userName = (user === null || user === void 0 ? void 0 : user.firstName) + " " + (user === null || user === void 0 ? void 0 : user.lastName);
                            return _this.cartService.getProduct(req.params.prodId)
                                .then(function (product) {
                                var prodId = product === null || product === void 0 ? void 0 : product.product_Id;
                                return _this.cartService.getCartById(req.params.prodId)
                                    .then(function (cart_prod) { return __awaiter(_this, void 0, void 0, function () {
                                    var cart_quant, cart_price, cartObj, updateCart;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                cart_quant = cart_prod === null || cart_prod === void 0 ? void 0 : cart_prod.quantity;
                                                cart_price = cart_prod === null || cart_prod === void 0 ? void 0 : cart_prod.price;
                                                if (!((cart_prod === null || cart_prod === void 0 ? void 0 : cart_prod.product_Id) === (product === null || product === void 0 ? void 0 : product.product_Id))) return [3 /*break*/, 2];
                                                cart_quant += req.body.quantity;
                                                cart_price += ((product === null || product === void 0 ? void 0 : product.price) * req.body.quantity);
                                                cartObj = {
                                                    cart_Id: cart_prod === null || cart_prod === void 0 ? void 0 : cart_prod.cart_Id,
                                                    user_Id: cart_prod === null || cart_prod === void 0 ? void 0 : cart_prod.user_Id,
                                                    userName: cart_prod === null || cart_prod === void 0 ? void 0 : cart_prod.userName,
                                                    product_Id: cart_prod === null || cart_prod === void 0 ? void 0 : cart_prod.product_Id,
                                                    quantity: cart_quant,
                                                    price: cart_price
                                                };
                                                return [4 /*yield*/, models_1.default.Cart.update(cartObj, { where: { product_Id: prodId } })];
                                            case 1:
                                                updateCart = _a.sent();
                                                if (updateCart) {
                                                    return [2 /*return*/, res.status(200).json({ success: true, cartObj: cartObj, error: {} })];
                                                }
                                                else {
                                                    return [2 /*return*/, res.status(200).json({ success: true, cartObj: {}, message: "Product is not added" })];
                                                }
                                                return [3 /*break*/, 3];
                                            case 2:
                                                req.body.product_Id = product === null || product === void 0 ? void 0 : product.product_Id;
                                                req.body.price = (product === null || product === void 0 ? void 0 : product.price) * req.body.quantity;
                                                return [2 /*return*/, this.cartService.addToCart(req.body)
                                                        .then(function (cart) {
                                                        return res.status(200).json({ success: true, cart: cart, error: {} });
                                                    })
                                                        .catch(function (error) {
                                                        console.log(error);
                                                        return res.status(500).json({ success: false, cart: {}, error: { error: error } });
                                                    })];
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); })
                                    .catch(function (error) {
                                    console.log(error);
                                    return res.status(501).json({ success: false, cart: {}, error: { error: error } });
                                });
                            })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(501).json({ success: false, cart: {}, error: { error: error } });
                            });
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(501).json({ success: false, cart: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(402).json({ success: false, product: {}, message: "User not found..." })];
                }
                return [2 /*return*/];
            });
        }); };
        this.getAllCarts = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.cartService.getAllCart()
                        .then(function (cart) {
                        if (cart) {
                            var Total = 0;
                            for (var i = 0; i < cart.length; i++) {
                                Total = Total + cart[i].price;
                            }
                            return res.status(200).json({ success: true, cart: cart, Total: Total, error: {} });
                        }
                        else {
                            return res.status(404).json({ success: false, cart: {}, error: { error: 'Nothing in cart' } });
                        }
                    })
                        .catch(function (error) {
                        return res.status(500).json({ success: false, cart: {}, error: { error: error } });
                    })];
            });
        }); };
        // public getCartById = async (req: Request, res: Response): Promise<Response> => {
        //     return this.cartService.getCartById(req.params.prodId)
        //         .then((cart) => {
        //             if (cart) {
        //                 return res.status(200).json({ success: true, cart, error: {} });
        //             }
        //             return res.status(404).json({ success: false, cart: {}, error: { error: 'Nothing in cart' } });
        //         })
        //         .catch((error: Error) => {
        //             return res.status(500).json({ success: false, cart: {}, error: { error: error } });
        //         });
        // }
        this.removeFromCart = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.cartService
                        .removeFromCart(req.params.cartId)
                        .then(function (cart) {
                        if (cart > 0) {
                            return res.status(200).json({ success: true, cart: cart, error: {} });
                        }
                        return res.status(404).json({ success: false, cart: {}, error: { error: 'Not Deleted' } });
                    })
                        .catch(function (error) {
                        return res.status(500).json({ success: false, cart: {}, error: { error: error } });
                    })];
            });
        }); };
        this.cartService = cartService;
    }
    return CartController;
}());
exports.CartController = CartController;
//# sourceMappingURL=cart.js.map