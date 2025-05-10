import { BaseAPI } from "../base"
import type { APIError } from "../types"
import type {
  AddServiceLoadBalancerParams,
  AddTargetLoadBalancerParams,
  AttachToNetworkLoadBalancerParams,
  ChangeAlgorithmLoadBalancerParams,
  ChangeDNSPTRLoadBalancerParams,
  ChangeProtectionLoadBalancerParams,
  ChangeTypeLoadBalancerParams,
  DeleteServiceLoadBalancerParams,
  DetachFromNetworkLoadBalancerParams,
  ListLoadBalancerActionsParams,
  LoadBalancerActionResponse, // For single action responses
  LoadBalancerActionsResponse, // For list action responses
  RemoveTargetLoadBalancerParams,
  UpdateServiceLoadBalancerParams,
} from "./types"

export class LoadBalancerActions extends BaseAPI {
  /**
   * List all global actions for Load Balancers
   * @param params Optional parameters for filtering and pagination
   */
  async listAllGlobal(
    params?: ListLoadBalancerActionsParams
  ): Promise<
    | { success: true; response: LoadBalancerActionsResponse }
    | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v.toString()))
          } else {
            queryParams.append(key, value.toString())
          }
        }
      })
    }
    const queryString = queryParams.toString()
    return this.request<LoadBalancerActionsResponse>(
      `/load_balancers/actions${queryString ? `?${queryString}` : ""}`
    )
  }

  /**
   * Get a specific global action for Load Balancers
   * @param actionId The action ID
   */
  async getGlobalAction(
    actionId: number
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(`/load_balancers/actions/${actionId}`)
  }

  /**
   * List actions for a specific Load Balancer
   * @param loadBalancerId The Load Balancer ID
   * @param params Optional parameters for filtering and pagination
   */
  async listForLoadBalancer(
    loadBalancerId: number,
    params?: ListLoadBalancerActionsParams
  ): Promise<
    | { success: true; response: LoadBalancerActionsResponse }
    | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((v) => queryParams.append(key, v.toString()))
          } else {
            queryParams.append(key, value.toString())
          }
        }
      })
    }
    const queryString = queryParams.toString()
    return this.request<LoadBalancerActionsResponse>(
      `/load_balancers/${loadBalancerId}/actions${queryString ? `?${queryString}` : ""}`
    )
  }

  /**
   * Get a specific action for a specific Load Balancer
   * @param loadBalancerId The Load Balancer ID
   * @param actionId The action ID
   */
  async getAction(
    loadBalancerId: number,
    actionId: number
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/${actionId}`
    )
  }

  async addService(
    loadBalancerId: number,
    params: AddServiceLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/add_service`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async updateService(
    loadBalancerId: number,
    params: UpdateServiceLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/update_service`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async deleteService(
    loadBalancerId: number,
    params: DeleteServiceLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/delete_service`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async addTarget(
    loadBalancerId: number,
    params: AddTargetLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/add_target`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async removeTarget(
    loadBalancerId: number,
    params: RemoveTargetLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/remove_target`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async attachToNetwork(
    loadBalancerId: number,
    params: AttachToNetworkLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/attach_to_network`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async detachFromNetwork(
    loadBalancerId: number,
    params: DetachFromNetworkLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/detach_from_network`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async changeAlgorithm(
    loadBalancerId: number,
    params: ChangeAlgorithmLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/change_algorithm`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async changeDNSPTR(
    loadBalancerId: number,
    params: ChangeDNSPTRLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/change_dns_ptr`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async changeProtection(
    loadBalancerId: number,
    params: ChangeProtectionLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/change_protection`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async changeType(
    loadBalancerId: number,
    params: ChangeTypeLoadBalancerParams
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/change_type`,
      { method: "POST", body: JSON.stringify(params) }
    )
  }

  async enablePublicInterface(
    loadBalancerId: number
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/enable_public_interface`,
      { method: "POST" }
    )
  }

  async disablePublicInterface(
    loadBalancerId: number
  ): Promise<
    { success: true; response: LoadBalancerActionResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerActionResponse>(
      `/load_balancers/${loadBalancerId}/actions/disable_public_interface`,
      { method: "POST" }
    )
  }
}
