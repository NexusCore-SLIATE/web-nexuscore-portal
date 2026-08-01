import { Router } from "express";
import { getMembers, createMember, getMemberBySlug, updateMember, deleteMember } from "../controllers/members.controller.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", getMembers);
router.post("/", authenticate, createMember);
router.get("/:slug", getMemberBySlug);
router.put("/:id", authenticate, updateMember);
router.patch("/:id", authenticate, updateMember);
router.delete("/:id", authenticate, requireRole("superadmin"), deleteMember);

export default router;
