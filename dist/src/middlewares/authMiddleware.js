"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminOnly = exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleError = (res, status, message) => {
    return res.status(status).json({ success: false, message });
};
// Protect route: Check JWT token
const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return handleError(res, 401, "Not authorized, token missing.");
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.error("Protect middleware error:", error);
        return handleError(res, 401, "Invalid or expired token.");
    }
};
exports.protect = protect;
// Admin only routes
const adminOnly = (req, res, next) => {
    try {
        const user = req.user;
        if (!user)
            return handleError(res, 401, "Not authorized, user not found.");
        if (user.role !== "admin" && user.role !== "OWNER") {
            return handleError(res, 403, "Forbidden: Admins only.");
        }
        next();
    }
    catch (error) {
        console.error("AdminOnly middleware error:", error);
        return handleError(res, 500, "Server error in admin check.");
    }
};
exports.adminOnly = adminOnly;
