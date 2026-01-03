import { userService } from '../src/server/services/userService.js';

describe('UserService', () => {
  beforeEach(() => {
    // Clear state manually for tests if needed, but since it's a singleton for the app, 
    // we should be careful. In a real app, we might export the class and instantiate per test.
    // For simplicity, we just clear the map.
    userService.users.clear();
  });

  test('should add a user', () => {
    const user = userService.addUser('123', 'John', 'Room1');
    expect(user).toEqual({ username: 'John', room: 'Room1' });
    expect(userService.getUser('123')).toEqual(user);
  });

  test('should remove a user', () => {
    userService.addUser('123', 'John', 'Room1');
    const removed = userService.removeUser('123');
    expect(removed).toEqual({ username: 'John', room: 'Room1' });
    expect(userService.getUser('123')).toBeUndefined();
  });

  test('should get all users', () => {
    userService.addUser('1', 'John', 'Room1');
    userService.addUser('2', 'Jane', 'Room2');
    expect(userService.getAllUsers()).toHaveLength(2);
  });
});
