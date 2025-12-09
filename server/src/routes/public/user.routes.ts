import { Router } from "express";
import { createUserController } from "../../controller/user/create-user.controller";
import { loginController } from "../../controller/user/login.controller";

const router = Router()

router.post("/create", createUserController)
router.use("/login", loginController)

export default router