import { Request, Response } from "express";
import { notificationService } from "../services/notificationService";

export const notificationController = {
  createNotification: async (req: Request, res: Response) => {
    try {
      const notification = await notificationService.createNotification(
        req.body,
      );

      return res.status(201).json({
        success: true,
        message: "Notification created successfully.",
        data: notification,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getNotifications: async (req: Request, res: Response) => {
    try {
      const notifications = await notificationService.getNotifications(
        req.user.id,
      );

      return res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  markAsRead: async (req: Request, res: Response) => {
    try {
      const notification = await notificationService.markAsRead(req.params.id);

      return res.status(200).json({
        success: true,
        message: "Notification marked as read.",
        data: notification,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  softDeleteNotification: async (req: Request, res: Response) => {
    try {
      const notification = await notificationService.softDeleteNotification(
        req.params.id,
      );

      return res.status(200).json({
        success: true,
        message: "Notification deleted successfully.",
        data: notification,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
