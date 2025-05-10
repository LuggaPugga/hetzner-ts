import type { BaseAction, Meta } from "../types"

export interface FloatingIP {
  id: number
  name: string
  description: string | null
  ip: string
  type: "ipv4" | "ipv6"
  server: number | null
  dns_ptr: { [ip: string]: string }[]
  home_location: {
    id: number
    name: string
    description: string
    country: string
    city: string
    latitude: number
    longitude: number
    network_zone: string
  }
  blocked: boolean
  created: string
  labels: Record<string, string>
  protection: {
    delete: boolean
  }
}

export interface FloatingIPsResponse {
  floating_ips: FloatingIP[]
  meta?: Meta
}

export interface ListFloatingIPsParams {
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
  page?: number
  per_page?: number
}

export interface CreateFloatingIPParams {
  type: "ipv4" | "ipv6"
  server?: number
  home_location?: string
  description?: string
  name?: string
  labels?: Record<string, string>
}

export interface UpdateFloatingIPParams {
  description?: string
  name?: string
  labels?: Record<string, string>
}

// Floating IP Actions
export interface FloatingIPAction extends BaseAction {
  // Specific fields for Floating IP actions, if any, beyond BaseAction
}

export interface FloatingIPActionsResponse {
  actions: FloatingIPAction[]
  meta?: Meta
}

export interface ListFloatingIPActionsParams {
  id?: number // This seems to be incorrect in the provided spec, should likely be action ID for /floating_ips/actions/{id}
  sort?:
    | "id"
    | "id:asc"
    | "id:desc"
    | "command"
    | "command:asc"
    | "command:desc"
    | "status"
    | "status:asc"
    | "status:desc"
    | "progress"
    | "progress:asc"
    | "progress:desc"
    | "started"
    | "started:asc"
    | "started:desc"
    | "finished"
    | "finished:asc"
    | "finished:desc"
  status?: "running" | "success" | "error"
  page?: number
  per_page?: number
}

export interface AssignFloatingIPParams {
  server: number
}

export interface ChangeDNSPTRParams {
  ip: string
  dns_ptr: string
}

export interface ChangeProtectionParams {
  delete: boolean
}
