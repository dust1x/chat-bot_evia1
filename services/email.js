// Класс для обработки логики email-рассылок
export class EmailLogic {
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
      if (this.state === "dialog_email_start") {
        return this.handleServiceChoice(message);
      }
      // Обработка наличия базы для рассылок
      if (this.state === "dialog_email_base") {
        return this.handleEmailBase(message);
      }
      // Обработка наличия согласий на рассылки
      if (this.state === "dialog_email_consent") {
        return this.handleEmailConsent(message);
      }
      // Обработка наличия политики конфиденциальности
      if (this.state === "dialog_email_privacy_policy") {
        return this.handlePrivacyPolicy(message);
      }
      // Обработка выбора сервиса для рассылок
      if (this.state === "dialog_email_service") {
        return this.handleEmailService(message);
      }
      // Обработка предыдущих результатов рассылок
      if (this.state === "dialog_email_previous_results") {
        return this.handlePreviousResults(message);
      }
      // Обработка видов писем
      if (this.state === "dialog_email_types") {
        return this.handleEmailTypes(message);
      }
      // Обработка сегментации базы
      if (this.state === "dialog_email_segmentation") {
        return this.handleSegmentation(message);
      }
      // Обработка целей рассылок
      if (this.state === "dialog_email_goals") {
        return this.handleGoals(message);
      }
      // Обработка выбора CMS
      if (this.state === "dialog_email_cms") {
        return this.handleCMS(message);
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
      this.state = "dialog_email_start";
      return {
        response:
          "Что конкретно вы хотите, чтобы мы сделали? Например:",
        quickReplies: [
          "Настроить email-рассылки",
          "Разработать письма и контент для рассылок",
          "Другое",
        ],
        state: this.state,
      };
    }
  
