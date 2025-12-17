import jwt from "jsonwebtoken";

export function signAccessToken(payload: {
  sub: string;
  role: string;
  tenantId: string;
}) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
    expiresIn: "15m",
  });
}

export function signRefreshToken(payload: { sub: string }) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, {
    expiresIn: "7d",
  });
}
