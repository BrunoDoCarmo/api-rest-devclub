import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma";
import type { CreateUserModel } from "../models/user/create-user.model";

export class UserRepository {
    async create(data: CreateUserModel, tenantId: string, responsibleId: string) {
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(data.password, salt);

        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                username: data.username,
                password: hashPassword,
                role: data.role ?? "USER",

                tenantId,
                responsibleId,
            }
        })
    }
}