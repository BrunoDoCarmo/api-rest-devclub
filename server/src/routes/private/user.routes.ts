import { Router } from "express";
import { listUsersController } from "../../controller/list-users.controller";
import { deleteUserController } from "../../controller/delete-user.controller";
import { changeUserController } from "../../controller/change-user.controller";

const router = Router()

router.get("/list-user", listUsersController)
router.delete("/delete-user/:id", deleteUserController)
router.put("/change-user/:id", changeUserController)

export default router