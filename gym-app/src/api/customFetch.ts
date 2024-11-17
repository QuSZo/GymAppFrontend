import { API_URL } from "@/api/controllers/conf";
import { useRouter } from "next/navigation";
import { ApiError } from "@/common/lib/ApiError";

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

type ErrorResponse = {
  code: string;
  reason: string;
};

export async function customQuery(url: string, router: ReturnType<typeof useRouter>, signal?: AbortSignal): Promise<Response> {
  const response = await fetch(API_URL + url, {
    signal: signal,
    headers: getHeaders(),
  });
  if (!response.ok) {
    if (response.status === 401) {
      router.push("/unauthorized");
    } else if (response.status === 403) {
      router.push("/forbidden");
    } else if (response.status >= 500 && response.status <= 599) {
      router.push("/error");
    } else if (response.status === 400) {
      const errorResponse: ErrorResponse = await response.json();
      throw new ApiError(errorResponse.code);
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
    if (response.status === 401) {
      router.push("/unauthorized");
    } else if (response.status === 403) {
      router.push("/forbidden");
    } else if (response.status >= 500 && response.status <= 599) {
      router.push("/error");
    } else if (response.status === 400) {
      const errorResponse: ErrorResponse = await response.json();
      console.log(errorResponse);
      throw new ApiError(errorResponse.code);
    } else {
      throw new Error(`${response.statusText}`);
    }
  }

  return response;
}
