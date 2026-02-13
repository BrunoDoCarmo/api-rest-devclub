import { Router } from "express";
import tenantresponsibleUserRoutes from './tenant-responsible-user.responsible.routes';
import authRoutes from "./auth.routes";
import esqueceuSenhaRoutes from "./esqueceu-senha.routes";


const router = Router();
router.use('/signup', tenantresponsibleUserRoutes);
router.use("/auth", authRoutes);
router.use("/esqueceuSenha", esqueceuSenhaRoutes);

export default router;
