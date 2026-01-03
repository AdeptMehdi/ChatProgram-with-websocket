import { roomService } from '../src/server/services/roomService.js';
import { userService } from '../src/server/services/userService.js';

describe('RoomService', () => {
  beforeEach(() => {
    userService.users.clear();
  });

  test('should get users in a specific room', () => {
    userService.addUser('1', 'John', 'Room1');
    userService.addUser('2', 'Jane', 'Room1');
    userService.addUser('3', 'Bob', 'Room2');

    const room1Users = roomService.getUsersInRoom('Room1');
    expect(room1Users).toHaveLength(2);
    expect(room1Users.map(u => u.username)).toContain('John');
    expect(room1Users.map(u => u.username)).toContain('Jane');
  });

  test('should check if username is taken in a room', () => {
    userService.addUser('1', 'John', 'Room1');
    expect(roomService.isUsernameTaken('john', 'Room1')).toBe(true);
    expect(roomService.isUsernameTaken('Jane', 'Room1')).toBe(false);
  });
});
