import { expect, test } from "vitest"
import { HetznerAPI } from ".."

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")

test("get actions throws error if token is invalid", async () => {
  const result = await invalidHetzner.actions().list(1)
  expect(result.success).toBe(false)
})

test("get actions is in type ActionsResponse", async () => {
  const result = await workingHetzner.actions().list(1)
  expect(result.success).toBe(true)
  expect(result.response).toBeTypeOf("object")
})
