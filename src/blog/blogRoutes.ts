import { Router } from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "./blogController";
import { protect, adminOnly } from "../middlewares/authMiddleware";

const router = Router();


router.get("/", getBlogs);
router.get("/slug/:slug", getBlogBySlug);

router.post("/", protect, adminOnly, createBlog);
router.put("/:id", protect, adminOnly, updateBlog);
router.delete("/:id", protect, adminOnly, deleteBlog);

export default router;
