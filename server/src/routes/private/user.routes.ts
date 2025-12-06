import { Router } from "express";
import { listUsersController } from "../../controller/list-users.controller";
import { deleteUserController } from "../../controller/delete-user.controller";
import { changeUserController } from "../../controller/change-user.controller";
import { changeUserStateController } from "../../controller/change-user-state.controller";
import { logoutUserController } from "../../controller/logout-user.controller";
import { findUserByIdController } from "../../controller/find-user-by-id.controller";

const router = Router()

router.get("/list-user", listUsersController)
router.delete("/delete-user/:id", deleteUserController)
router.put("/change-user/:id", changeUserController)
router.patch("/change-user-state/:id", changeUserStateController)
router.post("/logout", logoutUserController)
router.get("/username/:id", findUserByIdController);

export default router