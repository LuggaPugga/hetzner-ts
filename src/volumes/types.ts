import type { BaseAction, Meta } from "../types"

export interface VolumeLocation {
  id: number
  name: string
  description: string
  country: string
  city: string
  latitude: number
  longitude: number
  network_zone: string
}

export interface VolumeProtection {
  delete: boolean
}

export interface VolumeStatus {
  value: "available" | "creating"
}

export interface Volume {
  id: number
  created: string
  name: string
  server: number | null
  location: VolumeLocation
  size: number
  linux_device: string
  protection: VolumeProtection
  labels: Record<string, string>
  status: VolumeStatus["value"]
  format?: string
}

export interface VolumesResponse {
  volumes: Volume[]
  meta?: Meta
}

export interface ListVolumesParams {
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
  status?: VolumeStatus["value"][]
}

export interface CreateVolumeParams {
  name: string
  size: number
  location?: string
  server?: number
  format?: string
  labels?: Record<string, string>
  automount?: boolean
}

export interface UpdateVolumeParams {
  name?: string
  labels?: Record<string, string>
}

export interface AttachVolumeParams {
  server: number
  automount?: boolean
}

export interface ResizeVolumeParams {
  size: number
}

export interface ChangeVolumeProtectionParams {
  delete: boolean
}

export interface VolumeActionsResponse {
  actions: BaseAction[]
  meta?: Meta
}

export interface ListVolumeActionsParams {
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
  status?: "available" | "creating"
  name?: string
  label_selector?: string
  page?: number
  per_page?: number
}
