import { BaseAPI } from "../base"
import type { APIError } from "../types"
import { NetworkActions } from "./actions"
import type {
  CreateNetworkParams,
  ListNetworksParams,
  Network,
  NetworksResponse,
  UpdateNetworkParams,
} from "./types"

export class Networks extends BaseAPI {
  private _actions: NetworkActions | null = null

  /**
   * List all Networks with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */
  async list(
    params?: ListNetworksParams
  ): Promise<
    { success: true; response: NetworksResponse } | { success: false; response: APIError }
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
    return this.request<NetworksResponse>(`/networks${queryString ? `?${queryString}` : ""}`)
  }

  /**
   * Create a new Network
   * @param params Parameters for creating the Network
   */
  async create(
    params: CreateNetworkParams
  ): Promise<
    { success: true; response: { network: Network } } | { success: false; response: APIError }
  > {
    return this.request<{ network: Network }>("/networks", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Get a specific Network by ID
   * @param id The Network ID
   */
  async get(
    id: number
  ): Promise<
    { success: true; response: { network: Network } } | { success: false; response: APIError }
  > {
    return this.request<{ network: Network }>(`/networks/${id}`)
  }

  /**
   * Update a Network's properties
   * @param id The Network ID
   * @param params Parameters to update
   */
  async update(
    id: number,
    params: UpdateNetworkParams
  ): Promise<
    { success: true; response: { network: Network } } | { success: false; response: APIError }
  > {
    return this.request<{ network: Network }>(`/networks/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete a Network
   * @param id The Network ID
   */
  async delete(
    id: number
  ): Promise<{ success: true; response: null } | { success: false; response: APIError }> {
    return this.request<null>(`/networks/${id}`, {
      method: "DELETE",
    })
  }

  get actions(): NetworkActions {
    if (!this._actions) {
      this._actions = new NetworkActions(this.token)
    }
    return this._actions
  }
}
