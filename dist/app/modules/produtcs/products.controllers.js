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
        const result = yield products_service_1.ProductService.getAllProductFromDB();
        res.status(200).json({
            success: true,
            message: 'All Product Successfully Loaded!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: 'Product Loading Failed!',
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
            message: 'Product Successfully Loaded!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || 'Unable to retrieve product.',
            err,
        });
    }
});
// Controller to create a new product.
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { product: productData } = req.body;
        const zodParsedData = products_validation_zod_1.productValidationZodSchema.parse(productData);
        const result = yield products_service_1.ProductService.createProductIntoDB(zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Product Successfully Created!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.issues
                ? (_a = err.issues[0]) === null || _a === void 0 ? void 0 : _a.message
                : 'Product Creating Failed!',
            err,
        });
    }
});
// Controller to update an existing product by ID.
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { productId } = req.params;
        const { updateProduct: productData } = req.body;
        const zodParsedData = products_validation_zod_1.productValidationZodSchema.parse(productData);
        const result = yield products_service_1.ProductService.updateSingleProductIntoDB(productId, zodParsedData);
        res.status(200).json({
            success: true,
            message: 'Product Successfully Updated!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.issues
                ? (_a = err.issues[0]) === null || _a === void 0 ? void 0 : _a.message
                : err.message || 'Product Updating Failed!',
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
            message: 'Product Successfully Deleted!',
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: 'Product Deleting Failed!',
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
