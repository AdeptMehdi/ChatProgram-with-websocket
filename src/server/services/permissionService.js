/**
 * @fileoverview PermissionService manages admin actions and room permissions.
 */

import { userService } from './userService.js';
import { roomService } from './roomService.js';

class PermissionService {
  /**
   * Validates if a user has admin rights in a room.
   * @param {string} socketId - The requester's socket ID.
   */
  isAdmin(socketId) {
    const user = userService.getUser(socketId);
    return user?.role === 'admin';
  }

  /**
   * Handles user promotion to admin.
   * @param {string} adminSocketId - The admin who is promoting.
   * @param {string} targetSocketId - The user to be promoted.
   */
  promoteUser(adminSocketId, targetSocketId) {
    if (!this.isAdmin(adminSocketId)) return { error: 'Access denied. Admin only.' };
    
    const targetUser = userService.getUser(targetSocketId);
    if (!targetUser) return { error: 'User not found.' };

    userService.updateUser(targetSocketId, { role: 'admin' });
    return { success: true, username: targetUser.username };
  }

  /**
   * Handles muting a user.
   */
  toggleMute(adminSocketId, targetSocketId) {
    if (!this.isAdmin(adminSocketId)) return { error: 'Access denied. Admin only.' };

    const targetUser = userService.getUser(targetSocketId);
    if (!targetUser) return { error: 'User not found.' };
    if (targetUser.role === 'admin' && adminSocketId !== targetSocketId) {
        return { error: 'Cannot mute another admin.' };
    }

    const newMuteStatus = !targetUser.isMuted;
    userService.updateUser(targetSocketId, { isMuted: newMuteStatus });
    return { success: true, isMuted: newMuteStatus, username: targetUser.username };
  }

  /**
   * Determines if the first person joining should be an admin.
   * @param {string} room - Room name.
   */
  shouldBeAdmin(room) {
    const usersInRoom = roomService.getUsersInRoom(room);
    return usersInRoom.length === 0;
  }
}

export const permissionService = new PermissionService();
