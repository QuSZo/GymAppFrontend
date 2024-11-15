"use client";

import { createContext, Dispatch, SetStateAction, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { signIn } from "@/api/controllers/auth";

type AuthContextProps = {
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>({
  reload: false,
  setReload: () => {},
  accessToken: null,
  login: async () => {},
  logout: async () => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [reload, setReload] = useState(false);
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const response = await signIn({ email, password }, router);
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

  return <AuthContext.Provider value={{ reload, setReload, accessToken: cookie["accessToken"], login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
