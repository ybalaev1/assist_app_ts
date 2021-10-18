import {messagesTypes} from '../../action/action_mail_types';
import {MessagesActions} from '../../types/mailTypes';

const initialState = {
  loading: false,
  messages: [],
  errors: null,
};

export default (state = initialState, action: MessagesActions) => {
  switch (action.type) {
    case messagesTypes.MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case messagesTypes.MESSAGES_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload.messages,
        errors: null,
      };
    case messagesTypes.MESSAGES_REQUEST_FAILTURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
      };
    default:
      return {
        ...state,
      };
  }
};
