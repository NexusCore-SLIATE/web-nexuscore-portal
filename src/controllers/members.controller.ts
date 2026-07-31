import type { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { deleteFileFromUrl } from "../utils/s3.js";

export const getMembers = async (req: Request, res: Response) => {
  try {
    const members = await prisma.member.findMany();
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const { slug, name, batch, role, bio, avatar, skills, githubUrl, linkedinUrl, badge } = req.body;
    const member = await prisma.member.create({
      data: { slug, name, batch, role, bio, avatar, skills, githubUrl, linkedinUrl, badge },
    });
    res.status(201).json({ message: "Member created successfully", member });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMemberBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const member = await prisma.member.findUnique({
      where: { slug },
      include: { projects: true, blogPosts: true },
    });
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.member.findUnique({ where: { id } });
    const member = await prisma.member.update({
      where: { id },
      data: req.body,
    });
    if (existing && req.body.avatar !== undefined && existing.avatar !== req.body.avatar) {
      await deleteFileFromUrl(existing.avatar);
    }
    res.status(200).json({ message: "Member updated successfully", member });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.member.findUnique({ where: { id } });
    await prisma.member.delete({ where: { id } });
    if (existing) await deleteFileFromUrl(existing.avatar);
    res.status(200).json({ message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
