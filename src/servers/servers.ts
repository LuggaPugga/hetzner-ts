import type { Action } from "../actions/types"
import { BaseAPI } from "../base"
import type { APIError } from "../types"
import { Images } from "./images/images"
import { PrimaryIP } from "./primary-ip/primary-ip"
import { PlacementGroup } from "./placement-groups/placement-group"
import { Isos } from "./isos/isos"
import type { ServersResponse, Server, Metrics, MetricTypes } from "./types"
import { ServerTypes } from "./server-types/server-types"

export interface ListServersParams {
  name?: string
  fingerprint?: string
  label_selector?: string
  sort?: "id" | "id:asc" | "id:desc" | "name" | "name:asc" | "name:desc"
  page?: number
  per_page?: number
}

export interface CreateServerParams {
  name: string
  server_type: string
  image: string
  location?: string
  datacenter?: string
  start_after_create?: boolean
  placement_group?: string
  ssh_keys?: string[]
  volumes?: number[]
  networks?: number[]
  firewall?: [{ id: number }]
  user_data?: string
  labels?: Record<string, string>
  automount?: boolean
  public_net?: {
    enable_ipv4?: boolean
    enable_ipv6?: boolean
    ipv4?: string
    ipv6?: string
  }
}

export class Servers extends BaseAPI {
  private _primaryIP: PrimaryIP | null = null
  private _images: Images | null = null
  private _placementGroups: PlacementGroup | null = null
  private _isos: Isos | null = null
  private _serverTypes: ServerTypes | null = null
  /**
   * List all servers with optional filtering and pagination
   * @param params Optional parameters for filtering and pagination
   */

  get primaryIP(): PrimaryIP {
    if (!this._primaryIP) {
      this._primaryIP = new PrimaryIP(this.token)
    }
    return this._primaryIP
  }

  get images(): Images {
    if (!this._images) {
      this._images = new Images(this.token)
    }
    return this._images
  }

  get placementGroups(): PlacementGroup {
    if (!this._placementGroups) {
      this._placementGroups = new PlacementGroup(this.token)
    }
    return this._placementGroups
  }

  get isos(): Isos {
    if (!this._isos) {
      this._isos = new Isos(this.token)
    }
    return this._isos
  }

  get serverTypes(): ServerTypes {
    if (!this._serverTypes) {
      this._serverTypes = new ServerTypes(this.token)
    }
    return this._serverTypes
  }

  async list(
    params?: ListServersParams,
  ): Promise<
    { success: true; response: ServersResponse } | { success: false; response: APIError }
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
    return this.request<ServersResponse>(`/servers${queryString ? `?${queryString}` : ""}`)
  }

  async get(
    id: number,
  ): Promise<
    { success: true; response: { server: Server } } | { success: false; response: APIError }
  > {
    return this.request<{ server: Server }>(`/servers/${id}`)
  }

  async create(
    params: CreateServerParams,
  ): Promise<
    | { success: true; response: { server: Server; action: Action } }
    | { success: false; response: APIError }
  > {
    return this.request<{ server: Server; action: Action }>("/servers", {
      method: "POST",
      body: JSON.stringify(params),
    })
  }

  async delete(
    id: number,
  ): Promise<{ success: true; response: Action } | { success: false; response: APIError }> {
    return this.request<Action>(`/servers/${id}`, {
      method: "DELETE",
    })
  }

  getMetrics(
    id: number,
    type: MetricTypes,
    start: string,
    end: string,
    step?: number,
  ): Promise<
    { success: true; response: { metrics: Metrics } } | { success: false; response: APIError }
  > {
    return this.request<{ metrics: Metrics }>(
      `/servers/${id}/metrics?type=${type}&start=${start}&end=${end}&step=${step}`,
    )
  }
}
