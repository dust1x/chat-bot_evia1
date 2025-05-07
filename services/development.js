export class DevelopmentLogic {
    state = "start";
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
        return this.handleDevelopmentChoice(message);
      }
      if (this.state === "dialog_development_promotion_plans") {
        return this.handlePromotionPlans(message);
      }
      if (this.state === "dialog_development_structure") {
        return this.handleWebsiteStructure(message);
      }
      if (this.state === "dialog_development_payment") {
        return this.handlePaymentOptions(message);
      }
      if (this.state === "dialog_development_existing_site") {
        return this.handleExistingSite(message);
      }
      if (this.state === "dialog_development_integrations") {
        return this.handleIntegrations(message);
      }
      if (this.state === "dialog_development_cms") {
        return this.handleCMSChoice(message);
      }
      if (this.state === "dialog_development_personal_account") {
        return this.handlePersonalAccount(message);
      }
      if (this.state === "dialog_development_examples") {
        return this.handleExamples(message);
      }
      if (this.state === "dialog_development_main_goal") {
        return this.handleMainGoal(message);
      }
      if (this.state === "dialog_development_deadline") {
        return this.handleDeadline(message);
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
      this.state = "dialog_development_promotion_plans";
      return {
        response:
          message === "Только разработка"
            ? "Поняла! Мы сфокусируемся на разработке сайта. Теперь уточним, как вы планируете продвигать созданный сайт."
            : "Отлично! Мы учтем это при разработке стратегии. Теперь уточним структуру будущего сайта.",
        quickReplies: [],
        state: this.state,
      };
    }
  
    /**
     * Обработка планов по продвижению
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handlePromotionPlans(message) {
      this.context["promotion_plans"] = message;
      this.state = "dialog_development_structure";
      return {
        response:
          message === "Нет планов пока"
            ? "Поняла! Если понадобится помощь с продвижением, мы сможем предложить вам подходящие решения. Теперь уточним структуру сайта."
            : "Отлично! Мы учтем эти каналы при разработке. Теперь уточним структуру сайта.",
        quickReplies: [
          "Через контекстную рекламу",
          "Через социальные сети",
          "Через SEO-продвижение",
          "Другое",
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
      this.context["main_goal"] = message;
      this.state = "dialog_development_deadline";
      return {
        response: `Поняла! Цель "${message}" — это основной фокус для нас. Теперь уточним сроки.`,
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
      this.context["deadline"] = message;
      this.state = "start";
      return {
        response:
          "Поняла! Мы учтем ваши сроки. Спасибо за подробные ответы! Теперь мы можем приступить к работе. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты. Вам нужно заполнить <a href=\"https://go.1ps.ru/pr/?pg=new_request.account&fm_plan=set62\" target=\"_blank\">вот эту заявку</a> и вам позвонит менеджер.",
        quickReplies: ["Начать сначала"],
        state: this.state,
      };
    }
  }