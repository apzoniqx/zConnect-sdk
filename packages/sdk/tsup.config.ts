import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: false,
  clean: true,
  sourcemap: true,
  external: [
    "@zoniqx/sdk-core",
    "@zoniqx/sdk-listings",
    "@zoniqx/sdk-connections",
    "@zoniqx/sdk-transactions",
    "@zoniqx/sdk-kyc",
    "@zoniqx/sdk-wallet",
    "@zoniqx/sdk-organization",
    "@zoniqx/sdk-chat",
  ],
});
