"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRoutes_1 = __importDefault(require("./Auth/authRoutes"));
const blogRoutes_1 = __importDefault(require("./blog/blogRoutes"));
const projectRoutes_1 = __importDefault(require("./Projects/projectRoutes"));
const dashboardRoutes_1 = __importDefault(require("./dashboard/dashboardRoutes"));
const authMiddleware_1 = require("./middlewares/authMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).json({ message: "Tahsina Tanvin Portfolio Backend Running!" });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/blogs", blogRoutes_1.default);
app.use("/api/projects", projectRoutes_1.default);
app.use("/api/dashboard", authMiddleware_1.protect, authMiddleware_1.adminOnly, dashboardRoutes_1.default);
app.get("/api/admin/dashboard", authMiddleware_1.protect, authMiddleware_1.adminOnly, (req, res) => {
    res.status(200).json({ message: "Welcome Admin!" });
});
app.use((err, req, res, next) => {
    console.error("Global Error:", err);
    res.status(500).json({ message: "Something went wrong on the server." });
});
exports.default = app;
