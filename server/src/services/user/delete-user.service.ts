import { deleteUserRepository } from "../../repositories/user/delete-user.repository";

export async function deleteUserService(id: string) {
    return await deleteUserRepository(id)
}