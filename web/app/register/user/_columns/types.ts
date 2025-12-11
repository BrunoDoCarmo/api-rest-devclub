import { USER_STATE } from "@/app/_constants/user";

export type SerializedUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  username: string;
  createdAt: string;
  updatedAt: string;
  state: keyof typeof USER_STATE; // <-- IMPORTANTE
};