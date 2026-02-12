import { Router } from "express";
import { verifyEmailController } from "../../controllers/verify-email.controller";
import { authLoginController } from "../../controllers/auth.controller";

const router = Router();

router.get("/verify-email", verifyEmailController);
router.post("/login", authLoginController);

export default router;
