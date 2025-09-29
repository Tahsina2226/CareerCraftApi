import { Request, Response } from "express";
import prisma from "../config/db";
import slugify from "slugify";

export const getBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({ include: { author: true } });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: req.params.slug },
      include: { author: true },
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createBlog = async (req: any, res: Response) => {
  try {
    const { title, content, excerpt, coverUrl, published } = req.body;
    if (!title || !content) return res.status(400).json({ message: "Title and content required" });

    const slug = slugify(title, { lower: true, strict: true });

    const blog = await prisma.blog.create({
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
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBlog = async (req: any, res: Response) => {
  try {
    const { title, content, excerpt, coverUrl, published } = req.body;
    const data: any = {};
    if (title) {
      data.title = title;
      data.slug = slugify(title, { lower: true, strict: true });
    }
    if (content !== undefined) data.content = content;
    if (excerpt !== undefined) data.excerpt = excerpt;
    if (coverUrl !== undefined) data.coverUrl = coverUrl;
    if (published !== undefined) data.published = published;

    const blog = await prisma.blog.update({
      where: { id: req.params.id },
      data,
      include: { author: true },
    });

    res.json(blog);
  } catch (error: any) {
    if (error.code === "P2025") return res.status(404).json({ message: "Blog not found" });
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBlog = async (req: any, res: Response) => {
  try {
    await prisma.blog.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted successfully" });
  } catch (error: any) {
    if (error.code === "P2025") return res.status(404).json({ message: "Blog not found" });
    res.status(500).json({ message: "Server error" });
  }
};
