import type { BaseAction, Meta } from "../types";

// --- Base Load Balancer Structures ---
export interface LoadBalancerLocation {
	id: number;
	name: string;
	description: string;
	country: string;
	city: string;
	latitude: number;
	longitude: number;
	network_zone: string;
}

export interface LoadBalancerProtection {
	delete: boolean;
}

export interface LoadBalancerIPDetail {
	ip: string;
	dns_ptr?: string | null;
}

export interface LoadBalancerPublicNet {
	enabled: boolean;
	ipv4: LoadBalancerIPDetail;
	ipv6: LoadBalancerIPDetail;
}

export interface LoadBalancerPrivateNet {
	network: number; // Network ID
	ip: string;
}

export interface LoadBalancerAlgorithm {
	type: "round_robin" | "least_connections";
}

// --- Service and Health Check Structures ---
export interface LoadBalancerHealthCheckHTTPConfig {
	domain: string | null;
	path: string;
	response: string | null; // Expected response body
	status_codes: string[]; // e.g. ["2??", "3??"]
	tls: boolean;
}

export interface LoadBalancerHealthCheck {
	protocol: "tcp" | "http" | "https";
	port: number;
	interval: number; // seconds
	timeout: number; // seconds
	retries: number;
	http: LoadBalancerHealthCheckHTTPConfig | null;
}

export interface LoadBalancerServiceHTTPConfig {
	cookie_name: string | null;
	cookie_lifetime: number | null; // seconds
	certificates: number[]; // Certificate IDs
	redirect_http: boolean | null;
	sticky_sessions: boolean | null;
}

export interface LoadBalancerService {
	protocol: "tcp" | "http" | "https";
	listen_port: number;
	destination_port: number;
	proxyprotocol: boolean;
	health_check: LoadBalancerHealthCheck;
	http: LoadBalancerServiceHTTPConfig | null;
}

// --- Target Structures ---
export interface LoadBalancerTargetServer {
	id: number;
}

export interface LoadBalancerTargetLabelSelector {
	selector: string;
}

export interface LoadBalancerTargetIP {
	ip: string;
}

export interface LoadBalancerTargetHealthStatusEntry {
	listen_port: number;
	status: "healthy" | "unhealthy" | "unknown";
}

// Represents a resolved target, e.g., a server under a label selector
export interface LoadBalancerResolvedTarget {
	type: "server"; // Typically server when resolved
	server: LoadBalancerTargetServer;
	health_status: LoadBalancerTargetHealthStatusEntry[] | null;
	use_private_ip: boolean;
}

export interface LoadBalancerTarget {
	type: "server" | "label_selector" | "ip";
	server?: LoadBalancerTargetServer;
	label_selector?: LoadBalancerTargetLabelSelector;
	ip?: LoadBalancerTargetIP;
	health_status?: LoadBalancerTargetHealthStatusEntry[] | null; // For IP or single server target
	use_private_ip: boolean;
	// targets field in API sample for a label_selector target seems to be an array of resolved server targets
	targets?: LoadBalancerResolvedTarget[];
}

// --- Main Load Balancer Object ---
export interface LoadBalancer {
	id: number;
	name: string;
	public_net: LoadBalancerPublicNet;
	private_net: LoadBalancerPrivateNet[];
	location: LoadBalancerLocation;
	load_balancer_type: LoadBalancerType;
	protection: LoadBalancerProtection;
	labels: Record<string, string>;
	created: string; // ISO 8601
	services: LoadBalancerService[];
	targets: LoadBalancerTarget[];
	algorithm: LoadBalancerAlgorithm;
	outgoing_traffic: number | null;
	ingoing_traffic: number | null;
	included_traffic: number;
}

export interface LoadBalancersResponse {
	load_balancers: LoadBalancer[];
	meta?: Meta;
}

// --- API Call Parameters ---
export interface ListLoadBalancersParams {
	name?: string;
	label_selector?: string;
	sort?: string; // e.g., id, id:asc, name, name:asc, created, created:asc
	page?: number;
	per_page?: number;
}

