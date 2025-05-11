import { BaseAPI } from "../base"
import type { APIError } from "../types"
import type { CertificateActionsResponse, CertificateActionResponse } from "./types"

export interface ListCertificateActionsParams {
  id?: number[]
  sort?: Array<
    | "id"
    | "command"
    | "status"
    | "started"
    | "finished"
    | "id:asc"
    | "id:desc"
    | "command:asc"
    | "command:desc"
    | "status:asc"
    | "status:desc"
    | "started:asc"
    | "started:desc"
    | "finished:asc"
    | "finished:desc"
  >
  status?: Array<"running" | "success" | "error">
  page?: number
  per_page?: number
}

/**
 * Certificate Actions API
 *
 * Actions are the individual operations that can be performed on a certificate.
 * https://docs.hetzner.cloud/#certificate-actions
 *
 */
export class CertificateActions extends BaseAPI {
  /**
   * Get all actions for all certificates
   * @param params Optional parameters for filtering and pagination
   */
  async getAll(
    params?: ListCertificateActionsParams,
  ): Promise<
    { success: true; response: CertificateActionsResponse } | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(key, v.toString()))
        } else if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const queryString = queryParams.toString()
    return this.request<CertificateActionsResponse>(
      `/certificates/actions${queryString ? `?${queryString}` : ""}`,
    )
  }

  /**
   * Get a specific action
   * @param actionId The action ID
   */
  async get(
    actionId: number,
  ): Promise<
    { success: true; response: CertificateActionResponse } | { success: false; response: APIError }
  > {
    return this.request<CertificateActionResponse>(`/certificates/actions/${actionId}`)
  }

  /**
   * Get all actions for a specific certificate
   * @param certificateId The certificate ID
   * @param params Optional parameters for filtering and pagination
   */
  async listForCertificate(
    certificateId: number,
    params?: Omit<ListCertificateActionsParams, "id">,
  ): Promise<
    { success: true; response: CertificateActionsResponse } | { success: false; response: APIError }
  > {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(key, v.toString()))
        } else if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const queryString = queryParams.toString()
    return this.request<CertificateActionsResponse>(
      `/certificates/${certificateId}/actions${queryString ? `?${queryString}` : ""}`,
    )
  }

  /**
   * Get a specific action for a certificate
   * @param certificateId The certificate ID
   * @param actionId The action ID
   */
  async getForCertificate(
    certificateId: number,
    actionId: number,
  ): Promise<
    { success: true; response: CertificateActionResponse } | { success: false; response: APIError }
  > {
    return this.request<CertificateActionResponse>(
      `/certificates/${certificateId}/actions/${actionId}`,
    )
  }

  /**
   * Retry issuance or renewal of a certificate
   * @param certificateId The certificate ID
   */
  async retry(
    certificateId: number,
  ): Promise<
    { success: true; response: CertificateActionResponse } | { success: false; response: APIError }
  > {
    return this.request<CertificateActionResponse>(`/certificates/${certificateId}/actions/retry`, {
      method: "POST",
    })
  }
}
