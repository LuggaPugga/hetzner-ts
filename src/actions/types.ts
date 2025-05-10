export interface ActionError {
  code: string
  message: string
}

export interface ActionResource {
  id: number
  type: string
}

export interface Action {
  id: number
  command: string
  status: string
  started: string
  finished: string
  progress: number
  resources: ActionResource[]
  error?: ActionError
}

export interface ActionsResponse {
  actions: Action[]
}
