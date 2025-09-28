import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const handleError = (res: Response, status: number, message: string) => {
  return res.status(status).json({ success: false, message });
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return handleError(res, 401, "Not authorized, token missing");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch {
    return handleError(res, 401, "Invalid or expired token");
  }
};

export const adminOnly = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user) return handleError(res, 401, "Not authorized, user not found");

  if (user.role !== "OWNER" && user.role !== "ADMIN") {
    return handleError(res, 403, "Forbidden: Admins only");
  }

  next();
};
