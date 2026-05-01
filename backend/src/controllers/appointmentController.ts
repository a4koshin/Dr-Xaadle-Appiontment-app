import { Request, Response } from "express";
import { appointmentService } from "../services/appointmentService";

export const appointmentController = {
  createAppointment: async (req: Request, res: Response) => {
    try {
      const appointment = await appointmentService.createAppointment(req.body);

      return res.status(201).json({
        success: true,
        message: "Appointment created successfully.",
        data: appointment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAppointments: async (_req: Request, res: Response) => {
    try {
      const appointments = await appointmentService.getAppointments();

      return res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAppointmentById: async (req: Request, res: Response) => {
    try {
      const appointment = await appointmentService.getAppointmentById(req.params.id);

      return res.status(200).json({
        success: true,
        data: appointment,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateAppointmentStatus: async (req: Request, res: Response) => {
    try {
      const appointment = await appointmentService.updateAppointmentStatus(
        req.params.id,
        req.body.appointmentStatus
      );

      return res.status(200).json({
        success: true,
        message: "Appointment status updated successfully.",
        data: appointment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  softDeleteAppointment: async (req: Request, res: Response) => {
    try {
      const appointment = await appointmentService.softDeleteAppointment(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Appointment deleted successfully.",
        data: appointment,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};