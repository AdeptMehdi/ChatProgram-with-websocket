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
   */
  addUser(id, username, room) {
    const user = { username, room };
    this.users.set(id, user);
    return user;
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
