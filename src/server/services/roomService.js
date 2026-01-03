/**
 * @fileoverview RoomService handles room-specific operations and memberships.
 */

import { userService } from './userService.js';

class RoomService {
  /**
   * Gets all users in a specific room.
   * @param {string} room - Room name.
   */
  getUsersInRoom(room) {
    return userService.getAllUsers().filter(user => user.room === room);
  }

  /**
   * Checks if a username is already in use within a room.
   * @param {string} username - Username to check.
   * @param {string} room - Room name.
   */
  isUsernameTaken(username, room) {
    const users = this.getUsersInRoom(room);
    return users.some(u => u.username.toLowerCase() === username.toLowerCase());
  }

  /**
   * Gets room statistics or data.
   * @param {string} room - Room name.
   */
  getRoomData(room) {
    return {
      room,
      users: this.getUsersInRoom(room)
    };
  }

  /**
   * Gets all active rooms with their user counts.
   * @returns {Array<{name: string, count: number}>}
   */
  getAllRooms() {
    const allUsers = userService.getAllUsers();
    const roomsMap = new Map();

    allUsers.forEach(user => {
      if (user.room) {
        const currentCount = roomsMap.get(user.room) || 0;
        roomsMap.set(user.room, currentCount + 1);
      }
    });

    return Array.from(roomsMap.entries()).map(([name, count]) => ({
      name,
      count
    }));
  }
}

export const roomService = new RoomService();
