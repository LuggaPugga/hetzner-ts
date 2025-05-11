import { BaseAPI } from "../base"
import type { APIError, BaseAction } from "../types"
import { VolumeActions } from "./actions"
import type {
  CreateVolumeParams,
  ListVolumesParams,
  UpdateVolumeParams,
  Volume,
  VolumesResponse,
} from "./types"

/**
 * Volumes API
 *
 * Volumes can be used to store data on a server.
 * https://docs.hetzner.cloud/#volumes
 *
 */
export class Volumes extends BaseAPI {
  private _actions: VolumeActions | null = null

  /**
   * List all Volumes with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */
  async getAll(
    params?: ListVolumesParams,
  ): Promise<
    { success: true; response: VolumesResponse } | { success: false; response: APIError }
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
    return this.request<VolumesResponse>(`/volumes${queryString ? `?${queryString}` : ""}`)
  }

  /**
   * Get a specific Volume by ID
   * @param id The Volume ID
   */
  async get(
    id: number,
  ): Promise<
    { success: true; response: { volume: Volume } } | { success: false; response: APIError }
  > {
    return this.request<{ volume: Volume }>(`/volumes/${id}`)
  }

  /**
   * Create a new Volume
   * @param params Parameters for creating the Volume
   */
  async create(
    params: CreateVolumeParams,
  ): Promise<
    | { success: true; response: { volume: Volume; action?: BaseAction } }
    | { success: false; response: APIError }
  > {
    // The API might return an action object along with the volume upon creation
    return this.request<{ volume: Volume; action?: BaseAction }>("/volumes", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  /**
   * Update a Volume's properties
   * @param id The Volume ID
   * @param params Parameters to update
   */
  async update(
    id: number,
    params: UpdateVolumeParams,
  ): Promise<
    { success: true; response: { volume: Volume } } | { success: false; response: APIError }
  > {
    return this.request<{ volume: Volume }>(`/volumes/${id}`, {
      method: "PUT",
      body: JSON.stringify(params),
    })
  }

  /**
   * Delete a Volume
   * @param id The Volume ID
   */
  async delete(
    id: number,
  ): Promise<{ success: true; response: null } | { success: false; response: APIError }> {
    return this.request<null>(`/volumes/${id}`, {
      method: "DELETE",
    })
  }

  get actions(): VolumeActions {
    if (!this._actions) {
      this._actions = new VolumeActions(this.token)
    }
    return this._actions
  }
}
