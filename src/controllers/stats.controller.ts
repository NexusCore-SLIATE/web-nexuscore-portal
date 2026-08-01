import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats = await prisma.stat.findMany();
    res.status(200).json(stats);
  } catch (error) {
    console.error("getStats error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createStat = async (req: Request, res: Response) => {
  try {
    let { label, target, suffix, icon } = req.body;
    target = parseInt(target, 10);
    if (!label || isNaN(target)) {
      return res.status(400).json({ message: "label and a valid target are required" });
    }
    const stat = await prisma.stat.create({
      data: { label, target, suffix: suffix || "+", icon: icon || "📊" },
    });
    res.status(201).json({ message: "Stat created successfully", stat });
  } catch (error) {
    console.error("createStat error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStatById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const stat = await prisma.stat.findUnique({ where: { id } });
    if (!stat) return res.status(404).json({ message: "Stat not found" });
    res.status(200).json(stat);
  } catch (error) {
    console.error("getStatById error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateStat = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data: Record<string, unknown> = { ...req.body };
    if (data.target !== undefined) data.target = parseInt(data.target as string, 10);
    const stat = await prisma.stat.update({
      where: { id },
      data,
    });
    res.status(200).json({ message: "Stat updated successfully", stat });
  } catch (error) {
    console.error("updateStat error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteStat = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.stat.delete({ where: { id } });
    res.status(200).json({ message: "Stat deleted successfully" });
  } catch (error) {
    console.error("deleteStat error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
