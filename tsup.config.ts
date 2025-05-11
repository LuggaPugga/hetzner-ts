import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/**/*.ts", "!src/**/*.test.ts"],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: true,
  dts: true,
})
