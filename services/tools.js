// Класс с утилитами для работы с сайтами и другими инструментами
export class ToolsLogic {
    // Метод для проверки доступности веб-сайта
    async checkWebsiteAvailability(url) {
      try {
        // Отправляем запрос к сайту в режиме no-cors
        const response = await fetch(url, { mode: 'no-cors' });
        return true;
      } 
      catch (error) {
        // Логируем ошибку и возвращаем false при неудаче
        console.error("Ошибка при проверке сайта:", error);
        return false;
      }
    }
}