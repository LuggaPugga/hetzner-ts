import type { Meta } from "../types";

export type Protocol = "tcp" | "udp" | "icmp" | "esp" | "gre";
export type Direction = "in" | "out";
export type ActionStatus = "running" | "success" | "error";

export interface FirewallRule {
	description?: string | null;
	direction: Direction;
	source_ips: string[]; // only when direction is in
	destination_ips?: string[]; //nly when direction is out
	protocol: Protocol;
	port?: string; // Format: "80" or "80-443"
}

export interface FirewallResource {
	type: "server" | "label_selector";
	server?: {
		id: number;
	};
	label_selector?: {
		selector: string;
	};
}

export interface FirewallResourceResult extends FirewallResource {
	applied_to_resources?: {
		type: "server";
		server: {
			id: number;
		};
	}[];
}

export interface Firewall {
	id: number;
	name: string;
	labels?: Record<string, string>;
	created: string;
	rules: FirewallRule[];
	applied_to: FirewallResourceResult[];
}

export interface FirewallsResponse {
	firewalls: Firewall[];
	meta: Meta;
}

export interface FirewallCreateResponse {
	firewall: Firewall;
	actions: FirewallAction[];
}

export interface FirewallAction {
	id: number;
	command: string;
	status: ActionStatus;
	started: string;
	finished: string | null;
	progress: number;
	resources: {
		id: number;
		type: string;
	}[];
	error: {
		code: string;
		message: string;
	} | null;
}

export interface FirewallActionsResponse {
	actions: FirewallAction[];
	meta: Meta;
}

export type SortOrder = "asc" | "desc";
export type SortField = "id" | "command" | "status" | "started" | "finished";
export type SortOption = SortField | `${SortField}:${SortOrder}`;
