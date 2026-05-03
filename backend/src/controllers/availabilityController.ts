import { Request, Response } from "express";
import { availabilityService } from "../services/availabilityService";

export const availabilityController = {
  createAvailability: async (req: Request, res: Response) => {
    try {
      const availability = await availabilityService.createAvailability(
        req.body,
      );

      return res.status(201).json({
        success: true,
        message: "Availability created successfully.",
        data: availability,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAvailabilities: async (_req: Request, res: Response) => {
    try {
      const availabilities = await availabilityService.getAvailabilities();

      return res.status(200).json({
        success: true,
        data: availabilities,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateAvailability: async (req: Request, res: Response) => {
    try {
      const availability = await availabilityService.updateAvailability(
        req.params.id as string,
        req.body,
      );

      return res.status(200).json({
        success: true,
        message: "Availability updated successfully.",
        data: availability,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  deleteAvailability: async (req: Request, res: Response) => {
    try {
      await availabilityService.deleteAvailability(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Availability deleted successfully.",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
