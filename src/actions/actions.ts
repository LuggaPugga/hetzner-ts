import { BaseAPI } from "../base";
import type { APIError } from "../types";
import type { Action, ActionsResponse } from "./types";

/**
 * Actions API
 *
 * Actions show the results and progress of asynchronous requests to the API.
 * https://docs.hetzner.cloud/#actions
 *
 */
export class Actions extends BaseAPI {
	/**
	 * Returns a list of Action objects, filtered by the provided ID.
	 * The API may return an array, even if the ID matches a single action.
	 */
	async getAll(
		id: number,
	): Promise<
		| { success: true; response: ActionsResponse }
		| { success: false; response: APIError }
	> {
		return this.request<ActionsResponse>(`/actions?id=${id}`);
	}

	/**
	 * Returns a specific Action object.
	 */
	async get(
		id: number,
	): Promise<
		{ success: true; response: Action } | { success: false; response: APIError }
	> {
		return this.request<Action>(`/actions/${id}`);
	}
}
