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
exports.ProductService = void 0;
const products_models_1 = require("./products.models");
// Fetch all products from the database
const getAllProductFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const query = {};
    if (searchTerm) {
        query.$text = { $search: searchTerm };
    }
    const result = yield products_models_1.Products.find(query);
    return result;
});
// Fetch a single product by its ID, ensuring it is not marked as deleted.
const getSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield products_models_1.Products.isDeletedTrue(productId)) {
        throw new Error('The requested product has been marked as deleted and is no longer available.');
    }
    const result = yield products_models_1.Products.findOne({ _id: productId });
    return result;
});
// Create a new product in the database.
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_models_1.Products.create(productData);
    return result;
});
// Update a product by its ID, ensuring it is not marked as deleted.
const updateSingleProductIntoDB = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    if (yield products_models_1.Products.isDeletedTrue(productId)) {
        throw new Error('Cannot modify a deleted product. It is read-only.');
    }
    const result = yield products_models_1.Products.findOneAndUpdate({ _id: productId }, productData);
    return result;
});
// Soft-delete a product by setting `isDeleted` to true.
const deleteSingleProductFromDB = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_models_1.Products.updateOne({ _id: productId }, { $set: { isDeleted: true } });
    return result;
});
// Exporting the service functions for product-related operations.
exports.ProductService = {
    getAllProductFromDB,
    getSingleProductFromDB,
    createProductIntoDB,
    updateSingleProductIntoDB,
    deleteSingleProductFromDB,
};
