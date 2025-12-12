import { Router } from "express";
import { createCompanyController } from "../../controller/company/create-company.controller";

const router = Router()

router.post("/create", createCompanyController)

export default router