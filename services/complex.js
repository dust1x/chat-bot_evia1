export class ComplexLogic {
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
    if (this.state === "dialog_complex_start") {
      return this.handleDirectionChoice(message);
    }
    if (this.state === "dialog_complex_goals") {
      return this.handleBusinessGoals(message);
    }
    if (this.state === "dialog_complex_position") {
      return this.handlePosition(message);
    }
    if (this.state === "dialog_complex_decision_maker") {
      return this.handleDecisionMaker(message);
    }
    if (this.state === "dialog_complex_priority_directions") {
      return this.handlePriorityDirections(message);
    }
    if (this.state === "dialog_complex_current_channels") {
      return this.handleCurrentChannels(message);
    }
    if (this.state === "dialog_complex_new_channels") {
      return this.handleNewChannels(message);
    }
    if (this.state === "dialog_complex_seasonality") {
      return this.handleSeasonality(message);
    }
    if (this.state === "dialog_complex_geography") {
      return this.handleGeography(message);
    }
    if (this.state === "dialog_complex_main_problem") {
      return this.handleMainProblem(message);
    }
    if (this.state === "dialog_complex_budget") {
      return this.handleBudget(message);
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
    this.state = "dialog_complex_start";
    return {
      response:
        "Вас интересует какое-то определенное направление? Например:",
      quickReplies: [
        "Продвижение в маркетплейсах",
        "Контекстная реклама",
        "SEO-продвижение",
        "SMM (социальные сети)",
        "Другое",
      ],
      state: this.state,
    };
  }

  /**
   * Обработка выбора направления
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleDirectionChoice(message) {
    this.context["direction"] = message;
    this.state = "dialog_complex_goals";
    return {
      response: `Поняла! "${message}" — это отличный выбор. Теперь давайте уточним ваши текущие цели.`,
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
    this.state = "dialog_complex_position";
    return {
      response: `Отлично! Цель "${message}" — это основной фокус для нас. Теперь скажите, пожалуйста, какую должность вы занимаете в компании?`,
      quickReplies: [],
      state: this.state,
    };
  }

  /**
   * Обработка должности
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handlePosition(message) {
    this.context["position"] = message;
    this.state = "dialog_complex_decision_maker";
    return {
      response:
        "Спасибо! А кто принимает решение в вашей компании по поводу продвижения? И сможет ли он присутствовать на встрече?",
      quickReplies: [],
      state: this.state,
    };
  }

  /**
   * Обработка лица, принимающего решения
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleDecisionMaker(message) {
    this.context["decision_maker"] = message;
    this.state = "dialog_complex_priority_directions";
    return {
      response:
        "Отлично! Это важно для того, чтобы мы могли обсудить все детали напрямую с ответственным лицом. Теперь уточним приоритетные направления.",
      quickReplies: [
        "Маркетплейсы",
        "Контекстная реклама",
        "SEO-продвижение",
        "SMM (социальные сети)",
        "Другое",
      ],
      state: this.state,
    };
  }

  /**
   * Обработка приоритетных направлений
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handlePriorityDirections(message) {
    this.context["priority_directions"] = message;
    this.state = "dialog_complex_current_channels";
    return {
      response:
        "Поняла! Мы учтем эти направления при разработке стратегии. Теперь расскажите, пожалуйста, как сейчас привлекаете клиентов? Какая эффективность, насколько вообще довольны этими каналами?",
      quickReplies: [],
      state: this.state,
    };
  }

  /**
   * Обработка текущих каналов привлечения клиентов
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleCurrentChannels(message) {
    this.context["current_channels"] = message;
    this.state = "dialog_complex_new_channels";
    return {
      response:
        "Поняла! Какие новые каналы привлечения клиентов вы хотели бы попробовать? Например:",
      quickReplies: [
        "Маркетплейсы",
        "Контекстная реклама",
        "Я.Промостраницы",
        "Программатик",
        "Реклама на картах и навигаторах",
        "Крауд-маркетинг",
        "Email-маркетинг",
        "SEO-продвижение",
        "Другое",
      ],
      state: this.state,
    };
  }

  /**
   * Обработка новых каналов привлечения клиентов
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleNewChannels(message) {
    this.context["new_channels"] = message;
    this.state = "dialog_complex_seasonality";
    return {
      response:
        "Отлично! Мы обязательно рассмотрим эти каналы. Теперь уточним сезонность спроса.",
      quickReplies: ["Да", "Нет"],
      state: this.state,
    };
  }

  /**
   * Обработка сезонности спроса
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleSeasonality(message) {
    this.context["seasonality"] = message;
    this.state = "dialog_complex_geography";
    return {
      response:
        message === "Да"
          ? "Поняла! Мы учтем это при планировании кампаний. А сейчас из какого города/городов больше всего покупают? Хотели бы расширить географию?"
          : "Поняла! У вас нет выраженной сезонности. А сейчас из какого города/городов больше всего покупают? Хотели бы расширить географию?",
      quickReplies: [],
      state: this.state,
    };
  }

  /**
   * Обработка географии
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleGeography(message) {
    this.context["geography"] = message;
    this.state = "dialog_complex_main_problem";
    return {
      response:
        "Отлично! Расширение географии — это важный шаг для роста. Теперь уточним основную проблему.",
      quickReplies: [],
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
    this.state = "dialog_complex_budget";
    return {
      response:
        "Поняла! Мы учтем эту проблему при разработке стратегии. Теперь уточним бюджет.",
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
    this.state = "start";
    return {
      response:
        "Поняла! Мы постараемся достичь этой стоимости заявки. Спасибо за подробные ответы! Теперь мы можем приступить к работе. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты. Вам нужно заполнить <a href=\"https://go.1ps.ru/pr/?pg=new_request.account&fm_plan=set62\" target=\"_blank\">вот эту заявку</a> и вам позвонит менеджер.",
      quickReplies: ["Начать сначала"],
      state: this.state,
    };
  }
}