export interface CreateLoadBalancerParams {
	name: string;
	load_balancer_type: string | number; // ID or name
	algorithm?: LoadBalancerAlgorithm;
	services?: LoadBalancerService[];
	targets?: LoadBalancerTarget[];
	labels?: Record<string, string>;
	public_interface?: boolean;
	network?: number; // Network ID
	network_zone?: string;
	location?: string | number; // ID or name
}

export interface UpdateLoadBalancerParams {
	name?: string;
	labels?: Record<string, string>;
}

// --- Metrics ---
export interface LoadBalancerMetricValue {
	[timestamp: number]: string; // timestamp: value
}

export interface LoadBalancerTimeSeries {
	[metric_name: string]: {
		values: Array<[number, string]>; // [timestamp, value]
	};
}

export interface LoadBalancerMetricsResponse {
	metrics: {
		start: string; // ISO 8601
		end: string; // ISO 8601
		step: number;
		time_series: LoadBalancerTimeSeries;
	};
}

export interface GetLoadBalancerMetricsParams {
	type: string; // comma-separated: open_connections, connections_per_second, requests_per_second, bandwidth
	start: string; // ISO 8601
	end: string; // ISO 8601
	step?: string; // seconds
}

// --- Load Balancer Actions ---
export interface LoadBalancerAction extends BaseAction {
	// Specific fields for LoadBalancer actions, if any
}

export interface LoadBalancerActionsResponse {
	actions: LoadBalancerAction[];
	meta?: Meta;
}

export interface ListLoadBalancerActionsParams {
	id?: number[]; // Filter by action ID(s)
	sort?: string; // e.g., id, command, status, started, finished
	status?: ("running" | "success" | "error")[];
	page?: number;
	per_page?: number;
}

export interface AddServiceLoadBalancerParams extends LoadBalancerService {}

export interface UpdateServiceLoadBalancerParams {
	listen_port: number; // Required to identify the service
	protocol?: "tcp" | "http" | "https";
	destination_port?: number;
	proxyprotocol?: boolean;
	health_check?: LoadBalancerHealthCheck;
	http?: LoadBalancerServiceHTTPConfig | null;
}

export interface DeleteServiceLoadBalancerParams {
	listen_port: number;
}

export interface AddTargetLoadBalancerParams {
	type: "server" | "label_selector" | "ip";
	server?: LoadBalancerTargetServer;
	use_private_ip?: boolean;
	label_selector?: LoadBalancerTargetLabelSelector;
	ip?: LoadBalancerTargetIP;
}

export interface RemoveTargetLoadBalancerParams
	extends AddTargetLoadBalancerParams {}

export interface AttachToNetworkLoadBalancerParams {
	network: number; // Network ID
	ip?: string;
}

export interface DetachFromNetworkLoadBalancerParams {
	network: number; // Network ID
}

export interface ChangeAlgorithmLoadBalancerParams {
	type: "round_robin" | "least_connections";
}

export interface ChangeDNSPTRLoadBalancerParams {
	ip: string; // Public IP address (IPv4 or IPv6)
	dns_ptr: string | null;
}

export interface ChangeProtectionLoadBalancerParams {
	delete?: boolean;
}

export interface ChangeTypeLoadBalancerParams {
	load_balancer_type: string | number;
}

export interface ListLoadBalancerTypesParams {
	name?: string;
	page?: number;
	per_page?: number;
}

export interface LoadBalancerResponse {
	load_balancer: LoadBalancer;
}

export interface LoadBalancerActionResponse {
	action: LoadBalancerAction;
}

export interface CreateLoadBalancerResponse {
	load_balancer: LoadBalancer;
	action: LoadBalancerAction;
}

export interface LoadBalancerType {
	id: number;
	name: string;
	description: string;
	max_connections: number;
	max_services: number;
	max_targets: number;
	max_assigned_certificates: number;
	deprecated: string;
	prices: {
		location: string;
		price_hourly: {
			net: string;
			gross: string;
		};
		price_monthly: {
			net: string;
			gross: string;
		};
		included_traffic: number;
		price_per_tb_traffic: {
			net: string;
			gross: string;
		};
	}[];
}

export interface LoadBalancerTypesResponse {
	load_balancer_types: LoadBalancerType[];
	meta?: Meta;
}
