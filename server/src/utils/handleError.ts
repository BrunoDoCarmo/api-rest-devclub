import type { Response } from "express";
import AppError from "./AppError";

export default function handleError(error: unknown, res: Response) {
    // If it's our AppError
    if (error instanceof AppError) {
        const { message, statusCode } = error;
        return res.status(statusCode).json({
            status: "error",
            message,
        });
    }

    // If it's a known error shape from Prisma or others, you can extend here
    // Fallback - internal server error
    console.error("Unhandled error:", error);
    return res.status(500).json({
        status: "error",
        message: "Internal server error",
    });
}
