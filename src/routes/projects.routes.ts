import { Router } from "express";
import { getProjects, createProject, getProjectBySlug, updateProject, deleteProject } from "../controllers/projects.controller.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", getProjects);
router.post("/", authenticate, createProject);
router.get("/:slug", getProjectBySlug);
router.put("/:id", authenticate, updateProject);
router.patch("/:id", authenticate, updateProject);
router.delete("/:id", authenticate, requireRole("superadmin"), deleteProject);

export default router;
