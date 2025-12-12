import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

const auth = (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Acesso negado. Token não fornecido." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: "Token expirado!" });
  }

  next();
};

export default auth;
