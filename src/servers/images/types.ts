import type { Meta } from "../../types";

export interface ListImagesResponse {
	images: Image[];
	meta: Meta;
}

export interface Image {
	id: number;
	type: "system" | "app" | "snapshot" | "backup";
	status: "available" | "creating" | "unavailable";
	name: string;
	description: string;
	image_size: number;
	disk_size: number;
	created: string;
	created_from: {
		id: number;
		name: string;
	} | null;
	bound_to: number | null; // only for type backuo
	os_flavor:
		| "ubuntu"
		| "centos"
		| "debian"
		| "fedora"
		| "rocky"
		| "alma"
		| "unknown";
	os_version: string | null;
	rapid_deploy?: boolean;
	protection: {
		delete: boolean;
	};
	deprecated?: boolean | null;
	deleted?: string | null;
	labels: Record<string, string>;
	architecture: "x86" | "arm64";
}
