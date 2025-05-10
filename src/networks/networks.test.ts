import { expect, test } from "vitest"
import { HetznerAPI } from ".."

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")
let networkToDelete: number = 0
function generateUniqueName(prefix: string = "") {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`
}

test("list networks throws error if token is invalid", async () => {
  const result = await invalidHetzner.networks().list()
  expect(result.success).toBe(false)
})

test("create a network and verify its properties", async () => {
  const name = generateUniqueName("test-network")
  const result = await workingHetzner.networks().create({
    name,
    ip_range: "10.0.0.0/24",
  })
  console.log(result)
  expect(result.success).toBe(true)
  if (result.success) {
    networkToDelete = result.response.network.id
    expect(result.response).toBeTypeOf("object")
    expect(result.response.network.id).toBeTypeOf("number")
    expect(result.response.network.name).toBeTypeOf("string")
    expect(result.response.network.created).toBeTypeOf("string")
    expect(result.response.network.ip_range).toBeTypeOf("string")
    expect(result.response.network.subnets).toBeTypeOf("object")
    expect(result.response.network.routes).toBeTypeOf("object")
    expect(result.response.network.servers).toBeTypeOf("object")
    expect(result.response.network.load_balancers).toBeTypeOf("object")
    expect(result.response.network.protection).toBeTypeOf("object")
    expect(result.response.network.labels).toBeTypeOf("object")

    const listResult = await workingHetzner.networks().list()
    expect(listResult.success).toBe(true)
    if (listResult.success) {
      expect(listResult.response.networks.length).toBeGreaterThan(0)
      expect(
        listResult.response.networks.find((network) => network.id === result.response.network.id),
      ).toBeDefined()
    }
  }
})

test("get a network and verify its properties", async () => {
  const result = await workingHetzner.networks().get(networkToDelete)
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response.network.id).toBeTypeOf("number")
    expect(result.response.network.name).toBeTypeOf("string")
    expect(result.response.network.created).toBeTypeOf("string")
    expect(result.response.network.ip_range).toBeTypeOf("string")
    expect(result.response.network.subnets).toBeTypeOf("object")
    expect(result.response.network.routes).toBeTypeOf("object")
    expect(result.response.network.servers).toBeTypeOf("object")
    expect(result.response.network.load_balancers).toBeTypeOf("object")
    expect(result.response.network.protection).toBeTypeOf("object")
    expect(result.response.network.labels).toBeTypeOf("object")
  }
})

test("update a network and verify its properties", async () => {
  const newName = generateUniqueName("test-network")
  const result = await workingHetzner.networks().update(networkToDelete, {
    name: newName,
  })
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response.network.name).toBe(newName)
  }
})

test("delete a network", async () => {
  const deleteResult = await workingHetzner.networks().delete(networkToDelete)
  expect(deleteResult.success).toBe(true)
})
