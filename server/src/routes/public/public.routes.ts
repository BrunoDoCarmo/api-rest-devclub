import { Router } from "express";
import tenantresponsibleUserRoutes from './tenant-responsible-user.responsible.routes';

const router = Router();
router.use('/signup', tenantresponsibleUserRoutes);

export default router;
