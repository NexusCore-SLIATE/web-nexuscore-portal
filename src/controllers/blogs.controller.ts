import type { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { deleteFileFromUrl } from "../utils/s3.js";

export const getBlogPosts = async (req: Request, res: Response) => {
  try {
    const category = req.query.category as string | undefined;
    const tags = req.query.tags as string | string[] | undefined;
    const where: Record<string, unknown> = {};
    if (category) where.category = category;
    if (tags) where.tags = { hasSome: Array.isArray(tags) ? tags : [tags] };
    const posts = await prisma.blogPost.findMany({ where });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createBlogPost = async (req: Request, res: Response) => {
  try {
    const { slug, title, excerpt, authorName, authorRole, date, readingTime, category, tags, thumbnail, url, memberId } = req.body;
    const data: Record<string, unknown> = {
      slug, title, excerpt, authorName, authorRole, readingTime, category, tags, thumbnail, url,
    };
    if (date) data.date = new Date(date);
    if (memberId !== undefined && memberId !== null) data.memberId = memberId;
    const post = await prisma.blogPost.create({ data: data as any });
    res.status(201).json({ message: "Blog post created successfully", post });
  } catch (error) {
    console.error("createBlogPost error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getBlogPostBySlug = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slug as string;
    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: { member: true },
    });
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateBlogPost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const body = req.body as Record<string, unknown>;
    if (body.date) body.date = new Date(body.date as string);
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    const post = await prisma.blogPost.update({
      where: { id },
      data: body as any,
    });
    if (existing && body.thumbnail !== undefined && existing.thumbnail !== body.thumbnail) {
      await deleteFileFromUrl(existing.thumbnail);
    }
    res.status(200).json({ message: "Blog post updated successfully", post });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteBlogPost = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const existing = await prisma.blogPost.findUnique({ where: { id } });
    await prisma.blogPost.delete({ where: { id } });
    if (existing) await deleteFileFromUrl(existing.thumbnail);
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
