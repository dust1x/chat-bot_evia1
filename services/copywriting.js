// Класс для обработки логики копирайтинга
import { TextValidator } from "/services/text_validator.js";
export class CopywritingLogic {
  constructor() {
    // Инициализация начального состояния
    this.state = "start";
    // Контекст для хранения данных диалога
    this.context = {};
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
    if (this.state === "dialog_copywriting_goals") {
      const quickReplies = [
        "Информирование о компании/услугах/товарах",
        "Увеличение продаж",
        "Повышение узнаваемости бренда",
        "Привлечение трафика на сайт",
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
      return this.handleCopywritingGoals(message);
    }
    if (this.state === "dialog_copywriting_budget") {
      const quickReplies = [
        "Есть возможность разово вложиться",
        "Нужна рассрочка",
      ];
      const validation = TextValidator.validateText(message, quickReplies);
      if (!validation.isValid) {
        return {
          response: validation.error,
          quickReplies,
          state: this.state,
        };
      }
      return this.handleCopywritingBudget(message);
    }
    if (this.state === "dialog_copywriting_page_type") {
      const quickReplies = [
        "Главная страница",
        "Описание услуг/товаров",
        "Landing page (целевая страница)",
        "Блог/статья",
        "SEO-текст",
        "О компании",
        "Контакты",
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
      return this.handlePageType(message);
    }
    if (this.state === "dialog_copywriting_tone_style") {
      const quickReplies = ["Официальный", "Креативный", "Дружеский", "Другое"];
      const validation = TextValidator.validateText(message, quickReplies);
      if (!validation.isValid) {
        return {
          response: validation.error,
          quickReplies,
          state: this.state,
        };
      }
      return this.handleToneStyle(message);
    }
    if (this.state === "dialog_copywriting_optimization") {
      const quickReplies = ["Да", "Нет"];
      const validation = TextValidator.validateText(message, quickReplies);
      if (!validation.isValid) {
        return {
          response: validation.error,
          quickReplies,
          state: this.state,
        };
      }
      return this.handleOptimizationPreferences(message);
    }
    if (this.state === "dialog_copywriting_call_to_action") {
      const quickReplies = [
        "Оставить заявку",
        "Перейти на другой раздел сайта",
        "Купить товар",
        "Подписаться на рассылку",
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
      return this.handleCallToAction(message);
    }
    // Остальные шаги без quickReplies — обычная валидация
    if (["dialog_copywriting_start"].includes(this.state)) {
      const validation = TextValidator.validateText(message);
      if (!validation.isValid) {
        return {
          response: validation.error,
          quickReplies: [],
          state: this.state,
        };
      }
      return this.handleUniqueSellingPoint(message);
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
    // Сохраняем информацию об УТП
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
    // Сохраняем выбранные цели
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
    // Сохраняем информацию о бюджете
    this.context["copywriting_budget"] = message;
    this.state = "dialog_copywriting_page_type";
    return {
      response: "Какой бюджет вы планируете на копирайтинг? (в рублях)",
      quickReplies: ["Есть возможность разово вложиться", "Нужна рассрочка"],
      state: this.state,
    };
  }

  /**
   * Обработка типа страницы
   * @param {string} message - Сообщение пользователя
   * @returns {object} - Ответ бота и следующее состояние
   */
  handlePageType(message) {
    // Сохраняем выбранный тип страницы
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
    // Сохраняем выбранный тон и стиль
    this.context["tone_style"] = message;
    this.state = "dialog_copywriting_optimization";
    return {
      response:
        `Поняла. "${message}" поможет создать доверительную атмосферу с вашей аудиторией. Имеются ли пожелания или требования по оптимизации текстов, или мы просто делаем "как себе"?`,
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
    // Сохраняем предпочтения по оптимизации
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
    // Сохраняем выбранное действие
    this.context["call_to_action"] = message;
    this.state = "start";
    return {
      response:
        "Спасибо за информацию! Ваша заявка уже выполняется. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты. Вам нужно заполнить <a href=\"https://go.1ps.ru/pr/?pg=new_request.account&fm_plan=set62\" target=\"_blank\">вот эту заявку</a> и вам позвонит менеджер.",
      quickReplies: ["Начать сначала"],
      state: this.state,
    };
  }
}