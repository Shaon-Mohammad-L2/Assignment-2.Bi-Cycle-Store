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
exports.orderControllers = void 0;
const orders_service_1 = require("./orders.service");
const orders_validation_zod_1 = require("./orders.validation.zod");
const mongoose_1 = require("mongoose");
// Fetches all orders from the database.
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_service_1.orderService.getAllOrdersFromDB();
        res.status(200).json({
            success: true,
            message: 'Orders retrieved successfully.',
            data: result || 'No orders found',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve orders.',
            err,
        });
    }
});
// Fetches a single order by ID.
const getSingleOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const result = yield orders_service_1.orderService.getSingleOrderFromDB(orderId);
        res.status(200).json({
            success: true,
            message: 'Order retrieved successfully.',
            data: result || 'Order not found.',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to retrieve the order.',
            err,
        });
    }
});
// Creates a new order in the database.
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const orderData = req.body;
        const zodParsedData = orders_validation_zod_1.orderValidationZodSchema.parse(orderData);
        const orderDataForDB = Object.assign(Object.assign({}, zodParsedData), { product: new mongoose_1.Types.ObjectId(zodParsedData.product) });
        const result = yield orders_service_1.orderService.createOrderIntoDB(orderDataForDB);
        res.status(200).json({
            success: true,
            message: 'Order Successfully Created!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.issues
                ? (_a = err.issues[0]) === null || _a === void 0 ? void 0 : _a.message
                : err.message || 'Failed to create the order.',
            err,
        });
    }
});
// Deletes an order by ID.
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const result = yield orders_service_1.orderService.deleteSingleOrderFromDB(orderId);
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully.',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to delete the order.',
            err,
        });
    }
});
// Calculates revenue from all orders.
const ordersRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield orders_service_1.orderService.revenueCalculateForAllOrdersFromDB();
        res.status(200).json({
            success: true,
            message: 'Revenue calculated successfully.',
            data: result || 'No data available for revenue calculation.',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Failed to calculate revenue.',
            err,
        });
    }
});
// Exports all order controllers.
exports.orderControllers = {
    getAllOrders,
    getSingleOrder,
    createOrder,
    deleteOrder,
    ordersRevenue,
};
