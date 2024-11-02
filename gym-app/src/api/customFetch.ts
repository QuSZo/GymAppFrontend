import { API_URL } from "@/api/conf";

type commandMethods = "POST" | "PUT" | "PATCH" | "DELETE";

export async function customQuery<T>(url: string): Promise<T> {
  const response = await fetch(API_URL + url);
  if (!response.ok) throw new Error(`${response.statusText}`);
  return response.json();
}

export async function customCommand<TCommand>(url: string, method: commandMethods, body?: TCommand): Promise<any> {
  const response = await fetch(API_URL + url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`${response.statusText}`);

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return null;
}
