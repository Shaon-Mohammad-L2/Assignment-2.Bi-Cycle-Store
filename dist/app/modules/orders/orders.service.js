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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const orders_models_1 = require("./orders.models");
const getAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_models_1.Orders.find();
    return result;
});
const getSingleOrderFromDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_models_1.Orders.findOne({ _id: orderId });
    return result;
});
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_models_1.Orders.create(orderData);
    return result;
});
const deleteSingleOrderFromDB = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_models_1.Orders.updateOne({ _id: orderId }, { isDeleted: true });
    return result;
});
const revenueCalculateForAllOrdersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_models_1.Orders.aggregate([
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalPrice' },
            },
        },
        {
            $project: {
                _id: 0,
                totalRevenue: 1,
            },
        },
    ], { skipMiddleware: true });
    const totalRevenue = result[0] || 0;
    return totalRevenue;
});
exports.orderService = {
    getAllOrdersFromDB,
    getSingleOrderFromDB,
    createOrderIntoDB,
    deleteSingleOrderFromDB,
    revenueCalculateForAllOrdersFromDB,
};
