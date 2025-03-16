var domainsList = [
  { key: "bing", name: "Bing Image Creator", url: "bing.com/images/create" },
  { key: "blackbox", name: "Blackbox", url: "blackbox.ai" },
  { key: "chatgpt", name: "ChatGPT", url: "chatgpt.com" },
  { key: "writesonic", name: "Writesonic", url: "writesonic.com/chat" },
  { key: "claude", name: "Claude", url: "claude.ai" },
  { key: "copilot", name: "Copilot", url: "copilot.microsoft.com" },
  { key: "deepseek", name: "DeepSeek", url: "chat.deepseek.com" },
  { key: "duckduckgo", name: "DuckDuckGo AI", url: "duckduckgo.com/aichat" },
  { key: "gemini", name: "Gemini", url: "gemini.google.com" },
  { key: "aistudio", name: "Google AI Studio", url: "aistudio.google.com" },
  { key: "googlelabs", name: "Google Labs", url: "labs.google/experiments" },
  { key: "grok", name: "Grok", url: "grok.com" },
  { key: "huggingchat", name: "HuggingChat", url: "huggingface.co/chat" },
  { key: "jasper", name: "Jasper", url: "jasper.ai" },
  { key: "julius", name: "Julius AI", url: "julius.ai/chat" },
  { key: "kimi", name: "Kimi", url: "kimi.moonshot.cn" },
  { key: "meta", name: "Meta AI", url: "meta.ai" },
  { key: "mistral", name: "Mistral AI", url: "chat.mistral.ai/chat" },
  { key: "notebooklm", name: "NotebookLM", url: "notebooklm.google.com" },
  { key: "perplexity", name: "Perplexity", url: "perplexity.ai" },
  { key: "poe", name: "Poe", url: "poe.com" },
  { key: "qwen", name: "Qwen", url: "chat.qwen.ai" },
  { key: "you", name: "you.com", url: "you.com" }
];

function getDomainByKey(key) {
  for (var i = 0; i < domainsList.length; i++) {
    if (domainsList[i].key === key) {
      return domainsList[i];
    }
  }
  return null;
}