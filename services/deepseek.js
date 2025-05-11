// Импорт fetch (закомментирован, так как используется глобальный fetch)
// import fetch from "node-fetch";

// Класс для работы с сервисом Deepseek через OpenRouter API
export class DeepseekService {
    constructor() {
        // API ключ для доступа к OpenRouter
        this.apiKey = "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";
        // Модель Deepseek для генерации ответов
        this.model = "deepseek/deepseek-r1";
        // URL API OpenRouter
        this.apiUrl = "https://openrouter.ai/api/v1/chat/completions";
    }

    // Метод для обработки контента, удаляющий теги <think>
    processContent(content) {
        return content.replace(/<think>/g, '').replace(/<\/think>/g, '');
    }

    // Основной метод для получения ответа от Deepseek
    async getResponse(prompt) {
        // Заголовки для API запроса
        const headers = {
            "Authorization": `Bearer ${this.apiKey}`,
            "Content-Type": "application/json"
        };
        // Данные для запроса
        const data = {
            model: this.model,
            messages: [{ role: "user", content: prompt }],
            stream: false
        };
        try {
            // Отправка POST запроса к API
            const response = await fetch(this.apiUrl, {
                method: "POST",
                headers,
                body: JSON.stringify(data)
            });
            // Проверка успешности запроса
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Ошибка OpenRouter API:", errorText);
                return `Ошибка OpenRouter API: ${errorText}`;
            }
            // Получение и обработка ответа
            const result = await response.json();
            if (result.choices && result.choices[0]?.message?.content) {
                return this.processContent(result.choices[0].message.content);
            }
            return "Нет ответа от DeepSeek";
        } catch (error) {
            // Обработка ошибок при запросе
            console.error("Ошибка при запросе к OpenRouter:", error);
            return "Ошибка при обращении к OpenRouter";
        }
    }
} 