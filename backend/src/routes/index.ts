import { Router } from "express";
import userRoutes from "./userRoutes";
import doctorRoutes from "./doctorRoutes";
import availabilityRoutes from "./availabilityRoutes";
import blockedSlotRoutes from "./blockedSlotRoutes";
import appointmentRoutes from "./appointmentRoutes";
import paymentRoutes from "./paymentRoutes";
import notificationRoutes from "./notificationRoutes";
import dashboardRoutes from "./dashboardRoutes";

const router = Router();
// Users api
router.use("/users", userRoutes);
// Doctor api
router.use("/doctor", doctorRoutes);
// Availability Time
router.use("/availability", availabilityRoutes);
// Block slot
router.use("/blocked-slots", blockedSlotRoutes);
// Appointment
router.use("/appointments", appointmentRoutes);
// payment
router.use("/payments", paymentRoutes);
// notification
router.use("/notifications", notificationRoutes);
// dasboards
router.use("/dashboard", dashboardRoutes);

export default router;
