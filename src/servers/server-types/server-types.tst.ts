import { expect, test } from "vitest"
import { HetznerAPI } from "../.."

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")

test("list server types throws error if token is invalid", async () => {
  const result = await invalidHetzner.servers.serverTypes.list()
  expect(result.success).toBe(false)
})

test("list server types", async () => {
  const result = await workingHetzner.servers.serverTypes.list()
  console.log(result)
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response).toBeTypeOf("object")
    expect(result.response.server_types.length).toBeGreaterThan(0)
    expect(result.response.server_types[0]?.id).toBeTypeOf("number")
    expect(result.response.server_types[0]?.name).toBeTypeOf("string")
    expect(result.response.server_types[0]?.description).toBeTypeOf("string")
    expect(result.response.server_types[0]?.cores).toBeTypeOf("number")
    expect(result.response.server_types[0]?.memory).toBeTypeOf("number")
    expect(result.response.server_types[0]?.disk).toBeTypeOf("number")
    expect(result.response.server_types[0]?.deprecated).toBeTypeOf("boolean")
    expect(result.response.server_types[0]?.prices).toBeTypeOf("object")
    expect(result.response.server_types[0]?.storage_type).toBeTypeOf("string")
    expect(result.response.server_types[0]?.cpu_type).toBeTypeOf("string")

    const listResult = await workingHetzner.servers.serverTypes.list()
    expect(listResult.success).toBe(true)
    if (listResult.success) {
      expect(listResult.response.server_types.length).toBeGreaterThan(0)
      expect(
        listResult.response.server_types.find(
          (serverType) => serverType.id === result.response.server_types[0]?.id,
        ),
      ).toBeDefined()
    }
  }
})

test("get a server type and verify its properties", async () => {
  const result = await workingHetzner.servers.serverTypes.get(1)
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response.server_type.id).toBeTypeOf("number")
    expect(result.response.server_type.name).toBeTypeOf("string")
    expect(result.response.server_type.description).toBeTypeOf("string")
    expect(result.response.server_type.cores).toBeTypeOf("number")
    expect(result.response.server_type.memory).toBeTypeOf("number")
    expect(result.response.server_type.disk).toBeTypeOf("number")
    expect(result.response.server_type.deprecated).toBeTypeOf("boolean")
  }
})
