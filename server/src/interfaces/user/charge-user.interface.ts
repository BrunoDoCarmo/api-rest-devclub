import type { UserState } from "../../constants/user/user-state.contant";

export interface changeUserParams {
    name: string,
    email: string,
    username: string,
    password: string,
    state: UserState
}