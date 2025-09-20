import type { BaseAction, Meta } from "../types";

export interface NetworkSubnet {
	type: "cloud" | "vswitch" | "server"; // server is deprecated
	ip_range: string;
	network_zone: string;
	gateway: string;
	vswitch_id?: number | null;
}

export interface NetworkRoute {
	destination: string;
	gateway: string;
}

export interface NetworkProtection {
	delete: boolean;
}

export interface Network {
	id: number;
	name: string;
	ip_range: string;
	subnets: NetworkSubnet[];
	network_zone: string;
	routes: NetworkRoute[];
	servers: number[];
	load_balancers: number[];
	protection: NetworkProtection;
	labels: Record<string, string>;
	created: string;
	expose_routes_to_vswitch?: boolean;
}

export interface NetworksResponse {
	networks: Network[];
	meta?: Meta;
}

export interface ListNetworksParams {
	name?: string;
	label_selector?: string;
	sort?:
		| "id"
		| "id:asc"
		| "id:desc"
		| "name"
		| "name:asc"
		| "name:desc"
		| "created"
		| "created:asc"
		| "created:desc";
	page?: number;
	per_page?: number;
}

export interface CreateNetworkParams {
	name: string;
	ip_range: string; // CIDR, RFC1918
	labels?: Record<string, string>;
	subnets?: NetworkSubnet[];
	routes?: NetworkRoute[];
	expose_routes_to_vswitch?: boolean;
}

export interface UpdateNetworkParams {
	name?: string;
	labels?: Record<string, string>;
	expose_routes_to_vswitch?: boolean;
}

export interface NetworkActionsResponse {
	actions: BaseAction[];
	meta?: Meta;
}

export interface ListNetworkActionsParams {
	id?: number; // For /networks/actions/{id} if it means action_id, or for /networks/{id}/actions
	sort?:
		| "id"
		| "command"
		| "status"
		| "progress"
		| "started"
		| "finished"
		| "id:asc"
		| "id:desc";
	status?: "running" | "success" | "error";
	page?: number;
	per_page?: number;
}

export interface AddRouteNetworkParams {
	destination: string; // CIDR
	gateway: string;
}

export interface DeleteRouteNetworkParams {
	destination: string;
	gateway: string;
}

export interface AddSubnetNetworkParams {
	type: "cloud" | "vswitch" | "server";
	ip_range?: string;
	network_zone: string;
	vswitch_id?: number;
}

export interface DeleteSubnetNetworkParams {
	ip_range: string;
}

export interface ChangeIPRangeNetworkParams {
	ip_range: string;
}

export interface ChangeProtectionNetworkParams {
	delete: boolean;
}
