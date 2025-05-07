import { MarketplaceLogic } from '/services/marketplace.js';
import { CopywritingLogic } from '/services/copywriting.js';
import { ComplexLogic } from '/services/complex.js';
import { DevelopmentLogic } from '/services/development.js';
import { SEOLogic } from '/services/seo.js';
import { EmailLogic } from '/services/email.js';
import { AdvertisingLogic } from '/services/advertising.js';
import { DeepseekService } from '/services/deepseek.js';

const marketplaceLogic = new MarketplaceLogic();
const copywritingLogic = new CopywritingLogic();
const complexLogic = new ComplexLogic();
const developmentLogic = new DevelopmentLogic();
const seoLogic = new SEOLogic();
const emailLogic = new EmailLogic();
const advertisingLogic = new AdvertisingLogic();
const deepseekService = new DeepseekService();

export class Bot{
  constructor(){
    this.state = "start";
    this.context = {};
    this.dialogHistory = [];
  }

  resetState() {
    this.state = "start";
    this.context = {};
    this.dialogHistory = [];
  }

  downloadDialogAsFile() {
    const dateStr = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 16);
    const filename = `Клиент № ${dateStr}.txt`;
    const text = this.dialogHistory.map(
      (entry) => `Клиент: ${entry.user}\nБот: ${entry.bot}\n`
    ).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async handleMessage(message) {
    const lowerMessage = message.toLowerCase();
    // Сохраняем сообщение пользователя
    this.dialogHistory.push({ user: message });
    if (lowerMessage === "начать сначала") {
      this.resetState();
      return this.getWelcomeMessage();
    }
    if (this.state === "start") {
      const resp = await this.handleServiceChoice(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      return resp;
    }
    if (this.state.startsWith("dialog_marketplace_")) {
      const resp = await marketplaceLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      // Проверяем финальные фразы
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    if (this.state.startsWith("dialog_copywriting_")) {
      const resp = await copywritingLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    if (this.state.startsWith("dialog_complex_")) {
      const resp = await complexLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    if (this.state.startsWith("dialog_development_")) {
      const resp = await developmentLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    if (this.state.startsWith("dialog_seo_")) {
      const resp = await seoLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
    if (this.state.startsWith("dialog_email_")) {
      const resp = await emailLogic.handleMessage(message);
      this.dialogHistory[this.dialogHistory.length - 1].bot = resp.response;
      if (this.isFinalBotResponse(resp.response)) this.downloadDialogAsFile();
      return resp;
    }
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

  isFinalBotResponse(response) {
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

  getWelcomeMessage() {
    return {
      response: "Здравствуйте! Я помогу вам проанализировать ваш бизнес и предложить решения для увеличения продаж. Выберите услугу:",
      quickReplies: ["Маркетплейс", "Комплекс", "Копирайтинг", "SEO", "Email", "Реклама", "Разработка"],
      state: "service_choice",
    };
  }

  async handleServiceChoice(message) {
    const lowerMessage = message.toLowerCase();

    if (lowerMessage === "маркетплейс") {
      this.state = "dialog_marketplace_start";
      return marketplaceLogic.startDialog();
    }
    if (lowerMessage === "копирайтинг") {
      this.state = "dialog_copywriting_start";
      return copywritingLogic.startDialog();
    }
    if (lowerMessage === "комплекс") {
      this.state = "dialog_complex_start";
      return complexLogic.startDialog();
    }
    if (lowerMessage === "разработка") {
      this.state = "dialog_development_start";
      return developmentLogic.startDialog();
    }
    if (lowerMessage === "seo") {
      this.state = "dialog_seo_start";
      return seoLogic.startDialog();
    }
    if (lowerMessage === "email") {
      this.state = "dialog_email_start";
      return emailLogic.startDialog();
    }
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