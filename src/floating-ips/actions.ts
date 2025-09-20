import { BaseAPI } from "../base";
import type { APIError } from "../types";
import type {
	AssignFloatingIPParams,
	ChangeDNSPTRParams,
	ChangeProtectionParams,
	FloatingIPAction,
	FloatingIPActionsResponse,
	ListFloatingIPActionsParams,
} from "./types";

export class FloatingIPActions extends BaseAPI {
	/**
	 * List all actions for Floating IPs
	 * @param params Optional parameters for filtering and pagination
	 */
	async getAll(
		params?: ListFloatingIPActionsParams,
	): Promise<
		| { success: true; response: FloatingIPActionsResponse }
		| { success: false; response: APIError }
	> {
		const queryParams = new URLSearchParams();
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined) {
					queryParams.append(key, value.toString());
				}
			});
		}
		const queryString = queryParams.toString();
		return this.request<FloatingIPActionsResponse>(
			`/floating_ips/actions${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Get a specific action for Floating IPs
	 * @param actionId The action ID
	 */
	async get(
		actionId: number,
	): Promise<
		| { success: true; response: FloatingIPAction }
		| { success: false; response: APIError }
	> {
		return this.request<FloatingIPAction>(`/floating_ips/actions/${actionId}`);
	}

	/**
	 * List actions for a specific Floating IP
	 * @param floatingIpId The Floating IP ID
	 * @param params Optional parameters for filtering and pagination
	 */
	async listForFloatingIP(
		floatingIpId: number,
		params?: ListFloatingIPActionsParams, // Assuming similar params as listAll, adjust if different
	): Promise<
		| { success: true; response: FloatingIPActionsResponse }
		| { success: false; response: APIError }
	> {
		const queryParams = new URLSearchParams();
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined) {
					queryParams.append(key, value.toString());
				}
			});
		}
		const queryString = queryParams.toString();
		return this.request<FloatingIPActionsResponse>(
			`/floating_ips/${floatingIpId}/actions${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Assign a Floating IP to a Server
	 * @param floatingIpId The Floating IP ID
	 * @param params Parameters for assigning the Floating IP
	 */
	async assign(
		floatingIpId: number,
		params: AssignFloatingIPParams,
	): Promise<
		| { success: true; response: FloatingIPAction }
		| { success: false; response: APIError }
	> {
		return this.request<FloatingIPAction>(
			`/floating_ips/${floatingIpId}/actions/assign`,
			{
				method: "POST",
				body: JSON.stringify(params),
			},
		);
	}

	/**
	 * Unassign a Floating IP
	 * @param floatingIpId The Floating IP ID
	 */
	async unassign(
		floatingIpId: number,
	): Promise<
		| { success: true; response: FloatingIPAction }
		| { success: false; response: APIError }
	> {
		return this.request<FloatingIPAction>(
			`/floating_ips/${floatingIpId}/actions/unassign`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Change Reverse DNS (PTR) for a Floating IP
	 * @param floatingIpId The Floating IP ID
	 * @param params Parameters for changing the DNS PTR record
	 */
	async changeDNSPTR(
		floatingIpId: number,
		params: ChangeDNSPTRParams,
	): Promise<
		| { success: true; response: FloatingIPAction }
		| { success: false; response: APIError }
	> {
		return this.request<FloatingIPAction>(
			`/floating_ips/${floatingIpId}/actions/change_dns_ptr`,
			{
				method: "POST",
				body: JSON.stringify(params),
			},
		);
	}

	/**
	 * Change Floating IP Protection
	 * @param floatingIpId The Floating IP ID
	 * @param params Parameters for changing the protection status
	 */
	async changeProtection(
		floatingIpId: number,
		params: ChangeProtectionParams,
	): Promise<
		| { success: true; response: FloatingIPAction }
		| { success: false; response: APIError }
	> {
		return this.request<FloatingIPAction>(
			`/floating_ips/${floatingIpId}/actions/change_protection`,
			{
				method: "POST",
				body: JSON.stringify(params),
			},
		);
	}

	/**
	 * Get a specific action for a specific Floating IP
	 * @param floatingIpId The Floating IP ID
	 * @param actionId The action ID
	 */
	async getForFloatingIP(
		floatingIpId: number,
		actionId: number,
	): Promise<
		| { success: true; response: FloatingIPAction }
		| { success: false; response: APIError }
	> {
		return this.request<FloatingIPAction>(
			`/floating_ips/${floatingIpId}/actions/${actionId}`,
		);
	}
}
