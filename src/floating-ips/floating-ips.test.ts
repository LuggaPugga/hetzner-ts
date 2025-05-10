import { expect, test } from "vitest"
import { HetznerAPI } from ".."
import { FloatingIPActions } from "./actions"

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")

function generateUniqueName(prefix: string = "") {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`
}

test("list floating IPs throws error if token is invalid", async () => {
  const result = await invalidHetzner.floatingIps.list()
  expect(result.success).toBe(false)
})

test("list floating IPs is in type FloatingIPsResponse", async () => {
  const result = await workingHetzner.floatingIps.list()
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response).toBeTypeOf("object")
    expect(result.response.floating_ips).toBeTypeOf("object")
    if (result.response.floating_ips.length > 0) {
      expect(result.response.floating_ips[0]).toBeTypeOf("object")
    }
  }
})

test("get floating IP throws error if token is invalid", async () => {
  const result = await invalidHetzner.floatingIps.get(1)
  expect(result.success).toBe(false)
})

test("get floating IP is in type FloatingIP", async () => {
  const listResult = await workingHetzner.floatingIps.list()
  if (listResult.success && listResult.response.floating_ips.length > 0) {
    const floatingIpId = listResult.response.floating_ips[0]!.id
    const result = await workingHetzner.floatingIps.get(floatingIpId)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.response).toBeTypeOf("object")
      expect(result.response.id).toBe(floatingIpId)
    }
  } else {
    const result = await workingHetzner.floatingIps.get(999999999)
    expect(result.success).toBe(false)
  }
})

test("get floating IP throws error if floating IP does not exist", async () => {
  const result = await workingHetzner.floatingIps.get(999999999)
  expect(result.success).toBe(false)
})

test("create floating IP throws error if token is invalid", async () => {
  const result = await invalidHetzner.floatingIps.create({ type: "ipv4", home_location: "fsn1" })
  expect(result.success).toBe(false)
})

test("create floating IP creates a new IP and returns it", async () => {
  const params = { type: "ipv4" as const, home_location: "fsn1", description: "Test IP for Vitest" }
  const result = await workingHetzner.floatingIps.create(params)
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response).toBeTypeOf("object")
    expect(result.response.floating_ip.type).toBe(params.type)
    expect(result.response.floating_ip.home_location?.name).toBe(params.home_location)
    expect(result.response.floating_ip.description).toBe(params.description)
    if (result.response.floating_ip.id) {
      await workingHetzner.floatingIps.delete(result.response.floating_ip.id)
    }
  }
})

test("update floating IP throws error if token is invalid", async () => {
  const result = await invalidHetzner.floatingIps.update(1, { name: "new-name" })
  expect(result.success).toBe(false)
})

test("update floating IP updates an existing IP", async () => {
  const name = generateUniqueName("test-ip-updated")
  const updateName = generateUniqueName("test-ip-updated")
  const createParams = {
    type: "ipv4" as const,
    home_location: "fsn1",
    description: "IP to update",
    name,
  }
  const createResult = await workingHetzner.floatingIps.create(createParams)
  if (!createResult.success) {
    throw new Error("Failed to create IP for update test")
  }
  const ipId = createResult.response.floating_ip.id

  const updateParams = { description: "Updated IP description", name: updateName }
  const result = await workingHetzner.floatingIps.update(ipId, updateParams)
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response).toBeTypeOf("object")
    expect(result.response.floating_ip.id).toBe(ipId)
    expect(result.response.floating_ip.description).toBe(updateParams.description)
    expect(result.response.floating_ip.name).toBe(updateParams.name)
  }

  await workingHetzner.floatingIps.delete(ipId)
})

test("update floating IP throws error if floating IP does not exist", async () => {
  const result = await workingHetzner.floatingIps.update(999999999, { name: "new-name" })
  expect(result.success).toBe(false)
})

test("delete floating IP throws error if token is invalid", async () => {
  const result = await invalidHetzner.floatingIps.delete(1)
  expect(result.success).toBe(false)
})

test("delete floating IP deletes an existing IP", async () => {
  const createParams = {
    type: "ipv4" as const,
    home_location: "fsn1",
    description: "IP to delete",
    name: generateUniqueName("test-ip-delete"),
  }
  const createResult = await workingHetzner.floatingIps.create(createParams)
  expect(createResult.success).toBe(true)
  if (createResult.success) {
    const ipId = createResult.response.floating_ip.id

    const result = await workingHetzner.floatingIps.delete(ipId)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.response).toBe(null)
    }

    const getResult = await workingHetzner.floatingIps.get(ipId)
    expect(getResult.success).toBe(false)
  }
})

test("delete floating IP handles non-existent IP gracefully", async () => {
  const result = await workingHetzner.floatingIps.delete(999999999)
  expect(result.success).toBe(false)
})

test("actions getter returns an instance of FloatingIPActions", () => {
  const actionsInstance = workingHetzner.floatingIps.actions
  expect(actionsInstance).toBeInstanceOf(FloatingIPActions)
})

test("actions getter called multiple times returns the same instance", () => {
  const floatingIpsApi = workingHetzner.floatingIps
  const actionsInstance1 = floatingIpsApi.actions
  const actionsInstance2 = floatingIpsApi.actions
  expect(actionsInstance1).toBe(actionsInstance2)
})
