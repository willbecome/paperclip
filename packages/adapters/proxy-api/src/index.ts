export const type = "proxy_api";
export const label = "Proxy API";

export const models: { id: string; label: string }[] = [];

export const agentConfigurationDoc = `# proxy_api agent configuration

Adapter: proxy_api

Use when:
- You want to connect to a multi-model Proxy API (OpenAI, Anthropic, Gemini, or Ollama).
- You want to use a custom API endpoint (e.g., LiteLLM, OpenRouter, or local LM Studio).

Core fields:
- provider (string, required): One of 'openai', 'anthropic', 'gemini', 'ollama'.
- model (string, required): The specific model ID (e.g., 'gpt-4o', 'claude-3-5-sonnet-20241022', 'gemini-1.5-pro', 'llama3').
- apiKey (string, optional): API key for cloud providers.
- baseURL (string, optional): Custom API base URL (especially for Ollama or local proxies).
- promptTemplate (string, optional): Run prompt template.
- maxTurnsPerRun (number, optional): Max turns for one run.
`;
