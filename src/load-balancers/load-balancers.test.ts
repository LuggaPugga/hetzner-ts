import { expect, test } from "vitest"
import { HetznerAPI } from ".."

const workingHetzner = new HetznerAPI(process.env.HETZNER_API_KEY as string)
const invalidHetzner = new HetznerAPI("invalid-token")

function generateUniqueName(prefix: string = "") {
  return `${prefix}-${Math.random().toString(36).substring(2, 15)}`
}

test("list load balancers throws error if token is invalid", async () => {
  const result = await invalidHetzner.loadBalancers.list()
  expect(result.success).toBe(false)
})

test("list load balancers returns a list of load balancers", async () => {
  const result = await workingHetzner.loadBalancers.list()
  expect(result.success).toBe(true)
  expect(result.response).toBeTypeOf("object")
})

test("get load balancer throws error if ", async () => {
  const result = await workingHetzner.loadBalancers.get(999999999)
  expect(result.success).toBe(false)
})

test("get load balancer returns a load balancer", async () => {
  const result = await workingHetzner.loadBalancers.list()
  expect(result.success).toBe(true)
  expect(result.response).toBeTypeOf("object")
  if (result.success) {
    const loadBalancerId = result.response.load_balancers?.[0]?.id
    if (loadBalancerId) {
      const result2 = await workingHetzner.loadBalancers.get(loadBalancerId)
      expect(result2.success).toBe(true)
      expect(result2.response).toBeTypeOf("object")
      if (result2.success) {
        expect(result2.response.load_balancer).toBeTypeOf("object")
      }
    }
  }
})
