import { Router } from "express";
import { createResponsibleController } from "../../controller/resposible/create-resposible.controller";

const router = Router()

router.post("/create", createResponsibleController)

export default router