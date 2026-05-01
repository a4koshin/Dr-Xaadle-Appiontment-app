import { Request, Response } from "express";
import { doctorService } from "../services/doctorService";

export const doctorController = {
  createDoctor: async (req: Request, res: Response) => {
    try {
      const doctor = await doctorService.createDoctor(req.body);

      return res.status(201).json({
        success: true,
        message: "Doctor profile created successfully.",
        data: doctor,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getDoctor: async (_req: Request, res: Response) => {
    try {
      const doctor = await doctorService.getDoctor();

      return res.status(200).json({
        success: true,
        data: doctor,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};