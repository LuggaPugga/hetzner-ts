import { BaseAPI } from "../../base";
import type { APIError } from "../../types";
import type { ServerTypesResponse, ServerType } from "./types";

export interface ListServerTypesParams {
	name?: string;
	page?: number;
	per_page?: number;
}

export class ServerTypes extends BaseAPI {
	/**
	 * List all servers with optional filtering and pagination
	 * @param params Optional parameters for filtering and pagination
	 */
	async getAll(
		params?: ListServerTypesParams,
	): Promise<
		| { success: true; response: ServerTypesResponse }
		| { success: false; response: APIError }
	> {
		const queryParams = new URLSearchParams();
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== "") {
					queryParams.append(key, value.toString());
				}
			});
		}

		return this.request<ServerTypesResponse>(
			`/server_types${queryParams ? `?${queryParams}` : ""}`,
		);
	}

	async get(
		id: number,
	): Promise<
		| { success: true; response: { server_type: ServerType } }
		| { success: false; response: APIError }
	> {
		return this.request<{ server_type: ServerType }>(`/server_types/${id}`);
	}
}
