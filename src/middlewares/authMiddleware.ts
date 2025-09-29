import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const handleError = (res: Response, status: number, message: string) => {
  return res.status(status).json({ success: false, message });
};

// Protect route: Check JWT token
export const protect = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return handleError(res, 401, "Not authorized, token missing.");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (error) {
    console.error("Protect middleware error:", error);
    return handleError(res, 401, "Invalid or expired token.");
  }
};

// Admin only routes
export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    if (!user) return handleError(res, 401, "Not authorized, user not found.");

    if (user.role !== "admin" && user.role !== "OWNER") {
      return handleError(res, 403, "Forbidden: Admins only.");
    }

    next();
  } catch (error) {
    console.error("AdminOnly middleware error:", error);
    return handleError(res, 500, "Server error in admin check.");
  }
};
