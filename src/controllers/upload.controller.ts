import type { Request, Response } from "express";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";
import { s3, ALLOWED_FOLDERS } from "../utils/s3.js";
const MAX_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const uploadFile = async (req: Request, res: Response) => {
  try {
    const folder = (req.query.folder as string) || "general";

    if (!ALLOWED_FOLDERS.includes(folder)) {
      return res.status(400).json({ message: `Invalid folder. Allowed: ${ALLOWED_FOLDERS.join(", ")}` });
    }

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file provided." });
    }

    if (file.size > MAX_SIZE) {
      return res.status(400).json({ message: "File too large. Max 5MB." });
    }

    if (!ALLOWED_TYPES.includes(file.mimetype)) {
      return res.status(400).json({ message: `Invalid file type. Allowed: ${ALLOWED_TYPES.join(", ")}` });
    }

    const ext = file.originalname.includes(".") ? file.originalname.split(".").pop()! : "jpg";
    const key = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
    );

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const url = `${baseUrl}/api/files/${key}`;

    res.status(200).json({ url, key, folder });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    console.error("Upload error:", message, error);
    res.status(500).json({ message });
  }
};

export const serveFile = async (req: Request, res: Response) => {
  try {
    const key = `${req.params.folder}/${req.params.key}`;

    const response = await s3.send(
      new GetObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: key,
      })
    );

    const contentType = response.ContentType || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    if (response.Body) {
      const body = response.Body as Readable;
      body.pipe(res);
    } else {
      res.status(404).json({ message: "File not found." });
    }
  } catch (error) {
    if (error instanceof Error && error.name === "NoSuchKey") {
      return res.status(404).json({ message: "File not found." });
    }
    console.error("File serve error:", error);
    res.status(500).json({ message: "Failed to serve file." });
  }
};
