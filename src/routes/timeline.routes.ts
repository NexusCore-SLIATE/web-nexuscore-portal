import { Router } from "express";
import { getTimelineEvents, createTimelineEvent, getTimelineEventById, updateTimelineEvent, deleteTimelineEvent } from "../controllers/timeline.controller.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", getTimelineEvents);
router.post("/", authenticate, createTimelineEvent);
router.get("/:id", getTimelineEventById);
router.put("/:id", authenticate, updateTimelineEvent);
router.patch("/:id", authenticate, updateTimelineEvent);
router.delete("/:id", authenticate, requireRole("superadmin"), deleteTimelineEvent);

export default router;
