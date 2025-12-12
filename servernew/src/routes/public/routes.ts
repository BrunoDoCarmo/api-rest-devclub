import { Router } from "express";
import useUser from "./user.routes";
import useResponsible from "./responsible.routes";
import useCompany from "./company.routes";

const router = Router();

router.use("/user", useUser);
router.use("/responsible", useResponsible);
router.use("/company", useCompany);


export default router;
