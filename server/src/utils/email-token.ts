import crypto from "crypto";

export function generateEmailToken() {
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    return { 
        token,
        tokenHash,
        // expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
    };
}
