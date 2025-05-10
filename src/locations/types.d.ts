import type { Meta } from "../types"

export interface Location {
  id: number
  name: string
  description: string
  country: string
  city: string
  latitude: number
  longitude: number
  network_zone: string
}

export interface LocationsResponse {
  locations: Location[]
  meta: Meta
}

export interface Datacenter {
  id: number
  name: string
  description: string
  location: Location
  server_types: {
    supported: number[]
    available: number[]
    available_for_migration: number[]
  }
}

export interface DatacentersResponse {
  datacenters: Datacenter[]
  recommendation: number
  meta: Meta
}
