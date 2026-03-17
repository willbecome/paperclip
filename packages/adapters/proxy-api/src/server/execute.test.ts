import { describe, it, expect, vi } from "vitest";
import { execute } from "../server/execute.js";
import OpenAI from "openai";

vi.mock("openai", () => {
  const ChatCompletions = vi.fn().mockResolvedValue({
    choices: [{ message: { content: "Mocked OpenAI response" } }],
    usage: { prompt_tokens: 10, completion_tokens: 20 },
  });
  return {
    default: vi.fn().mockImplementation(() => ({
      chat: {
        completions: {
          create: ChatCompletions,
        },
      },
    })),
  };
});

describe("ProxyAPIAdapter execute", () => {
  it("executes successfully with openai provider", async () => {
    const ctx: any = {
      agent: { id: "agent-1", name: "Test Agent", companyId: "company-1" },
      config: {
        provider: "openai",
        model: "gpt-4",
        apiKey: "sk-test",
      },
      context: {},
      runId: "run-1",
      onLog: vi.fn(),
    };

    const result = await execute(ctx);

    expect(result.exitCode).toBe(0);
    expect(result.summary).toBe("Mocked OpenAI response");
    expect(result.usage).toEqual({ inputTokens: 10, outputTokens: 20 });
    expect(result.provider).toBe("openai");
    expect(result.model).toBe("gpt-4");
  });

  it("returns error if model is missing", async () => {
    const ctx: any = {
      agent: { id: "agent-1", name: "Test Agent", companyId: "company-1" },
      config: {
        provider: "openai",
      },
      context: {},
      runId: "run-1",
      onLog: vi.fn(),
    };

    const result = await execute(ctx);

    expect(result.exitCode).toBe(1);
    expect(result.errorMessage).toBe("Model name is required for proxy_api adapter");
  });
});
