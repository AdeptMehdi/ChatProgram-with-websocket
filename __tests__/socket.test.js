import { createServer } from 'http';
import { Server } from 'socket.io';
import Client from 'socket.io-client';
import { socketHandler } from '../src/server/socket.js';

describe('Socket Logic', () => {
  let io, serverSocket, clientSocket, httpServer;

  beforeAll((done) => {
    httpServer = createServer();
    io = new Server(httpServer);
    socketHandler(io);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
    httpServer.close();
  });

  test('should allow a user to join and receive welcome message', (done) => {
    clientSocket.on('message', (message) => {
      if (message.text.includes('Welcome TestUser')) {
        expect(message.user).toBe('system');
        done();
      }
    });

    clientSocket.emit('join', { username: 'TestUser', room: 'TestRoom' });
  });

  test('should broadcast message to room', (done) => {
    const secondClient = new Client(`http://localhost:${httpServer.address().port}`);
    
    secondClient.on('connect', () => {
        secondClient.emit('join', { username: 'OtherUser', room: 'TestRoom' }, () => {
            secondClient.on('message', (message) => {
                if (message.text === 'Hello World') {
                    expect(message.user).toBe('TestUser');
                    secondClient.close();
                    done();
                }
            });
            clientSocket.emit('sendMessage', 'Hello World');
        });
    });
  });
});
