import { Router } from 'express';
import { TenantResponsibleUserMembershipsController } from '../../controllers/tenant-responsible-user-memberships.controller';

const router = Router();
const controller = new TenantResponsibleUserMembershipsController();

router.post('/', controller.create);

export default router;
