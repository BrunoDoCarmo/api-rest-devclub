declare namespace Express {
    export interface Request {
        tenant?: {
            id: string,
            size: "small" | "medium" | "big",
            name?: string
        }
    }
}