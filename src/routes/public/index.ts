import { Router } from "express";
import useRoutes from "./user/index";

const router = Router();

router.use("/user", useRoutes);

export default router;
