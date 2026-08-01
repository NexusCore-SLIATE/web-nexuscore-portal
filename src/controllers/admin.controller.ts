import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";
import type { AuthRequest } from "../middleware/auth.js";

const JWT_SECRET = process.env.JWT_SECRET || "nexuscore-admin-secret-key";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign({ id: admin.id, role: admin.role }, JWT_SECRET, { expiresIn: "24h" });

    res.status(200).json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.adminId) return res.status(401).json({ message: "Unauthorized." });
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.adminId },
      select: { id: true, username: true, email: true, role: true, createdAt: true },
    });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMe = async (req: AuthRequest, res: Response) => {
  if (!req.adminId) return res.status(401).json({ message: "Unauthorized." });
  try {
    const { username, email, password } = req.body;
    const data: Record<string, string> = {};

    if (username) data.username = username;
    if (email) data.email = email;
    if (password) {
      data.password = await bcrypt.hash(password, 12);
    }

    if (Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No fields to update." });
    }

    const admin = await prisma.admin.update({
      where: { id: req.adminId },
      data,
      select: { id: true, username: true, email: true, role: true },
    });

    res.status(200).json({ message: "Admin updated successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await prisma.admin.findMany({
      select: { id: true, username: true, email: true, role: true, createdAt: true },
    });
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Username, email, and password are required." });
    }

    const existing = await prisma.admin.findFirst({
      where: { OR: [{ email }, { username }] },
    });

    if (existing) {
      return res.status(409).json({ message: "Admin with this email or username already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const admin = await prisma.admin.create({
      data: { username, email, password: hashedPassword, role: role || "admin" },
      select: { id: true, username: true, email: true, role: true, createdAt: true },
    });

    res.status(201).json({ message: "Admin created successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteAdmin = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const admin = await prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found." });
    }

    await prisma.admin.delete({ where: { id } });
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
