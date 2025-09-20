import type { Action } from "../../actions/types";

export interface Location {
	id: number;
	name: string;
	description: string;
	country: string;
	city: string;
	latitude: number;
	longitude: number;
	network_zone: string;
}

export interface ServerTypes {
	supported: number[];
	available: number[];
	available_for_migration: number[];
}

export interface Datacenter {
	id: number;
	name: string;
	description: string;
	location: Location;
	server_types: ServerTypes;
}

export interface DNSPtr {
	ip: string;
	dns_ptr: string;
}

export interface Protection {
	delete: boolean;
}

export interface PrimaryIP {
	id: number;
	name: string;
	labels: Record<string, string>;
	created: string;
	blocked: boolean;
	datacenter: Datacenter;
	ip: string;
	dns_ptr: DNSPtr[];
	protection: Protection;
	type: "ipv4" | "ipv6";
	auto_delete: boolean;
	assignee_type: string;
	assignee_id: number;
}

export interface ListPrimaryIPResponse {
	primary_ips: PrimaryIP[];
}

export interface CreatePrimaryIPResponse {
	primary_ip: PrimaryIP;
	action: Action;
}
