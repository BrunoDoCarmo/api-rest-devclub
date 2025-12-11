import { Router } from "express";

import publicRouter from "./public/routes";
import privateRouter from "./private/routes";
import auth from "../middlewares/auth";

const router = Router();

router.use("/public", publicRouter);
router.use("/private", auth, privateRouter);

export default router;
