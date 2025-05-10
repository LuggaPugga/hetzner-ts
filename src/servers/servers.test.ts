import { expect, test } from "vitest"
import { HetznerAPI } from ".."

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")
let serverToDelete: number = 0
function generateUniqueName(prefix: string = "") {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`
}

test("list servers throws error if token is invalid", async () => {
  const result = await invalidHetzner.servers().list()
  expect(result.success).toBe(false)
})

test("create a server and verify its properties", async () => {
  const name = generateUniqueName("test-server")
  const result = await workingHetzner.servers().create({
    name,
    server_type: "cx22",
    image: "ubuntu-22.04",
    location: "fsn1",
  })
  console.log(result)
  expect(result.success).toBe(true)
  if (result.success) {
    serverToDelete = result.response.server.id
    expect(result.response).toBeTypeOf("object")
    expect(result.response.server.id).toBeTypeOf("number")
    expect(result.response.server.name).toBeTypeOf("string")
    expect(result.response.server.status).toBeTypeOf("string")
    expect(result.response.server.created).toBeTypeOf("string")
    expect(result.response.server.public_net).toBeTypeOf("object")
    expect(result.response.server.private_net).toBeTypeOf("object")

    const listResult = await workingHetzner.servers().list()
    expect(listResult.success).toBe(true)
    if (listResult.success) {
      expect(listResult.response.servers.length).toBeGreaterThan(0)
      expect(
        listResult.response.servers.find((server) => server.id === result.response.server.id),
      ).toBeDefined()
    }

    await workingHetzner.servers().delete(result.response.server.id)
  }
})

test("delete a server", async () => {
  const deleteResult = await workingHetzner.servers().delete(serverToDelete)
  expect(deleteResult.success).toBe(true)
})
