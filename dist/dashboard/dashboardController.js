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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const db_1 = __importDefault(require("../config/db"));
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const totalBlogs = yield db_1.default.blog.count();
        const publishedBlogs = yield db_1.default.blog.count({
            where: { published: true },
        });
        const draftBlogs = totalBlogs - publishedBlogs;
        const totalProjects = yield db_1.default.project.count();
        const totalViews = 0;
        const totalLikes = 0;
        const monthlyViews = Array(12).fill(0);
        const monthlyLikes = Array(12).fill(0);
        res.json({
            totalBlogs,
            publishedBlogs,
            draftBlogs,
            totalProjects,
            totalViews,
            totalLikes,
            monthlyViews,
            monthlyLikes,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
exports.getDashboardStats = getDashboardStats;
