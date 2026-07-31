import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = (() => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === "nexuscore-admin-secret-key") {
    console.warn("WARNING: Using default JWT_SECRET. Set a strong JWT_SECRET in .env for production.");
  }
  return secret || "nexuscore-admin-secret-key";
})();

export interface AuthRequest extends Request {
  adminId?: string;
  adminRole?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const token = authHeader.split(" ")[1] as string;
    if (!token) {
      return res.status(401).json({ message: "Access denied. Token is empty." });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };

    req.adminId = decoded.id;
    req.adminRole = decoded.role;
    next();
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }
    if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token." });
    }
    return res.status(401).json({ message: "Authentication failed." });
  }
};

export const requireRole = (...roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.adminRole || !roles.includes(req.adminRole)) {
      return res.status(403).json({ message: `Access denied. Required role: ${roles.join(" or ")}.` });
    }
    next();
  };
};
