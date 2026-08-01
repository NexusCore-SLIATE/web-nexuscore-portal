import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import type { Request, Response, NextFunction } from "express";
import statsRoutes from "./routes/stats.routes.js";
import membersRoutes from "./routes/members.routes.js";
import projectsRoutes from "./routes/projects.routes.js";
import timelineRoutes from "./routes/timeline.routes.js";
import eventsRoutes from "./routes/events.routes.js";
import blogsRoutes from "./routes/blogs.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { uploadRouter, filesRouter } from "./routes/upload.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Static assets (frontend + admin panel) live in the repo-root public/ folder.
const publicDir = path.join(__dirname, "../public");
const adminDir = path.join(publicDir, "admin");

// Serve frontend
app.use(express.static(publicDir));
// Serve admin panel at /admin
app.use("/admin", express.static(adminDir));
// Redirect /admin to the admin dashboard
app.get(["/admin", "/admin/"], (_req: Request, res: Response) => {
  res.redirect("/admin/dashboard.html");
});

// Security headers
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "0");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  next();
});

// Login rate limiter (simple in-memory)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

app.use("/api/auth/login", (req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const entry = loginAttempts.get(ip);

  if (entry && now < entry.resetAt) {
    if (entry.count >= RATE_LIMIT_MAX) {
      return res.status(429).json({
        message: "Too many login attempts. Please try again after 15 minutes.",
      });
    }
    entry.count++;
  } else {
    loginAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
  }

  next();
});

// Periodic cleanup of rate limiter map
if (!process.env.VERCEL) {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of loginAttempts.entries()) {
      if (now >= value.resetAt) loginAttempts.delete(key);
    }
  }, 60 * 1000);
}

app.use("/api/stats", statsRoutes);
app.use("/api/members", membersRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/timeline", timelineRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/blogs", blogsRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRouter);
app.use("/api/files", filesRouter);

// Global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// On Vercel the app is run as a serverless function via the default export
// below, so do not start a listener there.
if (!process.env.VERCEL) {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // console.log("API endpoints:");
    // console.log("  - /api/auth/*");
    // console.log("  - /api/stats");
    // console.log("  - /api/members");
    // console.log("  - /api/projects");
    // console.log("  - /api/timeline");
    // console.log("  - /api/events");
    // console.log("  - /api/blogs");
    // console.log("  - /api/upload");
  });
}

export default app;
