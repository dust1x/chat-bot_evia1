# Импортируем необходимые библиотеки
import requests
import json

# API ключ для доступа к OpenRouter API
API_KEY = "" # внутри скобок свой апи ключ отсюда https://openrouter.ai/settings/keys
# Модель для генерации ответов
MODEL = "deepseek/deepseek-r1"

def process_content(content):
    """
    Очищает контент от тегов <think>
    @param {string} content - Исходный контент
    @returns {string} - Очищенный контент
    """
    return content.replace('<think>', '').replace('</think>', '')

def chat_stream(prompt):
    """
    Отправляет запрос к API и обрабатывает потоковый ответ
    @param {string} prompt - Запрос пользователя
    @returns {string} - Полный ответ модели
    """
    # Устанавливаем заголовки для запроса
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    # Формируем данные для запроса
    data = {
        "model": MODEL,
        "messages": [{"role": "user", "content": prompt}],
        "stream": True
    }

    # Отправляем POST запрос к API
    with requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers=headers,
        json=data,
        stream=True
    ) as response:
        # Проверяем статус ответа
        if response.status_code != 200:
            print("Ошибка API:", response.status_code)
            return ""

        # Список для хранения полного ответа
        full_response = []
        
        # Обрабатываем потоковый ответ
        for chunk in response.iter_lines():
            if chunk:
                # Декодируем и очищаем чанк данных
                chunk_str = chunk.decode('utf-8').replace('data: ', '')
                try:
                    # Парсим JSON из чанка
                    chunk_json = json.loads(chunk_str)
                    if "choices" in chunk_json:
                        # Извлекаем контент из ответа
                        content = chunk_json["choices"][0]["delta"].get("content", "")
                        if content:
                            # Очищаем контент и добавляем в ответ
                            cleaned = process_content(content)
                            print(cleaned, end='', flush=True)
                            full_response.append(cleaned)
                except:
                    pass

        print()  # Перенос строки после завершения потока
        return ''.join(full_response)

def main():
    """
    Основная функция для запуска чата
    """
    print("Чат с DeepSeek-R1 (by Antric)\nДля выхода введите 'exit'\n")

    # Основной цикл чата
    while True:
        # Получаем ввод пользователя
        user_input = input("Вы: ")
        
        # Проверяем команду выхода
        if user_input.lower() == 'exit':
            print("Завершение работы...")
            break
            
        # Отправляем запрос и получаем ответ
        print("DeepSeek-R1:", end=' ', flush=True)
        chat_stream(user_input)

# Запускаем программу, если файл запущен напрямую
if __name__ == "__main__":
    main()