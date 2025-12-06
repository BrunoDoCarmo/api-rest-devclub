import type { UserResponse } from "../interfaces/user-response.interface"
import { findUserByIdRepository } from "../repositories/find-user-by-id.repository"

export async function findUserByIdService(id: string): Promise<UserResponse> {
    const user = await findUserByIdRepository(id)

    if (!user) {
        throw new Error("NOT_FOUND")
    }

    return user
}