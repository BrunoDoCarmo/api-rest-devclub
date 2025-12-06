import { Router } from "express";
import useUser from "./user/index";

const router = Router();

router.use("/user", useUser);

export default router;
