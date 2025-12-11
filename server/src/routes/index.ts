import { Router } from 'express';
import { loginController } from '../controller/auth.controller';
import { createUserController } from '../controller/user.controller';
import { createTenantController } from '../controller/tenant.controller';
import { createResponsibleController } from '../controller/responsible.controller';
import { tenantMiddleware } from '../middlewares/tenant.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/auth/login', loginController);
router.post('/users', createUserController);
router.post('/tenants', createTenantController);

// Protected responsible route needs tenant header and auth
router.post('/responsibles', tenantMiddleware, authMiddleware, createResponsibleController);

export default router;
