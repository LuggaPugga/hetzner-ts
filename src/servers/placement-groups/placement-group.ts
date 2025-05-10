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

export class PlacementGroup extends BaseAPI {
  /**
   * List all servers with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */
  async list(
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

  async get(
    id: number,
  ): Promise<
    | { success: true; response: { placement_group: PlacementGroupType } }
    | { success: false; response: APIError }
  > {
    return this.request<{ placement_group: PlacementGroupType }>(`/placement_groups/${id}`)
  }

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
  async delete(
    id: number,
  ): Promise<{ success: true; response: Action } | { success: false; response: APIError }> {
    return this.request<Action>(`/placement_groups/${id}`, {
      method: "DELETE",
    })
  }
}
