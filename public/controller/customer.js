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
exports.CustomerController = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var models_1 = __importDefault(require("../models"));
var CustomerController = /** @class */ (function () {
    function CustomerController(customerService) {
        var _this = this;
        this.customerService = customerService;
        this.getOrders = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    userId = req.body.user.id;
                    return [2 /*return*/, this.customerService.getOrders(userId)
                            .then(function (order) {
                            if (order.length > 0) {
                                return res.status(200).json({ success: true, order: order, error: {} });
                            }
                            else {
                                return res.status(401).json({ success: false, order: {}, message: "Orders not found" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, order: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, order: {}, message: "Invalid user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.getOrderDetail = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var orderId;
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    orderId = req.params.orderId;
                    return [2 /*return*/, this.customerService.getOrderDetail(orderId)
                            .then(function (order) {
                            if (order) {
                                return _this.customerService.getOrderAddress(order.order_Id.toString())
                                    .then(function (address) {
                                    if (address) {
                                        return res.status(200).json({ success: true, order: order, address: address, error: {} });
                                    }
                                    else {
                                        return res.status(401).json({ success: false, address: address, message: "Address Details not found" });
                                    }
                                })
                                    .catch(function (error) {
                                    console.log(error);
                                    return res.status(500).json({ success: false, address: {}, error: { error: error } });
                                });
                            }
                            else {
                                return res.status(402).json({ success: false, order: {}, message: "Order Details not found" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, order: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, order: {}, message: "Invalid user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.orderHistory = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var userId;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    userId = req.body.user.id;
                    return [2 /*return*/, this.customerService.orderHistory(userId)
                            .then(function (order) {
                            if (order.length > 0) {
                                return res.status(200).json({ success: true, order: order, error: {} });
                            }
                            else {
                                return res.status(401).json({ success: false, order: {}, message: "Order not found" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, order: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, order: {}, message: "Invalid user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.getUserDetails = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    return [2 /*return*/, this.customerService.getUserDetails(req.body.user.id)
                            .then(function (user) {
                            if (user) {
                                return res.status(200).json({ success: true, user: user, error: {} });
                            }
                            else {
                                return res.status(401).json({ success: false, user: {}, message: "No user found for this id" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, user: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, user: {}, message: "Invalid user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.updateDetails = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    return [2 /*return*/, this.customerService.updateDetails(req.body, req.body.user.id)
                            .then(function (updatedUser) {
                            if (updatedUser) {
                                return res.status(200).json({ success: true, updatedUser: updatedUser, error: {} });
                            }
                            else {
                                return res.status(401).json({ success: false, updatedUser: {}, message: "Cannot update your details" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, updatedUser: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, updatedUser: {}, message: "Invalid user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.getUserAddressByUserId = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    return [2 /*return*/, this.customerService.getUserAddressByUserId(req.body.user.id)
                            .then(function (userAddress) {
                            if (userAddress) {
                                return res.status(200).json({ success: true, userAddress: userAddress, error: {} });
                            }
                            else {
                                return res.status(401).json({ success: false, userAddress: {}, message: "No user address found. Please add your user address" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, userAddress: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, userAddress: {}, message: "Invalid user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.updateUserAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    return [2 /*return*/, this.customerService.updateUserAddress(req.body, req.params.addressId)
                            .then(function (updatedUserAddress) {
                            if (updatedUserAddress) {
                                return res.status(200).json({ success: true, updatedUserAddress: updatedUserAddress, error: {} });
                            }
                            else {
                                return res.status(401).json({ success: false, updatedUserAddress: {}, message: "Cannot update your address details" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, updatedUserAddress: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, updatedUserAddress: {}, message: "Invalid user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.deleteAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    return [2 /*return*/, this.customerService.deleteAddress(req.params.addressId, req.body.user.id)
                            .then(function (address) {
                            if (address[0] === 1) {
                                return res.status(200).json({ success: true, address: address, error: {} });
                            }
                            else {
                                return res.status(401).json({ success: false, address: {}, message: "Address cannot be deleted" });
                            }
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, address: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, address: {}, message: "Invalid user" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.addNewAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    req.body.user_Id = req.body.user.id;
                    req.body.email = req.body.user.email;
                    return [2 /*return*/, this.customerService.addNewAddress(req.body)
                            .then(function (address) {
                            return res.status(200).json({ success: true, address: address, error: {} });
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, address: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, address: {}, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    return [2 /*return*/, this.customerService.getPassById(req.body.user.id)
                            .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var passMatch, newPassword, cpassword, userPass;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, res.status(400).json({ success: false, user: {}, message: "User password not found" })];
                                        }
                                        return [4 /*yield*/, bcryptjs_1.default.compare(req.body.oldPassword, user.password)];
                                    case 1:
                                        passMatch = _a.sent();
                                        if (!!passMatch) return [3 /*break*/, 2];
                                        return [2 /*return*/, res.status(401).json({ success: false, user: {}, message: "Incorrect Password" })];
                                    case 2:
                                        newPassword = req.body.newPassword;
                                        cpassword = req.body.cpassword;
                                        userPass = user.password;
                                        if (!!(newPassword === cpassword)) return [3 /*break*/, 3];
                                        return [2 /*return*/, res.status(402).json({ success: false, user: {}, message: "Please enter same password" })];
                                    case 3: return [4 /*yield*/, bcryptjs_1.default.hash(req.body.newPassword, 10)];
                                    case 4:
                                        userPass = _a.sent();
                                        return [2 /*return*/, this.customerService.changePassword(userPass, req.body.user.id)
                                                .then(function (user) {
                                                return res.status(200).json({ success: true, user: user, message: "Password changed successfully" });
                                            })];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, user: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, user: {}, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.productRating = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (req.body.user.userTypeId === 2) {
                    req.body.Ratings = (req.body.OnTimeArrival + req.body.QualityOfProduct) / 2;
                    req.body.RatingFrom = req.body.user.id;
                    req.body.RatingDate = new Date();
                    return [2 /*return*/, this.customerService.getOrderDetail(req.params.orderId)
                            .then(function (order) {
                            if (order) {
                                req.body.order_Id = req.params.orderId;
                                req.body.RatingTo = order.product_Id;
                            }
                            else {
                                return res.status(400).json({ success: false, order: {}, message: "Order not found" });
                            }
                            return _this.customerService.alreadyRatingGivenOrNot(req.params.orderId)
                                .then(function (rating) { return __awaiter(_this, void 0, void 0, function () {
                                var ratingObj, ratingUpdate;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!((rating === null || rating === void 0 ? void 0 : rating.RatingFrom) === req.body.user.id && (rating === null || rating === void 0 ? void 0 : rating.RatingTo) === order.product_Id)) return [3 /*break*/, 2];
                                            ratingObj = {
                                                OnTimeArrival: req.body.OnTimeArrival,
                                                QualityOfProduct: req.body.QualityOfProduct,
                                                Ratings: (req.body.OnTimeArrival + req.body.QualityOfProduct) / 2,
                                                RatingsDate: new Date()
                                            };
                                            return [4 /*yield*/, models_1.default.Rating.update(ratingObj, { where: { order_Id: req.params.orderId } })];
                                        case 1:
                                            ratingUpdate = _a.sent();
                                            if (ratingUpdate) {
                                                return [2 /*return*/, res.status(201).json({ success: true, ratingUpdate: ratingUpdate, error: {} })];
                                            }
                                            else {
                                                return [2 /*return*/, res.status(401).json({ success: false, ratingUpdate: {}, message: "Rating has been not given" })];
                                            }
                                            return [3 /*break*/, 3];
                                        case 2: return [2 /*return*/, this.customerService.productRating(req.body)
                                                .then(function (rating) {
                                                if (rating) {
                                                    return res.status(200).json({ success: true, rating: rating, error: {} });
                                                }
                                                else {
                                                    return res.status(402).json({ success: false, rating: {}, message: "Cannot able to give rating!! please try again later" });
                                                }
                                            })
                                                .catch(function (error) {
                                                console.log(error);
                                                return res.status(500).json({ success: false, rating: {}, error: { error: error } });
                                            })];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({ success: false, rating: {}, error: { error: error } });
                            });
                        })
                            .catch(function (error) {
                            console.log(error);
                            return res.status(500).json({ success: false, rating: {}, error: { error: error } });
                        })];
                }
                else {
                    return [2 /*return*/, res.status(404).json({ success: false, user: {}, message: "Invalid User" })];
                }
                return [2 /*return*/];
            });
        }); };
        this.customerService = customerService;
    }
    return CustomerController;
}());
exports.CustomerController = CustomerController;
//# sourceMappingURL=customer.js.map