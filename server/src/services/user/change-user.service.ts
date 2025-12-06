import bcrypt from "bcryptjs";
import type { changeUserParams } from "../../interfaces/user/charge-user.interface";
import { changeUserRepository } from "../../repositories/user/change-user.repository";

export async function changeUserServices(id: string, data: changeUserParams) {
    //Aqui você poderia validar email, senha, etc.

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    return await changeUserRepository(id, {
        ...data,
        password: hashPassword
    })
}