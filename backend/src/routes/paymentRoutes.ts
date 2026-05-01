import { Router } from "express";
import { paymentController } from "../controllers/paymentController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.post("/", authMiddleware, paymentController.createPayment);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  paymentController.getPayments,
);

router.get("/:id", authMiddleware, paymentController.getPaymentById);

router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware("ADMIN"),
  paymentController.updatePaymentStatus,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  paymentController.softDeletePayment,
);

export default router;
