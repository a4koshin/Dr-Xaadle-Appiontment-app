import { Request, Response } from "express";
import { dashboardService } from "../services/dashboardService";

export const dashboardController = {
  getDashboardStats: async (_req: Request, res: Response) => {
    try {
      const stats = await dashboardService.getDashboardStats();

      return res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
