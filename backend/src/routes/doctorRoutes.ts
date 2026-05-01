import { Router } from "express";
import { doctorController } from "../controllers/doctorController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", doctorController.getDoctor);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  doctorController.createDoctor
);

export default router;