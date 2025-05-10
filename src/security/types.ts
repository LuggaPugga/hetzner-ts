import type { Meta } from "../types"

export interface SSHKey {
  id: number
  name: string
  fingerprint: string
  public_key: string
  labels: Record<string, string>
  created: string
}

export interface SSHKeysResponse {
  ssh_keys: SSHKey[]
  meta?: Meta
}

export interface CreateSSHKeyParams {
  name: string
  public_key: string
  labels?: Record<string, string>
}

export interface UpdateSSHKeyParams {
  name?: string
  labels?: Record<string, string>
}

export interface Certificate {
  id: number
  name: string
  certificate: string
  created: string
  domain_names: string[]
  fingerprint: string
  labels: Record<string, string>
  not_valid_after: string
  not_valid_before: string
  status: CertificateStatus
  type: CertificateType
}

export type CertificateStatus = "pending" | "failed" | "completed"

export type CertificateType = "uploaded" | "managed"

export interface CertificatesResponse {
  certificates: Certificate[]
  meta?: {
    pagination?: {
      page: number
      per_page: number
      total_entries: number
      last_page: number
    }
  }
}

export interface CreateCertificateParams {
  name: string
  certificate: string
  private_key: string
  labels?: Record<string, string>
}

export interface UpdateCertificateParams {
  name?: string
  labels?: Record<string, string>
}

export interface CertificateAction {
  id: number
  command: string
  status: "running" | "success" | "error"
  progress: number
  started: string
  finished: string | null
  resources: Array<{
    id: number
    type: string
  }>
  error?: {
    code: string
    message: string
  }
}

export interface CertificateActionsResponse {
  actions: CertificateAction[]
  meta?: Meta
}

export interface CertificateActionResponse {
  action: CertificateAction
}
