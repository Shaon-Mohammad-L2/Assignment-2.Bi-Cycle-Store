"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
// Middleware for parsing JSON requests and enabling CORS.
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Main API routes.
app.use('/api', routes_1.Routes);
// Default home route for testing server health.
const getHomeRoute = (req, res) => {
    res.status(200).json({
        server: 'Active',
        success: true,
        message: 'This is Home Route.',
    });
};
app.get('/', getHomeRoute);
exports.default = app;
