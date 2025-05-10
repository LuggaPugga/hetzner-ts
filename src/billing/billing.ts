import { BaseAPI } from "../base"
import type { APIError } from "../types"
import type { PricingResponse } from "./types"

/**
 * Billing API
 *
 * Returns prices for resources.
 * https://docs.hetzner.cloud/#billing
 *
 */
export class Billing extends BaseAPI {
  /**
   * Get all prices for resources
   * VAT and currency of the Project owner are used for calculations.
   * Both net and gross prices are included in the response.
   */
  async get(): Promise<
    { success: true; response: PricingResponse } | { success: false; response: APIError }
  > {
    return this.request<PricingResponse>("/pricing")
  }
}
