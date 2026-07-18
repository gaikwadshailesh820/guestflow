/**
 * Minimal fetch wrapper for the GuestFlow REST API.
 *
 * Base URL comes from VITE_API_URL (set in .env / .env.example) so it's easy
 * to point at a different backend (e.g. a deployed one) without code changes.
 */
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path, options = {}) {
  const token = localStorage.getItem("token");

  let res;

  try {
    res = await fetch(`${BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch {
    throw new ApiError(
      "Could not reach the GuestFlow server. Is the backend running?",
      0
    );
  }

  if (res.status === 204) {
    return null;
  }

  const isJson = res.headers
    .get("content-type")
    ?.includes("application/json");

  const data = isJson
    ? await res.json().catch(() => null)
    : null;

  if (!res.ok) {
    throw new ApiError(
      data?.message ||
      data?.error ||
      `Request failed with status ${res.status}`,
      res.status
    );
  }

  return data;
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),

  recommendRoom: (body) =>
  request("/ai/recommend-room", {
    method: "POST",
    body: JSON.stringify(body),
  }),
};

export { ApiError };
