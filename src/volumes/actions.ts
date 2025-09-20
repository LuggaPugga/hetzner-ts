import { BaseAPI } from "../base";
import type { APIError, BaseAction } from "../types";
import type {
	AttachVolumeParams,
	ChangeVolumeProtectionParams,
	ListVolumeActionsParams,
	ResizeVolumeParams,
	VolumeActionsResponse,
} from "./types";

export class VolumeActions extends BaseAPI {
	/**
	 * List all actions for Volumes (globally, not for a specific volume)
	 * @param params Optional parameters for filtering and pagination
	 */
	async getAll(
		params?: ListVolumeActionsParams,
	): Promise<
		| { success: true; response: VolumeActionsResponse }
		| { success: false; response: APIError }
	> {
		const queryParams = new URLSearchParams();
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined) {
					if (Array.isArray(value)) {
						value.forEach((v) => queryParams.append(key, v.toString()));
					} else {
						queryParams.append(key, value.toString());
					}
				}
			});
		}
		const queryString = queryParams.toString();
		return this.request<VolumeActionsResponse>(
			`/volumes/actions${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Get a specific action for Volumes (globally)
	 * @param actionId The action ID
	 */
	async getGlobalAction(
		actionId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		// Assuming a /volumes/actions/{id} endpoint, adjust if different
		return this.request<{ action: BaseAction }>(`/volumes/actions/${actionId}`);
	}

	/**
	 * List actions for a specific Volume
	 * @param volumeId The Volume ID
	 * @param params Optional parameters for filtering and pagination
	 */
	async listForVolume(
		volumeId: number,
		params?: ListVolumeActionsParams,
	): Promise<
		| { success: true; response: VolumeActionsResponse }
		| { success: false; response: APIError }
	> {
		const queryParams = new URLSearchParams();
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined) {
					if (Array.isArray(value)) {
						value.forEach((v) => queryParams.append(key, v.toString()));
					} else {
						queryParams.append(key, value.toString());
					}
				}
			});
		}
		const queryString = queryParams.toString();
		return this.request<VolumeActionsResponse>(
			`/volumes/${volumeId}/actions${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Get a specific action for a specific Volume
	 * @param volumeId The Volume ID
	 * @param actionId The action ID
	 */
	async getAction(
		volumeId: number,
		actionId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/volumes/${volumeId}/actions/${actionId}`,
		);
	}

	/**
	 * Attach a Volume to a Server
	 * @param volumeId The Volume ID
	 * @param params Parameters for attaching the volume
	 */
	async attach(
		volumeId: number,
		params: AttachVolumeParams,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/volumes/${volumeId}/actions/attach`,
			{
				method: "POST",
				body: JSON.stringify(params),
			},
		);
	}

	/**
	 * Detach a Volume from a Server
	 * @param volumeId The Volume ID
	 */
	async detach(
		volumeId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/volumes/${volumeId}/actions/detach`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Resize a Volume
	 * @param volumeId The Volume ID
	 * @param params Parameters for resizing the volume
	 */
	async resize(
		volumeId: number,
		params: ResizeVolumeParams,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/volumes/${volumeId}/actions/resize`,
			{
				method: "POST",
				body: JSON.stringify(params),
			},
		);
	}

	/**
	 * Change Volume Protection
	 * @param volumeId The Volume ID
	 * @param params Parameters for changing the protection status
	 */
	async changeProtection(
		volumeId: number,
		params: ChangeVolumeProtectionParams,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/volumes/${volumeId}/actions/change_protection`,
			{
				method: "POST",
				body: JSON.stringify(params),
			},
		);
	}
}
