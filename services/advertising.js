// Класс для обработки логики рекламных услуг
import { TextValidator } from "/services/text_validator.js";
export class AdvertisingLogic {
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
      if (this.state === "dialog_advertising_start") {
        const quickReplies = ["Конкретная реклама", "Комплексное решение"];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handleAdvertisingType(message);
      }
      if (this.state === "dialog_advertising_goals") {
        const quickReplies = [
          "Увеличение заявок и продаж",
          "Рост целевого трафика на сайт",
          "Увеличение узнаваемости бренда",
          "Всё вышеперечисленное",
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
        return this.handleBusinessGoals(message);
      }
      if (this.state === "dialog_advertising_problems") {
        const quickReplies = [
          "Низкая конверсия",
          "Мало заявок",
          "Высокая стоимость привлечения клиентов",
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
        return this.handleMainProblem(message);
      }
      if (this.state === "dialog_advertising_channels") {
        const quickReplies = [
          "Контекстная реклама",
          "Программатик",
          "Реклама в навигаторах и картах",
          "Наружная цифровая реклама (билборды в МСК)",
          "Реклама в соцсетях (ВК, ОК, Тг и др.)",
          "Медийная реклама",
          "Реклама в Яндекс.Промостраницах",
          "Реклама товаров с маркетплейсов",
        ];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handleAdvertisingChannels(message);
      }
      if (this.state === "dialog_advertising_priorities") {
        const quickReplies = ["Да", "Нет"];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handlePriorities(message);
      }
      if (this.state === "dialog_advertising_geography") {
        const quickReplies = [
          "Продвижение конкретных товаров",
          "Брендирование компании",
          "Привлечение подписчиков в соцсетях",
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
        return this.handleGeography(message);
      }
      if (this.state === "dialog_advertising_audience") {
        const quickReplies = ["Физические лица", "Юридические лица", "Другое"];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handleAudience(message);
      }
      if (this.state === "dialog_advertising_seasonality") {
        const quickReplies = ["Да", "Нет"];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handleSeasonality(message);
      }
      if (this.state === "dialog_advertising_expectations") {
        const quickReplies = [
          "Увеличить продажи на 20%",
          "Получить 100 новых клиентов в месяц",
          "Снизить стоимость привлечения клиента",
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
        return this.handleExpectations(message);
      }
      if (this.state === "dialog_advertising_deadline") {
        // Разрешаем только диапазон дат в формате дд.мм.гггг-дд.мм.гггг
        if (!/^\d{2}\.\d{2}\.\d{4}-\d{2}\.\d{2}\.\d{4}$/.test(message)) {
          return {
            response: "Пожалуйста, введите диапазон дат в формате дд.мм.гггг-дд.мм.гггг.",
            quickReplies: [],
            state: this.state,
          };
        }
        return this.handleDeadline(message);
      }
      if (this.state === "dialog_advertising_requirements") {
        const quickReplies = [
          "Строгое соблюдение брендбука",
          "Особые ограничения по контенту",
          "Специфические требования к аудитории",
          "Нет особых требований"
        ];
        const validation = TextValidator.validateText(message, quickReplies);
        if (!validation.isValid) {
          return {
            response: validation.error,
            quickReplies,
            state: this.state,
          };
        }
        return this.handleRequirements(message);
      }
      if (this.state === "dialog_advertising_budget") {
        if (!/^\d+$/.test(message)) {
          return {
            response: "Пожалуйста, введите сумму бюджета только цифрами (в рублях).",
            quickReplies: [],
            state: this.state,
          };
        }
        return this.handleBudget(message);
      }
      if (this.state === "dialog_advertising_documents") {
        const quickReplies = [
          "Есть все необходимые документы",
          "Нужна помощь с документами",
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
      // Сохраняем выбранный тип рекламы
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
      // Сохраняем выбранные цели
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
      // Сохраняем указанную проблему
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
      // Сохраняем выбранные каналы рекламы
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
        // Сохраняем информацию о предыдущем опыте
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
        // Отмечаем отсутствие предыдущего опыта
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
      // Сохраняем информацию о географическом охвате
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
      // Сохраняем информацию о целевой аудитории
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
      // Сохраняем информацию о сезонности
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
     * Обработка ожидаемых результатов
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleExpectations(message) {
      // Сохраняем ожидаемые результаты
      this.context["expectations"] = message;
      this.state = "dialog_advertising_deadline";
      return {
        response: "Поняла! Мы учтем ваши ожидания при разработке стратегии. В какие сроки хотите уложиться?",
        quickReplies: [],
        state: this.state,
      };
    }

    /**
     * Обработка сроков реализации
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleDeadline(message) {
      // Сохраняем информацию о сроках
      this.context["deadline"] = message;
      this.state = "dialog_advertising_requirements";
      return {
        response: "Спасибо! Есть ли у вас какие-то особые требования к рекламе? Например:",
        quickReplies: [
          "Строгое соблюдение брендбука",
          "Особые ограничения по контенту",
          "Специфические требования к аудитории",
          "Нет особых требований",
        ],
        state: this.state,
      };
    }

    /**
     * Обработка дополнительных требований
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleRequirements(message) {
      // Сохраняем дополнительные требования
      this.context["requirements"] = message;
      this.state = "dialog_advertising_budget";
      return {
        response: "Поняла! Мы учтем ваши требования. Какой бюджет вы планируете на рекламу? (в рублях)",
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
      // Сохраняем информацию о бюджете
      this.context["budget"] = message;
      this.state = "dialog_advertising_documents";
      return {
        response: "Спасибо! Какие документы у вас есть для запуска рекламы? Например:",
        quickReplies: [
          "Есть все необходимые документы",
          "Нужна помощь с документами",
          "Другое",
        ],
        state: this.state,
      };
    }

    /**
     * Обработка необходимых документов
     * @param {string} message - Сообщение пользователя
     * @returns {object} - Ответ бота и следующее состояние
     */
    handleDocuments(message) {
      // Сохраняем информацию о документах
      this.context["documents"] = message;
      // Завершаем диалог и формируем итоговый ответ
      return this.completeAnalysis();
    }

    /**
     * Завершение анализа и формирование итогового ответа
     * @returns {object} - Итоговый ответ бота
     */
    completeAnalysis() {
      this.state = "start";
      const link = '<a href="https://go.1ps.ru/pr/?pg=new_request.account&fm_plan=set62" target="_blank">вот эту заявку</a>';
      return {
        response:
          `Спасибо за информацию! Анализ и проработка уже выполняются. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты. Вы должны заполнить ${link} и вам позвонит менеджер.`,
        quickReplies: ["Начать сначала"],
        state: this.state,
      };
    }
}