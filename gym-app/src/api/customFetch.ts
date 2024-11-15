import { API_URL } from "@/api/controllers/conf";
import { useRouter } from "next/navigation";

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

export async function customQuery(url: string, router: ReturnType<typeof useRouter>, signal?: AbortSignal): Promise<Response> {
  const response = await fetch(API_URL + url, {
    signal: signal,
    headers: getHeaders(),
  });
  if (!response.ok) {
    if (response.status === 401) {
      router.push("/unauthorized");
    }
    if (response.status === 403) {
      router.push("/forbidden");
    }
    if (response.status >= 500 && response.status <= 599) {
      router.push("/error");
    } else {
      throw new Error(`${response.statusText}`);
    }
  }
  return response;
}

export async function customCommand<TCommand>(
  url: string,
  method: commandMethods,
  router: ReturnType<typeof useRouter>,
  body?: TCommand,
): Promise<Response> {
  const response = await fetch(API_URL + url, {
    method: method,
    headers: getHeaders(),
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    if (router && response.status === 401) {
      router.push("/tokenExpiry");
    } else {
      throw new Error(`${response.statusText}`);
    }
  }

  return response;
}
