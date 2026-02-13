import { Router } from 'express';
import { EsqueceuSenhaEnvioController } from '../../controllers/esqueceuSenhaEnvio.controller';
import { EsqueceuSenhaResetController } from '../../controllers/esqueceuSenhaReset.controller';

const router = Router();
const controllerEnvio = new EsqueceuSenhaEnvioController();
const controllerReset = new EsqueceuSenhaResetController();

router.post('/', controllerEnvio.create);
router.put('/reset', controllerReset.handle);

export default router;