import { ToolsLogic } from "/services/tools.js";
const toolLogic = new ToolsLogic();

export class MarketplaceLogic{
  constructor(){
    this.state = "start";
    this.context = {};
  }

  resetState() {
    this.state = "start";
    this.context = {};
  }

  startDialog() {
    this.state = "dialog_marketplace_analysis";
    return {
      response: "Я помогу вам проанализировать ваш магазин на маркетплейсе и предложить решения для увеличения продаж. У вас уже есть зарегистрированный магазин на маркетплейсе?",
      quickReplies: ["Да", "Нет"],
      state: this.state,
    };
  }

  async handleMessage(message) {
    console.log(this.state);
    if (this.state === "dialog_marketplace_analysis") {
      return this.handleMarketplaceAnalysis(message);
    }
    if (this.state.startsWith("dialog_marketplace_")) {
      return await this.handleMarketplaceDetails(message);
    }
    return {
      response: "Я не поняла ваш запрос. Пожалуйста, выберите один из предложенных вариантов.",
      quickReplies: ["Начать сначала"],
      state: "start",
    };
  }

  handleMarketplaceAnalysis(message) {
    if (message === "Нет") {
      this.state = "start";
      return {
        response: "Без маркетплейса я не смогу помочь в сфере данной услуги. Но вы можете заполнить вот эту заявку, и вам позвонит менеджер.",
        quickReplies: ["Начать сначала"],
        state: this.state,
      };
    }

    if (message === "Да") {
      this.state = "dialog_marketplace_link";
      return {
        response: "Отлично! Можете отправить ссылку на ваш магазин? Это поможет мне лучше понять, с чем мы работаем.",
        quickReplies: [],
        state: this.state,
      };
    }
    return {
      response: "Пожалуйста, уточните, есть ли у вас магазин на маркетплейсе.",
      quickReplies: ["Да", "Нет"],
      state: this.state,
    };
  }

