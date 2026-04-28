import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../lib/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Token is missing.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token) as {
      id: string;
      role: "ADMIN" | "PATIENT";
    };

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};