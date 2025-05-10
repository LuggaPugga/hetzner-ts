import { BaseAPI } from "../base"
import type { APIError } from "../types"
import { FloatingIPActions } from "./actions"
import type {
  CreateFloatingIPParams,
  FloatingIP,
  FloatingIPsResponse,
  ListFloatingIPsParams,
  UpdateFloatingIPParams,
} from "./types"

export class FloatingIPs extends BaseAPI {
  private _actions: FloatingIPActions | null = null

  /**
   * List all Floating IPs with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */
  async list(
    params?: ListFloatingIPsParams,
  ): Promise<
    { success: true; response: FloatingIPsResponse } | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const queryString = queryParams.toString()
    return this.request<FloatingIPsResponse>(`/floating_ips${queryString ? `?${queryString}` : ""}`)
  }

  /**
   * Get a specific Floating IP by ID
   * @param id The Floating IP ID
   */
  async get(
    id: number,
  ): Promise<{ success: true; response: FloatingIP } | { success: false; response: APIError }> {
    return this.request<FloatingIP>(`/floating_ips/${id}`)
  }

  /**
   * Create a new Floating IP
   * @param params Parameters for creating the Floating IP
   */
  async create(
    params: CreateFloatingIPParams,
  ): Promise<
    | { success: true; response: { floating_ip: FloatingIP } }
    | { success: false; response: APIError }
  > {
    return this.request<{ floating_ip: FloatingIP }>("/floating_ips", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Update a Floating IP's properties
   * @param id The Floating IP ID
   * @param params Parameters to update
   */
  async update(
    id: number,
    params: UpdateFloatingIPParams,
  ): Promise<
    | { success: true; response: { floating_ip: FloatingIP } }
    | { success: false; response: APIError }
  > {
    return this.request<{ floating_ip: FloatingIP }>(`/floating_ips/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete a Floating IP
   * @param id The Floating IP ID
   */
  async delete(
    id: number,
  ): Promise<{ success: true; response: null } | { success: false; response: APIError }> {
    return this.request<null>(`/floating_ips/${id}`, {
      method: "DELETE",
    })
  }

  get actions(): FloatingIPActions {
    if (!this._actions) {
      this._actions = new FloatingIPActions(this.token)
    }
    return this._actions
  }
}
