import { expect, test } from "vitest"
import { HetznerAPI } from "../../"

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")
let placementGroupToDelete: number = 0
function generateUniqueName(prefix: string = "") {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`
}

test("list placement groups throws error if token is invalid", async () => {
  const result = await invalidHetzner.servers.placementGroups.list()
  expect(result.success).toBe(false)
})

test("create a placement group and verify its properties", async () => {
  const name = generateUniqueName("test-placement-group")
  const result = await workingHetzner.servers.placementGroups.create({
    name,
    type: "spread",
  })
  console.log(result)
  expect(result.success).toBe(true)
  if (result.success) {
    placementGroupToDelete = result.response.placement_group.id
    expect(result.response).toBeTypeOf("object")
    expect(result.response.placement_group.id).toBeTypeOf("number")
    expect(result.response.placement_group.name).toBeTypeOf("string")
    expect(result.response.placement_group.type).toBeTypeOf("string")
    expect(result.response.placement_group.created).toBeTypeOf("string")
    expect(result.response.placement_group.type).toBeTypeOf("string")

    const listResult = await workingHetzner.servers.placementGroups.list()
    expect(listResult.success).toBe(true)
    if (listResult.success) {
      expect(listResult.response.placement_groups.length).toBeGreaterThan(0)
      expect(
        listResult.response.placement_groups.find(
          (placementGroup) => placementGroup.id === result.response.placement_group.id,
        ),
      ).toBeDefined()
    }
  }
})

test("update a placement group and verify its properties", async () => {
  const name = generateUniqueName("test-placement-group")
  const result = await workingHetzner.servers.placementGroups.update(placementGroupToDelete, {
    name,
  })
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response.placement_group.name).toBe(name)
  }
})

test("delete a placement group", async () => {
  const deleteResult = await workingHetzner.servers.placementGroups.delete(placementGroupToDelete)
  expect(deleteResult.success).toBe(true)
})
