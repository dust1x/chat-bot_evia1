
class DeepseekChatbot {
    constructor(apiKey) {
        this.apiUrl = "https://api.deepseek.com/v1/chat/completions";
        this.apiKey = apiKey; // Ваш API-ключ будет храниться здесь
    }

    async getDiabetesResponse(userMessage) {
        const systemPrompt = `Ты бот консультант по вопросам внедрения и анализа маркетинговой компании. Вот информация о ней, тебе нужно это запомнить и представляться её помощником : "1PS.RU — онлайн-агентство performance-маркетинга, оказывающее весь комплекс digital-услуг по России и в странах СНГ.
Помогаем продвигать бизнес в Интернете. Занимаемся SEO, SMM, SERM, рекламой, созданием сайтов, лендингов и другими полезными штуками для увеличения продаж наших клиентов.
Вышли на рынок в далеком 1999 году почти одновременно с Яндексом. Являемся официальными бизнес-партнерами Яндекса и Google. Входим в ТОП-10 лучших компаний Рунета. В 2018 году признаны наиболее быстрорастущим среди существующих digital-агентств и веб-продакшенов России. Подробнее обо всех наших регалиях можно почитать тут.". Отвечай ТОЛЬКО на вопросы о:
        - Что такое маркетплейс
        - Что такое комплекс
        - Что такое копирайтинг
        - Что такое SEO и для чего это
        - Что такое Email
        - Что такое услуги по Рекламе и зачем они нужны
        - Что такое разработка сайта

        На остальные вопросы отвечай: 'Я могу помочь только с вопросами об услугах компании.'`;

        const requestData = {
            model: "deepseek-chat",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage }
            ],
            temperature: 0.3
        };

        try {
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                throw new Error(`Ошибка HTTP! Статус: ${response.status}`);
            }

            const responseData = await response.json();
            return responseData.choices[0]?.message?.content || "Не удалось получить ответ";
        } catch (error) {
            console.error('Ошибка при запросе к API Deepseek:', error);
            return `Ошибка: ${error.message}`;
        }
    }
}
// ====================== ВСТАВЬТЕ ВАШ API-КЛЮЧ ЗДЕСЬ ======================
const DEEPSEEK_API_KEY = "sk-b1389e850d07496d9e24db431533da7a";
// ==========================================================================
// Создаем экземпляр чат-бота с вашим API-ключом
const chatbot = new DeepseekChatbot(DEEPSEEK_API_KEY);