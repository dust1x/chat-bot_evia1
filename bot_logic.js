// Импортируем логику для работы с маркетплейсами
import { MarketplaceLogic } from '/services/marketplace.js';
// Импортируем логику для работы с копирайтингом
import { CopywritingLogic } from '/services/copywriting.js';
// Импортируем логику для комплексных решений
import { ComplexLogic } from '/services/complex.js';
// Импортируем логику для разработки
import { DevelopmentLogic } from '/services/development.js';
// Импортируем логику для SEO
import { SEOLogic } from '/services/seo.js';
// Импортируем логику для email-рассылок
import { EmailLogic } from '/services/email.js';
// Импортируем логику для рекламы
import { AdvertisingLogic } from '/services/advertising.js';
// Импортируем сервис Deepseek для обработки нестандартных запросов
import { DeepseekService } from '/services/deepseek.js';
// Импортируем валидатор текста
import { TextValidator } from '/services/text_validator.js';

// Создаем экземпляры всех сервисов
const marketplaceLogic = new MarketplaceLogic();
const copywritingLogic = new CopywritingLogic();
const complexLogic = new ComplexLogic();
const developmentLogic = new DevelopmentLogic();
const seoLogic = new SEOLogic();
const emailLogic = new EmailLogic();
const advertisingLogic = new AdvertisingLogic();
const deepseekService = new DeepseekService();

// Основной класс бота
export class Bot{
  constructor(){
    // Инициализация начального состояния бота
    this.state = "start";
    // Контекст для хранения данных диалога
    this.context = {};
    // История диалога
    this.dialogHistory = [];
  }

  // Метод для сброса состояния бота
  resetState() {
    this.state = "start";
    this.context = {};
    this.dialogHistory = [];
  }

