import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type {
  AdapterExecutionContext,
  AdapterExecutionResult,
} from "@paperclipai/adapter-utils";
import {
  asString,
  renderTemplate,
  joinPromptSections,
} from "@paperclipai/adapter-utils/server-utils";

export async function execute(ctx: AdapterExecutionContext): Promise<AdapterExecutionResult> {
  const { agent, config, context } = ctx;

  const provider = asString(config.provider, "openai").toLowerCase();
  const modelName = asString(config.model, "");
  const apiKey = asString(config.apiKey, "");
  const baseURL = asString(config.baseURL, "");
  const promptTemplate = asString(
    config.promptTemplate,
    "You are agent {{agent.id}} ({{agent.name}}). Continue your Paperclip work.",
  );

  if (!modelName) {
    return {
      exitCode: 1,
      signal: null,
      timedOut: false,
      errorMessage: "Model name is required for proxy_api adapter",
      errorCode: "proxy_api_model_missing",
    };
  }

  const templateData = {
    agentId: agent.id,
    companyId: agent.companyId,
    runId: ctx.runId,
    agent,
    context,
  };
  const renderedPrompt = renderTemplate(promptTemplate, templateData);
  const sessionHandoffNote = asString(context.paperclipSessionHandoffMarkdown, "").trim();
  const prompt = joinPromptSections([sessionHandoffNote, renderedPrompt]);

  try {
    let resultText = "";
    let usage = { inputTokens: 0, outputTokens: 0 };

    if (provider === "openai" || provider === "ollama") {
      const client = new OpenAI({
        apiKey: apiKey || (provider === "ollama" ? "ollama-dummy" : ""),
        baseURL: baseURL || (provider === "ollama" ? "http://localhost:11434/v1" : undefined),
      });

      const response = await client.chat.completions.create({
        model: modelName,
        messages: [{ role: "user", content: prompt }],
      });

      resultText = response.choices[0]?.message?.content || "";
      usage = {
        inputTokens: response.usage?.prompt_tokens || 0,
        outputTokens: response.usage?.completion_tokens || 0,
      };
    } else if (provider === "anthropic") {
      if (!apiKey) throw new Error("API Key is required for Anthropic");
      const client = new Anthropic({ apiKey });

      const response = await client.messages.create({
        model: modelName,
        max_tokens: 4096,
        messages: [{ role: "user", content: prompt }],
      });

      resultText = response.content[0].type === "text" ? response.content[0].text : "";
      usage = {
        inputTokens: response.usage.input_tokens,
        outputTokens: response.usage.output_tokens,
      };
    } else if (provider === "gemini") {
      if (!apiKey) throw new Error("API Key is required for Gemini");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: modelName });

      const result = await model.generateContent(prompt);
      resultText = result.response.text();
      if (result.response.usageMetadata) {
        usage = {
          inputTokens: result.response.usageMetadata.promptTokenCount || 0,
          outputTokens: result.response.usageMetadata.candidatesTokenCount || 0,
        };
      }
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    return {
      exitCode: 0,
      signal: null,
      timedOut: false,
      summary: resultText,
      usage,
      provider,
      model: modelName,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    await ctx.onLog("stderr", `[proxy-api] Execution failed: ${message}\n`);
    return {
      exitCode: 1,
      signal: null,
      timedOut: false,
      errorMessage: message,
      errorCode: "proxy_api_execution_failed",
    };
  }
}
