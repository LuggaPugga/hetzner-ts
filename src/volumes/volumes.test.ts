import { expect, test } from "vitest"
import { HetznerAPI } from ".."

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")
let volumeToDelete: number = 0
function generateUniqueName(prefix: string = "") {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`
}

test("list volumes throws error if token is invalid", async () => {
  const result = await invalidHetzner.volumes.list()
  expect(result.success).toBe(false)
})

test("create a server and verify its properties", async () => {
  const name = generateUniqueName("test-volume")
  const result = await workingHetzner.volumes.create({
    name,
    size: 10,
    location: "fsn1",
  })
  console.log(result)
  expect(result.success).toBe(true)
  if (result.success) {
    volumeToDelete = result.response.volume.id
    expect(result.response).toBeTypeOf("object")
    expect(result.response.volume.id).toBeTypeOf("number")
    expect(result.response.volume.name).toBeTypeOf("string")
    expect(result.response.volume.status).toBeTypeOf("string")
    expect(result.response.volume.created).toBeTypeOf("string")

    const listResult = await workingHetzner.volumes.list()
    expect(listResult.success).toBe(true)
    if (listResult.success) {
      expect(listResult.response.volumes.length).toBeGreaterThan(0)
      expect(
        listResult.response.volumes.find((volume) => volume.id === result.response.volume.id),
      ).toBeDefined()
    }
  }
})

test("get a volume and verify its properties", async () => {
  const result = await workingHetzner.volumes.get(volumeToDelete)
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response.volume.id).toBeTypeOf("number")
    expect(result.response.volume.name).toBeTypeOf("string")
    expect(result.response.volume.status).toBeTypeOf("string")
    expect(result.response.volume.created).toBeTypeOf("string")
  }
})

test("update a volume and verify its properties", async () => {
  const newName = generateUniqueName("test-volume")
  const result = await workingHetzner.volumes.update(volumeToDelete, {
    name: newName,
  })
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response.volume.name).toBe(newName)
  }
})

test("resize a volume", async () => {
  const result = await workingHetzner.volumes.actions.resize(volumeToDelete, {
    size: 12,
  })
  expect(result.success).toBe(true)
  if (result.success) {
    expect(result.response.action.status).not.toBe("error")
  }
})

test("delete a volume", async () => {
  const deleteResult = await workingHetzner.volumes.delete(volumeToDelete)
  expect(deleteResult.success).toBe(true)
})
