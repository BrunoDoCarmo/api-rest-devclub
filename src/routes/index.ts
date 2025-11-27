import { Router } from "express";

import publicRouter from "./public/index";
import privateRouter from "./private/index";

const router = Router();

router.use("/public", publicRouter);
router.use("/private", privateRouter);

export default router;
