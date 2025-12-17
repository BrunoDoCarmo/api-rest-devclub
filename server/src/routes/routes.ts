import { Router } from "express";
// import authMiddleware from "../middlewares/auth.middleware";
// import tenantMiddleware from "../middlewares/tenant.middleware";
import usePublic from "./public/public.routes";
import usePrivate from "./private/private.routes";

const router = Router();

router.use("/public", usePublic);
// router.use("/private", authMiddleware, tenantMiddleware, usePrivate);

export default router;
