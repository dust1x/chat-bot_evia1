// Класс для обработки логики разработки сайтов
import { TextValidator } from "/services/text_validator.js";
export class DevelopmentLogic {
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
      if (this.state === "dialog_development_start") {
        const quickReplies = ["Только разработка", "Комплексное решение: сайт + реклама"];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handleDevelopmentChoice(message);
      }
      if (this.state === "dialog_development_promotion_plans") {
        const quickReplies = [
          "Через контекстную рекламу",
          "Через социальные сети",
          "Через SEO-продвижение",
          "Другое",
        ];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handlePromotionPlans(message);
      }
      if (this.state === "dialog_development_payment") {
        const quickReplies = ["Да", "Нет"];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handlePaymentOptions(message);
      }
      if (this.state === "dialog_development_existing_site") {
        const quickReplies = ["Да", "Нет"];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handleExistingSite(message);
      }
      if (this.state === "dialog_development_integrations") {
        const quickReplies = [
          "CRM/ERP",
          "Бухгалтерская система",
          "Управление складом",
          "Сквозная аналитика",
          "Расчет стоимости почтовых отправлений",
          "1С-вариации",
          "С другими сервисами",
        ];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handleIntegrations(message);
      }
      if (this.state === "dialog_development_cms") {
        const quickReplies = ["Bitrix", "WordPress", "Tilda", "Не важно"];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handleCMSChoice(message);
      }
      if (this.state === "dialog_development_personal_account") {
        const quickReplies = ["Да", "Нет"];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handlePersonalAccount(message);
      }
      // Остальные шаги без quickReplies — обычная валидация
      if (["dialog_development_structure", "dialog_development_examples", "dialog_development_main_goal", "dialog_development_deadline"].includes(this.state)) {
        // Для dialog_development_deadline — только диапазон дат
        if (this.state === "dialog_development_deadline") {
          if (!/^\d{2}\.\d{2}\.\d{4}-\d{2}\.\d{2}\.\d{4}$/.test(message)) {
            return {
              response: "Пожалуйста, введите диапазон дат в формате дд.мм.гггг-дд.мм.гггг.",
              quickReplies: [],
              state: this.state,
            };
          }
          return this.handleDeadline(message);
        }
        // Для dialog_development_structure — фильтрация с quickReplies
        if (this.state === "dialog_development_structure") {
          const quickReplies = [
            "Иерархическая",
            "Последовательная",
            "Матричная",
            "База данных"
          ];
          const validation = TextValidator.validateText(message, quickReplies);
          if (!validation.isValid) {
            return {
              response: validation.error,
              quickReplies,
              state: this.state,
            };
          }
          return this.handleWebsiteStructure(message);
        }
        // Для dialog_development_main_goal — фильтрация с quickReplies
        if (this.state === "dialog_development_main_goal") {
          const quickReplies = [
            "Получение заявок",
            "Информирование о компании",
            "Заказ звонка",
            "Другое"
          ];
          const validation = TextValidator.validateText(message, quickReplies);
          if (!validation.isValid) {
            return {
              response: validation.error,
              quickReplies,
              state: this.state,
            };
          }
          return this.handleMainGoal(message);
        }
        // Для остальных — обычная фильтрация
        const validation = TextValidator.validateText(message);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies: [],
            state: this.state,
          };
        }
        if (this.state === "dialog_development_examples") {
          return this.handleExamples(message);
        }
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
      this.state = "dialog_development_start";
      return {
        response:
          "Вас интересует только разработка сайта? Или вы готовы рассмотреть комплексное решение: сайт + реклама?",
        quickReplies: ["Только разработка", "Комплексное решение: сайт + реклама"],
        state: this.state,
      };
    }
  
    /**
     * Обработка выбора типа разработки
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleDevelopmentChoice(message) {
      this.context["development_choice"] = message;
      if (message === "Комплексное решение: сайт + реклама") {
        this.state = "dialog_development_promotion_plans";
        return {
          response: "Каким видом рекламы хотите продвигать сайт?",
          quickReplies: [
            "Через контекстную рекламу",
            "Через социальные сети",
            "Через SEO-продвижение",
            "Другое"
          ],
          state: this.state,
        };
      } else {
        this.state = "dialog_development_structure";
        return {
          response: "Теперь уточним структуру сайта.",
          quickReplies: [
            "Иерархическая",
            "Последовательная",
            "Матричная",
            "База данных"
          ],
          state: this.state,
        };
      }
    }
  
    /**
     * Обработка планов по продвижению
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handlePromotionPlans(message) {
      // Сохраняем планы по продвижению
      this.context["promotion_plans"] = message;
      this.state = "dialog_development_structure";
      return {
        response:
          message === "Нет планов пока"
            ? "Поняла! Если понадобится помощь с продвижением, мы сможем предложить вам подходящие решения. Теперь уточним структуру сайта."
            : "Отлично! Мы учтем эти каналы при разработке. Теперь уточним структуру сайта.",
        quickReplies: [
          "Иерархическая",
          "Последовательная",
          "Матричная",
          "База данных"
        ],
        state: this.state,
      };
    }
  
    /**
     * Обработка структуры сайта
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleWebsiteStructure(message) {
      // Сохраняем структуру сайта
      this.context["website_structure"] = message;
      this.state = "dialog_development_payment";
      return {
        response: "Отлично! Мы учтем эту структуру при разработке. Нужна ли оплата на сайте? Например, возможность онлайн-покупок или бронирования услуг.",
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка наличия оплаты на сайте
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handlePaymentOptions(message) {
      // Сохраняем информацию об оплате
      this.context["payment_options"] = message;
      this.state = "dialog_development_existing_site";
      return {
        response:
          message === "Да"
            ? "Поняла! Мы добавим функционал для онлайн-оплаты. Есть ли у вас сейчас другой действующий сайт? Или был ранее?"
            : "Поняла! В таком случае тексты придется писать с нуля. Есть ли у вас сейчас другой действующий сайт? Или был ранее?",
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка наличия существующего сайта
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleExistingSite(message) {
      // Сохраняем информацию о существующем сайте
      this.context["existing_site"] = message;
      this.state = "dialog_development_integrations";
      return {
        response:
          message === "Да"
            ? "Поняла! Мы учтем это при разработке нового сайта. Теперь уточним интеграции."
            : "Поняла! Тексты придется писать с нуля. Теперь уточним интеграции.",
        quickReplies: [
          "CRM/ERP",
          "Бухгалтерская система",
          "Управление складом",
          "Сквозная аналитика",
          "Расчет стоимости почтовых отправлений",
          "1С-вариации",
          "С другими сервисами",
        ],
        state: this.state,
      };
    }
  
    /**
     * Обработка интеграций
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleIntegrations(message) {
      // Сохраняем выбранные интеграции
      this.context["integrations"] = message;
      this.state = "dialog_development_cms";
      return {
        response: "Поняла! Мы учтем эти интеграции при разработке. Теперь уточним CMS.",
        quickReplies: ["Bitrix", "WordPress", "Tilda", "Не важно"],
        state: this.state,
      };
    }
  
    /**
     * Обработка выбора CMS
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleCMSChoice(message) {
      // Сохраняем выбранную CMS
      this.context["cms_choice"] = message;
      this.state = "dialog_development_personal_account";
      return {
        response:
          message === "Не важно"
            ? "Поняла! Мы выберем оптимальную CMS для вашего проекта. Нужен ли пользователям личный кабинет?"
            : `Отлично! Мы будем использовать ${message}. Нужен ли пользователям личный кабинет?`,
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка необходимости личного кабинета
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handlePersonalAccount(message) {
      // Сохраняем информацию о личном кабинете
      this.context["personal_account"] = message;
      this.state = "dialog_development_examples";
      return {
        response:
          message === "Да"
            ? "Поняла! Мы добавим личный кабинет с указанными функциями. Есть ли сайты или решения, которые вам нравятся?"
            : "Поняла! Личный кабинет не нужен. Есть ли сайты или решения, которые вам нравятся?",
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка примеров
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleExamples(message) {
      // Сохраняем информацию о примерах
      this.context["examples"] = message;
      this.state = "dialog_development_main_goal";
      return {
        response:
          message === "Да"
            ? "Спасибо за пример! Мы учтем его при разработке. Теперь уточним основную цель сайта."
            : "Хорошо. Будем разрабатывать. Теперь уточним основную цель сайта.",
        quickReplies: [
          "Получение заявок",
          "Информирование о компании",
          "Заказ звонка",
          "Другое",
        ],
        state: this.state,
      };
    }
  
    /**
     * Обработка основной цели сайта
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleMainGoal(message) {
      // Сохраняем основную цель
      this.context["main_goal"] = message;
      this.state = "dialog_development_deadline";
      return {
        response: "Поняла! Мы учтем эту цель при разработке. В какие сроки хотите уложиться?",
        quickReplies: [],
        state: this.state,
      };
    }
  
    /**
     * Обработка сроков
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleDeadline(message) {
      // Сохраняем информацию о сроках
      this.context["deadline"] = message;
      this.state = "start";
      return {
        response: "Спасибо за информацию! Ваша заявка уже выполняется. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты. Вам нужно заполнить <a href=\"https://go.1ps.ru/pr/?pg=new_request.account&fm_plan=set62\" target=\"_blank\">вот эту заявку</a> и вам позвонит менеджер.",
        quickReplies: ["Начать сначала"],
        state: this.state,
      };
    }
  }