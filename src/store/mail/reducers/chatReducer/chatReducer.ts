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
      const chats = action.payload.chats;
      const filter = chats.sort((a: {updatedAt: string}, b: {updatedAt: string}) => {
        return Date.parse(b.updatedAt) - Date.parse(a.updatedAt);
      })
      return {
        ...state,
        loading: false,
        chats: filter,
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
