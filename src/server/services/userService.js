/**
 * @fileoverview UserService handles user-related operations and state.
 */

class UserService {
  constructor() {
    this.users = new Map();
  }

  /**
   * Adds a user.
   * @param {string} id - Socket ID.
   * @param {string} username - Username.
   * @param {string} room - Room name.
   * @param {string} role - User role (admin or user).
   */
  addUser(id, username, room, role = 'user') {
    const user = { 
      username, 
      room, 
      role,
      isMuted: false,
      joinedAt: new Date().toISOString()
    };
    this.users.set(id, user);
    return user;
  }

  /**
   * Updates a user's role or status.
   * @param {string} id - Socket ID.
   * @param {Object} updates - Fields to update.
   */
  updateUser(id, updates) {
    const user = this.users.get(id);
    if (user) {
      const updatedUser = { ...user, ...updates };
      this.users.set(id, updatedUser);
      return updatedUser;
    }
    return null;
  }

  /**
   * Removes a user.
   * @param {string} id - Socket ID.
   */
  removeUser(id) {
    const user = this.users.get(id);
    if (user) {
      this.users.delete(id);
    }
    return user;
  }

  /**
   * Gets a user by ID.
   * @param {string} id - Socket ID.
   */
  getUser(id) {
    return this.users.get(id);
  }

  /**
   * Gets all users.
   */
  getAllUsers() {
    return Array.from(this.users.entries()).map(([id, data]) => ({ id, ...data }));
  }
}

export const userService = new UserService();
