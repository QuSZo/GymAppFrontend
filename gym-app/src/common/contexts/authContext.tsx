"use client";

import { createContext, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { customCommand } from "@/api/customFetch";
import { jwtDecode } from "jwt-decode";

type AuthContextProps = {
  accessToken: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextProps>(null);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [cookie, setCookie, removeCookie] = useCookies(["accessToken"]);
  const router = useRouter();

  useEffect(() => {
    // const accessToken = localStorage.getItem("accessToken");
    // if (accessToken) {
    //   setAccessToken("accessToken", accessToken);
    // }
  }, []);

  const login = async (email: string, password: string) => {
    const response = await customCommand("users/sign-in", "POST", { email, password });
    const { accessToken } = response;
    const now = new Date();
    const expiryClaim = jwtDecode(accessToken).exp;
    const expiryDate = new Date(expiryClaim ? expiryClaim * 1000 : now.setHours(now.getHours() + 12));
    setCookie("accessToken", accessToken, { path: "/", expires: expiryDate });
    router.push("/workout");
    console.log("xd");
  };

  const logout = () => {
    removeCookie("accessToken");
    router.push("/sign-in");
  };

  return <AuthContext.Provider value={{ accessToken: cookie["accessToken"], login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
