import { Router } from "express";
import { getStats, createStat, getStatById, updateStat, deleteStat } from "../controllers/stats.controller.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", getStats);
router.post("/", authenticate, createStat);
router.get("/:id", getStatById);
router.put("/:id", authenticate, updateStat);
router.patch("/:id", authenticate, updateStat);
router.delete("/:id", authenticate, requireRole("superadmin"), deleteStat);

export default router;
