import { expect, test } from "vitest";
import { HetznerAPI } from "..";

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string);
const invalidHetzner = new HetznerAPI("invalid-token");

test("get billing throws error if token is invalid", async () => {
	const result = await invalidHetzner.billing.get();
	expect(result.success).toBe(false);
});

test("get billing is in type Billing", async () => {
	const result = await workingHetzner.billing.get();
	expect(result.success).toBe(true);
	expect(result.response).toBeTypeOf("object");

	if (result.success) {
		expect(result.response.pricing).toBeTypeOf("object");
		expect(result.response.pricing.currency).toBeTypeOf("string");
		expect(result.response.pricing.vat_rate).toBeTypeOf("string");
		expect(result.response.pricing.primary_ips).toBeTypeOf("object");
		expect(result.response.pricing.floating_ips).toBeTypeOf("object");
		expect(result.response.pricing.image).toBeTypeOf("object");
		expect(result.response.pricing.volume).toBeTypeOf("object");
		expect(result.response.pricing.server_backup).toBeTypeOf("object");
		expect(result.response.pricing.server_types).toBeTypeOf("object");
		expect(result.response.pricing.load_balancer_types).toBeTypeOf("object");
	}
});
