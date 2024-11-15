import { API_URL } from "@/api/conf";
import Router from "next/router";

type commandMethods = "POST" | "PUT" | "PATCH" | "DELETE";

type Headers = {
  "Content-Type": string;
  Authorization?: string;
};

function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

function getHeaders() {
  const headers: Headers = {
    "Content-Type": "application/json",
  };
  const accessToken = getCookie("accessToken");

  if (!accessToken) return headers;

  headers.Authorization = `Bearer ${accessToken}`;
  return headers;
}

export async function customQuery(url: string, signal?: AbortSignal): Promise<Response> {
  const response = await fetch(API_URL + url, {
    signal: signal,
    headers: getHeaders(),
  });
  if (!response.ok) {
    Router.push("/tokenExpiry");
  }
  return response;
}

export async function customCommand<TCommand>(url: string, method: commandMethods, body?: TCommand): Promise<Response> {
  const response = await fetch(API_URL + url, {
    method: method,
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`${response.statusText}`);

  return response;
}
