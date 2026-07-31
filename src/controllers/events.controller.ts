import type { Request, Response } from "express";
import prisma from "../config/prisma.js";

export const getEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json(events);
  } catch (error) {
    console.error("getEvents error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { slug, title, type, date, time, location, description, registrationUrl, badge } = req.body;
    if (!slug || !title || !type) {
      return res.status(400).json({ message: "Missing required fields: slug, title, type" });
    }
    const parsedDate = date ? new Date(date) : new Date();
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }
    const event = await prisma.event.create({
      data: { slug, title, type, date: parsedDate, time: time || '', location: location || '', description: description || '', registrationUrl, badge },
    });
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error("createEvent error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getEventBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const event = await prisma.event.findUnique({ where: { slug } });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    console.error("getEventBySlug error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const data: Record<string, unknown> = { ...req.body };
    if (data.date) {
      const parsed = new Date(data.date as string);
      if (isNaN(parsed.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      data.date = parsed;
    }
    const event = await prisma.event.update({
      where: { id },
      data,
    });
    res.status(200).json({ message: "Event updated successfully", event });
  } catch (error) {
    console.error("updateEvent error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    await prisma.event.delete({ where: { id } });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("deleteEvent error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
