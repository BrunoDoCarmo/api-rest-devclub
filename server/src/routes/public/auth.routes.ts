import { Router } from "express";
import { verifyEmailController } from "../../controllers/verify-email.controller";
import { authLoginController } from "../../controllers/auth.controller";
import { updateUserCreateAccountController } from "../../controllers/user.controller";

const router = Router();

router.get("/verify-email", verifyEmailController);
router.put("/update-user-create/:email", updateUserCreateAccountController);
router.post("/login", authLoginController);

export default router;
