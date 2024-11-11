"use client";

import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { customCommand } from "@/api/customFetch";
import { jwtDecode } from "jwt-decode";

type AuthContextProps = {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  accessToken: null,
  login: async () => {},
  logout: async () => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const response = await customCommand("users/sign-in", "POST", { email, password });
    const { accessToken } = response;
    const now = new Date();
    const expiryClaim = jwtDecode(accessToken).exp;
    const expiryDate = new Date(expiryClaim ? expiryClaim * 1000 : now.setHours(now.getHours() + 12));
    setCookie("accessToken", accessToken, { path: "/", expires: expiryDate });
    const today = new Date().toLocaleDateString("sv-SE");
    router.push(`/workout/${today}`);
  };

  const logout = () => {
    removeCookie("accessToken", { path: "/" });
    router.push("/sign-in");
  };

  return <AuthContext.Provider value={{ accessToken: cookie["accessToken"], login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
