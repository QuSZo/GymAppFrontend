import { customCommand } from "@/api/customFetch";
import { UUID } from "node:crypto";

type JwtDto = {
  accessToken: string;
};

export type registerCommand = {
  email: string;
  password: string;
};

export async function signIn(email: string, password: string) {}

export async function register(command: registerCommand): Promise<JwtDto> {
  return await customCommand<registerCommand>("sign-up", "POST", command);
}

export async function resetPassword(email: string) {}
