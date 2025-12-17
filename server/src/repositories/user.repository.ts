import type { connect } from "http2";
import { prisma } from "../lib/prisma";
import type { CreateUserModel } from "../models/user/create-user.model";

export class UserRepository {
    async create(data: CreateUserModel) {
        return prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                username: data.username,
                password: data.password,
                role: "USER",
                tenant: {
                    connect: {
                        id: data.tenantId
                    }
                },
                responsible: {
                    connect: {
                        id: data.responsibleId
                    }
                }
            }
        })
    }
}