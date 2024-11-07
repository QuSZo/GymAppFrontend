import { API_URL } from "@/api/conf";

type commandMethods = "POST" | "PUT" | "PATCH" | "DELETE";

export async function customQuery<T>(url: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(API_URL + url, { signal: signal });
  if (!response.ok) throw new Error(`${response.statusText}`);
  return response.json();
}

// eslint-disable-next-line
export async function customCommand<TCommand>(url: string, method: commandMethods, body?: TCommand): Promise<any> {
  const response = await fetch(API_URL + url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`${response.statusText}`);

  const contentType = response.headers.get("Content-Type");
  if (contentType?.includes("application/json")) {
    return response.json();
  }

  return null;
}
