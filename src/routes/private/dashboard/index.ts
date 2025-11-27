import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Rota privada de dashboard" });
});

export default router;
