import type { AdapterEnvironmentTestContext, AdapterEnvironmentTestResult } from "@paperclipai/adapter-utils";

export { execute } from "./execute.js";

export async function testEnvironment(ctx: AdapterEnvironmentTestContext): Promise<AdapterEnvironmentTestResult> {
  return {
    adapterType: ctx.adapterType,
    status: "pass",
    checks: [
      {
        code: "proxy_api_stub",
        level: "info",
        message: "Proxy API adapter environment check pass-through.",
      },
    ],
    testedAt: new Date().toISOString(),
  };
}
