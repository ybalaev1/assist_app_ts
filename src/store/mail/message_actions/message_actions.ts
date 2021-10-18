import {messagesTypes} from '../action/action_mail_types';
import {
  FetchMessagesRequest,
  FetchMessagesFailturePayload,
  FetchMessagesSuccess,
  FetchMessagesSuccessPayload,
  FetchMessagesFailture,
} from '../types/mailTypes';

export const getMessages = (id: string): FetchMessagesRequest => ({
  type: messagesTypes.MESSAGES_REQUEST,
  id,
});

export const getMessagesSuccess = (
  payload: FetchMessagesSuccessPayload,
): FetchMessagesSuccess => ({
  type: messagesTypes.MESSAGES_REQUEST_SUCCESS,
  payload,
});

export const getMessagesFailture = (
  payload: FetchMessagesFailturePayload,
): FetchMessagesFailture => ({
  type: messagesTypes.MESSAGES_REQUEST_FAILTURE,
  payload,
});
