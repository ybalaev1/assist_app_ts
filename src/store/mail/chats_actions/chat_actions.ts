import {chatByIdTypes, chatsTypes} from '../action/action_mail_types';
import {
  FetchChatsRequest,
  FetchChatsFailturePayload,
  FetchChatsSuccess,
  FetchChatsSuccessPayload,
  FetchChatsFailture,
  FetchChatByIdRequest,
  FetchChatByIdSuccess,
  FetchChatByIdFailture,
  FetchChatByIdSuccessPayload,
  FetchChatByIdFailturePayload,
} from '../types/mailTypes';

export const getChats = (): FetchChatsRequest => ({
  type: chatsTypes.CHATS_REQUEST,
});

export const getChatsSuccess = (
  payload: FetchChatsSuccessPayload,
): FetchChatsSuccess => ({
  type: chatsTypes.CHATS_REQUEST_SUCCESS,
  payload,
});

export const getChatsFailture = (
  payload: FetchChatsFailturePayload,
): FetchChatsFailture => ({
  type: chatsTypes.CHATS_REQUEST_FAILTURE,
  payload,
});

export const getChatById = (id: string): FetchChatByIdRequest => ({
  type: chatByIdTypes.CHAT_BY_ID_REQUEST,
  id: id,
});

export const getChatByIdSuccess = (
  payload: FetchChatByIdSuccessPayload,
): FetchChatByIdSuccess => ({
  type: chatByIdTypes.CHAT_BY_ID_REQUEST_SUCCESS,
  payload,
});

export const getChatByIdFailture = (
  payload: FetchChatByIdFailturePayload,
): FetchChatByIdFailture => ({
  type: chatByIdTypes.CHAT_BY_ID_REQUEST_FAILTURE,
  payload,
});
