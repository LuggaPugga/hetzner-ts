import { BaseAPI } from "../base";
import type { APIError } from "../types";
import type {
	Datacenter,
	DatacentersResponse,
	Location,
	LocationsResponse,
} from "./types";

type SortableLocationField =
	| "id"
	| "id:asc"
	| "id:desc"
	| "name"
	| "name:asc"
	| "name:desc";

export interface ListLocationsParams {
	name?: string;
	sort?: SortableLocationField;
	page?: number;
	per_page?: number;
}

/**
 * Locations API
 *
 * Datacenters are organized by Locations. Datacenters in the same Location are connected with very low latency links.
 * https://docs.hetzner.cloud/#locations
 *
 */
export class Locations extends BaseAPI {
	/**
	 * List all locations with optional filtering and pagination
	 * @param params Optional parameters for filtering and pagination
	 */
	async getAll(
		params?: ListLocationsParams,
	): Promise<
		| { success: true; response: LocationsResponse }
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
		return this.request<LocationsResponse>(
			`/locations${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Get a specific location by ID
	 * @param id The location ID
	 */
	async get(
		id: number,
	): Promise<
		| { success: true; response: Location }
		| { success: false; response: APIError }
	> {
		return this.request<Location>(`/locations/${id}`);
	}
}

export class Datacenters extends BaseAPI {
	/**
	 * List all datacenters with optional filtering and pagination
	 * @param params Optional parameters for filtering and pagination
	 */
	async getAll(
		params?: ListLocationsParams,
	): Promise<
		| { success: true; response: DatacentersResponse }
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
		return this.request<DatacentersResponse>(
			`/datacenters${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Get a specific datacenter by ID
	 * @param id The datacenter ID
	 */
	async get(
		id: number,
	): Promise<
		| { success: true; response: Datacenter }
		| { success: false; response: APIError }
	> {
		return this.request<Datacenter>(`/datacenters/${id}`);
	}
}
