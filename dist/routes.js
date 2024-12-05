"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const express_1 = __importDefault(require("express"));
const products_controllers_1 = require("./app/modules/produtcs/products.controllers");
const orders_controllers_1 = require("./app/modules/orders/orders.controllers");
const router = express_1.default.Router();
// Routes for product-related operations.
router.get('/products', products_controllers_1.productControllers.getAllProdcuts);
router.get('/products/:productId', products_controllers_1.productControllers.getSingleProduct);
router.post('/products', products_controllers_1.productControllers.createProduct);
router.put('/products/:productId', products_controllers_1.productControllers.updateProduct);
router.delete('/products/:productId', products_controllers_1.productControllers.deleteProduct);
// Routes for order-related operations.
router.get('/orders', orders_controllers_1.orderControllers.getAllOrders);
router.get('/orders/revenue', orders_controllers_1.orderControllers.ordersRevenue);
router.get('/orders/:orderId', orders_controllers_1.orderControllers.getSingleOrder);
router.post('/orders', orders_controllers_1.orderControllers.createOrder);
router.delete('/orders/:orderId', orders_controllers_1.orderControllers.deleteOrder);
exports.Routes = router;
