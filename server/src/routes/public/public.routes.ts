import { Router } from "express";
import tenantresponsibleRoutes from './responsible.routes';

const router = Router();
router.use('/signup', tenantresponsibleRoutes);

export default router;
