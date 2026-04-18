import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"],
  format: ["cjs", "esm"],
  dts: false,
  clean: true,
  sourcemap: true,
  bundle: false,
  external: [
    "@apzoniqx/sdk-core",
    "@apzoniqx/sdk-listings",
    "@apzoniqx/sdk-connections",
    "@apzoniqx/sdk-transactions",
    "@apzoniqx/sdk-kyc",
    "@apzoniqx/sdk-wallet",
    "@apzoniqx/sdk-organization",
    "@apzoniqx/sdk-chat",
  ],
});
