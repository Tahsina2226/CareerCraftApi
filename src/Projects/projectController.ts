import { Request, Response } from "express";
import prisma from "../config/db";

export const getProjects = async (req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    include: { owner: true },
  });
  res.json(projects);
};

export const getProject = async (req: Request, res: Response) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
    include: { owner: true },
  });
  if (!project) return res.status(404).json({ message: "Project not found" });
  res.json(project);
};

export const createProject = async (req: any, res: Response) => {
  const { title, description, liveUrl, repoUrl, thumbnail } = req.body;
  const project = await prisma.project.create({
    data: {
      title,
      description,
      liveUrl,
      repoUrl,
      thumbnail,
      ownerId: req.user.id,
    },
  });
  res.json(project);
};

export const updateProject = async (req: any, res: Response) => {
  const { title, description, liveUrl, repoUrl, thumbnail } = req.body;
  const project = await prisma.project.update({
    where: { id: req.params.id },
    data: { title, description, liveUrl, repoUrl, thumbnail },
  });
  res.json(project);
};

export const deleteProject = async (req: any, res: Response) => {
  await prisma.project.delete({ where: { id: req.params.id } });
  res.json({ message: "Project deleted successfully" });
};
