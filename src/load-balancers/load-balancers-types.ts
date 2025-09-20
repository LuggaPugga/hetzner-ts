import { BaseAPI } from "../base";
import type { APIError } from "../types";
import { LoadBalancerActions } from "./actions";
import type {
	ListLoadBalancerTypesParams,
	LoadBalancerType,
	LoadBalancerTypesResponse,
} from "./types";

/**
 * Load Balancers Types API
 *
 * Load Balancers can be used to load balance traffic between multiple servers.
 * https://docs.hetzner.cloud/#load-balancers
 *
 */
export class LoadBalancerTypes extends BaseAPI {
	/**
	 * Gets all Load Balancer type objects.
	 */
	async list(
		params?: ListLoadBalancerTypesParams,
	): Promise<
		| { success: true; response: LoadBalancerTypesResponse }
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
		return this.request<LoadBalancerTypesResponse>(
			`/load_balancer_types${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Get a specific Load Balancer Type by ID
	 */
	async get(
		id: number,
	): Promise<
		| { success: true; response: { load_balancer_type: LoadBalancerType } }
		| { success: false; response: APIError }
	> {
		return this.request<{ load_balancer_type: LoadBalancerType }>(
			`/load_balancer_types/${id}`,
		);
	}
}
