import { Router } from "express";
import { notificationController } from "../controllers/notificationController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authMiddleware, notificationController.createNotification);
router.get("/", authMiddleware, notificationController.getNotifications);
router.patch("/:id/read", authMiddleware, notificationController.markAsRead);
router.delete(
  "/:id",
  authMiddleware,
  notificationController.softDeleteNotification,
);

export default router;
