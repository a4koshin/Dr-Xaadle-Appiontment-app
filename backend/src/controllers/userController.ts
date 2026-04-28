import { Request, Response } from "express";
import { userService } from "../services/userService";

export const userController = {
  register: async (req: Request, res: Response) => {
    try {
      const result = await userService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const result = await userService.login(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  logout: async (_req: Request, res: Response) => {
    try {
      await userService.logout();

      return res.status(200).json({
        success: true,
        message: "Logout successful.",
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  getProfile: async (req: Request, res: Response) => {
    try {
      const user = await userService.getProfile(req.user.id);

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  getAllUsers: async (_req: Request, res: Response) => {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  forgotPassword: async (req: Request, res: Response) => {
    try {
      const result = await userService.forgotPassword(req.body.email);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  resetPassword: async (req: Request, res: Response) => {
    try {
      const result = await userService.resetPassword(req.body);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
