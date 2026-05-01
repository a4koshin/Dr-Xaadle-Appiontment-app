import { Request, Response } from "express";
import { paymentService } from "../services/paymentService";

export const paymentController = {
  createPayment: async (req: Request, res: Response) => {
    try {
      const payment = await paymentService.createPayment(req.body);

      return res.status(201).json({
        success: true,
        message: "Payment created successfully.",
        data: payment,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  getPayments: async (_req: Request, res: Response) => {
    try {
      const payments = await paymentService.getPayments();

      return res.status(200).json({
        success: true,
        data: payments,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  getPaymentById: async (req: Request, res: Response) => {
    try {
      const payment = await paymentService.getPaymentById(req.params.id);

      return res.status(200).json({
        success: true,
        data: payment,
      });
    } catch (error: any) {
      return res.status(404).json({ success: false, message: error.message });
    }
  },

  updatePaymentStatus: async (req: Request, res: Response) => {
    try {
      const payment = await paymentService.updatePaymentStatus(
        req.params.id,
        req.body.status
      );

      return res.status(200).json({
        success: true,
        message: "Payment status updated successfully.",
        data: payment,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },

  softDeletePayment: async (req: Request, res: Response) => {
    try {
      const payment = await paymentService.softDeletePayment(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Payment deleted successfully.",
        data: payment,
      });
    } catch (error: any) {
      return res.status(400).json({ success: false, message: error.message });
    }
  },
};