import type { Meta } from "../../types";

export interface ListIsosResponse {
	isos: Isos[];
	meta: Meta;
}

export interface Isos {
	id: number;
	name: string | null;
	description: string;
	type: "public" | "private" | null;
	deprecation?: {
		unavailable_after: string;
		announced: string;
	} | null;
	architecture: "x86" | "arm64" | null;
}
