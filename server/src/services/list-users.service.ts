import { UserResponseModel } from "../models/user.model"
import { listUsersRepository } from "../repositories/list-users.repository"

export async function listUsersService() {
    //Aqui poderia ter regra de negócio, validações, etc.

    const users = await listUsersRepository()
    return users.map(user => UserResponseModel.parse(user))
}