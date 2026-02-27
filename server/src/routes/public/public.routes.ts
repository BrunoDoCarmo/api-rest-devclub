import { Router } from "express";
import tenantresponsibleUserMembershipsRoutes from './tenant-responsible-user-memberships.responsible.routes';
import authRoutes from "./auth.routes";
import esqueceuSenhaRoutes from "./esqueceu-senha.routes";


const router = Router();
router.use('/signup', tenantresponsibleUserMembershipsRoutes);
router.use("/auth", authRoutes);
router.use("/esqueceuSenha", esqueceuSenhaRoutes);

export default router;
