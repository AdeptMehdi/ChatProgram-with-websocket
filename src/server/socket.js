/**
 * @fileoverview Socket handler refactored to Service-Oriented Programming (SOP).
 * It orchestrates communication between different services.
 */

import { userService } from './services/userService.js';
import { roomService } from './services/roomService.js';
import { messageService } from './services/messageService.js';
import { permissionService } from './services/permissionService.js';

/**
 * Initializes socket.io logic using the Service-Oriented Paradigm.
 * @param {import('socket.io').Server} io - The socket.io server instance.
 */
export const socketHandler = (io) => {
  io.on('connection', (socket) => {
    console.log(`Connection established: ${socket.id}`);

    // Send initial rooms list
    socket.emit('roomsList', roomService.getAllRooms());

    /**
     * Join Room Event
     */
    socket.on('join', ({ username, room }, callback) => {
      if (!username || !room) {
        return callback?.({ error: 'Username and room are required.' });
      }

      if (roomService.isUsernameTaken(username, room)) {
        return callback?.({ error: 'Username is already taken in this room.' });
      }

      // Assign role based on room state
      const role = permissionService.shouldBeAdmin(room) ? 'admin' : 'user';
      const user = userService.addUser(socket.id, username, room, role);
      
      socket.join(user.room);

      socket.emit('message', messageService.systemMessage(`Welcome ${user.username} to room ${user.room}!`));
      socket.broadcast.to(user.room).emit('message', messageService.systemMessage(`${user.username} has joined the chat.`));

      io.to(user.room).emit('roomData', roomService.getRoomData(user.room));
      
      // Update rooms list for everyone
      io.emit('roomsList', roomService.getAllRooms());

      callback?.({ role: user.role });
    });

    /**
     * Admin Action: Kick
     */
    socket.on('admin:kick', (targetId) => {
      if (!permissionService.isAdmin(socket.id)) return;
      
      const targetUser = userService.getUser(targetId);
      if (targetUser) {
        io.to(targetId).emit('kicked');
        io.to(targetUser.room).emit('message', messageService.systemMessage(`${targetUser.username} was kicked from the room.`));
        // Disconnect will handle the rest
      }
    });

    /**
     * Admin Action: Mute
     */
    socket.on('admin:mute', (targetId) => {
      const result = permissionService.toggleMute(socket.id, targetId);
      if (result.success) {
        const targetUser = userService.getUser(targetId);
        io.to(targetUser.room).emit('roomData', roomService.getRoomData(targetUser.room));
        io.to(targetUser.room).emit('message', messageService.systemMessage(
            `${targetUser.username} has been ${result.isMuted ? 'muted' : 'unmuted'}.`
        ));
      }
    });

    /**
     * Admin Action: Promote
     */
    socket.on('admin:promote', (targetId) => {
      const result = permissionService.promoteUser(socket.id, targetId);
      if (result.success) {
        const targetUser = userService.getUser(targetId);
        io.to(targetUser.room).emit('roomData', roomService.getRoomData(targetUser.room));
        io.to(targetUser.room).emit('message', messageService.systemMessage(`${targetUser.username} was promoted to Admin!`));
      }
    });

    /**
     * Send Message Event
     */
    socket.on('sendMessage', (message, callback) => {
      const user = userService.getUser(socket.id);

      if (user) {
        if (user.isMuted) {
            return callback?.({ error: 'You are muted and cannot send messages.' });
        }
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
        
        // Update rooms list for everyone since a room might have been closed or count changed
        io.emit('roomsList', roomService.getAllRooms());
      }
      console.log(`Connection terminated: ${socket.id}`);
    });
  });
};
