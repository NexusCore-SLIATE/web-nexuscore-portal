import type { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { deleteFileFromUrl } from "../utils/s3.js";

export const getProjects = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    const status = req.query.status as string | undefined;
    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (status) where.status = status;
    const projects = await prisma.project.findMany({ where });
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProject = async (req: Request, res: Response) => {
  try {
    const { slug, title, description, image, technologies, repoUrl, status, category, authorId } = req.body;
    const project = await prisma.project.create({
      data: { slug, title, description, image, technologies, repoUrl, status, category, authorId },
    });
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getProjectBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const project = await prisma.project.findUnique({
      where: { slug },
      include: { author: true },
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.project.findUnique({ where: { id } });
    const project = await prisma.project.update({
      where: { id },
      data: req.body,
    });
    if (existing && req.body.image !== undefined && existing.image !== req.body.image) {
      await deleteFileFromUrl(existing.image);
    }
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.project.findUnique({ where: { id } });
    await prisma.project.delete({ where: { id } });
    if (existing) await deleteFileFromUrl(existing.image);
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
