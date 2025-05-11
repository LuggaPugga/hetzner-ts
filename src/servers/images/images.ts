import type { Action } from "../../actions/types"
import { BaseAPI } from "../../base"
import type { APIError } from "../../types"
import type { ListImagesResponse, Image } from "./types"

export interface ListImagesParams {
  type?: "system" | "app" | "snapshot" | "backup"
  status?: "available" | "creating" | "unavailable"
  bound_to?: string
  include_deprecated?: boolean
  sort?: "id" | "id:asc" | "id:desc" | "name" | "name:asc" | "name:desc"
  name?: string
  label_selector?: string
  architecture?: "x86" | "arm64"
  page?: number
  per_page?: number
}

export interface UpdateImageParams {
  description?: string
  type?: "snapshot"
  labels?: Record<string, string>
}

/**
 * Images API
 *
 * Images are used to create servers.
 * https://docs.hetzner.cloud/#images
 */
export class Images extends BaseAPI {
  /**
   * List all images with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */
  async getAll(
    params?: ListImagesParams,
  ): Promise<
    { success: true; response: ListImagesResponse } | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          queryParams.append(key, value.toString())
        }
      })
    }

    return this.request<ListImagesResponse>(`/images${queryParams ? `?${queryParams}` : ""}`)
  }

  /**
   * Get an image by id
   * @param id The id of the image
   */
  async get(
    id: number,
  ): Promise<
    { success: true; response: { image: Image } } | { success: false; response: APIError }
  > {
    return this.request<{ image: Image }>(`/images/${id}`)
  }

  /**
   * Update an image
   * @param id The id of the image
   * @param params The parameters for updating the image
   */
  async update(
    id: number,
    params: UpdateImageParams,
  ): Promise<
    { success: true; response: { image: Image } } | { success: false; response: APIError }
  > {
    return this.request<{ image: Image }>(`/images/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete an image
   * @param id The id of the image
   */
  async delete(
    id: number,
  ): Promise<{ success: true; response: Action } | { success: false; response: APIError }> {
    return this.request<Action>(`/images/${id}`, {
      method: "DELETE",
    })
  }
}
