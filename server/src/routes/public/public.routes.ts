import { Router } from "express";
import tenantresponsibleUserRoutes from './tenant-responsible-user.responsible.routes';
import authRoutes from "./auth.routes";


const router = Router();
router.use('/signup', tenantresponsibleUserRoutes);
router.use("/auth", authRoutes);

export default router;
