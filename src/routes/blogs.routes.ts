import { Router } from "express";
import { getBlogPosts, createBlogPost, getBlogPostBySlug, updateBlogPost, deleteBlogPost } from "../controllers/blogs.controller.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", getBlogPosts);
router.post("/", authenticate, createBlogPost);
router.get("/:slug", getBlogPostBySlug);
router.put("/:id", authenticate, updateBlogPost);
router.patch("/:id", authenticate, updateBlogPost);
router.delete("/:id", authenticate, requireRole("superadmin"), deleteBlogPost);

export default router;
