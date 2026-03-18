# Proxy API Adapter & Pixel Workspace Setup Guide

Welcome to the new Paperclip multi-model experience! This guide will help you set up the **Proxy API Adapter** to connect Paperclip to various AI providers and visualize your agents in the **Pixel Workspace**.

## 1. Prerequisites

- A running Paperclip instance.
- API Keys for your chosen provider(s):
  - **OpenAI**: [platform.openai.com](https://platform.openai.com/)
  - **Anthropic**: [console.anthropic.com](https://console.anthropic.com/)
  - **Google Gemini**: [aistudio.google.com](https://aistudio.google.com/)
  - **Ollama**: No key required (run locally).

## 2. Setting Up an Agent

1. Open the Paperclip Dashboard (`http://localhost:3100`).
2. Click **Hire Agent**.
3. In the **Adapter** dropdown, select **Proxy API**.
4. Configure your provider:

### A. OpenAI
- **Provider**: `OpenAI`
- **Model Name**: e.g., `gpt-4o`, `gpt-3.5-turbo`
- **API Key**: Your `sk-...` key.

### B. Anthropic (Claude)
- **Provider**: `Anthropic (Claude)`
- **Model Name**: e.g., `claude-3-5-sonnet-20241022`, `claude-3-haiku-20240307`
- **API Key**: Your `sk-ant-...` key.

### C. Google Gemini
- **Provider**: `Google (Gemini)`
- **Model Name**: e.g., `gemini-1.5-pro`, `gemini-1.5-flash`
- **API Key**: Your Gemini API key.

### D. Ollama (Local)
- **Provider**: `Ollama (Local)`
- **Model Name**: The model tag you pulled (e.g., `llama3`, `mistral`, `codellama`).
- **Base URL**: Defaults to `http://localhost:11434/v1`.
  - *Tip: Ensure Ollama is running on your machine.*

## 3. Pixel Workspace Visualization

The **Pixel Workspace** is automatically enabled on your main Dashboard. It visualizes your agents' real-time activity:

- **🟡 Typing (Yellow)**: The agent is currently generating a response.
- **🔵 Idle (Blue)**: The agent is waiting for a new task.
- **🔴 Error (Red)**: The last request failed.

### Pixel Agents Integration (Advanced)
If you want to use the standalone [Pixel Agents](https://github.com/pablodelucca/pixel-agents) app, Paperclip now writes logs to:
`~/.paperclip/logs/<agent-id>.jsonl`

Simply point Pixel Agents to this directory to see your Paperclip agents appear in the standalone office!

## 4. Troubleshooting

- **Connection Refused**: If using Ollama, ensure it's running and the `baseURL` is correct.
- **Invalid API Key**: Double-check that you haven't included whitespace when pasting your keys.
- **Model Not Found**: Ensure the model name matches the provider's official ID exactly.
- **Pixel Workspace Empty**: The workspace only shows agents that have had at least one status update. Try "waking" an agent or sending it a task.

---
*Happy Orchestrating!* 🚀
