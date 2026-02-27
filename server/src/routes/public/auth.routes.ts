import { Router } from "express";
import { verifyEmailAdminController } from "../../controllers/verify-email-admin.controller";
import { authLoginController } from "../../controllers/auth.controller";
import { updateUserCreateAccountController } from "../../controllers/user.controller";

const router = Router();

// router.get("/verify-email", verifyEmailController);
router.get("/verify-email-admin", verifyEmailAdminController);
router.put("/update-user-create/:email", updateUserCreateAccountController);
router.post("/login", authLoginController);

export default router;
