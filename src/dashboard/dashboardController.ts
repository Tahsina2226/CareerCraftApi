import { Request, Response } from "express";
import prisma from "../config/db";

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const blogsCount = await prisma.blog.count();
    const projectsCount = await prisma.project.count();

    res.json({ blogsCount, projectsCount });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}; 
