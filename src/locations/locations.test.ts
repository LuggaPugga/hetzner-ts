import { expect, test } from "vitest"
import { HetznerAPI } from ".."

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")

test("list locations throws error if token is invalid", async () => {
  const result = await invalidHetzner.locations.list()
  expect(result.success).toBe(false)
})

test("list locations is in type LocationsResponse", async () => {
  const result = await workingHetzner.locations.list()
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response).toBeTypeOf("object")
    expect(result.response.locations).toBeTypeOf("object")
    expect(result.response.locations[0]).toBeTypeOf("object")
  }
})

test("get location is in type Location", async () => {
  const result = await workingHetzner.locations.get(1)
  expect(result.success).toBe(true)
  expect(result.response).toBeTypeOf("object")
})

test("get location throws error if token is invalid", async () => {
  const result = await invalidHetzner.locations.get(1)
  expect(result.success).toBe(false)
})

test("get location throws error if location does not exist", async () => {
  const result = await workingHetzner.locations.get(999999999)
  expect(result.success).toBe(false)
})

test("list datacenters throws error if token is invalid", async () => {
  const result = await invalidHetzner.datacenters.list()
  expect(result.success).toBe(false)
})

test("list datacenters is in type DatacentersResponse", async () => {
  const result = await workingHetzner.datacenters.list()
  expect(result.success).toBe(true)
  expect(result.response).toBeTypeOf("object")
})

test("get datacenter returns datacenter in type Datacenter", async () => {
  const list = await workingHetzner.datacenters.list()
  if (list.success && list.response.datacenters[0]) {
    const result = await workingHetzner.datacenters.get(list.response.datacenters[0].id)
    expect(result.success).toBe(true)
    expect(result.response).toBeTypeOf("object")
  }
})

test("get datacenter throws error if token is invalid", async () => {
  const result = await invalidHetzner.datacenters.get(1)
  expect(result.success).toBe(false)
})
