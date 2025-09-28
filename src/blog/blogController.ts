import { Request, Response } from "express";
import prisma from "../config/db";

export const getBlogs = async (req: Request, res: Response) => {
  const blogs = await prisma.blog.findMany({ include: { author: true } });
  res.json(blogs);
};

export const getBlog = async (req: Request, res: Response) => {
  const blog = await prisma.blog.findUnique({ where: { id: req.params.id } });
  if (!blog) return res.status(404).json({ message: "Not found" });
  res.json(blog);
};

export const createBlog = async (req: any, res: Response) => {
  const { title, content } = req.body;
  const blog = await prisma.blog.create({
    data: { title, content, authorId: req.user.id },
  });
  res.json(blog);
};

export const updateBlog = async (req: any, res: Response) => {
  const { title, content } = req.body;
  const blog = await prisma.blog.update({
    where: { id: req.params.id },
    data: { title, content },
  });
  res.json(blog);
};

export const deleteBlog = async (req: any, res: Response) => {
  await prisma.blog.delete({ where: { id: req.params.id } });
  res.json({ message: "Deleted successfully" });
};
