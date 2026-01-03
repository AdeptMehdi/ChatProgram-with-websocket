/**
 * @fileoverview Socket handler refactored to Service-Oriented Programming (SOP).
 * It orchestrates communication between different services.
 */

import { userService } from './services/userService.js';
import { roomService } from './services/roomService.js';
import { messageService } from './services/messageService.js';

/**
 * Initializes socket.io logic using the Service-Oriented Paradigm.
 * @param {import('socket.io').Server} io - The socket.io server instance.
 */
export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`Connection established: ${socket.id}`);

    /**
     * Join Room Event
     */
    socket.on('join', ({ username, room }, callback) => {
      // Validation via Services
      if (!username || !room) {
        return callback?.({ error: 'Username and room are required.' });
      }

      if (roomService.isUsernameTaken(username, room)) {
        return callback?.({ error: 'Username is already taken in this room.' });
      }

      // State update via UserService
      const user = userService.addUser(socket.id, username, room);
      socket.join(user.room);

      // Notification via MessageService
      socket.emit('message', messageService.systemMessage(`Welcome ${user.username} to room ${user.room}!`));
      socket.broadcast.to(user.room).emit('message', messageService.systemMessage(`${user.username} has joined the chat.`));

      // Sync Room Data via RoomService
      io.to(user.room).emit('roomData', roomService.getRoomData(user.room));

      callback?.();
    });

    /**
     * Send Message Event
     */
    socket.on('sendMessage', (message, callback) => {
      const user = userService.getUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', messageService.formatMessage(user.username, message));
      }

      callback?.();
    });

    /**
     * Typing Indicator Event
     */
    socket.on('typing', (isTyping) => {
      const user = userService.getUser(socket.id);
      if (user) {
        socket.broadcast.to(user.room).emit('userTyping', {
          username: user.username,
          isTyping
        });
      }
    });

    /**
     * Disconnect Event
     */
    socket.on('disconnect', () => {
      const user = userService.removeUser(socket.id);

      if (user) {
        io.to(user.room).emit('message', messageService.systemMessage(`${user.username} has left the chat.`));
        io.to(user.room).emit('roomData', roomService.getRoomData(user.room));
      }
      console.log(`Connection terminated: ${socket.id}`);
    });
  });
};
