import { Request, Response } from "express";
import prisma from "../config/db";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const totalBlogs = await prisma.blog.count();
    const publishedBlogs = await prisma.blog.count({
      where: { published: true },
    });
    const draftBlogs = totalBlogs - publishedBlogs;
    const totalProjects = await prisma.project.count();
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
