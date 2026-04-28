import { Request, Response, NextFunction } from "express";

export const roleMiddleware = (...roles: Array<"ADMIN" | "PATIENT">) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You do not have permission.",
      });
    }

    next();
  };
};