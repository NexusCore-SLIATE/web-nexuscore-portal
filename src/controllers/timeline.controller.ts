import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const getTimelineEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.timelineEvent.findMany({
      orderBy: [{ year: "asc" }, { month: "asc" }],
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createTimelineEvent = async (req: Request, res: Response) => {
  try {
    const { year, month, title, description, icon } = req.body;
    const event = await prisma.timelineEvent.create({
      data: { year, month, title, description, icon },
    });
    res.status(201).json({ message: "Timeline event created successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getTimelineEventById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const event = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!event) return res.status(404).json({ message: "Timeline event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateTimelineEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const event = await prisma.timelineEvent.update({
      where: { id },
      data: req.body,
    });
    res.status(200).json({ message: "Timeline event updated successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteTimelineEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.timelineEvent.delete({ where: { id } });
    res.status(200).json({ message: "Timeline event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