  // Метод для сохранения диалога в файл
  downloadDialogAsFile() {
    // Создаем имя файла с текущей датой
    const dateStr = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
    const filename = `Клиент № ${dateStr}.txt`;
    // Формируем текст диалога
    const text = this.dialogHistory.map(
      (entry) => `Клиент: ${entry.user}\nБот: ${entry.bot}\n`
    ).join('\n');
    // Создаем и скачиваем файл
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Основной метод обработки сообщений
  async handleMessage(message) {
    if (message.toLowerCase() === "начать сначала") {
      this.resetState();
      return this.getWelcomeMessage();
    }
    // Приводим сообщение к нижнему регистру для удобства обработки
    const lowerMessage = message.toLowerCase();
    
    // Если стартовый шаг — пропускаем только готовые варианты
    if (this.state === "start") {
      const quickReplies = [
        "Маркетплейс",
        "Комплекс",
        "Копирайтинг",
        "SEO",
        "Email",
        "Реклама",
        "Разработка"
      ];
      const validationResult = TextValidator.validateText(message, quickReplies);
      if (!validationResult.isValid) {
        const response = {
          response: validationResult.error,
          quickReplies,
          state: this.state
        };
        this.dialogHistory.push({ user: message, bot: response.response });
        return response;
      }
      // Сохраняем сообщение пользователя в историю
      this.dialogHistory.push({ user: message });
      const resp = await this.handleServiceChoice(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      return resp;
    }
    // Обработка диалога для маркетплейсов
    if (this.state.startsWith("dialog_marketplace_")) {
      const resp = await marketplaceLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      // Проверяем финальные фразы
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    // Обработка диалога для копирайтинга
    if (this.state.startsWith("dialog_copywriting_")) {
      const resp = await copywritingLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    // Обработка диалога для комплексных решений
    if (this.state.startsWith("dialog_complex_")) {
      const resp = await complexLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    // Обработка диалога для разработки
    if (this.state.startsWith("dialog_development_")) {
      const resp = await developmentLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    // Обработка диалога для SEO
    if (this.state.startsWith("dialog_seo_")) {
      const resp = await seoLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    // Обработка диалога для email-рассылок
    if (this.state.startsWith("dialog_email_")) {
      const resp = await emailLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    // Обработка диалога для рекламы
    if (this.state.startsWith("dialog_advertising_")){
      const resp = await advertisingLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    // Если сообщение не соответствует ни одному из шаблонов, используем Deepseek
    const deepseekResponse = await deepseekService.getResponse(message);
    this.dialogHistory[this.dialogHistory.length - 1].bot = deepseekResponse;
    if (this.isFinalBotResponse(deepseekResponse)) this.downloadDialogAsFile();
    return {
      response: deepseekResponse,
      quickReplies: ["Начать сначала"],
      state: this.state,
    };
  }

  // Метод для проверки финальных фраз бота
  isFinalBotResponse(response) {
    // Массив финальных фраз
    const finals = [
      "Поняла! Мы учтем это при подготовке материалов. Спасибо за подробные ответы! Теперь мы можем приступить к работе. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты.",
      "Поняла! Мы учтем это при интеграции рассылок. Спасибо за подробные ответы! Теперь мы можем приступить к работе. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты.",
      "Спасибо за информацию! Ваша заявка уже выполняется. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты.",
      "Поняла! Мы постараемся достичь этой стоимости заявки. Спасибо за подробные ответы! Теперь мы можем приступить к работе. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты.",
      "Спасибо, зафиксировала. Анализ вашего сайта готов. Расчет стоимости и эффективности продвижения еще в работе. Но скоро тоже будет готов. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты.",
      "Поняла! Мы учтем ваши сроки. Спасибо за подробные ответы! Теперь мы можем приступить к работе. Если будут проблемы с входом в личный кабинет или вопросы по анализу сайта, смело звоните по номеру 8 (800) 500 89 91. На линии нет роботов, отвечают digital-эксперты."
    ];
    return finals.includes(response);
  }

  // Метод для получения приветственного сообщения
  getWelcomeMessage() {
    return {
      response: "Здравствуйте! Я помогу вам проанализировать ваш бизнес и предложить решения для увеличения продаж. Выберите услугу:",
      quickReplies: ["Маркетплейс", "Комплекс", "Копирайтинг", "SEO", "Email", "Реклама", "Разработка"],
      state: "service_choice",
    };
  }

  // Метод для обработки выбора услуги
  async handleServiceChoice(message) {
    const lowerMessage = message.toLowerCase();

    // Обработка выбора маркетплейса
    if (lowerMessage === "маркетплейс") {
      this.state = "dialog_marketplace_start";
      return marketplaceLogic.startDialog();
    }
    // Обработка выбора копирайтинга
    if (lowerMessage === "копирайтинг") {
      this.state = "dialog_copywriting_start";
      return copywritingLogic.startDialog();
    }
    // Обработка выбора комплексного решения
    if (lowerMessage === "комплекс") {
      this.state = "dialog_complex_start";
      return complexLogic.startDialog();
    }
    // Обработка выбора разработки
    if (lowerMessage === "разработка") {
      this.state = "dialog_development_start";
      return developmentLogic.startDialog();
    }
    // Обработка выбора SEO
    if (lowerMessage === "seo") {
      this.state = "dialog_seo_start";
      return seoLogic.startDialog();
    }
    // Обработка выбора email-рассылок
    if (lowerMessage === "email") {
      this.state = "dialog_email_start";
      return emailLogic.startDialog();
    }
    // Обработка выбора рекламы
    if (lowerMessage === "реклама") {
      this.state = "dialog_advertising_start";
      return advertisingLogic.startDialog();
    }

    // Если не совпало ни с одной услугой — пробуем Deepseek
    const deepseekResponse = await deepseekService.getResponse(message);
    if (deepseekResponse.trim() === "Я могу помочь только с вопросами об услугах компании.") {
      return {
        response: "Пожалуйста, выберите одну из предложенных услуг.",
        quickReplies: ["Маркетплейс", "Комплекс", "Копирайтинг", "SEO", "Email", "Реклама", "Разработка"],
        state: "service_choice",
      };
    }
    return {
      response: deepseekResponse,
      quickReplies: ["Начать сначала"],
      state: "service_choice",
    };
  }
}