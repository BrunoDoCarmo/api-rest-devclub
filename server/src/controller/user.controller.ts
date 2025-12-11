import type { Request, Response } from 'express';
import { createUserService } from '../services/user.service';
import { createUserSchema } from '../models/user.model';

export async function createUserController(req: Request, res: Response) {
  try {
    const parsed = createUserSchema.parse(req.body);
    const user = await createUserService(parsed);
    res.status(201).json(user);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
}
