import type { Action } from "../../actions/types"
import { BaseAPI } from "../../base"
import type { APIError } from "../../types"
import type { ListPlacementGroupsResponse, PlacementGroup as PlacementGroupType } from "./types"

export interface ListPlacementGroupsParams {
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
  type?: "spread"
  page?: number
  per_page?: number
}

export interface CreatePlacementGroupParams {
  name: string
  type: "spread"
  labels?: Record<string, string>
}

export interface UpdatePlacementGroupParams {
  name?: string
  labels?: Record<string, string>
}

/**
 * Placement Groups API
 *
 * Placement groups help you to manage your servers in a specific datacenter.
 * https://docs.hetzner.cloud/#placement-groups
 */
export class PlacementGroup extends BaseAPI {
  /**
   * List all placement groups with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */
  async getAll(
    params?: ListPlacementGroupsParams,
  ): Promise<
    | { success: true; response: ListPlacementGroupsResponse }
    | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request<ListPlacementGroupsResponse>(
      `/placement_groups${queryParams ? `?${queryParams}` : ""}`,
    )
  }

  /**
   * Get a placement group by id
   * @param id The id of the placement group
   */
  async get(
    id: number,
  ): Promise<
    | { success: true; response: { placement_group: PlacementGroupType } }
    | { success: false; response: APIError }
  > {
    return this.request<{ placement_group: PlacementGroupType }>(`/placement_groups/${id}`)
  }

  /**
   * Create a placement group
   * @param params The parameters for creating the placement group
   */
  async create(
    params: CreatePlacementGroupParams,
  ): Promise<
    | { success: true; response: { placement_group: PlacementGroupType } }
    | { success: false; response: APIError }
  > {
    return this.request<{ placement_group: PlacementGroupType }>("/placement_groups", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Update a placement group
   * @param id The id of the placement group
   * @param params The parameters for updating the placement group
   */
  async update(
    id: number,
    params: UpdatePlacementGroupParams,
  ): Promise<
    | { success: true; response: { placement_group: PlacementGroupType } }
    | { success: false; response: APIError }
  > {
    return this.request<{ placement_group: PlacementGroupType }>(`/placement_groups/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete a placement group
   * @param id The id of the placement group
   */
  async delete(
    id: number,
  ): Promise<{ success: true; response: Action } | { success: false; response: APIError }> {
    return this.request<Action>(`/placement_groups/${id}`, {
      method: "DELETE",
    })
  }
}
