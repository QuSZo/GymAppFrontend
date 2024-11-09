import { API_URL } from "@/api/conf";
import Cookies from "js-cookie";

type commandMethods = "POST" | "PUT" | "PATCH" | "DELETE";

function getCookie(key: string) {
  const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
  return b ? b.pop() : "";
}

function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const accessToken = getCookie("accessToken");

  if (!accessToken) return headers;

  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  return headers;
}

export async function customQuery<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(API_URL + url, {
    signal: signal,
    headers: getHeaders(),
  });
  if (!response.ok) throw new Error(`${response.statusText}`);
  return response.json();
}

// eslint-disable-next-line
export async function customCommand<TCommand>(url: string, method: commandMethods, body?: TCommand): Promise<any> {
  const response = await fetch(API_URL + url, {
    method: method,
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`${response.statusText}`);

  const contentType = response.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return null;
}