    /**
     * Обработка выбора услуги
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleServiceChoice(message) {
      // Сохраняем выбранную услугу
      this.context["email_service"] = message;
      this.state = "dialog_email_base";
      return {
        response:
          `Поняла! Мы сфокусируемся на "${message}". Есть ли у вас база для рассылок или её нужно собрать? Также есть ли на сайте формы для сбора подписной базы? Если нет, нужно ли их добавить?`,
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка наличия базы для рассылок
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleEmailBase(message) {
      if (message === "Да") {
        // Сохраняем информацию о наличии базы
        this.context["email_base_exists"] = true;
        this.state = "dialog_email_consent";
        return {
          response:
            "Отлично! Уточню — есть ли доказательства того, что клиенты дали согласие на получение рассылок? Без этого мы нарушим законодательство РФ.",
          quickReplies: ["Да", "Нет"],
          state: this.state,
        };
      } else {
        // Сохраняем информацию об отсутствии базы
        this.context["email_base_exists"] = false;
        this.state = "dialog_email_consent";
        return {
          response:
            "Поняла! В таком случае нужно собрать базу. Есть ли доказательства того, что клиенты дали согласие на получение рассылок? Без этого мы нарушим законодательство РФ.",
          quickReplies: ["Да", "Нет"],
          state: this.state,
        };
      }
    }
  
    /**
     * Обработка наличия согласий
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleEmailConsent(message) {
      if (message === "Да") {
        // Сохраняем информацию о наличии согласий
        this.context["email_consent"] = true;
        this.state = "dialog_email_privacy_policy";
        return {
          response:
            "Отлично! Мы учтем это при работе. Есть ли на сайте политика конфиденциальности? Или её нужно сделать?",
          quickReplies: ["Да", "Нет"],
          state: this.state,
        };
      } else {
        // Сохраняем информацию об отсутствии согласий
        this.context["email_consent"] = false;
        this.state = "dialog_email_privacy_policy";
        return {
          response:
            "Поняла! В таком случае важно получить согласия клиентов перед началом рассылок. Мы поможем вам организовать этот процесс. Есть ли на сайте политика конфиденциальности? Или её нужно сделать?",
          quickReplies: ["Да", "Нет"],
          state: this.state,
        };
      }
    }
  
    /**
     * Обработка наличия политики конфиденциальности
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handlePrivacyPolicy(message) {
      if (message === "Да") {
        // Сохраняем информацию о наличии политики конфиденциальности
        this.context["privacy_policy_exists"] = true;
        this.state = "dialog_email_service";
        return {
          response:
            "Отлично! Мы учтем её при работе. Через какой сервис отправлять рассылки? Или нужно подобрать подходящий?",
          quickReplies: [],
          state: this.state,
        };
      } else {
        // Сохраняем информацию об отсутствии политики конфиденциальности
        this.context["privacy_policy_exists"] = false;
        this.state = "dialog_email_service";
        return {
          response:
            "Поняла! В таком случае нужно создать политику конфиденциальности. Мы поможем вам с этим. Через какой сервис отправлять рассылки? Или нужно подобрать подходящий?",
          quickReplies: [],
          state: this.state,
        };
      }
    }
  
    /**
     * Обработка выбора сервиса для рассылок
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleEmailService(message) {
      // Сохраняем выбранный сервис для рассылок
      this.context["email_service_name"] = message;
      this.state = "dialog_email_previous_results";
      return {
        response:
          `Поняла! Будем работать через "${message}". Уже что-то отправляли из писем клиентам? Как это делали? Какой результат был?`,
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка предыдущих результатов рассылок
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handlePreviousResults(message) {
      if (message === "Да") {
        // Сохраняем информацию о наличии предыдущих результатов
        this.context["previous_results_exist"] = true;
        this.state = "dialog_email_types";
        return {
          response:
            "Поняла! Эти данные помогут нам улучшить показатели. Теперь уточним виды писем. Какие виды писем нужны? Например:",
          quickReplies: [
            "Приветственные письма",
            "Акции и скидки",
            "Информационные письма",
            "Другое",
          ],
          state: this.state,
        };
      } else {
        // Сохраняем информацию об отсутствии предыдущих результатов
        this.context["previous_results_exist"] = false;
        this.state = "dialog_email_types";
        return {
          response:
            "Поняла! В таком случае мы начнем с анализа целевой аудитории и подготовки контента. Какие виды писем нужны? Например:",
          quickReplies: [
            "Приветственные письма",
            "Акции и скидки",
            "Информационные письма",
            "Другое",
          ],
          state: this.state,
        };
      }
    }
  
    /**
     * Обработка видов писем
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleEmailTypes(message) {
      // Сохраняем выбранные виды писем
      this.context["email_types"] = message;
      this.state = "dialog_email_segmentation";
      return {
        response:
          "Поняла! Мы учтем эти параметры при планировании рассылок. Нужно ли сегментировать базу?",
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка сегментации базы
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleSegmentation(message) {
      if (message === "Да") {
        // Сохраняем информацию о необходимости сегментации
        this.context["segmentation_needed"] = true;
        this.state = "dialog_email_goals";
        return {
          response:
            "Поняла! Мы поможем вам сегментировать базу для более эффективных рассылок. Какие цели вы хотите достичь с помощью email-рассылок?",
          quickReplies: [
            "Увеличение продаж",
            "Повышение лояльности",
            "Информирование клиентов",
            "Другое",
          ],
          state: this.state,
        };
      } else {
        // Сохраняем информацию об отсутствии необходимости сегментации
        this.context["segmentation_needed"] = false;
        this.state = "dialog_email_goals";
        return {
          response:
            "Поняла! Мы будем работать с общей базой. Какие цели вы хотите достичь с помощью email-рассылок?",
          quickReplies: [
            "Увеличение продаж",
            "Повышение лояльности",
            "Информирование клиентов",
            "Другое",
          ],
          state: this.state,
        };
      }
    }
  
    /**
     * Обработка целей рассылок
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleGoals(message) {
      // Сохраняем выбранные цели
      this.context["email_goals"] = message;
      this.state = "dialog_email_cms";
      return {
        response:
          "Поняла! Мы учтем эти цели при разработке стратегии рассылок. На какой CMS работает ваш сайт?",
        quickReplies: ["Bitrix", "WordPress", "Tilda", "Другое"],
        state: this.state,
      };
    }
  
    /**
     * Обработка выбора CMS
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleCMS(message) {
      // Сохраняем выбранную CMS
      this.context["cms"] = message;
      this.state = "start";
      return {
        response: "Спасибо за информацию! Ваша заявка уже выполняется. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты. Вам нужно заполнить <a href=\"https://go.1ps.ru/pr/?pg=new_request.account&fm_plan=set62\" target=\"_blank\">вот эту заявку</a> и вам позвонит менеджер.",
        quickReplies: ["Начать сначала"],
        state: this.state,
      };
    }
}