import { customCommand } from "@/api/customFetch";

export type registerCommand = {
  email: string;
  password: string;
};

export type forgotPasswordCommand = {
  email: string;
};

export type resetPasswordCommand = {
  token: string;
  email: string;
  password: string;
};

export type signInCommand = {
  email: string;
  password: string;
};

export type signInResponse = {
  accessToken: string;
};

export async function signIn(command: signInCommand): Promise<signInResponse> {
  const response = await customCommand("users/sign-in", "POST", command);
  return response.json();
}

export async function register(command: registerCommand) {
  await customCommand<registerCommand>("users/sign-up", "POST", command);
}

export async function forgotPassword(command: forgotPasswordCommand) {
  await customCommand<forgotPasswordCommand>("users/forgot-password", "POST", command);
}

export async function resetPassword(command: resetPasswordCommand) {
  await customCommand<resetPasswordCommand>("users/reset-password", "POST", command);
}
