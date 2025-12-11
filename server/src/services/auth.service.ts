import bcrypt from 'bcryptjs';
import { findUserByEmail } from '../repositories/user.repository';
import { signAccessToken, signRefreshToken } from '../utils/jwt';

export async function loginService(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error('Invalid credentials');

  const access = signAccessToken({ sub: user.id, tenantId: user.tenantId });
  const refresh = signRefreshToken({ sub: user.id, tenantId: user.tenantId });
  return { access, refresh };
}
