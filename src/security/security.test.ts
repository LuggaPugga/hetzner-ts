import { expect, test } from "vitest";
import { HetznerAPI } from "..";

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string);
const invalidHetzner = new HetznerAPI("invalid-token");

test("list ssh keys throws error if token is invalid", async () => {
	const result = await invalidHetzner.sshKeys.getAll();
	expect(result.success).toBe(false);
});

test("list ssh keys is in type SSHKeysResponse", async () => {
	const result = await workingHetzner.sshKeys.getAll();
	expect(result.success).toBe(true);
	if (result.success) {
		expect(result.response).toBeTypeOf("object");
		expect(result.response.ssh_keys).toBeTypeOf("object");
		if (result.response.ssh_keys.length > 0) {
			expect(result.response.ssh_keys[0]).toBeTypeOf("object");
		}
	}
});

test("get ssh key throws error if token is invalid", async () => {
	const result = await invalidHetzner.sshKeys.get(1);
	expect(result.success).toBe(false);
});

test("get ssh key throws error if key does not exist", async () => {
	const result = await workingHetzner.sshKeys.get(999999999);
	expect(result.success).toBe(false);
});
