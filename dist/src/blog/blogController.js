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
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogBySlug = exports.getBlogs = void 0;
const db_1 = __importDefault(require("../config/db"));
const slugify_1 = __importDefault(require("slugify"));
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield db_1.default.blog.findMany({ include: { author: true } });
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getBlogs = getBlogs;
const getBlogBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blog = yield db_1.default.blog.findUnique({
            where: { slug: req.params.slug },
            include: { author: true },
        });
        if (!blog)
            return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getBlogBySlug = getBlogBySlug;
const createBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, excerpt, coverUrl, published } = req.body;
        if (!title || !content)
            return res.status(400).json({ message: "Title and content required" });
        const slug = (0, slugify_1.default)(title, { lower: true, strict: true });
        const blog = yield db_1.default.blog.create({
            data: {
                title,
                content,
                slug,
                excerpt,
                coverUrl,
                published: published || false,
                author: { connect: { id: req.user.id } },
            },
            include: { author: true },
        });
        res.status(201).json(blog);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createBlog = createBlog;
const updateBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, excerpt, coverUrl, published } = req.body;
        const data = {};
        if (title) {
            data.title = title;
            data.slug = (0, slugify_1.default)(title, { lower: true, strict: true });
        }
        if (content !== undefined)
            data.content = content;
        if (excerpt !== undefined)
            data.excerpt = excerpt;
        if (coverUrl !== undefined)
            data.coverUrl = coverUrl;
        if (published !== undefined)
            data.published = published;
        const blog = yield db_1.default.blog.update({
            where: { id: req.params.id },
            data,
            include: { author: true },
        });
        res.json(blog);
    }
    catch (error) {
        if (error.code === "P2025")
            return res.status(404).json({ message: "Blog not found" });
        res.status(500).json({ message: "Server error" });
    }
});
exports.updateBlog = updateBlog;
const deleteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.blog.delete({ where: { id: req.params.id } });
        res.json({ message: "Deleted successfully" });
    }
    catch (error) {
        if (error.code === "P2025")
            return res.status(404).json({ message: "Blog not found" });
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteBlog = deleteBlog;
