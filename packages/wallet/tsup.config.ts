import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["cjs", "esm"],
  dts: false,
  clean: true,
  sourcemap: true,
  bundle: false,
  external: ["@apzoniqx/sdk-core"],
});
