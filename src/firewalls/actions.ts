import { BaseAPI } from "../base"
import type { APIError } from "../types"
import type {
  FirewallAction,
  FirewallActionsResponse,
  FirewallRule,
  FirewallResource,
  SortOption,
  ActionStatus,
} from "./types"

/**
 * Firewall Actions API
 *
 * Returns all Actions for Firewalls.
 * https://docs.hetzner.cloud/#firewalls-actions
 *
 */
export class FirewallActions extends BaseAPI {
  /**
   * List all actions for firewalls
   * @param params Optional parameters for filtering and pagination
   */
  async getAll(params?: {
    id?: number
    sort?: SortOption
    status?: ActionStatus
    page?: number
    per_page?: number
  }): Promise<
    { success: true; response: FirewallActionsResponse } | { success: false; response: APIError }
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
    return this.request<FirewallActionsResponse>(
      `/firewalls/actions${queryString ? `?${queryString}` : ""}`,
    )
  }

  /**
   * Get a specific action for a firewall
   */
  async get(
    firewallId: number,
    actionId: number,
  ): Promise<
    { success: true; response: { action: FirewallAction } } | { success: false; response: APIError }
  > {
    return this.request<{ action: FirewallAction }>(`/firewalls/${firewallId}/actions/${actionId}`)
  }

  /**
   * Apply firewall to resources
   */
  async applyToResources(
    firewallId: number,
    resources: FirewallResource[],
  ): Promise<
    { success: true; response: { action: FirewallAction } } | { success: false; response: APIError }
  > {
    return this.request<{ action: FirewallAction }>(
      `/firewalls/${firewallId}/actions/apply_to_resources`,
      {
        method: "POST",
        body: JSON.stringify({ apply_to: resources }),
      },
    )
  }

  /**
   * Remove firewall from resources
   */
  async removeFromResources(
    firewallId: number,
    resources: FirewallResource[],
  ): Promise<
    { success: true; response: { action: FirewallAction } } | { success: false; response: APIError }
  > {
    return this.request<{ action: FirewallAction }>(
      `/firewalls/${firewallId}/actions/remove_from_resources`,
      {
        method: "POST",
        body: JSON.stringify({ remove_from: resources }),
      },
    )
  }

  /**
   * Set firewall rules
   */
  async setRules(
    firewallId: number,
    rules: FirewallRule[] | [], // Pass an empty array to remove all rules
  ): Promise<
    { success: true; response: { action: FirewallAction } } | { success: false; response: APIError }
  > {
    return this.request<{ action: FirewallAction }>(`/firewalls/${firewallId}/actions/set_rules`, {
      method: "POST",
      body: JSON.stringify({ rules }),
    })
  }

  /**
   * Get all actions for a specific firewall
   */
  async getFirewallActions(
    firewallId: number,
    params?: {
      sort?: SortOption
      status?: ActionStatus
      page?: number
      per_page?: number
    },
  ): Promise<
    { success: true; response: FirewallActionsResponse } | { success: false; response: APIError }
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
    return this.request<FirewallActionsResponse>(
      `/firewalls/${firewallId}/actions${queryString ? `?${queryString}` : ""}`,
    )
  }

  /**
   * Returns a specific Action for a Firewall.
   */
  async getFirewallAction(
    firewallId: number,
    actionId: number,
  ): Promise<
    { success: true; response: { action: FirewallAction } } | { success: false; response: APIError }
  > {
    return this.request<{ action: FirewallAction }>(`/firewalls/${firewallId}/actions/${actionId}`)
  }
}
