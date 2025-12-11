import type { Request, Response } from 'express';
import { loginService } from '../services/auth.service';

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const tokens = await loginService(email, password);
    res.json(tokens);
  } catch (err: any) {
    res.status(401).json({ message: err.message });
  }
}
