export interface PriceValue {
	net: string; // decimal
	gross: string; // decimal
}

export interface LocationPriceEntry {
	location: string;
	price_hourly?: PriceValue; // Optional for some like Floating IPs
	price_monthly: PriceValue;
	included_traffic?: number; // For server_types and load_balancer_types
	price_per_tb_traffic?: PriceValue; // For server_types and load_balancer_types
}

export interface TypedLocationPrice {
	type: string;
	prices: LocationPriceEntry[];
}

export interface ImagePrice {
	price_per_gb_month: PriceValue;
}

export interface VolumePrice {
	price_per_gb_month: PriceValue;
}

export interface ServerBackupPrice {
	percentage: string; // decimal
}

export interface ServerTypePriceEntry {
	id: number;
	name: string;
	prices: LocationPriceEntry[];
}

export interface LoadBalancerTypePriceEntry {
	id: number;
	name: string;
	prices: LocationPriceEntry[];
}

export interface PricingData {
	currency: string; // ISO 4217
	vat_rate: string; // decimal
	primary_ips: TypedLocationPrice[];
	floating_ips: TypedLocationPrice[];
	image: ImagePrice;
	volume: VolumePrice;
	server_backup: ServerBackupPrice;
	server_types: ServerTypePriceEntry[];
	load_balancer_types: LoadBalancerTypePriceEntry[];
}

export interface PricingResponse {
	pricing: PricingData;
}
