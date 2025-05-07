export class AdvertisingLogic {
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
      if (this.state === "dialog_advertising_start") {
        return this.handleAdvertisingType(message);
      }
      if (this.state === "dialog_advertising_goals") {
        return this.handleBusinessGoals(message);
      }
      if (this.state === "dialog_advertising_problems") {
        return this.handleMainProblem(message);
      }
      if (this.state === "dialog_advertising_channels") {
        return this.handleAdvertisingChannels(message);
      }
      if (this.state === "dialog_advertising_priorities") {
        return this.handlePriorities(message);
      }
      if (this.state === "dialog_advertising_geography") {
        return this.handleGeography(message);
      }
      if (this.state === "dialog_advertising_audience") {
        return this.handleAudience(message);
      }
      if (this.state === "dialog_advertising_seasonality") {
        return this.handleSeasonality(message);
      }
      if (this.state === "dialog_advertising_expectations") {
        return this.handleExpectations(message);
      }
      if (this.state === "dialog_advertising_deadline") {
        return this.handleDeadline(message);
      }
      if (this.state === "dialog_advertising_requirements") {
        return this.handleRequirements(message);
      }
      if (this.state === "dialog_advertising_budget") {
        return this.handleBudget(message);
      }
      if (this.state === "dialog_advertising_documents") {
        return this.handleDocuments(message);
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
      this.state = "dialog_advertising_start";
      return {
        response:
          "Вас интересует какая-то конкретная реклама? Или вы готовы рассмотреть комплексное решение?",
        quickReplies: ["Конкретная реклама", "Комплексное решение"],
        state: this.state,
      };
    }
  
    /**
     * Обработка типа рекламы
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleAdvertisingType(message) {
      this.context["advertising_type"] = message;
      this.state = "dialog_advertising_goals";
      return {
        response:
          "Отлично! Мы учтем это при разработке стратегии. Теперь уточним ваши текущие цели. Какие цели вы ставите перед бизнесом сейчас? Выберите один или несколько вариантов:",
        quickReplies: [
          "Увеличение заявок и продаж",
          "Рост целевого трафика на сайт",
          "Увеличение узнаваемости бренда",
          "Всё вышеперечисленное",
          "Другое",
        ],
        state: this.state,
      };
    }
  
    /**
     * Обработка целей бизнеса
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleBusinessGoals(message) {
      this.context["business_goal"] = message;
      this.state = "dialog_advertising_problems";
      return {
        response:
          `Поняла! Цель "${message}" — это основной фокус для нас. Теперь уточним, есть ли у вас текущие проблемы с сайтом или рекламой. Какая основная проблема у сайта или рекламы сейчас, как считаете? Например:`,
        quickReplies: [
          "Низкая конверсия",
          "Мало заявок",
          "Высокая стоимость привлечения клиентов",
          "Другое",
        ],
        state: this.state,
      };
    }
  
    /**
     * Обработка основной проблемы
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleMainProblem(message) {
      this.context["main_problem"] = message;
      this.state = "dialog_advertising_channels";
      return {
        response:
          "Поняла! Мы учтем эту проблему при разработке стратегии. Теперь уточним, какие каналы рекламы вам интересны. Какие каналы рекламы могут быть интересны? Выберите один или несколько вариантов:",
        quickReplies: [
          "Контекстная реклама",
          "Программатик",
          "Реклама в навигаторах и картах",
          "Наружная цифровая реклама (билборды в МСК)",
          "Реклама в соцсетях (ВК, ОК, Тг и др.)",
          "Медийная реклама",
          "Реклама в Яндекс.Промостраницах",
          "Реклама товаров с маркетплейсов",
        ],
        state: this.state,
      };
    }
  
    /**
     * Обработка каналов рекламы
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleAdvertisingChannels(message) {
      this.context["advertising_channels"] = message;
      this.state = "dialog_advertising_priorities";
      return {
        response:
          "Отлично! Мы учтем эти каналы при разработке стратегии. А где-то уже запускали рекламу?",
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка приоритетных направлений
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handlePriorities(message) {
      if (message === "Да") {
        this.context["previous_advertising"] = true;
        this.state = "dialog_advertising_geography";
        return {
          response:
            "Поняла! Мы учтем этот опыт при настройке новых кампаний. Теперь уточним приоритетные направления. На что нам делать упор в рекламе? Например:",
          quickReplies: [
            "Продвижение конкретных товаров",
            "Брендирование компании",
            "Привлечение подписчиков в соцсетях",
            "Другое",
          ],
          state: this.state,
        };
      } else {
        this.context["previous_advertising"] = false;
        this.state = "dialog_advertising_geography";
        return {
          response:
            "Поняла! В таком случае мы начнем с анализа целевой аудитории и подбора подходящих каналов. На что нам делать упор в рекламе? Например:",
          quickReplies: [
            "Продвижение конкретных товаров",
            "Брендирование компании",
            "Привлечение подписчиков в соцсетях",
            "Другое",
          ],
          state: this.state,
        };
      }
    }
  
    /**
     * Обработка географии работы
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleGeography(message) {
      this.context["geography"] = message;
      this.state = "dialog_advertising_audience";
      return {
        response:
          "Отлично! Мы учтем это при настройке таргетинга. А с кем в основном работаете? Кто покупает/заказывает? Например:",
        quickReplies: ["Физические лица", "Юридические лица", "Другое"],
        state: this.state,
      };
    }
  
    /**
     * Обработка аудитории
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleAudience(message) {
      this.context["audience"] = message;
      this.state = "dialog_advertising_seasonality";
      return {
        response:
          "Поняла! Мы учтем это при создании рекламных материалов. Есть ли выраженная сезонность в спросе ваших товаров/услуг? Например, повышенный спрос летом или перед праздниками?",
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка сезонности
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleSeasonality(message) {
      this.context["seasonality"] = message;
      this.state = "dialog_advertising_expectations";
      return {
        response:
          "Поняла! Мы учтем это при планировании кампаний. Почему решили обратиться за рекламой? Какие ожидаете результаты? Например:",
        quickReplies: [
          "Увеличить продажи на 20%",
          "Получить 100 новых клиентов в месяц",
          "Снизить стоимость привлечения клиента",
          "Другое",
        ],
        state: this.state,
      };
    }
  
    /**
     * Обработка ожиданий
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleExpectations(message) {
      this.context["expectations"] = message;
      this.state = "dialog_advertising_deadline";
      return {
        response:
          "Поняла! Мы учтем ваши ожидания. В какие сроки ожидаете эти результаты? Например:",
        quickReplies: ["Через месяц", "Через три месяца", "Другое"],
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
      this.state = "dialog_advertising_requirements";
      return {
        response:
          "Поняла! Мы учтем ваши сроки. Есть ли какие-то требования к нам, которые мы должны учесть при подготовке коммерческого предложения?",
        quickReplies: [],
        state: this.state,
      };
    }
  
    /**
     * Обработка требований
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleRequirements(message) {
      this.context["requirements"] = message;
      this.state = "dialog_advertising_budget";
      return {
        response:
          "Поняла! Мы учтем это при подготовке КП. На какой рекламный бюджет рассчитываете? Сколько клиентов в месяц и по какой стоимости хотите привлечь?",
        quickReplies: [],
        state: this.state,
      };
    }
  
    /**
     * Обработка бюджета
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleBudget(message) {
      this.context["budget"] = message;
      this.state = "dialog_advertising_documents";
      return {
        response:
          "Поняла! Мы учтем ваш бюджет. У вас есть все необходимые документы для рекламы? Например, ссылки на лицензии/сертификаты, сертификат соответствия, отказное письмо и т.д.?",
        quickReplies: ["Да", "Нет"],
        state: this.state,
      };
    }
  
    /**
     * Обработка документов
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleDocuments(message) {
      this.context["documents"] = message;
      this.state = "start";
      return {
        response:
          "Поняла! Мы учтем это при подготовке материалов. Спасибо за подробные ответы! Теперь мы можем приступить к работе. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты. Вам нужно заполнить <a href=\"https://go.1ps.ru/pr/?pg=new_request.account&fm_plan=set62\" target=\"_blank\">вот эту заявку</a> и вам позвонит менеджер.",
        quickReplies: ["Начать сначала"],
        state: this.state,
      };
    }
  }