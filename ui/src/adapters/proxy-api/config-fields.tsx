import type { AdapterConfigFieldsProps } from "../types";
import {
  Field,
  DraftInput,
} from "../../components/agent-config-primitives";

const inputClass =
  "w-full rounded-md border border-border px-2.5 py-1.5 bg-transparent outline-none text-sm font-mono placeholder:text-muted-foreground/40";

const providerOptions = [
  { value: "openai", label: "OpenAI" },
  { value: "anthropic", label: "Anthropic (Claude)" },
  { value: "gemini", label: "Google (Gemini)" },
  { value: "ollama", label: "Ollama (Local)" },
];

export function ProxyAPIConfigFields({
  isCreate,
  values,
  set,
  config,
  eff,
  mark,
}: AdapterConfigFieldsProps) {
  const currentProvider = isCreate
    ? values!.provider ?? "openai"
    : eff("adapterConfig", "provider", String(config.provider ?? "openai"));

  return (
    <>
      <Field label="Provider" hint="Select the AI provider for this adapter.">
        <select
          className={inputClass}
          data-testid="proxy-provider-select"
          value={currentProvider}
          onChange={(e) => {
            const v = e.target.value;
            isCreate ? set!({ provider: v }) : mark("adapterConfig", "provider", v);
          }}
        >
          {providerOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Model Name" hint="Example: gpt-4o, claude-3-5-sonnet-20241022, gemini-1.5-pro, llama3">
        <DraftInput
          data-testid="proxy-model-input"
          value={
            isCreate
              ? values!.model ?? ""
              : eff("adapterConfig", "model", String(config.model ?? ""))
          }
          onCommit={(v) =>
            isCreate ? set!({ model: v }) : mark("adapterConfig", "model", v)
          }
          immediate
          className={inputClass}
          placeholder="Model name"
        />
      </Field>

      {(currentProvider !== "ollama") && (
        <Field label="API Key" hint="Your API key for the selected provider.">
          <DraftInput
            value={
              isCreate
                ? values!.apiKey ?? ""
                : eff("adapterConfig", "apiKey", String(config.apiKey ?? ""))
            }
            onCommit={(v) =>
              isCreate ? set!({ apiKey: v }) : mark("adapterConfig", "apiKey", v)
            }
            immediate
            className={inputClass}
            placeholder="API Key"
            type="password"
          />
        </Field>
      )}

      <Field
        label="Base URL"
        hint={
          currentProvider === "ollama"
            ? "Ollama API base URL (default: http://localhost:11434/v1)"
            : "Optional: override the default API base URL."
        }
      >
        <DraftInput
          value={
            isCreate
              ? values!.baseURL ?? ""
              : eff("adapterConfig", "baseURL", String(config.baseURL ?? ""))
          }
          onCommit={(v) =>
            isCreate ? set!({ baseURL: v }) : mark("adapterConfig", "baseURL", v)
          }
          immediate
          className={inputClass}
          placeholder={currentProvider === "ollama" ? "http://localhost:11434/v1" : "https://api.example.com/v1"}
        />
      </Field>
    </>
  );
}

export function ProxyAPIAdvancedFields({
  isCreate,
  values,
  set,
  config,
  eff,
  mark,
}: AdapterConfigFieldsProps) {
  return null;
}
