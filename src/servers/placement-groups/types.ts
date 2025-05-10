import type { Meta } from "../../types"

export interface ListPlacementGroupsResponse {
  placement_groups: PlacementGroup[]
  meta: Meta
}

export interface PlacementGroup {
  id: number
  name: string
  labels: Record<string, string>
  type: "spread"
  created: string
  servers: number[]
}
