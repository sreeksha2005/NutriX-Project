import { API_BASE_URL } from "@/constants/config";
import { fetch } from "expo/fetch";
import { File } from "expo-file-system";

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

/** Wraps fetch so an unreachable server shows a clear message instead of a crash. */
async function request(path: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(`${API_BASE_URL}${path}`, init as never) as unknown as Response;
  } catch {
    throw new ApiError(
      `Can't reach the NutriX server at ${API_BASE_URL}. Make sure it is running and your phone is on the same Wi-Fi.`,
    );
  }
}

export const apiClient = {
  async get<T>(path: string): Promise<T> {
    const res = await request(path);
    return handle<T>(res);
  },

  async post<T>(path: string, body: unknown): Promise<T> {
    const res = await request(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return handle<T>(res);
  },

  /** Multipart upload — used to send a food photo to the model server. */
  async upload<T>(path: string, uri: string, field = "image"): Promise<T> {
    const file = new File(uri);

    const form = new FormData();
    form.append(field, file);

    const res = await request(path, {
      method: "POST",
      body: form as never,
    });

    return handle<T>(res);
  },
};

