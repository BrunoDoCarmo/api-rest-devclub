import type { changeUserParams } from "../interfaces/charge-user.interface";
import { changeUserRepository } from "../repositories/change-user.repository";

export async function changeUserServices(id: string, data: changeUserParams) {
    //Aqui você poderia validar email, senha, etc.

    return await changeUserRepository(id, data)
}