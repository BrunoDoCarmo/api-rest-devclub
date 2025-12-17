import { Router } from 'express';
import { TenantResponsibleUserController } from '../../controllers/tenant-responsible-user.controller';

const router = Router();
const controller = new TenantResponsibleUserController();

router.post('/', controller.create);
// router.get('/:id', controller.findById);
// router.get('/tenant/:tenantId', controller.findByTenant);

export default router;
