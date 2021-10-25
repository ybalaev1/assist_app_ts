const EVENTS = {
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  MESSAGE: 'message'
};
import socketIoClient from "socket.io-client";
const socket = socketIoClient("http://localhost:8999", { autoConnect: false });

export default class Socket {
  public user: string;
  public port: string;
  private onChange: (isConnected: boolean) => void;
  private onMessage: (message: { message: string, chat_id: string }) => void;
  private socket: any;

  constructor(onChange: (isConnected: boolean) => void, onMessage: (message: { message: string, chat_id: string }) => void) {
    this.onChange = onChange;
    this.onMessage = onMessage;
    this.socket = '';
    this.user = '';
    this.port = '';
  }

  public connect = (user: string, port: string) => {
    this.user = user;
    this.port = port;

    // const host = `http://192.168.0.220:${port}`; // Running from local network
    // this.socket = io.connect(host);
    this.socket = socket.connect(); // Running from Heroku

    this.socket.on(EVENTS.CONNECT, this.onConnected);
  };

  public onConnected = () => {
    this.socket.on(EVENTS.MESSAGE, this.onMessage);
    this.onChange(true);
  };

  public sendMessage = (message: { message: string, chat_id: string }) => {
    if (typeof this.socket.emit === 'function') {
      this.socket.emit(EVENTS.MESSAGE, message)
    } else {
      console.error('Cannot emit socket messages. Socket.io not connected.');
    }
  };

  public disconnect = () => this.socket.close();
}