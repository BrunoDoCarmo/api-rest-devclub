"use server";

import { SignupDTO } from "../types/signup";

export type SignupSuccess = {
  success: true;
  accessToken: string;
  refreshToken: string;
};

export type SignupError = {
  success: false;
  message: string;
};

export type SignupResult = SignupSuccess | SignupError;

export async function signupAction(payload: SignupDTO): Promise<SignupResult> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/public/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();
    return { success: false, message: error.message };
  }

  const data = await res.json();

  return {
    success: true,
    accessToken: data.accessToken as string,
    refreshToken: data.refreshToken as string,
  };
}
