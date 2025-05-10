import type { Meta } from "../../types"

export interface Price {
  location: string
  price_hourly: {
    net: string
    gross: string
  }
  price_monthly: {
    net: string
    gross: string
  }
  included_traffic: number
  price_per_tb_traffic: {
    net: string
    gross: string
  }
}

export interface DeprecationInfo {
  unavailable_after: string
  announced: string
}

export interface ServerType {
  id: number
  name: string
  description: string
  cores: number
  memory: number
  disk: number
  deprecated: boolean
  prices: Price[]
  storage_type: "local" | "network"
  cpu_type: "shared" | "dedicated"
  architecture: "x86" | "arm64"
  deprecation: DeprecationInfo | null
}

export interface ServerTypesResponse {
  server_types: ServerType[]
  meta: Meta
}
