import { BaseAPI } from "../../base"
import type { APIError } from "../../types"
import type { ListIsosResponse } from "./types"

export interface ListIsosParams {
  name?: string
  include_architecture_wildcard?: boolean
  architecture?: "x86" | "arm64"
  page?: number
  per_page?: number
}

export class Isos extends BaseAPI {
  /**
   * List all servers with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */
  async list(
    params?: ListIsosParams,
  ): Promise<
    { success: true; response: ListIsosResponse } | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request<ListIsosResponse>(`/isos${queryParams ? `?${queryParams}` : ""}`)
  }

  async get(
    id: number,
  ): Promise<{ success: true; response: { iso: Isos } } | { success: false; response: APIError }> {
    return this.request<{ iso: Isos }>(`/isos/${id}`)
  }
}
