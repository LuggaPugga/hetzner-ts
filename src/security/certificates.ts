import { BaseAPI } from "../base";
import type { APIError } from "../types";
import { CertificateActions } from "./actions";
import type {
	Certificate,
	CertificatesResponse,
	CreateCertificateParams,
	UpdateCertificateParams,
} from "./types";

export interface ListCertificatesParams {
	name?: string;
	label_selector?: string;
	sort?: "id" | "id:asc" | "id:desc" | "name" | "name:asc" | "name:desc";
	page?: number;
	per_page?: number;
}

export class Certificates extends BaseAPI {
	private _actions: CertificateActions | null = null;

	/**
	 * List all certificates with optional filtering and pagination
	 * @param params Optional parameters for filtering and pagination
	 */
	async getAll(
		params?: ListCertificatesParams,
	): Promise<
		| { success: true; response: CertificatesResponse }
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
		return this.request<CertificatesResponse>(
			`/certificates${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Get a specific certificate by ID
	 * @param id The certificate ID
	 */
	async get(
		id: number,
	): Promise<
		| { success: true; response: Certificate }
		| { success: false; response: APIError }
	> {
		return this.request<Certificate>(`/certificates/${id}`);
	}

	/**
	 * Create a new certificate
	 * @param params Parameters for creating the certificate
	 */
	async create(
		params: CreateCertificateParams,
	): Promise<
		| { success: true; response: Certificate }
		| { success: false; response: APIError }
	> {
		return this.request<Certificate>("/certificates", {
			method: "POST",
			body: JSON.stringify(params),
		});
	}

	/**
	 * Update a certificate's properties
	 * @param id The certificate ID
	 * @param params Parameters to update
	 */
	async update(
		id: number,
		params: UpdateCertificateParams,
	): Promise<
		| { success: true; response: Certificate }
		| { success: false; response: APIError }
	> {
		return this.request<Certificate>(`/certificates/${id}`, {
			method: "PUT",
			body: JSON.stringify(params),
		});
	}

	/**
	 * Delete a certificate
	 * @param id The certificate ID
	 */
	async delete(
		id: number,
	): Promise<
		{ success: true; response: null } | { success: false; response: APIError }
	> {
		return this.request<null>(`/certificates/${id}`, {
			method: "DELETE",
		});
	}

	get actions(): CertificateActions {
		if (!this._actions) {
			this._actions = new CertificateActions(this.token);
		}
		return this._actions;
	}
}
