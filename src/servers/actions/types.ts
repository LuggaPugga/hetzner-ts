import type { BaseAction, Meta } from "../../types"

export interface ServerActionsResponse {
  actions: BaseAction[]
  meta?: Meta
}

export interface ListServerActionsParams {
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
