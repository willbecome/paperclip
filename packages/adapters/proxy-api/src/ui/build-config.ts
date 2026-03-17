export function buildProxyAPIConfig(values: Record<string, any>) {
  return {
    provider: values.provider,
    model: values.model,
    apiKey: values.apiKey,
    baseURL: values.baseURL,
    promptTemplate: values.promptTemplate,
    maxTurnsPerRun: values.maxTurnsPerRun,
  };
}
