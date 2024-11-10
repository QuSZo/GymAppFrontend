import { customCommand } from "@/api/customFetch";

type JwtDto = {
  accessToken: string;
};

export type registerCommand = {
  email: string;
  password: string;
};

//export async function signIn(email: string, password: string) {}

export async function register(command: registerCommand): Promise<JwtDto> {
  return await customCommand<registerCommand>("sign-up", "POST", command);
}

export async function resetPassword(email: string) {
  console.log(email);
}
