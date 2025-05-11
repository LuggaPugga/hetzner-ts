import type { Action } from "../../actions/types"
import { BaseAPI } from "../../base"
import type { APIError } from "../../types"
import type {
  CreatePrimaryIPResponse,
  ListPrimaryIPResponse,
  PrimaryIP as PrimaryIPType,
} from "./types"

export interface ListPrimaryIPsParams {
  name?: string
  fingerprint?: string
  label_selector?: string
  sort?: "id" | "id:asc" | "id:desc" | "name" | "name:asc" | "name:desc"
  page?: number
  per_page?: number
}

export interface CreatePrimaryIPParams {
  name: string
  type: "ipv4" | "ipv6"
  assignee_type: string
  assignee_id?: number | null
  auto_delete?: boolean
  datacenter?: string
  labels?: Record<string, string>
}

export interface UpdatePrimaryIPParams {
  name?: string
  labels?: Record<string, string>
  auto_delete?: boolean
}
/**
 * Primary Ips API
 *
 * Primary IPs help you to create more flexible networking setups.
 * https://docs.hetzner.cloud/#primary-ips
 *
 */

export class PrimaryIP extends BaseAPI {
  /**
   * List all primary ips with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */
  async list(
    params?: ListPrimaryIPsParams,
  ): Promise<
    { success: true; response: ListPrimaryIPResponse } | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request<ListPrimaryIPResponse>(
      `/primary_ips${queryParams ? `?${queryParams}` : ""}`,
    )
  }

  /**
   * Get a primary ip by id
   * @param id The id of the primary ip
   */
  async get(
    id: number,
  ): Promise<
    | { success: true; response: { primary_ip: PrimaryIPType } }
    | { success: false; response: APIError }
  > {
    return this.request<{ primary_ip: PrimaryIPType }>(`/primary_ips/${id}`)
  }

  /**
   * Create a primary ip
   * @param params The parameters for creating the primary ip
   */
  async create(
    params: CreatePrimaryIPParams,
  ): Promise<
    { success: true; response: CreatePrimaryIPResponse } | { success: false; response: APIError }
  > {
    return this.request<CreatePrimaryIPResponse>("/primary_ips", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Update a primary ip
   * @param id The id of the primary ip
   * @param params The parameters for updating the primary ip
   */
  async update(
    id: number,
    params: UpdatePrimaryIPParams,
  ): Promise<
    | { success: true; response: { primary_ip: PrimaryIPType } }
    | { success: false; response: APIError }
  > {
    return this.request<{ primary_ip: PrimaryIPType }>(`/primary_ips/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete a primary ip
   * @param id The id of the primary ip
   */
  async delete(
    id: number,
  ): Promise<{ success: true; response: Action } | { success: false; response: APIError }> {
    return this.request<Action>(`/primary_ips/${id}`, {
      method: "DELETE",
    })
  }
}
