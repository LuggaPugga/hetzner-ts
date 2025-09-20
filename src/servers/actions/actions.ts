import { BaseAPI } from "../../base";
import type { APIError, BaseAction } from "../../types";
import type { Image } from "../images/types";
import type { ListServerActionsParams, ServerActionsResponse } from "./types";

/**
 * Server Actions API
 *
 * Actions are the individual operations that can be performed on a server.
 * https://docs.hetzner.cloud/#server-actions
 */
export class ServerActions extends BaseAPI {
	/**
	 * List all actions for Server (globally, not for a specific volume)
	 * @param params Optional parameters for filtering and pagination
	 */
	async getAll(
		params?: ListServerActionsParams,
	): Promise<
		| { success: true; response: ServerActionsResponse }
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
		return this.request<ServerActionsResponse>(
			`/servers/actions${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Get a specific action by ID
	 * @param id The ID of the action to get
	 */
	async get(
		id: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(`/servers/actions/${id}`);
	}

	/**
	 * List all actions for a server
	 * @param serverId The ID of the server to list actions for
	 * @param params Optional parameters for filtering and pagination
	 */
	async getAllByServer(
		serverId: number,
		params?: ListServerActionsParams,
	): Promise<
		| { success: true; response: ServerActionsResponse }
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
		return this.request<ServerActionsResponse>(
			`/servers/${serverId}/actions${queryString ? `?${queryString}` : ""}`,
		);
	}

	/**
	 * Add a server to a placement group
	 * @param serverId The ID of the server to add to the placement group
	 * @param placementGroupId The ID of the placement group to add the server to
	 */
	async addServerToPlacementGroup(
		serverId: number,
		placementGroupId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/add_to_placement_group`,
			{
				method: "POST",
				body: JSON.stringify({
					placement_group: placementGroupId,
				}),
			},
		);
	}

	/**
	 * Attach an ISO to a server
	 * @param serverId The ID of the server to attach the ISO to
	 * @param iso The ID or name of ISO to attach to the Server
	 */
	async attachIsoToServer(
		serverId: number,
		iso: string,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/attach_iso`,
			{
				method: "POST",
				body: JSON.stringify({
					iso: iso,
				}),
			},
		);
	}

	/**
	 * Attach a server to a network
	 * @param serverId The ID of the server to attach to the network
	 * @param networkId The ID of the network to attach the server to
	 * @param ip Optional IP to assign to the server
	 * @param aliasIps Optional array of alias IPs to assign to the server
	 */
	async attachServerToNetwork(
		serverId: number,
		networkId: number,
		ip?: string,
		aliasIps?: string[],
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/attach_to_network`,
			{
				method: "POST",
				body: JSON.stringify({
					network: networkId,
					ip: ip,
					alias_ips: aliasIps,
				}),
			},
		);
	}

	/**
	 * Change alias IP of network
	 * @param serverId The ID of the server to change the alias IP of
	 * @param networkId The ID of the network to change the alias IP of
	 * @param aliasIps The new alias IPs to assign to the server
	 */
	async changeAliasIpOfNetwork(
		serverId: number,
		networkId: number,
		aliasIps: string[],
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/change_alias_ips`,
			{
				method: "POST",
				body: JSON.stringify({
					network: networkId,
					alias_ips: aliasIps,
				}),
			},
		);
	}

	/**
	 * Change reverse DNS entry for this Server
	 * @param serverId The ID of the server to change the reverse DNS entry of
	 * @param ip The IP to change the reverse DNS entry of
	 * @param dnsPtr The new reverse DNS entry to assign to the server
	 */
	async changeReverseDnsEntryForServer(
		serverId: number,
		ip: string,
		dnsPtr: string | null,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/change_reverse_dns`,
			{
				method: "POST",
				body: JSON.stringify({
					ip: ip,
					dns_ptr: dnsPtr,
				}),
			},
		);
	}

	/**
	 * Change Server Protection
	 * @param serverId The ID of the server to change the protection of
	 * @param protect Whether to protect the server or not
	 * @param deleteProtection Whether to delete the protection of the server or not
	 */
	async changeServerProtection(
		serverId: number,
		protect?: boolean,
		rebuild?: boolean,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/change_protection`,
			{
				method: "POST",
				body: JSON.stringify({
					protect: protect,
					rebuild: rebuild,
				}),
			},
		);
	}

	/**
	 * Change the Type of a Server
	 * @param serverId The ID of the server to change the type of
	 * @param serverType The new server type to change to
	 * @param upgradeDisk Whether to upgrade the disk during type change
	 */
	async changeServerType(
		serverId: number,
		serverType: string,
		upgradeDisk: boolean,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/change_type`,
			{
				method: "POST",
				body: JSON.stringify({
					type: serverType,
					upgrade_disk: upgradeDisk,
				}),
			},
		);
	}

	/**
	 * Create Image from Server
	 * @param serverId The ID of the server to create an image from
	 * @param name The name of the image to create
	 * @param description The description of the image to create
	 */
	async createImageFromServer(
		serverId: number,
		type?: "snapshot" | "backup",
		description?: string,
		labels?: Record<string, string>,
	): Promise<
		| { success: true; response: { action: BaseAction; image: Image } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction; image: Image }>(
			`/servers/${serverId}/actions/create_image`,
			{
				method: "POST",
				body: JSON.stringify({
					type: type,
					description: description,
					labels: labels,
				}),
			},
		);
	}

	/**
	 * Detach a server from a network
	 * @param serverId The ID of the server to detach from the network
	 * @param networkId The ID of the network to detach the server from
	 */
	async detachServerFromNetwork(
		serverId: number,
		networkId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/detach_from_network`,
			{
				method: "POST",
				body: JSON.stringify({
					network: networkId,
				}),
			},
		);
	}

	/**
	 * Detach an ISO from a Server
	 * @param serverId The ID of the server to detach the ISO from
	 * @param isoId The ID of the ISO to detach from the server
	 */
	async detachIsoFromServer(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/detach_iso`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Disable Backups for a Server
	 * @param serverId The ID of the server to disable backups for
	 */
	async disableBackupsForServer(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/disable_backups`,
			{
				method: "POST",
			},
		);
	}
	/**
	 * Disable Rescue Mode for a Server
	 * @param serverId The ID of the server to disable rescue mode for
	 */
	async disableRescueModeForServer(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/disable_rescue`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Enables and configures the automatic daily backup option
	 * @param serverId The ID of the server to enable and configure backups for
	 */
	async enableBackupsForServer(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/enable_backups`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Enable Rescue Mode for a Server
	 * @param serverId The ID of the server to enable rescue mode for
	 */
	async enableRescueModeForServer(
		serverId: number,
		type?: "linux64",
		sshKeys?: number[],
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/enable_rescue`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Power off a server
	 * @param serverId The ID of the server to power off
	 */
	async powerOff(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/poweroff`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Power on a server
	 * @param serverId The ID of the server to power on
	 */
	async powerOn(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/poweron`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Soft reboot a server
	 * @param serverId The ID of the server to soft reboot
	 */
	async softReboot(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/reboot`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Rebuild a Server from an Image
	 * @param serverId The ID of the server to rebuild
	 * @param image The ID or name of the image to rebuild the server from
	 */
	async rebuildFromImage(
		serverId: number,
		image: string,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/rebuild`,
			{
				method: "POST",
				body: JSON.stringify({
					image: image,
				}),
			},
		);
	}

	/**
	 * Remove from placement group
	 * @param serverId The ID of the server to remove from the placement group
	 */
	async removeFromPlacementGroup(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/remove_from_placement_group`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Request Console for a Server
	 * @param serverId The ID of the server to request the console for
	 */
	async requestConsoleForServer(
		serverId: number,
	): Promise<
		| {
				success: true;
				response: { action: BaseAction; wss_url: string; password: string };
		  }
		| { success: false; response: APIError }
	> {
		return this.request<{
			action: BaseAction;
			wss_url: string;
			password: string;
		}>(`/servers/${serverId}/actions/request_console`, {
			method: "POST",
		});
	}

	/**
	 * Reset a server
	 * @param serverId The ID of the server to reset
	 */
	async resetServer(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/reset`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Reset Root Password
	 * @param serverId The ID of the server to reset the root password for
	 */
	async resetServerPassword(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction; root_password: string } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction; root_password: string }>(
			`/servers/${serverId}/actions/reset_password`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Shutdown a server
	 * @param serverId The ID of the server to shutdown
	 */
	async shutdownServer(
		serverId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/shutdown`,
			{
				method: "POST",
			},
		);
	}

	/**
	 * Get an action for a server
	 * @param serverId The ID of the server to get the action for
	 * @param actionId The ID of the action to get
	 */
	async getActionForServer(
		serverId: number,
		actionId: number,
	): Promise<
		| { success: true; response: { action: BaseAction } }
		| { success: false; response: APIError }
	> {
		return this.request<{ action: BaseAction }>(
			`/servers/${serverId}/actions/${actionId}`,
		);
	}
}
