/**
 * @fileoverview MessageService handles message formatting and business rules for chat messages.
 */

class MessageService {
  /**
   * Formats a chat message.
   * @param {string} user - Sender's username.
   * @param {string} text - Message content.
   * @param {string} type - Message type (e.g., 'user', 'system').
   */
  formatMessage(user, text, type = 'user') {
    return {
      user,
      text,
      type,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Generates a system message.
   * @param {string} text - System message content.
   */
  systemMessage(text) {
    return this.formatMessage('system', text, 'system');
  }
}

export const messageService = new MessageService();
