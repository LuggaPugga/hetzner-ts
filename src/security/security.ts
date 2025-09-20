import { BaseAPI } from "../base";
import type { APIError } from "../types";
import type {
	SSHKey,
	SSHKeysResponse,
	CreateSSHKeyParams,
	UpdateSSHKeyParams,
} from "./types";
export * from "./certificates";
export * from "./actions";

export interface ListSSHKeysParams {
	name?: string;
	fingerprint?: string;
	label_selector?: string;
	sort?: "id" | "id:asc" | "id:desc" | "name" | "name:asc" | "name:desc";
	page?: number;
	per_page?: number;
}

/**
 * SSH Keys API
 *
 * SSH keys are used to authenticate with the server.
 * https://docs.hetzner.cloud/#ssh-keys
 *
 */
export class SSHKeys extends BaseAPI {
	/**
	 * List all SSH keys with optional filtering and pagination
	 * @param params Optional parameters for filtering and pagination
	 */
	async getAll(
		params?: ListSSHKeysParams,
	): Promise<
		| { success: true; response: SSHKeysResponse }
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
		return this.request<SSHKeysResponse>(
			`/ssh_keys${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Get a specific SSH key by ID
	 * @param id The SSH key ID
	 */
	async get(
		id: number,
	): Promise<
		| { success: true; response: { ssh_key: SSHKey } }
		| { success: false; response: APIError }
	> {
		return this.request<{ ssh_key: SSHKey }>(`/ssh_keys/${id}`);
	}

	/**
	 * Create a new SSH key
	 * @param params Parameters for creating the SSH key
	 */
	async create(
		params: CreateSSHKeyParams,
	): Promise<
		| { success: true; response: { ssh_key: SSHKey } }
		| { success: false; response: APIError }
	> {
		return this.request<{ ssh_key: SSHKey }>("/ssh_keys", {
			method: "POST",
			body: JSON.stringify(params),
		});
	}

	/**
	 * Update an SSH key's properties
	 * @param id The SSH key ID
	 * @param params Parameters to update
	 */
	async update(
		id: number,
		params: UpdateSSHKeyParams,
	): Promise<
		| { success: true; response: { ssh_key: SSHKey } }
		| { success: false; response: APIError }
	> {
		return this.request<{ ssh_key: SSHKey }>(`/ssh_keys/${id}`, {
			method: "PUT",
			body: JSON.stringify(params),
		});
	}

	/**
	 * Delete an SSH key
	 * @param id The SSH key ID
	 */
	async delete(
		id: number,
	): Promise<
		{ success: true; response: null } | { success: false; response: APIError }
	> {
		return this.request<null>(`/ssh_keys/${id}`, {
			method: "DELETE",
		});
	}
}
