import { Router } from "express";
import { blockedSlotController } from "../controllers/blockedSlotController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";

const router = Router();

router.get("/", blockedSlotController.getBlockedSlots);
router.get("/:id", blockedSlotController.getBlockedSlotById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  blockedSlotController.createBlockedSlot
);

router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  blockedSlotController.updateBlockedSlot
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "DOCTOR"),
  blockedSlotController.softDeleteBlockedSlot
);

export default router;