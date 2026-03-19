import type { UIAdapterModule } from "../types";
import { ProxyAPIConfigFields } from "./config-fields";
import { buildProxyAPIConfig } from "@paperclipai/adapter-proxy-api/ui";

export const proxyAPIUIAdapter: UIAdapterModule = {
  type: "proxy_api",
  label: "Proxy API",
  parseStdoutLine: () => [],
  ConfigFields: ProxyAPIConfigFields,
  buildAdapterConfig: buildProxyAPIConfig,
};
