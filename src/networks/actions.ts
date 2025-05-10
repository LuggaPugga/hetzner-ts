import { BaseAPI } from "../base"
import type { APIError } from "../types"
import type {
  AddRouteNetworkParams,
  AddSubnetNetworkParams,
  ChangeIPRangeNetworkParams,
  ChangeProtectionNetworkParams,
  DeleteRouteNetworkParams,
  DeleteSubnetNetworkParams,
  NetworkAction,
  NetworkActionsResponse,
  ListNetworkActionsParams,
} from "./types"

export class NetworkActions extends BaseAPI {
  /**
   * List all actions for Networks
   * @param params Optional parameters for filtering and pagination
   */
  async listAll(
    params?: ListNetworkActionsParams
  ): Promise<
    { success: true; response: NetworkActionsResponse } | { success: false; response: APIError }
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
    return this.request<NetworkActionsResponse>(
      `/networks/actions${queryString ? `?${queryString}` : ""}`
    )
  }

  /**
   * Get a specific action for Networks
   * @param actionId The action ID
   */
  async get(
    actionId: number
  ): Promise<{ success: true; response: NetworkAction } | { success: false; response: APIError }> {
    return this.request<NetworkAction>(`/networks/actions/${actionId}`)
  }

  /**
   * List actions for a specific Network
   * @param networkId The Network ID
   * @param params Optional parameters for filtering and pagination
   */
  async listForNetwork(
    networkId: number,
    params?: ListNetworkActionsParams
  ): Promise<
    { success: true; response: NetworkActionsResponse } | { success: false; response: APIError }
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
    return this.request<NetworkActionsResponse>(
      `/networks/${networkId}/actions${queryString ? `?${queryString}` : ""}`
    )
  }

  /**
   * Get a specific action for a specific Network
   * @param networkId The Network ID
   * @param actionId The action ID
   */
  async getForNetwork(
    networkId: number,
    actionId: number
  ): Promise<{ success: true; response: NetworkAction } | { success: false; response: APIError }> {
    return this.request<NetworkAction>(`/networks/${networkId}/actions/${actionId}`)
  }

  /**
   * Add a route to a Network
   * @param networkId The Network ID
   * @param params Parameters for adding the route
   */
  async addRoute(
    networkId: number,
    params: AddRouteNetworkParams
  ): Promise<{ success: true; response: NetworkAction } | { success: false; response: APIError }> {
    return this.request<NetworkAction>(`/networks/${networkId}/actions/add_route`, {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete a route from a Network
   * @param networkId The Network ID
   * @param params Parameters for deleting the route
   */
  async deleteRoute(
    networkId: number,
    params: DeleteRouteNetworkParams
  ): Promise<{ success: true; response: NetworkAction } | { success: false; response: APIError }> {
    return this.request<NetworkAction>(`/networks/${networkId}/actions/delete_route`, {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Add a subnet to a Network
   * @param networkId The Network ID
   * @param params Parameters for adding the subnet
   */
  async addSubnet(
    networkId: number,
    params: AddSubnetNetworkParams
  ): Promise<{ success: true; response: NetworkAction } | { success: false; response: APIError }> {
    return this.request<NetworkAction>(`/networks/${networkId}/actions/add_subnet`, {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete a subnet from a Network
   * @param networkId The Network ID
   * @param params Parameters for deleting the subnet
   */
  async deleteSubnet(
    networkId: number,
    params: DeleteSubnetNetworkParams
  ): Promise<{ success: true; response: NetworkAction } | { success: false; response: APIError }> {
    return this.request<NetworkAction>(`/networks/${networkId}/actions/delete_subnet`, {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Change the IP range of a Network
   * @param networkId The Network ID
   * @param params Parameters for changing the IP range
   */
  async changeIPRange(
    networkId: number,
    params: ChangeIPRangeNetworkParams
  ): Promise<{ success: true; response: NetworkAction } | { success: false; response: APIError }> {
    return this.request<NetworkAction>(`/networks/${networkId}/actions/change_ip_range`, {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Change the protection status of a Network
   * @param networkId The Network ID
   * @param params Parameters for changing the protection status
   */
  async changeProtection(
    networkId: number,
    params: ChangeProtectionNetworkParams
  ): Promise<{ success: true; response: NetworkAction } | { success: false; response: APIError }> {
    return this.request<NetworkAction>(`/networks/${networkId}/actions/change_protection`, {
      method: "POST",
      body: JSON.stringify(params),
    })
  }
}
