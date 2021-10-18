import {
  chatsTypes,
  chatByIdTypes,
  messagesTypes,
} from '../action/action_mail_types';
import {ChatModel} from '../model/mail.model';

/* chats interfaces */
interface FetchChatsSuccessPayload {
  chats: any | ChatModel[];
}
interface FetchChatsFailturePayload {
  errors: string | string[] | undefined | any;
}

/* chat by id interfaces */
interface FetchChatByIdSuccessPayload {
  chat_id: string[ChatModel[]];
}
interface FetchChatByIdFailturePayload {
  errors: string | string[] | undefined | any;
}

/* message interfaces */
interface FetchMessagesSuccessPayload {
  messages: any | string[];
}
interface FetchMessagesFailturePayload {
  errors: string | string[] | undefined | any;
}

/* chats types */
interface FetchChatsRequest {
  type: typeof chatsTypes.CHATS_REQUEST;
}
type FetchChatsSuccess = {
  type: typeof chatsTypes.CHATS_REQUEST_SUCCESS;
  payload: FetchChatsSuccessPayload;
};
type FetchChatsFailture = {
  type: typeof chatsTypes.CHATS_REQUEST_FAILTURE;
  payload: FetchChatsFailturePayload;
};

/* chat by id types */
interface FetchChatByIdRequest {
  type: typeof chatByIdTypes.CHAT_BY_ID_REQUEST;
  id;
}
type FetchChatByIdSuccess = {
  type: typeof chatByIdTypes.CHAT_BY_ID_REQUEST_SUCCESS;
  payload: FetchChatByIdSuccessPayload;
};
type FetchChatByIdFailture = {
  type: typeof chatByIdTypes.CHAT_BY_ID_REQUEST_FAILTURE;
  payload: FetchChatByIdFailturePayload;
};

/* messages types */
interface FetchMessagesRequest {
  type: typeof messagesTypes.MESSAGES_REQUEST;
  id;
}
type FetchMessagesSuccess = {
  type: typeof messagesTypes.MESSAGES_REQUEST_SUCCESS;
  payload: FetchMessagesSuccessPayload;
};
type FetchMessagesFailture = {
  type: typeof messagesTypes.MESSAGES_REQUEST_FAILTURE;
  payload: FetchMessagesFailturePayload;
};

/* export chats actions */

export type ChatsActions =
  | FetchChatsRequest
  | FetchChatsSuccess
  | FetchChatsFailture;

/* export chat by id actions */

export type ChatByIdActions =
  | FetchChatByIdRequest
  | FetchChatByIdSuccess
  | FetchChatByIdFailture;

/* export messages actions */

export type MessagesActions =
  | FetchMessagesRequest
  | FetchMessagesSuccess
  | FetchMessagesFailture;
