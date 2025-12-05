import { USER_STATE, type UserState } from "../constants/user-state.contant";
import { State } from "../generated/prisma/client";

export function mapToPrismaState(state: UserState): State {
    switch (state) {
        case USER_STATE.ACTIVE:
            return State.ACTIVE;
        case USER_STATE.DISABLED:
            return State.DISABLED;
        case USER_STATE.DELETED:
            return State.DISABLED;
        default:
            throw new Error("Estado inválido");
    }
}
