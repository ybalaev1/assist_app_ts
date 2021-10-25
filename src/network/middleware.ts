import Socket from "./socket";
import { connectionChanged, CONNECT_SOCKET } from "../store/actions/socketActions/socketActions";
import {  messageReceived, messageSent, SEND_MESSAGE_REQUEST } from "../store/mail/message_actions/message_actions";

const socketMiddleware = (store: any) => {

  const onConnectionChange = (isConnected: boolean) => {
    store.dispatch(connectionChanged(isConnected));
  };

  const onIncomingMessage = (message: { message: string, chat_id: string }) => store.dispatch(messageReceived(message));

  const socket = new Socket(onConnectionChange, onIncomingMessage);

  return (next: any) => (action: any) => {
    const messageState = store.getState().messages;
    const socketState = store.getState().socket;

    switch (action.type) {
      case CONNECT_SOCKET:
        socket.connect(messageState.user, process.env.PORT || socketState.port);
        break;

      case SEND_MESSAGE_REQUEST:
        socket.sendMessage(action.message);
        store.dispatch(messageSent());
        break;

      default:
        break;
    }

    return next(action)
  };
};

export default socketMiddleware;