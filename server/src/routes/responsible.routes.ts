import { Router } from "express";
import { ResponsibleController } from "../controllers/responsible.controller";
import authMiddleware from "../middlewares/auth.middleware";
import tenantMiddleware from "../middlewares/tenant.middleware";

const router = Router();
const controller = new ResponsibleController();

router.post("/", authMiddleware, tenantMiddleware, controller.create);
router.get("/", authMiddleware, tenantMiddleware, controller.findAll);
router.get("/:id", authMiddleware, tenantMiddleware, controller.findById);
router.put("/:id", authMiddleware, tenantMiddleware, controller.update);
router.delete("/:id", authMiddleware, tenantMiddleware, controller.delete);

export default router;
