import { Router } from "express";
import { userController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { roleMiddleware } from "../middlewares/roleMiddleware";
import { authRateLimit } from "../middlewares/rateLimitMiddleware";

const router = Router();

router.post("/register", userController.register);
router.post("/login", authRateLimit, userController.login);
router.post("/logout", userController.logout);

router.get("/profile", authMiddleware, userController.getProfile);

router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.getAllUsers,
);
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.getUserById,
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.updateUser,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  userController.softDeleteUser,
);

router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);

router.post("/logout", authMiddleware, userController.logout);

export default router;
