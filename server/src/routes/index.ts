import { Router } from "express";

import publicRouter from "./public/index";
import privateRouter from "./private/index";
import auth from "../../middlewares/auth";

const router = Router();

router.use("/public", publicRouter);
router.use("/private", auth, privateRouter);

export default router;
