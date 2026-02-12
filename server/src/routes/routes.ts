import { Router } from "express";
import usePublic from "./public/public.routes";
import usePrivate from "./private/private.routes";

const router = Router();

router.use("/public", usePublic);
router.use("/private", usePrivate);

export default router;
