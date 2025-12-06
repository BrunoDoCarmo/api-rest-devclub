import { Router } from "express";
import { logoutUserController } from "../../controller/logout-user.controller";

const router = Router()

router.post("/logout1", logoutUserController)

export default router