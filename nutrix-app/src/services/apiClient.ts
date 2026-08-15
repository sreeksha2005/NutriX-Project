import { API_BASE_URL } from "@/constants/config";

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function handle<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new ApiError(`Request failed (${res.status})`, res.status);
  }
  return (await res.json()) as T;
}

export const apiClient = {
  async get<T>(path: string): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`);
    return handle<T>(res);
  },

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handle<T>(res);
  },

  /** Multipart upload — used to send a food photo to the model server. */
  async upload<T>(path: string, uri: string, field = "image"): Promise<T> {
    const form = new FormData();
    const name = uri.split("/").pop() ?? "food.jpg";
    const ext = name.split(".").pop()?.toLowerCase() ?? "jpg";
    form.append(field, {
      uri,
      name,
      type: `image/${ext === "jpg" ? "jpeg" : ext}`,
    } as unknown as Blob);

    const res = await fetch(`${API_BASE_URL}${path}`, { method: "POST", body: form });
    return handle<T>(res);
  },
};
