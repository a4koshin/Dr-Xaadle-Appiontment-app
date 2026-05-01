import { Router } from "express";
import { appointmentController } from "../controllers/appointmentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", authMiddleware, appointmentController.createAppointment);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  appointmentController.getAppointments
);

router.get(
  "/:id",
  authMiddleware,
  appointmentController.getAppointmentById
);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  appointmentController.updateAppointmentStatus
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  appointmentController.softDeleteAppointment
);

export default router;