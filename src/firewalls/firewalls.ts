import { BaseAPI } from "../base"
import type { APIError } from "../types"
import type {
  Firewall,
  FirewallsResponse,
  FirewallRule,
  FirewallResource,
  FirewallCreateResponse,
} from "./types"
import { FirewallActions } from "./actions"

export interface ListFirewallsParams {
  name?: string
  label_selector?: string
  sort?:
    | "id"
    | "id:asc"
    | "id:desc"
    | "name"
    | "name:asc"
    | "name:desc"
    | "created"
    | "created:asc"
    | "created:desc"
  page?: number
  per_page?: number
}

export interface CreateFirewallParams {
  name: string // max 128 chars
  labels?: Record<string, string>
  rules?: FirewallRule[]
  apply_to?: FirewallResource[]
}

export interface UpdateFirewallParams {
  name?: string // max 128 chars
  labels?: Record<string, string>
}

/**
 * Firewalls API
 *
 * Firewalls can limit the network access to or from your resources.
 * https://docs.hetzner.cloud/#firewalls
 *
 */
export class Firewalls extends BaseAPI {
  private _actions: FirewallActions | null = null

  /**
   * Get the actions instance for managing firewall actions
   */
  get actions(): FirewallActions {
    if (!this._actions) {
      this._actions = new FirewallActions(this.token)
    }
    return this._actions
  }

  /**
   * List all firewalls with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */
  async getAll(
    params?: ListFirewallsParams,
  ): Promise<
    { success: true; response: FirewallsResponse } | { success: false; response: APIError }
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
    return this.request<FirewallsResponse>(`/firewalls${queryString ? `?${queryString}` : ""}`)
  }

  /**
   * Create a new firewall
   * @param params Parameters for creating the firewall
   */
  async create(
    params: CreateFirewallParams,
  ): Promise<
    { success: true; response: FirewallCreateResponse } | { success: false; response: APIError }
  > {
    return this.request<FirewallCreateResponse>("/firewalls", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Get a specific firewall by ID
   * @param id The firewall ID
   */
  async get(
    id: number,
  ): Promise<
    { success: true; response: { firewall: Firewall } } | { success: false; response: APIError }
  > {
    return this.request<{ firewall: Firewall }>(`/firewalls/${id}`)
  }

  /**
   * Update a firewall's properties
   * @param id The firewall ID
   * @param params Parameters to update
   */
  async update(
    id: number,
    params: UpdateFirewallParams,
  ): Promise<
    { success: true; response: { firewall: Firewall } } | { success: false; response: APIError }
  > {
    return this.request<{ firewall: Firewall }>(`/firewalls/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete a firewall
   * @param id The firewall ID
   */
  async delete(
    id: number,
  ): Promise<{ success: true; response: null } | { success: false; response: APIError }> {
    return this.request<null>(`/firewalls/${id}`, {
      method: "DELETE",
    })
  }
}
