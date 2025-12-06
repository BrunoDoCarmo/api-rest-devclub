export const USER_STATE = {
  ACTIVE: "ATIVO",
  DISABLED: "DESATIVADO",
  DELETED: "DELETADO",
} as const;

export type UserState = typeof USER_STATE[keyof typeof USER_STATE];