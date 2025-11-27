import { Router } from "express";
import useRoutes from "./user/index.ts";

const router = Router();

router.use("/user", useRoutes);

export default router;
