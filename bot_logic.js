import { MarketplaceLogic } from '/services/marketplace.js';
import { CopywritingLogic } from '/services/copywriting.js';
import { ComplexLogic } from '/services/complex.js';
import { DevelopmentLogic } from '/services/development.js';
import { SEOLogic } from '/services/seo.js';
import { EmailLogic } from '/services/email.js';
import { AdvertisingLogic } from '/services/advertising.js';

const marketplaceLogic = new MarketplaceLogic();
const copywritingLogic = new CopywritingLogic();
const complexLogic = new ComplexLogic();
const developmentLogic = new DevelopmentLogic();
const seoLogic = new SEOLogic();
const emailLogic = new EmailLogic();
const advertisingLogic = new AdvertisingLogic();

export class Bot{
  constructor(){
    this.state = "start",
    this.context = {}
  }

  resetState() {
    this.state = "start";
    this.context = {};
  }

  async handleMessage(message) {
    if (message === "Начать сначала") {
      this.resetState();
      return this.getWelcomeMessage();
    }
    if (this.state === "start") {
      return this.handleServiceChoice(message);
    }
    if (this.state.startsWith("dialog_marketplace_")) {
      return marketplaceLogic.handleMessage(message);
    }
    if (this.state.startsWith("dialog_copywriting_")) {
      return copywritingLogic.handleMessage(message);
    }
    if (this.state.startsWith("dialog_complex_")) {
      return complexLogic.handleMessage(message);
    }
    if (this.state.startsWith("dialog_development_")) {
      return developmentLogic.handleMessage(message);
    }
    if (this.state.startsWith("dialog_seo_")) {
      return seoLogic.handleMessage(message);
    }
    if (this.state.startsWith("dialog_email_")) {
      return emailLogic.handleMessage(message);
    }
    if (this.state.startsWith("dialog_advertising_")){
      return advertisingLogic.handleMessage(message);
    }
    return {
      response: "Я не поняла ваш запрос. Пожалуйста, выберите один из предложенных вариантов.",
      quickReplies: ["Начать сначала"],
      state: "start",
    };
  }

  getWelcomeMessage() {
    return {
      response: "Здравствуйте! Я помогу вам проанализировать ваш бизнес и предложить решения для увеличения продаж. Выберите услугу:",
      quickReplies: ["Маркетплейс", "Комплекс", "Копирайтинг", "SEO", "Email", "Реклама", "Разработка"],
      state: "service_choice",
    };
  }

  handleServiceChoice(message) {
    if (message === "Маркетплейс") {
      this.state = "dialog_marketplace_start";
      return marketplaceLogic.startDialog();
    }
    if (message === "Копирайтинг") {
      this.state = "dialog_copywriting_start";
      return copywritingLogic.startDialog();
    }
    if (message === "Комплекс") {
      this.state = "dialog_complex_start";
      return complexLogic.startDialog();
    }
    if (message === "Разработка") {
      this.state = "dialog_development_start";
      return developmentLogic.startDialog();
    }
    if (message === "SEO") {
      this.state = "dialog_seo_start";
      return seoLogic.startDialog();
    }
    if (message === "Email") {
      this.state = "dialog_email_start";
      return emailLogic.startDialog();
    }
    if (message === "Реклама") {
      this.state = "dialog_advertising_start";
      return advertisingLogic.startDialog();
    }
    return {
      response: "Эта услуга пока в разработке. Пожалуйста, выберите другую.",
      quickReplies: ["Маркетплейс", "Копирайтинг", "SEO", "Email", "Реклама", "Разработка"],
      state: "service_choice",
    };
  }
}