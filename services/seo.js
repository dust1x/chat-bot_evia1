// Импортируем логику для работы с инструментами
import { ToolsLogic } from "/services/tools.js";
const toolLogic = new ToolsLogic();

// Класс для обработки логики SEO-продвижения
export class SEOLogic {
    // Начальное состояние диалога
    state = "start";
    // Контекст для хранения данных диалога
    context = {};
  
    /**
     * Сброс состояния и контекста
     */
    resetState() {
      this.state = "start";
      this.context = {};
    }
  
    /**
     * Обработка входящего сообщения
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    async handleMessage(message) {
      // Обработка начального состояния диалога
      if (this.state === "dialog_seo_start") {
        return this.handleWebsiteAddress(message);
      }
      // Обработка анализа сайта
      if (this.state === "dialog_seo_analysis") {
        return this.handleAnalysis(message);
      }
      // Обработка бюджета
      if (this.state === "dialog_seo_budget") {
        return this.handleBudget(message);
      }
      // Обработка цели продвижения
      if (this.state === "dialog_seo_goal") {
        return this.handleGoal(message);
      }
  
      // Если состояние не определено, просим пользователя начать заново
      return {
        response: "Я не поняла ваш запрос. Пожалуйста, выберите один из предложенных вариантов.",
        quickReplies: ["Начать сначала"],
        state: "start",
      };
    }
  
    /**
     * Начало диалога
     * @returns {object} - Ответ бота и следующее состояние
     */
    startDialog() {
      this.state = "dialog_seo_start";
      return {
        response:
          "Пожалуйста, укажите адрес вашего сайта, я его проанализирую:",
        quickReplies: [],
        state: this.state,
      };
    }
  
    /**
     * Обработка адреса сайта
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    async handleWebsiteAddress(message) {
        // Проверяем, есть ли у пользователя сайт
        if (message.toLowerCase().includes("нет") || message.toLowerCase().includes("у меня нет сайта")) {
          this.state = "start";
          return {
            response:
              "Без сайта я не смогу рассчитать стоимость его продвижения. Но вы можете заполнить вот эту заявку, и вам позвонит менеджер.",
            quickReplies: ["Начать сначала"],
            state: this.state,
          };
        }
      
        // Проверяем корректность ссылки
        if (!message.startsWith("https")) {
          return {
            response:
              "Пожалуйста, проверьте, что вы отправили корректную ссылку на ваш сайт. Она должна начинаться с 'https'. Попробуйте снова.",
            quickReplies: [],
            state: this.state,
          };
        }
      
        try {
          // Проверяем работоспособность сайта
          const isWebsiteAvailable = await toolLogic.checkWebsiteAvailability(message);
          if (isWebsiteAvailable) {
            // Сохраняем адрес сайта и переходим к анализу
            this.context["website_address"] = message;
            this.state = "dialog_seo_analysis";
            return {
              response:
                "Здесь, кажется, есть много интересных разделов. Пока идет анализ сайта, у меня есть еще несколько вопросов относительно вашего бизнеса. Насколько вам важно получить результат от продвижения быстро? Мы можем в первые 1-3 месяца заложить максимальный объем работ или исправлять ошибки постепенно.",
              quickReplies: ["Есть возможность разово вложиться", "Нужна рассрочка"],
              state: this.state,
            };
          } else {
            return {
              response:
                "К сожалению, сайт по указанной ссылке недоступен. Пожалуйста, перепроверьте работоспособность ссылки и отправьте её снова.",
              quickReplies: [],
              state: this.state,
            };
          }
        } catch (error) {
          console.error("Ошибка при проверке сайта:", error);
          return {
            response:
              "Произошла ошибка при проверке работоспособности сайта. Пожалуйста, попробуйте снова позже.",
            quickReplies: ["Начать сначала"],
            state: "start",
          };
        }
      }

    /**
     * Обработка анализа сайта
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleAnalysis(message) {
      // Сохраняем предпочтения по инвестициям
      this.context["investment_preference"] = message;
      this.state = "dialog_seo_budget";
      return {
        response:
          message === "Есть возможность разово вложиться"
            ? "Хорошо, я вас поняла. Тогда отранжируем все найденные ошибки по степени важности, срочности и критичности исправления. И рассчитаем работы так, чтобы как можно быстрее догнать конкурентов. А после этого уже будем работать на опережение."
            : "Поняла! Мы учтем это при планировании работ.",
        quickReplies: ["До 60 тыс. рублей", "60-100 тыс. рублей", "Более 100 тыс. рублей"],
        state: this.state,
      };
    }
  
    /**
     * Обработка бюджета
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleBudget(message) {
      // Сохраняем информацию о бюджете
      this.context["budget"] = message;
      this.state = "dialog_seo_goal";
      return {
        response:
          "Какой основной цели вы хотите достичь с нашей помощью?",
        quickReplies: [
          "Увеличение продаж с канала SEO",
          "Повышение посещаемости сайта",
          "Улучшение видимости в поисковых системах",
          "Выход в ТОП по ключевым словам",
        ],
        state: this.state,
      };
    }
  
    /**
     * Обработка цели продвижения
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleGoal(message) {
      // Сохраняем цель продвижения
      this.context["goal"] = message;
      this.state = "start";
      return {
        response:
          "Спасибо, зафиксировала. Анализ вашего сайта готов. Расчет стоимости и эффективности продвижения еще в работе. Но скоро тоже будет готов. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты. Вам нужно заполнить <a href=\"https://go.1ps.ru/pr/?pg=new_request.account&fm_plan=set62\" target=\"_blank\">вот эту заявку</a> и вам позвонит менеджер.",
        quickReplies: ["Начать сначала"],
        state: this.state,
      };
    }
}