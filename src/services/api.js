// Пример сервиса для работы с API
export const apiService = {
  // Методы для работы с Django (реляционные данные)
  async getUserData(userId) {
    const response = await fetch(`${API_URLS.DJANGO_API}/users/${userId}`);
    return response.json();
  },

  // Методы для работы с Node.js/MongoDB (нереляционные данные)
  async getChatMessages(chatId) {
    const response = await fetch(`${API_URLS.NODE_API}/messages/${chatId}`);
    return response.json();
  },

  // Теперь все запросы идут через единый бэкенд
  async getAllData(userId) {
    const response = await fetch(`${API_URLS.DJANGO_API}/combined-data/${userId}`);
    return response.json();
  }
}; 