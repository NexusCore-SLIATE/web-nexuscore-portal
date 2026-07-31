import { Router } from "express";
import multer from "multer";
import { authenticate } from "../middleware/auth.js";
import { uploadFile, serveFile } from "../controllers/upload.controller.js";

const upload = multer({ storage: multer.memoryStorage() });

const uploadRouter = Router();
uploadRouter.post("/", authenticate, upload.single("file"), uploadFile);

const filesRouter = Router();
filesRouter.get("/:folder/:key", serveFile);

export { uploadRouter, filesRouter };
