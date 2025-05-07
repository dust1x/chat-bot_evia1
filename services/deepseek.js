// import fetch from "node-fetch";

export class DeepseekService {
    constructor() {
        this.apiKey = "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"; // Вставьте сюда свой API-ключ OpenRouter
        this.model = "deepseek/deepseek-r1";
        this.apiUrl = "https://openrouter.ai/api/v1/chat/completions";
    }

    processContent(content) {
        return content.replace(/<think>/g, '').replace(/<\/think>/g, '');
    }

    async getResponse(prompt) {
        const headers = {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json"
        };
        const data = {
            model: this.model,
            messages: [{ role: "user", content: prompt }],
            stream: false
        };
        try {
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers,
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Ошибка OpenRouter API:", errorText);
                return `Ошибка OpenRouter API: ${errorText}`;
            }
            const result = await response.json();
            if (result.choices && result.choices[0]?.message?.content) {
                return this.processContent(result.choices[0].message.content);
            }
            return "Нет ответа от DeepSeek";
        } catch (error) {
            console.error("Ошибка при запросе к OpenRouter:", error);
            return "Ошибка при обращении к OpenRouter";
        }
    }
} 