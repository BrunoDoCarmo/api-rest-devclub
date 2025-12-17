import { Router } from 'express';
import { TenantResponsibleUserController } from '../../controllers/tenant-responsible-user.controller';

const router = Router();
const controller = new TenantResponsibleUserController();

router.post('/', controller.create);

export default router;
