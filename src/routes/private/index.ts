import { Router } from "express";
import useDashboard from "./dashboard/index";

const router = Router();

router.use("/dashboard", useDashboard);

export default router;
