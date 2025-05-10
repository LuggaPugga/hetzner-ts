import { BaseAPI } from "../base"
import type { APIError } from "../types"
import { LoadBalancerActions } from "./actions"
import type {
  CreateLoadBalancerParams,
  CreateLoadBalancerResponse,
  GetLoadBalancerMetricsParams,
  ListLoadBalancerTypesParams,
  ListLoadBalancersParams,
  LoadBalancerActionResponse,
  LoadBalancerMetricsResponse,
  LoadBalancerResponse,
  LoadBalancerTypeResponse,
  LoadBalancerTypesResponse,
  LoadBalancersResponse,
  UpdateLoadBalancerParams,
} from "./types"

export class LoadBalancers extends BaseAPI {
  private _actions: LoadBalancerActions | null = null

  /**
   * List all Load Balancers
   */
  async list(
    params?: ListLoadBalancersParams,
  ): Promise<
    { success: true; response: LoadBalancersResponse } | { success: false; response: APIError }
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
    return this.request<LoadBalancersResponse>(
      `/load_balancers${queryString ? `?${queryString}` : ""}`,
    )
  }

  /**
   * Create a new Load Balancer
   */
  async create(
    params: CreateLoadBalancerParams,
  ): Promise<
    { success: true; response: CreateLoadBalancerResponse } | { success: false; response: APIError }
  > {
    return this.request<CreateLoadBalancerResponse>("/load_balancers", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Get a specific Load Balancer by ID
   */
  async get(
    id: number,
  ): Promise<
    { success: true; response: LoadBalancerResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerResponse>(`/load_balancers/${id}`)
  }

  /**
   * Update a Load Balancer
   */
  async update(
    id: number,
    params: UpdateLoadBalancerParams,
  ): Promise<
    { success: true; response: LoadBalancerResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerResponse>(`/load_balancers/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete a Load Balancer
   */
  async delete(id: number): Promise<
    | { success: true; response: null | LoadBalancerActionResponse } // Can return an action or 204
    | { success: false; response: APIError }
  > {
    return this.request<null | LoadBalancerActionResponse>(`/load_balancers/${id}`, {
      method: "DELETE",
    })
  }

  /**
   * Get Metrics for a Load Balancer
   */
  async getMetrics(
    id: number,
    params: GetLoadBalancerMetricsParams,
  ): Promise<
    | { success: true; response: LoadBalancerMetricsResponse }
    | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value.toString())
      }
    })
    return this.request<LoadBalancerMetricsResponse>(
      `/load_balancers/${id}/metrics?${queryParams.toString()}`,
    )
  }

  // --- Load Balancer Type Methods ---
  /**
   * List all Load Balancer Types
   */
  async listTypes(
    params?: ListLoadBalancerTypesParams,
  ): Promise<
    { success: true; response: LoadBalancerTypesResponse } | { success: false; response: APIError }
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
    return this.request<LoadBalancerTypesResponse>(
      `/load_balancer_types${queryString ? `?${queryString}` : ""}`,
    )
  }

  /**
   * Get a specific Load Balancer Type by ID
   */
  async getType(
    id: number,
  ): Promise<
    { success: true; response: LoadBalancerTypeResponse } | { success: false; response: APIError }
  > {
    return this.request<LoadBalancerTypeResponse>(`/load_balancer_types/${id}`)
  }

  get actions(): LoadBalancerActions {
    if (!this._actions) {
      this._actions = new LoadBalancerActions(this.token)
    }
    return this._actions
  }
}
