import type { APIError } from "./types"

export class BaseAPI {
  protected token: string
  protected baseUrl = "https://api.hetzner.cloud/v1"

  constructor(token: string) {
    this.token = token
  }

  public async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<{ success: true; response: T } | { success: false; response: APIError }> {
    const res = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
    })
    const response = res.status === 204 ? null : await res.json()
    if (!res.ok) {
      return {
        success: false,
        response: response as APIError,
      }
    }
    return {
      success: true,
      response: response as T,
    }
  }
}
