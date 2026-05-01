import { Router } from "express";
import { dashboardController } from "../controllers/dashboardController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  dashboardController.getDashboardStats,
);

export default router;
