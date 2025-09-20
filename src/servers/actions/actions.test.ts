import { expect, test } from "vitest";
import { HetznerAPI } from "../..";

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string);
const invalidHetzner = new HetznerAPI("invalid-token");

test("test attach to placement group", async () => {
	const placementGroup = await workingHetzner.servers.placementGroups.create({
		name: "test-placement-group",
		type: "spread",
	});
	const server = await workingHetzner.servers.create({
		name: "test-server",
		image: "ubuntu-22.04",
		location: "fsn1",
		server_type: "cx22",
	});
	if (server.success && placementGroup.success) {
		const result =
			await workingHetzner.servers.actions.addServerToPlacementGroup(
				server.response.server.id,
				placementGroup.response.placement_group.id,
			);
		if (result.success && result.response.action) {
			expect(["running", "success"]).toContain(result.response.action.status);
		}
		const result2 =
			await workingHetzner.servers.actions.removeFromPlacementGroup(
				server.response.server.id,
			);
		if (result2.success && result2.response.action) {
			expect(["running", "success"]).toContain(result2.response.action.status);
		}
		await workingHetzner.servers.delete(server.response.server.id);
		await workingHetzner.servers.placementGroups.delete(
			placementGroup.response.placement_group.id,
		);
	}
});
