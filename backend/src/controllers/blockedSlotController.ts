import { Request, Response } from "express";
import { blockedSlotService } from "../services/blockedSlotService";

export const blockedSlotController = {
  createBlockedSlot: async (req: Request, res: Response) => {
    try {
      const blockedSlot = await blockedSlotService.createBlockedSlot(req.body);

      return res.status(201).json({
        success: true,
        message: "Blocked slot created successfully.",
        data: blockedSlot,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getBlockedSlots: async (_req: Request, res: Response) => {
    try {
      const blockedSlots = await blockedSlotService.getBlockedSlots();

      return res.status(200).json({
        success: true,
        data: blockedSlots,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getBlockedSlotById: async (req: Request, res: Response) => {
    try {
      const blockedSlot = await blockedSlotService.getBlockedSlotById(req.params.id as string);

      return res.status(200).json({
        success: true,
        data: blockedSlot,
      });
    } catch (error: any) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },

  updateBlockedSlot: async (req: Request, res: Response) => {
    try {
      const blockedSlot = await blockedSlotService.updateBlockedSlot(
        req.params.id as string,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Blocked slot updated successfully.",
        data: blockedSlot,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  softDeleteBlockedSlot: async (req: Request, res: Response) => {
    try {
      const blockedSlot = await blockedSlotService.softDeleteBlockedSlot(req.params.id as string);

      return res.status(200).json({
        success: true,
        message: "Blocked slot deleted successfully.",
        data: blockedSlot,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};