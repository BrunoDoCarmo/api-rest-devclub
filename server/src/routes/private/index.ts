import { Router } from "express";
import useUser from "./user.routes";

const router = Router();

router.use("/user", useUser);

export default router;
