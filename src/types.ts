export interface APIErrorDetails {
  code: string
  message: string
  fields?: Array<{
    name: string
    messages: string[]
  }>
}

export interface APIError {
  error: APIErrorDetails
}

export interface MetaPagination {
  page: number
  per_page: number
  previous_page: number | null
  next_page: number | null
  last_page: number | null
  total_entries: number
}

export interface Meta {
  pagination?: MetaPagination
}

export interface ActionError {
  code: string
  message: string
}

export interface ActionResource {
  id: number
  type: string
}

export interface BaseAction {
  id: number
  command: string
  status: "running" | "success" | "error"
  progress: number
  started: string // ISO 8601 DateTime
  finished: string | null // ISO 8601 DateTime or null
  resources: ActionResource[]
  error: ActionError | null
}
