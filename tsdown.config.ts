import { defineConfig } from "tsdown"

export default defineConfig({
  entry: "src/index.ts",
  format: ["cjs", "esm"],
  sourcemap: true,
  clean: true,
  minify: true,
  dts: true,
})
