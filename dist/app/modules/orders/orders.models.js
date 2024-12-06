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
exports.Orders = void 0;
const mongoose_1 = require("mongoose");
const products_models_1 = require("../produtcs/products.models");
// Utility function to set required field validation messages dynamically.
const requiredFun = (subject) => {
    return [true, `${subject} is Required`];
};
// Schema definition for Order model.
const OrderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        trim: true,
        required: requiredFun('Email'),
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        trim: true,
        required: requiredFun('Product'),
    },
    quantity: {
        type: Number,
        required: requiredFun('Quantity'),
        min: [1, 'Quantity must be greater than or equal to 1'],
    },
    totalPrice: {
        type: Number,
        required: requiredFun('Total Price'),
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
// Pre-save middleware to validate product stock and calculate total price.
OrderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const order = this;
            const product = yield products_models_1.Products.findOne({ _id: order.product });
            // Check if the product exists and is available for ordering.
            if (!product) {
                throw new Error('Product not Found');
            }
            else if (product.isDeleted ||
                !product.inStock ||
                product.quantity < order.quantity ||
                product.quantity <= 0) {
                throw new Error('Requested stock is unavailable.');
            }
            else if (product) {
                const orderQuantity = order.quantity;
                order.totalPrice = product.price * orderQuantity;
                const update = yield products_models_1.Products.updateOne({
                    _id: order.product,
                    quantity: { $gte: orderQuantity },
                    isDeleted: false,
                    inStock: true,
                }, { $inc: { quantity: -orderQuantity } });
                if (!update.modifiedCount) {
                    throw new Error('Stock update failed due to insufficient stock.');
                }
            }
            next();
        }
        catch (err) {
            next(err);
        }
    });
});
// Middleware to exclude `isDeleted: true` items during `find` operations unless skipped.
OrderSchema.pre('find', function (next) {
    const skipMiddleware = this.getOptions().skipMiddleware;
    if (!skipMiddleware) {
        this.find({ isDeleted: { $ne: true } });
    }
    next();
});
// Middleware to exclude `isDeleted: true` items during `findOne` operations unless skipped.
OrderSchema.pre('findOne', function (next) {
    const skipMiddleware = this.getOptions().skipMiddleware;
    if (!skipMiddleware) {
        this.findOne({ isDeleted: { $ne: true } });
    }
    next();
});
// Middleware to exclude `isDeleted: true` items during aggregation operations.
OrderSchema.pre('aggregate', function (next) {
    const options = this.options || {};
    const skipMiddleware = options.skipMiddleware;
    if (!skipMiddleware) {
        this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    }
    next();
});
// Mongoose model for orders.
exports.Orders = (0, mongoose_1.model)('Order', OrderSchema);
