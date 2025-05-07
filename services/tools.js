export class ToolsLogic {
    async checkWebsiteAvailability(url) {
      try {
        const response = await fetch(url, { mode: 'no-cors' });
        return true;
      } 
      catch (error) {
        console.error("Ошибка при проверке сайта:", error);
        return false;
      }
    }
  }