import { State } from "../../generated/prisma/enums";
import { changeUserStateRepository } from "../../repositories/user/change-user-state.repository";

export async function changeUserStateService(id: string, state: State) {
    //Validação do ENUM (regra de negocio -> no service)

    if(!Object.values(State).includes(state)) {
        const validStates = Object.values(State).join(", ");
        throw new Error(`O estado '${state}' é inválido. Utilize: ${validStates}`);
    }

    return await changeUserStateRepository(id, state)
}