  async handleMarketplaceDetails(message) {
    if (this.state === "dialog_marketplace_link") {
      // Проверяем, начинается ли сообщение с "https"
      if (!message.startsWith("https")) {
        return {
          response: "Пожалуйста, проверьте, что вы отправили корректную ссылку на ваш магазин. Она должна начинаться с 'https'. Попробуйте снова.",
          quickReplies: [],
          state: this.state,
        };
      }
  
      try {
        // Проверяем работоспособность сайта
        const isWebsiteAvailable = await toolLogic.checkWebsiteAvailability(message);
  
        if (isWebsiteAvailable) {
          this.context["marketplace_link"] = message;
          this.state = "dialog_marketplace_category";
          return {
            response: "Спасибо! Пока я изучаю ваш магазин, давайте уточним несколько важных деталей. Какие товары вы продаете? Выберите наиболее подходящую категорию:",
            quickReplies: [
              "Одежда и аксессуары",
              "Электроника и гаджеты",
              "Товары для дома",
              "Красота и здоровье",
              "Детские товары",
              "Продукты питания",
              "Другое",
            ],
            state: this.state,
          };
        } 
        else {
          return {
            response: "К сожалению, сайт по указанной ссылке недоступен. Пожалуйста, перепроверьте работоспособность ссылки и отправьте её снова.",
            quickReplies: [],
            state: this.state,
          };
        }
      } 

      catch (error) {
        console.error("Ошибка при проверке сайта:", error);
        return {
          response: "Произошла ошибка при проверке работоспособности сайта. Пожалуйста, попробуйте снова позже.",
          quickReplies: ["Начать сначала"],
          state: "start",
        };
      }
    }

    if (this.state === "dialog_marketplace_category") {
      this.context["category"] = message;
      this.state = "dialog_marketplace_top_product";
      return {
        response: `${message} — популярная категория. А какой основной товар или группа товаров приносит вам наибольший доход?`,
        quickReplies: [],
        state: this.state,
      };
    }
  
    if (this.state === "dialog_marketplace_top_product") {
      this.context["top_product"] = message;
      this.state = "dialog_marketplace_service_choice";
      return {
        response: "Поняла. Что именно требуется от нас?",
        quickReplies: [
          "Тексты",
          "Оптимизация карточек",
          "Реклама",
          "Аудит",
          "Инфографика",
          "Рич-контент",
          "Другое",
        ],
        state: this.state,
      };
    }
  
    if (this.state === "dialog_marketplace_service_choice") {
      switch (message) {
        case "Тексты":
        case "Оптимизация карточек":
          this.state = "dialog_marketplace_sku_count";
          return {
            response: `Отлично! Вы выбрали ${message}. Это очень важный аспект для вашего маркетплейса. Теперь скажите, пожалуйста, сколько товарных позиций (SKU) вы планируете передать нам для работы?`,
            quickReplies: ["10", "50", "100"],
            state: this.state,
          };
        case "Реклама":
          this.state = "dialog_advertising_platforms";
          return {
            response: "Поняла! Вы выбрали настройку рекламы. Это поможет вам привлечь больше клиентов и увеличить продажи. Скажите, пожалуйста, запускали ли вы рекламу ранее? Если да, то на каких площадках?",
            quickReplies: ["VK", "Yandex", "Telegram", "Другие площадки", "Нет"],
            state: this.state,
          };
        case "Аудит":
          this.state = "dialog_audit_analytics_access";
          return {
            response: "Поняла! Вы выбрали аудит магазина. Это позволит нам выявить слабые места и предложить конкретные улучшения. Теперь скажите, пожалуйста, есть ли у вас доступ к расширенной аналитике внутри маркетплейса?",
            quickReplies: ["Да", "Нет"],
            state: this.state,
          };
        case "Инфографика":
          this.state = "dialog_infographics_sources";
          return {
            response: "Отлично! Вы выбрали создание инфографики. Это сделает ваши товары более визуально привлекательными. Есть ли у вас исходники фотографий товаров, которые можно использовать для инфографики?",
            quickReplies: ["Да", "Нет"],
            state: this.state,
          };
        case "Рич-контент":
          this.state = "dialog_rich_content_ideas";
          return {
            response: "Поняла! Вы выбрали разработку рич-контента. Это поможет вам выделиться среди конкурентов и привлечь больше внимания к вашим товарам. Есть ли у вас идеи или примеры, как вы хотите видеть рич-контент?",
            quickReplies: ["Да", "Нет"],
            state: this.state,
          };
        case "Другое":
          this.state = "dialog_other_details";
          return {
            response: "Поняла! Уточните детали: что конкретно вас интересует?",
            quickReplies: [],
            state: this.state,
          };
        default:
          return {
            response: "Пожалуйста, выберите одну из предложенных услуг.",
            quickReplies: [
              "Тексты",
              "Оптимизация карточек",
              "Реклама",
              "Аудит",
              "Инфографика",
              "Рич-контент",
              "Другое",
            ],
            state: this.state,
          };
      }
    }
  
    if (this.state === "dialog_marketplace_sku_count") {
      this.context["sku_count"] = message;
      return completeAnalysis();
    }

    if (this.state === "dialog_advertising_platforms") {
      if (message === "Нет") {
        this.state = "dialog_advertising_goals";
        return {
          response: "Поняла! Мы поможем вам запустить эффективную рекламную кампанию. Какие цели вы хотите достичь с помощью рекламы? Например:",
          quickReplies: [
            "Увеличение продаж",
            "Привлечение новых клиентов",
            "Повышение узнаваемости бренда",
            "Другое",
          ],
          state: this.state,
        };
      } else {
        this.context["advertising_platforms"] = message;
        return completeAnalysis();
      }
    }

    if (this.state === "dialog_advertising_goals") {
      this.context["advertising_goal"] = message;
      this.state = "dialog_advertising_preferred_platforms";
      return {
        response: "Отлично! Теперь скажите, пожалуйста, есть ли у вас предпочтительные площадки для запуска рекламы? Например:",
        quickReplies: ["Яндекс.Директ", "Telegram", "VK", "Другое"],
        state: this.state,
      };
    }

    if (this.state === "dialog_advertising_preferred_platforms") {
      this.context["preferred_platforms"] = message;
      return completeAnalysis();
    }

    if (this.state === "dialog_audit_analytics_access") {
      this.context["analytics_access"] = message;
      if (message === "Да") {
        this.state = "dialog_audit_metrics";
        return {
          response: "Отлично! Доступ к расширенной аналитике поможет нам провести более глубокий анализ вашего магазина. Скажите, пожалуйста, какие ключевые метрики вас больше всего беспокоят? Например:",
          quickReplies: [
            "Низкая конверсия",
            "Мало просмотров карточек товаров",
            "Высокий процент возвратов",
            "Другое",
          ],
          state: this.state,
        };
      } else {
        this.state = "dialog_audit_deadline";
        return {
          response: "Поняла! Без проблем — мы можем работать с доступными данными. В какие сроки хотите уложиться?",
          quickReplies: [],
          state: this.state,
        };
      }
    }

    if (this.state === "dialog_audit_metrics") {
      this.context["audit_metrics"] = message;
      this.state = "dialog_audit_deadline";
      return {
        response: "Спасибо за информацию! В какие сроки хотите уложиться?",
        quickReplies: [],
        state: this.state,
      };
    }

    if (this.state === "dialog_audit_deadline") {
      this.context["audit_deadline"] = message;
      return completeAnalysis();
    }

    if (this.state === "dialog_infographics_sources") {
      this.context["infographics_sources"] = message;
      if (message === "Да") {
        this.state = "dialog_infographics_elements";
        return {
          response: "Прекрасно! Исходники фотографий помогут нам создать качественную инфографику. Скажите, пожалуйста, какие элементы вы хотите видеть в инфографике? Например:",
          quickReplies: [
            "Характеристики товара",
            "Инструкции по использованию",
            "Преимущества товара",
            "Другое",
          ],
          state: this.state,
        };
      } else {
        this.state = "start";
        return {
          response: "Без исходников фотографий я не смогу помочь вам в сфере данной услуги. Но вы можете заполнить вот эту заявку, и вам позвонит менеджер.",
          quickReplies: ["Начать сначала"],
          state: this.state,
        };
      }
    }

    if (this.state === "dialog_infographics_elements") {
      this.context["infographics_elements"] = message;
      this.state = "dialog_infographics_deadline";
      return {
        response: "Спасибо за уточнение! В какие сроки хотите уложиться?",
        quickReplies: [],
        state: this.state,
      };
    }

    if (this.state === "dialog_infographics_deadline") {
      this.context["infographics_deadline"] = message;
      return completeAnalysis();
    }

    if (this.state === "dialog_rich_content_ideas") {
      this.context["rich_content_ideas"] = message;
      if (message === "Да") {
        this.state = "dialog_rich_content_materials";
        return {
          response: "Отлично! Расскажите, пожалуйста, подробнее о ваших идеях или поделитесь примерами.",
          quickReplies: [],
          state: this.state,
        };
      } else {
        this.state = "start";
        return {
          response: "Без конкретики я не смогу вам помочь в сфере данной услуги. Но вы можете заполнить вот эту заявку, и вам позвонит менеджер.",
          quickReplies: ["Начать сначала"],
          state: this.state,
        };
      }
    }

    if (this.state === "dialog_rich_content_materials") {
      this.context["rich_content_materials"] = message;
      this.state = "dialog_rich_content_usage";
      return {
        response: "Спасибо за уточнение! Теперь скажите, пожалуйста, в каком формате вы планируете использовать рич-контент? Например:",
        quickReplies: [
          "На карточках товаров",
          "На главной странице магазина",
          "В рекламных кампаниях",
          "Другое",
        ],
        state: this.state,
      };
    }

    if (this.state === "dialog_rich_content_usage") {
      this.context["rich_content_usage"] = message;
      this.state = "dialog_rich_content_deadline";
      return {
        response: "Спасибо за уточнение! В какие сроки хотите уложиться?",
        quickReplies: [],
        state: this.state,
      };
    }

    if (this.state === "dialog_rich_content_deadline") {
      this.context["rich_content_deadline"] = message;
      return completeAnalysis();
    }

    if (this.state === "dialog_other_details") {
      this.context["other_details"] = message;
      this.state = "dialog_other_top_product";
      return {
        response: `${message} — это интересная ниша. А какой основной товар или группа товаров приносит вам наибольший доход?`,
        quickReplies: [], // Здесь нет быстрых ответов
        state: this.state,
      };
    }

    if (this.state === "dialog_other_top_product") {
      this.context["other_top_product"] = message;
      return completeAnalysis();
    }
  }

  completeAnalysis() {
    this.state = "start";
    return {
      response:
        "Спасибо за информацию! Анализ и проработка уже выполняются. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты.",
      quickReplies: ["Начать сначала"],
      state: this.state,
    };
  }
}