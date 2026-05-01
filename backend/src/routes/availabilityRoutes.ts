import { Router } from "express";
import { availabilityController } from "../controllers/availabilityController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", availabilityController.getAvailabilities);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  availabilityController.createAvailability,
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  availabilityController.updateAvailability,
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  availabilityController.deleteAvailability,
);

export default router;
