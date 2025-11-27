import { Router } from "express";

const router = Router();

router.post("/cadastro", (req, res) => {
  const user = req.body;

  res.status(201).json(user);
});
router.get("/", (req, res) => {
  res.json({ message: "Rota pública de usuários!" });
});

export default router;
