import type { Meta } from "../types";

export type MetricTypes = "cpu" | "disk" | "network";

export interface Metrics {
	start: string;
	end: string;
	step: number;
	time_series: {
		[key: string]: {
			values: Array<[number | string]>;
		};
	};
}

export interface IPv6DNSPtr {
	ip: string;
	dns_ptr: string;
}

export interface IPv4 {
	id: number;
	ip: string;
	blocked: boolean;
	dns_ptr: string;
}

export interface IPv6 {
	id: number;
	ip: string;
	blocked: boolean;
	dns_ptr: IPv6DNSPtr[];
}

export interface PublicNetFirewall {
	id: number;
	status: string;
}

export interface PublicNet {
	ipv4: IPv4;
	ipv6: IPv6;
	floating_ips: number[];
	firewalls: PublicNetFirewall[];
}

export interface PrivateNet {
	network: number;
	ip: string;
	alias_ips: string[];
	mac_address: string;
}

export interface Price {
	net: string;
	gross: string;
}

export interface ServerTypePrice {
	location: string;
	price_hourly: Price;
	price_monthly: Price;
	included_traffic?: number;
	price_per_tb_traffic?: Price;
}

export interface DeprecationInfo {
	unavailable_after: string;
	announced: string;
}

export interface ServerType {
	id: number;
	name: string;
	description: string;
	cores: number;
	memory: number;
	disk: number;
	deprecated: boolean;
	prices: ServerTypePrice[];
	storage_type: string;
	cpu_type: string;
	architecture: string;
	deprecation: DeprecationInfo | null;
}

export interface DatacenterLocation {
	id: number;
	name: string;
	description: string;
	country: string;
	city: string;
	latitude: number;
	longitude: number;
	network_zone: string;
}

export interface ServerTypesSupportedAvailable {
	supported: number[];
	available: number[];
	available_for_migration: number[];
}

export interface Datacenter {
	id: number;
	name: string;
	description: string;
	location: DatacenterLocation;
	server_types: ServerTypesSupportedAvailable;
}

export interface ImageCreatedFrom {
	id: number;
	name: string;
}

export interface ImageProtection {
	delete: boolean;
}

export interface Image {
	id: number;
	type: string;
	status: string;
	name: string;
	description: string;
	image_size: number | null;
	disk_size: number;
	created: string;
	created_from: ImageCreatedFrom | null;
	bound_to: number | null;
	os_flavor: string;
	os_version: string | null;
	rapid_deploy: boolean;
	protection: ImageProtection;
	deprecated: string | null;
	deleted: string | null;
	labels: Record<string, string>;
	architecture: string;
}

export interface ISO {
	id: number;
	name: string;
	description: string;
	type: string;
	deprecation: DeprecationInfo | null;
	architecture: string | null;
}

export interface ServerProtection {
	delete: boolean;
	rebuild: boolean;
}

export interface PlacementGroup {
	id: number;
	name: string;
	labels: Record<string, string>;
	type: string;
	created: string;
	servers: number[];
}

export interface Server {
	id: number;
	name: string;
	status: string;
	created: string;
	public_net: PublicNet;
	private_net: PrivateNet[];
	server_type: ServerType;
	datacenter: Datacenter;
	image: Image | null;
	iso: ISO | null;
	rescue_enabled: boolean;
	locked: boolean;
	backup_window: string | null;
	outgoing_traffic: number | null;
	ingoing_traffic: number | null;
	included_traffic: number | null;
	protection: ServerProtection;
	labels: Record<string, string>;
	volumes: number[] | null;
	load_balancers: number[] | null;
	primary_disk_size: number;
	placement_group: PlacementGroup | null;
}

export interface ServersResponse {
	servers: Server[];
	meta?: Meta;
}
