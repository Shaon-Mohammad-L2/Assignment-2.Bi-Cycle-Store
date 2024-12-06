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
exports.productControllers = void 0;
const products_validation_zod_1 = require("./products.validation.zod");
const products_service_1 = require("./products.service");
// Controller to retrieve all products.
const getAllProdcuts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        const result = yield products_service_1.ProductService.getAllProductFromDB(searchTerm);
        res.status(200).json({
            success: true,
            message: 'Bicycles retrieved successfully',
            data: result.length > 0 ? result : 'No Bi-Cycle found',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Bicycle Loading Failed!',
            err,
        });
    }
});
// Controller to retrieve a single product by ID.
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductService.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Bicycle retrieved successfully!',
            data: result || 'No Bi-Cycle found',
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Unable to retrieve Bicycle.',
            err,
        });
    }
});
// Controller to create a new product.
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const productData = req.body;
        const zodParsedData = products_validation_zod_1.productValidationZodSchema.parse(productData);
        const result = yield products_service_1.ProductService.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Bicycle created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.issues
                ? (_a = err.issues[0]) === null || _a === void 0 ? void 0 : _a.message
                : err.message || 'Bicycle Creating Failed!',
            err,
        });
    }
});
// Controller to update an existing product by ID.
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productId } = req.params;
        const productData = req.body;
        const zodParsedData = products_validation_zod_1.productValidationZodSchema.parse(productData);
        const result = yield products_service_1.ProductService.updateSingleProductIntoDB(productId, zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Bicycle updated successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.issues
                ? (_a = err.issues[0]) === null || _a === void 0 ? void 0 : _a.message
                : err.message || 'Bicycle Updating Failed!',
            err,
        });
    }
});
// Controller to delete a product (soft delete by marking as `isDeleted`).
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductService.deleteSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Bicycle deleted successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Bicycle deleting Failed!',
            err,
        });
    }
});
// Export all product-related controllers.
exports.productControllers = {
    getAllProdcuts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
