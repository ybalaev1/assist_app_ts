import {chatsTypes} from '../../action/action_mail_types';
import {ChatsActions} from '../../types/mailTypes';

const initialState = {
  loading: false,
  chats: [],
  errors: null,
};

export default (state = initialState, action: ChatsActions) => {
  switch (action.type) {
    case chatsTypes.CHATS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case chatsTypes.CHATS_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        chats: action.payload.chats,
        errors: null,
      };
    case chatsTypes.CHATS_REQUEST_FAILTURE:
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
