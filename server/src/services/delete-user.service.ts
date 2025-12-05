import { deleteUserRepository } from "../repositories/delete-user.repository";

export async function deleteUserService(id: string) {
    return await deleteUserRepository(id)
}