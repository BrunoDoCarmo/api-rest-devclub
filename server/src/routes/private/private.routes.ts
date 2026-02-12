import { Router } from "express";
import userAuthRoutes from "./user-auth.routes";
import { createUserController, listUsersController } from "../../controllers/user.controller";
import { ensureAuthenticated } from "../../middlewares/ensureAuthenticated";

const router = Router();

router.use('/user', userAuthRoutes);
router.get('/user-list',ensureAuthenticated,  listUsersController);
router.get('/user-create',ensureAuthenticated,  createUserController);

export default router;
