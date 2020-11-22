import * as socketIO from 'socket.io';
import { Server } from 'http';
let io: socketIO.Server;

export const initIO = (server: Server) => {
  io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('new connection');
    socket.on('subscribe', (data) => {
      console.log(`new subscribe ${data.token}`);
      socket.join(data.token);
    });
  });

};

export const sendIO = (type: string, token: string, data: any) => {
  io.to(token).emit(type, data);
};
