export class CopywritingLogic {
  constructor() {
    this.state = "start"; // Начальное состояние
    this.context = {};    // Контекст для хранения данных пользователя
  }

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
    if (this.state === "dialog_copywriting_start") {
      return this.handleUniqueSellingPoint(message);
    }
    if (this.state === "dialog_copywriting_goals") {
      return this.handleCopywritingGoals(message);
    }
    if (this.state === "dialog_copywriting_budget") {
      return this.handleCopywritingBudget(message);
    }
    if (this.state === "dialog_copywriting_page_type") {
      return this.handlePageType(message);
    }
    if (this.state === "dialog_copywriting_tone_style") {
      return this.handleToneStyle(message);
    }
    if (this.state === "dialog_copywriting_optimization") {
      return this.handleOptimizationPreferences(message);
    }
    if (this.state === "dialog_copywriting_call_to_action") {
      return this.handleCallToAction(message);
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
    this.state = "dialog_copywriting_start";
    return {
      response:
        "Поняла. Прежде чем мы начнем писать тексты, важно понять ваше уникальное торговое предложение (УТП). Чем вы отличаетесь от конкурентов?",
      quickReplies: [], // Здесь нет быстрых ответов
      state: this.state,
    };
  }

  /**
   * Обработка выбора УТП
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleUniqueSellingPoint(message) {
    this.context["unique_selling_point"] = message;
    this.state = "dialog_copywriting_goals";
    return {
      response:
        "Отлично! Мы учтем это при написании текстов. Теперь давайте уточним цели текста. Какие цели вы хотите достичь с помощью текста? Выберите один или несколько вариантов:",
      quickReplies: [
        "Информирование о компании/услугах/товарах",
        "Увеличение продаж",
        "Повышение узнаваемости бренда",
        "Привлечение трафика на сайт",
        "Другое",
      ],
      state: this.state,
    };
  }

  /**
   * Обработка целей копирайтинга
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleCopywritingGoals(message) {
    this.context["copywriting_goals"] = message;
    this.state = "dialog_copywriting_budget";
    return {
      response:
        `Поняла! Цель "${message}" — это отличный фокус для текста. Насколько вам важно получить результат от продвижения быстро? Мы можем заложить максимальный объем работ за 1-3 месяца или исправлять ошибки постепенно.`,
      quickReplies: ["Есть возможность разово вложиться", "Нужна рассрочка"],
      state: this.state,
    };
  }

  /**
   * Обработка бюджета
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleCopywritingBudget(message) {
    this.context["copywriting_budget"] = message;
    this.state = "dialog_copywriting_page_type";
    return {
      response:
        "Хорошо. Для какой страницы вам нужен текст? Выберите один или несколько вариантов:",
      quickReplies: [
        "Главная страница",
        "Описание услуг/товаров",
        "Landing page (целевая страница)",
        "Блог/статья",
        "SEO-текст",
        "О компании",
        "Контакты",
        "Другое",
      ],
      state: this.state,
    };
  }

  /**
   * Обработка типа страницы
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handlePageType(message) {
    this.context["page_type"] = message;
    this.state = "dialog_copywriting_tone_style";
    return {
      response:
        `Отлично! Текст для "${message}" должен быть особенно продающим и информативным. Теперь скажите, пожалуйста, какой тон и стиль текста вы предпочитаете?`,
      quickReplies: ["Официальный", "Креативный", "Дружеский", "Другое"],
      state: this.state,
    };
  }

  /**
   * Обработка тона и стиля текста
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleToneStyle(message) {
    this.context["tone_style"] = message;
    this.state = "dialog_copywriting_optimization";
    return {
      response:
        `Поняла. "${message}" поможет создать доверительную атмосферу с вашей аудиторией. Имеются ли пожелания или требования по оптимизации текстов, или мы просто делаем “как себе”?`,
      quickReplies: ["Да", "Нет"],
      state: this.state,
    };
  }

  /**
   * Обработка предпочтений по оптимизации
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleOptimizationPreferences(message) {
    this.context["optimization_preferences"] = message;
    this.state = "dialog_copywriting_call_to_action";
    return {
      response:
        "Что должен будет сделать читатель после прочтения текста? Выберите один или несколько вариантов:",
      quickReplies: [
        "Оставить заявку",
        "Перейти на другой раздел сайта",
        "Купить товар",
        "Подписаться на рассылку",
        "Другое",
      ],
      state: this.state,
    };
  }

  /**
   * Обработка действия после чтения текста
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handleCallToAction(message) {
    this.context["call_to_action"] = message;
    this.state = "start";
    return {
      response:
        "Спасибо за информацию! Ваша заявка уже выполняется. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты.",
      quickReplies: ["Начать сначала"],
      state: this.state,
    };
  }
}