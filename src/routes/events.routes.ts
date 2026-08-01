import { Router } from "express";
import { getEvents, createEvent, getEventBySlug, updateEvent, deleteEvent } from "../controllers/events.controller.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = Router();

router.get("/", getEvents);
router.post("/", authenticate, createEvent);
router.get("/:slug", getEventBySlug);
router.put("/:id", authenticate, updateEvent);
router.patch("/:id", authenticate, updateEvent);
router.delete("/:id", authenticate, requireRole("superadmin"), deleteEvent);

export default router;
