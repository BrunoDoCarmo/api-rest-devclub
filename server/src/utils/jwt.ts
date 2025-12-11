import jwt from 'jsonwebtoken'
import type { StringValue } from "ms";
import dotenv from 'dotenv'

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET as string
const ACCESS_EXPIRES: StringValue = (process.env.ACCESS_TOKEN_EXPIRES_IN ?? "15m") as StringValue
const REFRESH_EXPIRES: StringValue = (process.env.REFRESH_TOKEN_EXPIRES_IN ?? '7d') as StringValue

export function signAccessToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET,{ expiresIn: ACCESS_EXPIRES })
}

export function signRefreshToken(payload: object) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_EXPIRES })
}

export function verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET)
}