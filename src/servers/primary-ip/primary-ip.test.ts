import { expect, test } from "vitest"
import { HetznerAPI } from "../../"

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")

function generateUniqueName(prefix: string = "") {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`
}

test("list servers throws error if token is invalid", async () => {
  const result = await invalidHetzner.servers.primaryIP.list()
  expect(result.success).toBe(false)
})

test("create and delete a server", async () => {
  const name = generateUniqueName("test-server")
  const result = await workingHetzner.servers.primaryIP.create({
    name,
    type: "ipv4",
    assignee_type: "server",
    datacenter: "fsn1",
    assignee_id: null,
  })
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response).toBeTypeOf("object")
    expect(result.response.primary_ip.id).toBeTypeOf("number")
    expect(result.response.primary_ip.name).toBeTypeOf("string")
    expect(result.response.primary_ip.created).toBeTypeOf("string")

    const listResult = await workingHetzner.servers.primaryIP.list()
    expect(listResult.success).toBe(true)
    if (listResult.success) {
      expect(listResult.response.primary_ips.length).toBeGreaterThan(0)
      expect(
        listResult.response.primary_ips.find(
          (primaryIP) => primaryIP.id === result.response.primary_ip.id,
        ),
      ).toBeDefined()
    }

    const deleteResult = await workingHetzner.servers.primaryIP.delete(
      result.response.primary_ip.id,
    )
    expect(deleteResult.success).toBe(true)
  }
})
