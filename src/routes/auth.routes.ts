import { Router } from "express";
import { login, getMe, updateMe, getAdmins, createAdmin, deleteAdmin } from "../controllers/admin.controller.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

router.post("/login", login);
router.get("/me", authenticate, getMe);
router.put("/me", authenticate, updateMe);
router.patch("/me", authenticate, updateMe);
router.get("/admins", authenticate, requireRole("superadmin"), getAdmins);
router.post("/admins", authenticate, requireRole("superadmin"), createAdmin);
router.delete("/admins/:id", authenticate, requireRole("superadmin"), deleteAdmin);

export default router;
