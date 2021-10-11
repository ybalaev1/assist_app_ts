import io, {Socket} from 'socket.io-client';
const socket = io('http://localhost:8999');
export const initWebSocket = () => {
  socket.on('connect', () => {
    console.log('socket.id');
  });
};
export const joinRoom = (
  roomName: string,
  goScreen: {(data: any): void; (arg0: any): void},
) => {
  socket.emit('join', roomName);
  socket.on('joined', (name: string) => {
    goScreen(name);
  });
};

export const getDataUserOrChat = (getData: {
  (data: any): void;
  (arg0: any): void;
}) => {
  socket.on('usr_chat_id', (data: string[]) => {
    return getData(data);
  });
};

export const socketFollow = (
  id: string,
  updateUser: {(data: any): void; (arg0: any): void},
) => {
  console.log(id);
  socket.emit('user_id', id);
  return socket.on('user_id', (data: any) => {
    return updateUser(data);
  });
  //   socket.on('chat message', (data: any) => {
  //         console.log(data);
  //       });
  //   socket.on('users', (data: any) => {
  //     console.log(data);
  //   });
  //   socket.on('users', socket => {
  //     // socket.join(id);
  //     socket.in('room-' + id).emit('connectToRoom', 'You are in room no. ' + id);
  //   });
};
