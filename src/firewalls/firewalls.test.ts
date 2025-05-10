import { expect, test } from "vitest"
import { HetznerAPI } from ".."

const workingHetzner = new HetznerAPI(
  process.env.HETZNER_API_KEY as string
)
const invalidHetzner = new HetznerAPI("invalid-token")

function generateUniqueName(prefix: string = "") {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`
}

test("list locations throws error if token is invalid", async () => {
  const result = await invalidHetzner.locations().list()
  expect(result.success).toBe(false)
})

test("list locations is in type LocationsResponse", async () => {
  const result = await workingHetzner.locations().list()
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response).toBeTypeOf("object")
    expect(result.response.locations).toBeTypeOf("object")
    expect(result.response.locations[0]).toBeTypeOf("object")
  }
})

test("get location is in type Location", async () => {
  const result = await workingHetzner.locations().get(1)
  expect(result.success).toBe(true)
  expect(result.response).toBeTypeOf("object")
})

test("get location throws error if token is invalid", async () => {
  const result = await invalidHetzner.locations().get(1)
  expect(result.success).toBe(false)
})

test("get location throws error if location does not exist", async () => {
  const result = await workingHetzner.locations().get(999999999)
  expect(result.success).toBe(false)
})

test("list firewalls throws error if token is invalid", async () => {
  const result = await invalidHetzner.firewalls().list()
  expect(result.success).toBe(false)
})

test("list firewalls returns a list of firewalls", async () => {
  const result = await workingHetzner.firewalls().list()
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response).toBeTypeOf("object")
    expect(result.response.firewalls).toBeTypeOf("object")
  }
})

test("get firewall returns a firewall object", async () => {
  const name = generateUniqueName("get-")
  const createResult = await workingHetzner.firewalls().create({
    name,
  })
  expect(createResult.success).toBe(true)
  if (!createResult.success) return

  const firewallId = createResult.response.firewall.id
  const result = await workingHetzner.firewalls().get(firewallId)
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response).toBeTypeOf("object")
    expect(result.response.firewall.id).toBe(firewallId)
    expect(result.response.firewall.name).toBe(name)
  }

  const deleteResult = await workingHetzner.firewalls().delete(firewallId)
  expect(deleteResult.success).toBe(true)
})

test("get firewall throws error if token is invalid", async () => {
  const result = await invalidHetzner.firewalls().get(1)
  expect(result.success).toBe(false)
})

test("get firewall throws error if firewall does not exist", async () => {
  const result = await workingHetzner.firewalls().get(999999999)
  expect(result.success).toBe(false)
})

test("create firewall successfully", async () => {
  const firewallName = generateUniqueName()
  const result = await workingHetzner.firewalls().create({ name: firewallName })
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response.firewall).toBeTypeOf("object")
    expect(result.response.firewall.name).toBe(firewallName)
    expect(result.response.firewall.id).toBeTypeOf("number")
    const deleteResult = await workingHetzner.firewalls().delete(result.response.firewall.id)
    expect(deleteResult.success).toBe(true)
  }
})

test("create firewall throws error if token is invalid", async () => {
  const result = await invalidHetzner.firewalls().create({ name: "test-invalid-token" })
  expect(result.success).toBe(false)
})

test("update firewall successfully", async () => {
  const originalName = generateUniqueName("original-")
  const createResult = await workingHetzner.firewalls().create({ name: originalName })
  expect(createResult.success).toBe(true)
  if (!createResult.success) return

  const firewallId = createResult.response.firewall.id
  const updatedName = generateUniqueName("updated-")
  const updateResult = await workingHetzner.firewalls().update(firewallId, { name: updatedName })
  expect(updateResult.success).toBe(true)
  if (updateResult.success) {
    expect(updateResult.response.firewall.name).toBe(updatedName)
    expect(updateResult.response.firewall.id).toBe(firewallId)
  }

  const deleteResult = await workingHetzner.firewalls().delete(firewallId)
  expect(deleteResult.success).toBe(true)
})

test("update firewall throws error if token is invalid", async () => {
  const result = await invalidHetzner.firewalls().update(123, { name: "test-update-invalid" })
  expect(result.success).toBe(false)
})

test("update firewall throws error if firewall does not exist", async () => {
  const result = await workingHetzner
    .firewalls()
    .update(999999999, { name: "test-update-nonexistent" })
  expect(result.success).toBe(false)
})

test("delete firewall successfully", async () => {
  const firewallName = generateUniqueName("delete-")
  const createResult = await workingHetzner.firewalls().create({ name: firewallName })
  expect(createResult.success).toBe(true)
  if (!createResult.success) return

  const firewallId = createResult.response.firewall.id
  const deleteResult = await workingHetzner.firewalls().delete(firewallId)
  expect(deleteResult.success).toBe(true)
  if (deleteResult.success) {
    expect(deleteResult.response).toBeNull()
  }

  const getResult = await workingHetzner.firewalls().get(firewallId)
  expect(getResult.success).toBe(false)
})

test("delete firewall throws error if token is invalid", async () => {
  const result = await invalidHetzner.firewalls().delete(123)
  expect(result.success).toBe(false)
})

test("delete firewall throws error if firewall does not exist", async () => {
  const result = await workingHetzner.firewalls().delete(999999999)
  expect(result.success).toBe(false)
})
